import {
  // Stopped being an ambient global in date-fns 3, so it is imported like any other symbol.
  type Interval,
  isValid as fnsIsValid,
  isWithinInterval as fnsIsWithinRange,
  max as fnsMax,
  min as fnsMin,
} from 'date-fns';
import dayjs from 'dayjs';
import { type Matcher } from 'react-day-picker';

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
import GET from '../dateUtils/get';
import SET from '../dateUtils/set';
import { toDateValue } from '../dateUtils/toDateValue';
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
  const dayAsDate = typeof day === 'string' ? toDateValue(day) : day;

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

  const intervalStartDate = lowerLimit ? toDateValue(lowerLimit) : undefined;
  const intervalEndDate = upperLimit ? toDateValue(upperLimit) : undefined;
  const interval = getInterval(dayAsDate, intervalStartDate, intervalEndDate);
  const options = TIME_OPTIONS[granularity as keyof typeof TIME_OPTIONS].map(
    (option: number) => SET[granularity as keyof typeof SET](dayAsDate, option),
  );

  let result = options
    .filter((opt: Date) => !fnsIsWithinRange(opt, interval))
    .map((option: Date) => GET[granularity as keyof typeof GET](option));

  if (is12HoursClock && granularity === HOURS_GRANULARITY) {
    if (dayClockMode === AM) {
      result = result.filter((item: number) => item < HOUR_12);
    } else if (dayClockMode === PM) {
      result = result.filter((item: number) => item >= HOUR_12);
    }
    result = result.map(
      (item: number) =>
        MAP_24_HOUR_TO_12[item as keyof typeof MAP_24_HOUR_TO_12],
    );

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
    fnsIsValid(value.from) ? toDateValue(value.from) : new Date(),
  );
  let to = fnsIsValid(value.to) ? fnsStartOfMonth(toDateValue(value.to)) : from;
  if (fnsIsSameMonth(from, to)) {
    to = ADD.MONTHS(to, 1);
  }
  return {
    left: {
      month: from,
      mode: 'date',
    },
    right: {
      month: forceAdjacentMonths ? ADD.MONTHS(from, 1) : to,
      mode: 'date',
    },
  };
};

/**
 * Range bounds are typed `Date | string | null`, and v7 accepted the string form because every
 * modifier was force-cast. v10's `Matcher` is precise, so the coercion happens here instead.
 */
const toDate = (value: NullableDateLimit | undefined): Date | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value instanceof Date ? value : toDateValue(value);
};

export const getModifiers = (
  from: NullableDateLimit | undefined,
  to: NullableDateLimit | undefined,
  enteredTo: NullableDateLimit | undefined,
): Record<string, Matcher | undefined> => {
  const isSelecting = from && !to && enteredTo;
  const enteredStart = isSelecting
    ? fnsMin([toDateValue(from), toDateValue(enteredTo)])
    : enteredTo;
  const enteredEnd = isSelecting
    ? fnsMax([toDateValue(from), toDateValue(enteredTo)])
    : enteredTo;
  const entered = isSelecting
    ? (day: Date | string | number): boolean =>
        fnsIsWithinRange(toDateValue(day), {
          start: toDateValue(enteredStart),
          end: toDateValue(enteredEnd),
        })
    : enteredTo;
  const startModifier =
    isSelecting && !!enteredTo && !!from && enteredTo < from ? undefined : from;
  const endModifier =
    isSelecting && !!enteredTo && !!from && enteredTo < from ? from : to;
  return {
    start: toDate(startModifier),
    end: toDate(endModifier),
    entered: typeof entered === 'function' ? entered : toDate(entered),
    today: NOW,
    'entered-start': toDate(enteredStart),
    'entered-end': toDate(enteredEnd),
    'initial-entered': !endModifier ? toDate(startModifier) : undefined,
    initial: !entered && !endModifier ? toDate(startModifier) : undefined,
  };
};
