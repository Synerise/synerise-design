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

export const getLocalDateInTimeZone = (
  dateIsoString: string,
  timezone: string,
) => {
  const { offsetString, dateTimeString } =
    dateStringTimeZoneParts(dateIsoString);

  const localDate = new Date(dateTimeString);
  const localTimezoneOffset = getTimezoneOffset(timezone, localDate); // +2
  const dateTimezoneOffset = offsetString
    ? getTimezoneOffset(offsetString, localDate)
    : 0; // -4

  const offsetDiff = localTimezoneOffset - dateTimezoneOffset;
  localDate.setMilliseconds(localDate.getMilliseconds() + offsetDiff);

  return localDate;
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) {
    return date.toISOString();
  }

  const timeZoneOffset = getTimezoneOffset(timeZone, date);
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
