import fnsIsWithinRange from 'date-fns/isWithinInterval';
import { legacyParse } from '@date-fns/upgrade/v2';
import { Modifiers } from 'react-day-picker';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import { Limit, State } from './RangePicker.types';
import { fnsEndOfDay, fnsIsSameMonth, fnsStartOfDay, fnsStartOfMonth } from '../fns';
import { TIME_OPTIONS } from '../constants';
import SET from '../dateUtils/set';
import GET from '../dateUtils/get';
import { DateRange } from '../date.types';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';

const NOW = new Date();

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

export const getModifiers = (
  from: Date | string | undefined,
  to: Date | string | undefined,
  enteredTo: Date | string | undefined | null
): Modifiers => {
  const isSelecting = from && !to && enteredTo;
  const enteredStart = isSelecting ? fnsMin([legacyParse(from), legacyParse(enteredTo)]) : enteredTo;
  const enteredEnd = isSelecting ? fnsMax([legacyParse(from), legacyParse(enteredTo)]) : enteredTo;
  const entered = isSelecting
    ? (day: Date | string | number): boolean =>
        fnsIsWithinRange(legacyParse(day), { start: legacyParse(enteredStart), end: legacyParse(enteredEnd) })
    : enteredTo;
  const startModifier = isSelecting && !!enteredTo && !!from && enteredTo < from ? undefined : from;
  const endModifier = isSelecting && !!enteredTo && !!from && enteredTo < from ? from : to;
  return {
    start: startModifier as Date,
    end: endModifier as Date,
    entered: entered as Date,
    outside: undefined,
    today: NOW,
    'entered-start': enteredStart as Date,
    'entered-end': enteredEnd as Date,
    'initial-entered': !endModifier ? (startModifier as Date) : undefined,
    initial: !entered && !endModifier ? (startModifier as Date) : undefined,
  };
};
