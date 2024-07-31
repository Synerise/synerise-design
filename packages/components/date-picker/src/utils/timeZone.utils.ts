import { getTimezoneOffset } from 'date-fns-tz';

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
