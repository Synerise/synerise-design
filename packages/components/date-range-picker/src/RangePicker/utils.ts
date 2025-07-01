import fnsIsValid from 'date-fns/isValid';
import fnsIsWithinRange from 'date-fns/isWithinInterval';
import fnsMax from 'date-fns/max';
import fnsMin from 'date-fns/min';
import dayjs from 'dayjs';
import { type Modifiers } from 'react-day-picker';

import { legacyParse } from '@date-fns/upgrade/v2';
import {
  AM,
  type ClockModes,
  DISABLE_CLOCK_MODE_HOUR,
  HOUR,
  HOUR_12,
  MAP_24_HOUR_TO_12,
  PM,
} from '@synerise/ds-time-picker';

import { TIME_OPTIONS } from '../constants';
import { type DateRange, type NullableDateLimit } from '../date.types';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';
import GET from '../dateUtils/get';
import SET from '../dateUtils/set';
import {
  fnsEndOfDay,
  fnsIsBefore,
  fnsIsSameMonth,
  fnsStartOfDay,
  fnsStartOfMonth,
} from '../fns';
import { type State } from './RangePicker.types';

const NOW = new Date();
const HOURS_GRANULARITY = 'HOURS';

const getAmOrPmFromDate = (date: Date): ClockModes => {
  return dayjs(date).get(HOUR) >= HOUR_12 ? PM : AM;
};

const getInterval = (
  initialDate: Date,
  startDate?: Date,
  endDate?: Date,
): Interval => {
  if (!startDate && !endDate) {
    return {
      start: fnsStartOfDay(initialDate),
      end: fnsEndOfDay(initialDate),
    };
  }
  if (!startDate && endDate) {
    return {
      start: fnsIsBefore(initialDate, endDate)
        ? fnsStartOfDay(initialDate)
        : fnsStartOfDay(endDate),
      end: endDate,
    };
  }
  if (!endDate && startDate) {
    return {
      start: startDate,
      end: fnsIsBefore(initialDate, startDate)
        ? fnsEndOfDay(startDate)
        : fnsEndOfDay(initialDate),
    };
  }
  return {
    start: startDate as Date,
    end: endDate as Date,
  };
};

export const getDisabledTimeOptions = (
  initialDay: string | Date | undefined,
  granularity: string,
  initialLowerLimit: NullableDateLimit = null,
  initialUpperLimit: NullableDateLimit = null,
  is12HoursClock?: boolean,
): number[] => {
  const day = initialDay;
  const lowerLimit = initialLowerLimit;
  const upperLimit = initialUpperLimit;

  if (!day) {
    return [];
  }
  const dayBuilder = dayjs(day);
  const dayAsDate = typeof day === 'string' ? legacyParse(day) : day;

  const dayClockMode = getAmOrPmFromDate(dayAsDate);

  let disableMeridienToggle = false;
  if (is12HoursClock && granularity === HOURS_GRANULARITY) {
    let diff;
    if (lowerLimit) {
      diff = dayBuilder.diff(dayjs(lowerLimit), 'minute') / 60;
      if (diff < 12 && dayClockMode === PM) {
        disableMeridienToggle = true;
      }
    }
    if (upperLimit) {
      diff = dayjs(upperLimit).diff(dayBuilder, 'minute') / 60;
      if (diff < 12 && dayClockMode === AM) {
        disableMeridienToggle = true;
      }
    }
  }

  const intervalStartDate = lowerLimit ? legacyParse(lowerLimit) : undefined;
  const intervalEndDate = upperLimit ? legacyParse(upperLimit) : undefined;
  const interval = getInterval(dayAsDate, intervalStartDate, intervalEndDate);
  const options = TIME_OPTIONS[granularity].map((option: number) =>
    SET[granularity](dayAsDate, option),
  );

  let result = options
    .filter((opt: Date) => !fnsIsWithinRange(opt, interval))
    .map((option: number) => GET[granularity](option));

  if (is12HoursClock && granularity === HOURS_GRANULARITY) {
    if (dayClockMode === AM) {
      result = result.filter((item: number) => item < HOUR_12);
    } else if (dayClockMode === PM) {
      result = result.filter((item: number) => item >= HOUR_12);
    }
    result = result.map((item: number) => MAP_24_HOUR_TO_12[item]);

    if (disableMeridienToggle) {
      result.push(DISABLE_CLOCK_MODE_HOUR);
    }
  }
  return result;
};

export const getSidesState = (
  value: DateRange,
  forceAdjacentMonths?: boolean,
): State => {
  const from = fnsStartOfMonth(
    fnsIsValid(value.from) ? legacyParse(value.from) : new Date(),
  );
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
  enteredTo: NullableDateLimit | undefined,
): Modifiers => {
  const isSelecting = from && !to && enteredTo;
  const enteredStart = isSelecting
    ? fnsMin([legacyParse(from), legacyParse(enteredTo)])
    : enteredTo;
  const enteredEnd = isSelecting
    ? fnsMax([legacyParse(from), legacyParse(enteredTo)])
    : enteredTo;
  const entered = isSelecting
    ? (day: Date | string | number): boolean =>
        fnsIsWithinRange(legacyParse(day), {
          start: legacyParse(enteredStart),
          end: legacyParse(enteredEnd),
        })
    : enteredTo;
  const startModifier =
    isSelecting && !!enteredTo && !!from && enteredTo < from ? undefined : from;
  const endModifier =
    isSelecting && !!enteredTo && !!from && enteredTo < from ? from : to;
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
