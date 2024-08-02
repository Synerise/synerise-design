import { IntlShape } from 'react-intl';
import { getLocalDateInTimeZone } from '@synerise/ds-data-format';
import { utcToZonedTime, getTimezoneOffset } from 'date-fns-tz';

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

export const getTimeZone = (includeTimeZone?: boolean | string, intl?: IntlShape): string | undefined => {
  if (!includeTimeZone) {
    return undefined;
  }
  if (includeTimeZone === true) {
    return intl?.timeZone || undefined;
  }
  return includeTimeZone;
};
