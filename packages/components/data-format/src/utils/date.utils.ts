import dayjs from 'dayjs';

import {
  MONTHS_LONG,
  MONTHS_SHORT,
  MONTH_LONG,
  MONTH_SHORT,
  UPPER_FIRST,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  WEEKDAY_LONG,
  WEEKDAY_SHORT,
} from '../constants';
import {
  type DateConstantsTargetFormat,
  type DateTargetFormat,
  type DateToFormatOptions,
} from '../types';

export const getDatesRange = (
  start: Date,
  end: Date,
  interval: dayjs.UnitType,
): Date[] => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diffInUnits = endDate.diff(startDate, interval);
  return Array.from(Array(diffInUnits + 1).keys()).map((i) => {
    return startDate.add(i, interval as dayjs.ManipulateType).toDate();
  });
};

export const getConstantDatesAndFormattingOptions = (
  targetFormat: DateConstantsTargetFormat,
  isSundayFirstWeekDay: boolean,
  customStartDate?: Date,
  customEndDate?: Date,
  customInterval?: dayjs.UnitType,
): { constantDates: Date[]; defaultOptions: DateToFormatOptions } => {
  const startDate = new Date(2023, 0, isSundayFirstWeekDay ? 1 : 2);
  const endDate = new Date(2023, 0, isSundayFirstWeekDay ? 1 : 2);

  let defaultTargetFormat: DateTargetFormat = MONTH_LONG;
  let interval: dayjs.UnitType = 'month';

  switch (targetFormat) {
    case MONTHS_LONG:
      endDate.setMonth(11);
      interval = 'month';
      defaultTargetFormat = MONTH_LONG;
      break;
    case MONTHS_SHORT:
      endDate.setMonth(11);
      interval = 'month';
      defaultTargetFormat = MONTH_SHORT;
      break;
    case WEEKDAYS_LONG:
      endDate.setDate(isSundayFirstWeekDay ? 7 : 8);
      interval = 'day';
      defaultTargetFormat = WEEKDAY_LONG;
      break;
    case WEEKDAYS_SHORT:
      endDate.setDate(isSundayFirstWeekDay ? 7 : 8);
      interval = 'day';
      defaultTargetFormat = WEEKDAY_SHORT;
      break;
    default:
      break;
  }

  return {
    constantDates: getDatesRange(
      customStartDate ?? startDate,
      customEndDate ?? endDate,
      customInterval ?? interval,
    ),
    defaultOptions: {
      namingConvention: UPPER_FIRST,
      targetFormat: defaultTargetFormat,
    },
  };
};
