import { IntlShape } from 'react-intl';
import { utcToZonedTime, getTimezoneOffset } from 'date-fns-tz';

export const rmvTZOffset = (dateString: string | Date) => {
  const date = dateString.toString();
  const finalDate = date.replace(/[+-]\d\d:\d\d$/, '');

  return finalDate;
};

const pad = (num: number) => (num < 10 ? '0' : '') + num;

export function toIsoString(date: Date, timeZone: string | undefined = 'UTC') {
  if (!timeZone) return new Date(date).toISOString();

  const timeZoneOffset = getTimezoneOffset(timeZone, date);
  const dif = timeZoneOffset >= 0 ? '+' : '-';

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}${dif}${pad(Math.floor(Math.abs(timeZoneOffset) / 60 / 60 / 1000))}:${pad(
    Math.abs(timeZoneOffset) % 60
  )}`;
}

export function toIsoStringWithoutZone(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;
}

export const applyTimezoneOffset = (
  date: Date | undefined,
  timezoneOffset: boolean | string | undefined,
  intl?: IntlShape
) => {
  if (!timezoneOffset) {
    return date;
  }

  const timezoneString = typeof timezoneOffset === 'string' ? timezoneOffset : intl?.timeZone;
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

export const getParsedValueFromProps = (value?: Date | string, includeTimezoneOffset?: string | boolean): Date => {
  if (!value) {
    return new Date();
  }
  if (includeTimezoneOffset !== undefined) {
    if (typeof value !== 'string') return value;

    return new Date(rmvTZOffset(value));
  }
  // FIXME ????
  return typeof value === 'string' ? new Date() : value;
};
