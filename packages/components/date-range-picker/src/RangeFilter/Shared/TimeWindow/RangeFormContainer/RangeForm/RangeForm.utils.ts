import dayjs from 'dayjs';

import endOf from '../../../../../dateUtils/endOf';
import startOf from '../../../../../dateUtils/startOf';

export const numberToDate = (
  number: number,
  max: number,
  isRangeStart?: boolean,
): Date => {
  if (number === max) {
    return dayjs().endOf('day').toDate();
  }
  const hours = Math.floor(number);
  const minutes = 60 * (number % 1);
  const result = dayjs().hour(hours).minute(minutes).toDate();

  return isRangeStart ? startOf.MINUTES(result) : endOf.MINUTES(result);
};
export const dateToNumber = (date: Date): number => {
  const integer = date.getHours();
  const decimal = Math.round((date.getMinutes() / 60) * 4) / 4;
  const result = integer + decimal;
  return result;
};
