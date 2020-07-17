import { fnsDifferenceInSeconds, fnsGetYear } from './fns';
import { differenceInCalendarDays, differenceInDays } from 'date-fns';
import { fnsAddSeconds } from '@synerise/ds-date-range-picker/dist/fns';
import getUnixTime from 'date-fns/getUnixTime'
import getTime from 'date-fns/getTime'
export const range = (start: number, end: number): number[] => {
  if (end <= start) {
    return [];
  }
  const size = end - start;
  return [...Array(size).keys()].map((i) => i + start);
};

export function getDecadeRange(cursor: Date): number[] {
  const startYear = Math.floor(fnsGetYear(cursor) / 10) * 10;
  const endYear = startYear + 9;
  return [startYear, endYear];
}

export function getCenturyRange(cursor: Date): number[] {
  const startYear = Math.floor(fnsGetYear(cursor) / 100) * 100;
  const endYear = startYear + 99;
  return [startYear, endYear];
}

export function changeDayWithHoursPreserved(oldDate: Date, chosenDate: Date): Date {
  const dayDifferenceInSeconds = differenceInCalendarDays(oldDate, chosenDate) * 24 * 60 * 60;
  const difference = fnsDifferenceInSeconds(oldDate, chosenDate) -  dayDifferenceInSeconds ;
  const dateToBeUpdated = fnsAddSeconds(chosenDate, difference);
  return dateToBeUpdated;
}
