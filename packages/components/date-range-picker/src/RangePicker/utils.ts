import fnsIsWithinRange from 'date-fns/isWithinInterval';
import { legacyParse } from '@date-fns/upgrade/v2';
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
): number[] => {
  if (!day) {
    return [];
  }
  const lowLimit = lowerLimit || fnsStartOfDay(legacyParse(day));
  const upLimit = upperLimit || fnsEndOfDay(legacyParse(day));
  const options = TIME_OPTIONS[granularity].map((option: number) => SET[granularity](day, option));
  return options
    .filter(
      (opt: number) => !fnsIsWithinRange(legacyParse(opt), { start: legacyParse(lowLimit), end: legacyParse(upLimit) })
    )
    .map((option: number) => GET[granularity](option));
};

export const getSidesState = (value: DateRange, forceAdjacentMonths?: boolean): State => {
  const from = fnsStartOfMonth(value.from ? legacyParse(value.from) : new Date());
  let to = fnsStartOfMonth(value.to ? legacyParse(value.to) : new Date());
  if (fnsIsSameMonth(from, to)) {
    to = ADD.MONTHS(to, 1);
  }
  return {
    left: {
      month: from,
      monthTitle: format(legacyParse(from), 'MMM yyyy'),
      mode: 'date',
    },
    right: {
      month: forceAdjacentMonths ? ADD.MONTHS(from, 1) : to,
      monthTitle: format(legacyParse(to), 'MMM yyyy'),
      mode: 'date',
    },
  };
};
