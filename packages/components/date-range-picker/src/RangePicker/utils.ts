import fnsIsWithinRange from 'date-fns/isWithinInterval';
import { legacyParse } from '@date-fns/upgrade/v2';
import { Modifiers } from 'react-day-picker';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import fnsIsValid from 'date-fns/isValid';
import dayjs from 'dayjs';

import { AM, PM, HOUR_12, MAP_24_HOUR_TO_12, ClockModes, HOUR } from '@synerise/ds-time-picker';

import { State } from './RangePicker.types';
import { fnsEndOfDay, fnsIsSameMonth, fnsStartOfDay, fnsStartOfMonth } from '../fns';
import { TIME_OPTIONS } from '../constants';
import SET from '../dateUtils/set';
import GET from '../dateUtils/get';
import { DateRange, NullableDateLimit } from '../date.types';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';

const NOW = new Date();
const HOURS_GRANULARITY = 'HOURS';

const getAmOrPmFromDate = (date: Date): ClockModes => {
  return dayjs(date).get(HOUR) >= HOUR_12 ? PM : AM;
};

const change24To12Hour = (date: Date): Date => {
  let dateBuilder = dayjs(date);
  const hour = dateBuilder.get(HOUR);
  const hourToMap = MAP_24_HOUR_TO_12[hour];
  dateBuilder = dateBuilder.set(HOUR, hourToMap);
  return dateBuilder.toDate();
};

export const getDisabledTimeOptions = (
  initialDay: string | Date | undefined,
  granularity: string,
  initialLowerLimit: NullableDateLimit = null,
  initialUpperLimit: NullableDateLimit = null,
  is12HoursClock?: boolean
): number[] => {
  let day = initialDay;
  let lowerLimit = initialLowerLimit;
  let upperLimit = initialUpperLimit;

  if (!day) {
    return [];
  }

  const dayClockMode = getAmOrPmFromDate(legacyParse(day));
  const lowerLimitClockMode = getAmOrPmFromDate(legacyParse(lowerLimit));
  const upperLimitClockMode = getAmOrPmFromDate(legacyParse(upperLimit));

  if (is12HoursClock && lowerLimit) {
    if (lowerLimitClockMode === PM && dayjs(lowerLimit).get(HOUR) === HOUR_12) {
      return [];
    }
    if (lowerLimitClockMode === AM && dayClockMode === PM) {
      return [];
    }
    if (lowerLimitClockMode === PM && dayClockMode === PM) {
      day = change24To12Hour(legacyParse(day));
      lowerLimit = change24To12Hour(legacyParse(lowerLimit));
    }
  }

  if (is12HoursClock && upperLimit) {
    if (upperLimitClockMode === PM && dayClockMode === PM) {
      day = change24To12Hour(legacyParse(day));
      upperLimit = change24To12Hour(legacyParse(upperLimit));
    }
  }

  if (is12HoursClock && granularity !== HOURS_GRANULARITY) {
    const dayBuilder = dayjs(day);
    const hour = dayBuilder.get(HOUR);
    if (hour === HOUR_12) {
      return [];
    }
  }

  const lowLimit = lowerLimit || fnsStartOfDay(legacyParse(day));
  const upLimit = upperLimit || fnsEndOfDay(legacyParse(day));
  const options = TIME_OPTIONS[granularity].map((option: number) => SET[granularity](day, option));

  let result = options
    .filter(
      (opt: number) => !fnsIsWithinRange(legacyParse(opt), { start: legacyParse(lowLimit), end: legacyParse(upLimit) })
    )
    .map((option: number) => GET[granularity](option));

  if (is12HoursClock) {
    if (granularity === HOURS_GRANULARITY) {
      result = result.filter((item: number) => item !== HOUR_12);
    }
  }

  return result;
};

export const getSidesState = (value: DateRange, forceAdjacentMonths?: boolean): State => {
  const from = fnsStartOfMonth(fnsIsValid(value.from) ? legacyParse(value.from) : new Date());
  let to = fnsIsValid(value.to) ? fnsStartOfMonth(legacyParse(value.to)) : from;
  if (fnsIsSameMonth(from, to)) {
    to = ADD.MONTHS(to, 1);
  }
  return {
    left: {
      month: from,
      monthTitle: fnsIsValid(from) ? format(legacyParse(from), 'MMM yyyy') : '',
      mode: 'date',
    },
    right: {
      month: forceAdjacentMonths ? ADD.MONTHS(from, 1) : to,
      monthTitle: fnsIsValid(to) ? format(legacyParse(to), 'MMM yyyy') : '',
      mode: 'date',
    },
  };
};

export const getModifiers = (
  from: NullableDateLimit | undefined,
  to: NullableDateLimit | undefined,
  enteredTo: NullableDateLimit | undefined
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
