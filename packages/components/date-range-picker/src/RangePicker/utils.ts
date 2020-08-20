import fnsIsWithinRange from 'date-fns/isWithinInterval';
import { Limit, State } from './RangePicker.types';
import { fnsEndOfDay, fnsIsSameMonth, fnsStartOfDay, fnsStartOfMonth } from '../fns';
import { TIME_OPTIONS } from '../constants';
import SET from '../dateUtils/set';
import GET from '../dateUtils/get';
import { DateRange } from '../date.types';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';

export const getDisabledTimeOptions = (
  day: string | Date | undefined,
  granularity: string,
  lowerLimit: Limit = null,
  upperLimit: Limit = null
): [] => {
  const lowLimit = lowerLimit || fnsStartOfDay(day);
  const upLimit = upperLimit || fnsEndOfDay(day);
  const options = TIME_OPTIONS[granularity].map((option: number) => SET[granularity](day, option));
  return options
    .filter((a: number) => !fnsIsWithinRange(a, { start: lowLimit, end: upLimit }))
    .map((option: number) => GET[granularity](option));
};

export const getSidesState = (value: DateRange, forceAdjacentMonths?: boolean): State => {
  const from = fnsStartOfMonth(value.from || new Date());
  let to = fnsStartOfMonth(value.to || new Date());
  if (fnsIsSameMonth(from, to)) {
    to = ADD.MONTHS(to, 1);
  }
  return {
    left: {
      month: from,
      monthTitle: format(from, 'MMM yyyy'),
      mode: 'date',
    },
    right: {
      month: forceAdjacentMonths ? ADD.MONTHS(from, 1) : to,
      monthTitle: format(to, 'MMM yyyy'),
      mode: 'date',
    },
  };
};
