import { IntlShape } from 'react-intl';
import { utcToZonedTime, getTimezoneOffset } from 'date-fns-tz';

const TIMEZONE_OFFSET_REGEX = /([+-]\d\d:\d\d)|([Z])$/;

export const removeTimeZoneOffset = (dateString: string | Date) => {
  const date = dateString.toString();
  const finalDate = date.replace(TIMEZONE_OFFSET_REGEX, '');

  return finalDate;
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

export const extractTimeZoneOffset = (datestring: string) => {
  const date = datestring.toString();

  const found = date.match(TIMEZONE_OFFSET_REGEX);
  return found && found[0];
};

export const getLocalDateInTimeZone = (dateIsoString: string, timezone: string) => {
  // dateIsoString 2024-01-02T12:00:00-04:00
  // timezone Europe/Warsaw +02:00
  const dateTZOffset = extractTimeZoneOffset(dateIsoString); // -04:00
  const dateWithoutOffset = removeTimeZoneOffset(dateIsoString); // 2024-01-02T12:00:00

  const localDate = new Date(dateWithoutOffset);
  const localTimezoneOffset = getTimezoneOffset(timezone, localDate); // +2
  const dateTimezoneOffset = dateTZOffset ? getTimezoneOffset(dateTZOffset, localDate) : 0; // -4

  const offsetDiff = localTimezoneOffset - dateTimezoneOffset;
  localDate.setMilliseconds(localDate.getMilliseconds() + offsetDiff);

  return localDate;
};

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

export const currentTimeInTimezone = (includeTimezoneOffset: boolean | string, intl: IntlShape) => {
  const timezoneString = typeof includeTimezoneOffset === 'string' ? includeTimezoneOffset : intl?.timeZone;
  if (!includeTimezoneOffset || !timezoneString) {
    return new Date();
  }
  const now = new Date();
  return utcToZonedTime(now.toISOString(), timezoneString);
};

export const getValueAsLocalDate = (value?: Date | string, timeZone?: string): Date => {
  if (!value) {
    return new Date();
  }
  if (timeZone !== undefined) {
    if (typeof value !== 'string') return value;
    return getLocalDateInTimeZone(value, timeZone);
  }
  // FIXME ????
  return typeof value === 'string' ? new Date(value) : value;
};

export const getTimeZone = (includeTimeZone?: boolean | string, intl?: IntlShape): string | undefined => {
  if (!includeTimeZone) {
    return undefined;
  }
  if (includeTimeZone === true) {
    return intl?.timeZone || undefined;
  }
  return includeTimeZone;
};
