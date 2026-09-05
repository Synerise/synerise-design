import { type IntlShape } from 'react-intl';

import { TZDate, tzOffset } from '@date-fns/tz';

export const TIMEZONE_OFFSET_REGEX = /([+-]\d\d:\d\d)|([Z])$/;

/** What `extractTimeZoneOffset` returns for a UTC-terminated ISO string, rather than '+00:00'. */
const UTC_DESIGNATOR = 'Z';

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const dateToIsoWithOffset = (
  value: Date,
  intlObject: IntlShape,
): string => {
  // Same job as `toIsoString`: keep the date's own fields and stamp the offset the zone has at
  // them. `date-fns-tz@1`'s `format` did this via its `timeZone` option, which only fed the
  // offset tokens and deliberately left the fields alone — wrapping the value in a `TZDate`
  // instead re-reads it as an instant and shifts it by the browser-to-zone delta.
  return toIsoString(value, intlObject?.timeZone || defaultTimezone);
};

export const applyTimezoneOffset = (
  date: Date | undefined,
  timezoneOffset: true | string | undefined,
  intl?: IntlShape,
) => {
  if (!timezoneOffset) {
    return date;
  }

  const timezoneString = getTimeZone(timezoneOffset, intl);
  return toIsoString(date as Date, timezoneString);
};

export const removeTimeZoneOffset = (dateString: string | Date) => {
  const date =
    dateString instanceof Date ? dateString.toISOString() : dateString;
  const finalDate = date.replace(TIMEZONE_OFFSET_REGEX, '');

  return finalDate;
};

export const extractTimeZoneOffset = (datestring: string) => {
  const date = datestring.toString();

  const found = date.match(TIMEZONE_OFFSET_REGEX);
  return found && found[0];
};

export const dateStringTimeZoneParts = (dateTimeIsoString: string) => {
  return {
    dateTimeString: removeTimeZoneOffset(dateTimeIsoString),
    offsetString: extractTimeZoneOffset(dateTimeIsoString),
  };
};

/**
 * The instant at which `timeZone` shows the given wall clock.
 *
 * `TZDate`'s component constructor reads its arguments as a reading *in* the zone, so it resolves
 * which side of a transition the wall clock falls on by itself. That is what the previous
 * `asUtcFields` re-basing existed to work around: `date-fns-tz@1`'s `getTimezoneOffset` read its
 * date argument's UTC fields as the wall clock to look up, so passing a locally-held wall clock
 * directly asked about `wallClock - browserOffset` instead.
 */
const asInstantInTimeZone = (wallClock: Date, timeZone: string): TZDate =>
  new TZDate(
    wallClock.getFullYear(),
    wallClock.getMonth(),
    wallClock.getDate(),
    wallClock.getHours(),
    wallClock.getMinutes(),
    wallClock.getSeconds(),
    wallClock.getMilliseconds(),
    timeZone,
  );

/** Offset of `timeZone`, in minutes ahead of UTC, at the given wall clock in that zone. */
const getOffsetAtWallClock = (wallClock: Date, timeZone: string): number =>
  tzOffset(timeZone, asInstantInTimeZone(wallClock, timeZone));

/**
 * The wall clock `timeZone` shows at a real instant, as a plain `Date` carrying that reading in
 * its *local* fields — the representation the rest of this module and its consumers expect.
 *
 * A `TZDate` would report the same reading through its getters, but it is not interchangeable:
 * its `toISOString` emits an offset-carrying string rather than a `Z` one, and its instant is the
 * real one rather than the re-based value callers currently observe. Returning one is a
 * deliberate follow-up, not a drop-in.
 */
const getWallClockAtInstant = (instant: Date, timeZone: string): Date => {
  const zoned = new TZDate(instant, timeZone);

  return new Date(
    zoned.getFullYear(),
    zoned.getMonth(),
    zoned.getDate(),
    zoned.getHours(),
    zoned.getMinutes(),
    zoned.getSeconds(),
    zoned.getMilliseconds(),
  );
};

export const getLocalDateInTimeZone = (
  dateIsoString: string,
  timezone: string,
) => {
  const { offsetString, dateTimeString } =
    dateStringTimeZoneParts(dateIsoString);

  const localDate = new Date(dateTimeString);
  // A fixed offset like "-04:00" has no transitions, so it can be read off any date. Minutes, as
  // everything below now is. `extractTimeZoneOffset` reports a UTC-terminated string as 'Z',
  // which `tzOffset` cannot parse — it returns NaN where `date-fns-tz@1`'s `getTimezoneOffset`
  // read it as zero. Since `value.toISOString()` is the most common input to this function, that
  // difference silently invalidates the whole result.
  const dateTimezoneOffset =
    !offsetString || offsetString === UTC_DESIGNATOR
      ? 0
      : tzOffset(offsetString, localDate);
  // A value with no offset is read as UTC, not as a reading in `timezone` — `TZDate`'s string
  // constructor would do the latter, so the UTC fields are assembled by hand instead.
  const utcFields = Date.UTC(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate(),
    localDate.getHours(),
    localDate.getMinutes(),
    localDate.getSeconds(),
    localDate.getMilliseconds(),
  );
  // The value denotes exactly one instant, so the wall clock is whatever the zone shows there.
  const instant = new Date(utcFields - dateTimezoneOffset * 60 * 1000);

  return getWallClockAtInstant(instant, timezone);
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) {
    return date.toISOString();
  }

  // `date` holds a wall clock of `timeZone` in its local fields, so the offset is the one that
  // zone has at that wall clock.
  const offsetMinutes = getOffsetAtWallClock(date, timeZone);
  const dif = offsetMinutes >= 0 ? '+' : '-';

  const tzHours = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const tzMinutes = pad(Math.abs(offsetMinutes) % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}${dif}${tzHours}:${tzMinutes}`;
}

export const currentTimeInTimezone = (timezoneString: string) => {
  return getWallClockAtInstant(new Date(), timezoneString);
};

export const dateTimeStringToLocalDate = (
  value?: string,
  timeZone?: string,
): Date => {
  if (!value || !timeZone) {
    return new Date();
  }
  if (timeZone !== undefined) {
    return getLocalDateInTimeZone(value, timeZone);
  }
  // FIXME ????
  return typeof value === 'string' ? new Date(value) : value;
};

export const getValueAsLocalDate = (
  value?: Date | string,
  timeZone?: string,
): Date => {
  if (!value) {
    return new Date();
  }
  if (timeZone !== undefined) {
    if (typeof value !== 'string') {
      return getLocalDateInTimeZone(value.toISOString(), timeZone);
    }
    return getLocalDateInTimeZone(value, timeZone);
  }
  return typeof value === 'string' ? new Date(value) : value;
};

export const getTimeZone = (
  timeZone?: boolean | string,
  intl?: IntlShape,
): string | undefined => {
  if (!timeZone) {
    return undefined;
  }
  if (timeZone === true) {
    return intl?.timeZone || defaultTimezone;
  }
  return timeZone;
};
