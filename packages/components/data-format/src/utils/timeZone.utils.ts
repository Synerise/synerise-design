import { IntlShape } from 'react-intl';
import { format, utcToZonedTime, getTimezoneOffset } from 'date-fns-tz';

export const TIMEZONE_OFFSET_REGEX = /([+-]\d\d:\d\d)|([Z])$/;

const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getValueWithTimezone = (value: Date, intlObject: IntlShape) => {
  return format(value, "yyyy-MM-dd'T'HH:mm:ssxxx", { timeZone: intlObject?.timeZone || defaultTimezone });
};
/// SAME AS ABOVE ???
export const applyTimezoneOffset = (
  date: Date | undefined,
  timezoneOffset: boolean | string | undefined,
  intl?: IntlShape
) => {
  if (!timezoneOffset) {
    return date;
  }

  const timezoneString = getTimeZone(timezoneOffset, intl);
  return toIsoString(date as Date, timezoneString);
};

export const removeTimeZoneOffset = (dateString: string | Date) => {
  const date = dateString.toString();
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

export const getLocalDateInTimeZone = (dateIsoString: string, timezone: string) => {
  const { offsetString, dateTimeString } = dateStringTimeZoneParts(dateIsoString);

  const localDate = new Date(dateTimeString);
  const localTimezoneOffset = getTimezoneOffset(timezone, localDate); // +2
  const dateTimezoneOffset = offsetString ? getTimezoneOffset(offsetString, localDate) : 0; // -4

  const offsetDiff = localTimezoneOffset - dateTimezoneOffset;
  localDate.setMilliseconds(localDate.getMilliseconds() + offsetDiff);

  return localDate;
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) return date.toISOString();

  const timeZoneOffset = getTimezoneOffset(timeZone, date);
  const dif = timeZoneOffset >= 0 ? '+' : '-';

  const tzHours = pad(Math.floor(Math.abs(timeZoneOffset) / 60 / 60 / 1000));
  const tzMinutes = pad((Math.abs(timeZoneOffset) / 60 / 1000) % 60);

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}${dif}${tzHours}:${tzMinutes}`;
}

export const currentTimeInTimezone = (includeTimezoneOffset: boolean | string, intl: IntlShape) => {
  const timezoneString = typeof includeTimezoneOffset === 'string' ? includeTimezoneOffset : intl?.timeZone;
  if (!includeTimezoneOffset || !timezoneString) {
    return new Date();
  }
  const now = new Date();
  return utcToZonedTime(now.toISOString(), timezoneString);
};

export const dateTimeStringToLocalDate = (value?: string, timeZone?: string): Date => {
  if (!value || !timeZone) {
    return new Date();
  }
  if (timeZone !== undefined) {
    return getLocalDateInTimeZone(value, timeZone);
  }
  // FIXME ????
  return typeof value === 'string' ? new Date(value) : value;
};

export const getValueAsLocalDate = (value?: Date | string, timeZone?: string): Date => {
  if (!value) {
    return new Date();
  }
  if (timeZone !== undefined) {
    if (typeof value !== 'string') return getLocalDateInTimeZone(value.toISOString(), timeZone);
    return getLocalDateInTimeZone(value, timeZone);
  }
  // FIXME ????
  return typeof value === 'string' ? new Date(value) : value;
};

export const getTimeZone = (timeZone?: boolean | string, intl?: IntlShape): string | undefined => {
  if (!timeZone) {
    return undefined;
  }
  if (timeZone === true) {
    return intl?.timeZone || defaultTimezone;
  }
  return timeZone;
};
