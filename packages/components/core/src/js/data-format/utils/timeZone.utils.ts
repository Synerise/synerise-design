import { format, getTimezoneOffset, utcToZonedTime } from 'date-fns-tz';
import { type IntlShape } from 'react-intl';

export const TIMEZONE_OFFSET_REGEX = /([+-]\d\d:\d\d)|([Z])$/;

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const dateToIsoWithOffset = (
  value: Date,
  intlObject: IntlShape,
): string => {
  return format(value, "yyyy-MM-dd'T'HH:mm:ssxxx", {
    timeZone: intlObject?.timeZone || defaultTimezone,
  });
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

/** The local fields of a date, moved into the UTC fields of a new one. */
const asUtcFields = (wallClock: Date): Date =>
  new Date(
    Date.UTC(
      wallClock.getFullYear(),
      wallClock.getMonth(),
      wallClock.getDate(),
      wallClock.getHours(),
      wallClock.getMinutes(),
      wallClock.getSeconds(),
      wallClock.getMilliseconds(),
    ),
  );

/**
 * Offset of `timeZone` at the given wall clock in that zone.
 *
 * `getTimezoneOffset` reads its date argument's *UTC* fields as the wall clock to look up, so a
 * date holding the wall clock in its local fields has to be re-based first: passing it directly
 * asks for the offset at `wallClock - browserOffset` instead, which within that distance of a
 * DST transition returns the offset from the wrong side of the jump.
 */
const getOffsetAtWallClock = (wallClock: Date, timeZone: string): number =>
  getTimezoneOffset(timeZone, asUtcFields(wallClock));

/**
 * The wall clock `timeZone` shows at a real instant.
 *
 * `utcToZonedTime` resolves this directly from the instant, unlike `getTimezoneOffset`, which
 * answers for a wall clock and so cannot distinguish the two sides of a transition (nor an hour
 * a spring-forward skips) when all it is given is the instant.
 */
const getWallClockAtInstant = (instant: Date, timeZone: string): Date =>
  utcToZonedTime(instant, timeZone);

export const getLocalDateInTimeZone = (
  dateIsoString: string,
  timezone: string,
) => {
  const { offsetString, dateTimeString } =
    dateStringTimeZoneParts(dateIsoString);

  const localDate = new Date(dateTimeString);
  // A fixed offset like "-04:00" has no transitions, so it can be read off any date.
  const dateTimezoneOffset = offsetString
    ? getTimezoneOffset(offsetString, localDate)
    : 0; // -4
  // The value denotes exactly one instant, so the wall clock is whatever the zone shows there.
  const instant = new Date(
    asUtcFields(localDate).getTime() - dateTimezoneOffset,
  );

  return getWallClockAtInstant(instant, timezone);
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) {
    return date.toISOString();
  }

  // `date` holds a wall clock of `timeZone` in its local fields, so the offset is the one that
  // zone has at that wall clock.
  const timeZoneOffset = getOffsetAtWallClock(date, timeZone);
  const dif = timeZoneOffset >= 0 ? '+' : '-';

  const tzHours = pad(Math.floor(Math.abs(timeZoneOffset) / 60 / 60 / 1000));
  const tzMinutes = pad((Math.abs(timeZoneOffset) / 60 / 1000) % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}${dif}${tzHours}:${tzMinutes}`;
}

export const currentTimeInTimezone = (timezoneString: string) => {
  const now = new Date();
  return utcToZonedTime(now.toISOString(), timezoneString);
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
