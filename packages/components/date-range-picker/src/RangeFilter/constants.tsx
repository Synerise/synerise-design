import { range } from 'lodash';
import { v4 as uuid } from 'uuid';

import { fnsAddDays, fnsFormat } from '../fns';
import DailyFilter from './Filters/DailyFilter/DailyFilter';
import MonthlyFilter from './Filters/MonthlyFilter/MonthlyFilter';
import WeeklyFilter from './Filters/WeeklyFilter/WeeklyFilter';
import { type MonthlySelectValue } from './RangeFilter.types';

const LONG_MONTH = new Date(0, 0, 1);

export const TIME_FORMAT = 'HH:mm:ss.SSS';
export const DEFAULT_RANGE_START = '00:00:00.000';
export const DEFAULT_RANGE_END = '23:59:59.999';

export const MONTH_DAYS = (locale: string): string[] =>
  range(0, 31).map((i: number) =>
    locale === 'pl' ? `${i + 1}.` : fnsFormat(fnsAddDays(LONG_MONTH, i), 'Do'),
  );

export enum DAYS_OF_PERIOD_ENUM {
  DAY_OF_MONTH = 'MONTH',
  DAY_OF_WEEK = 'WEEK',
}
export enum COUNTED_FROM_ENUM {
  BEGINNING = 'BEGINNING',
  ENDING = 'ENDING',
}
export const TYPES = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export const DEFAULT_DAYS_OF_PERIODS: MonthlySelectValue<DAYS_OF_PERIOD_ENUM>[] =
  [
    {
      translationKey: 'DS.DATE-RANGE-PICKER.IN-MONTH',
      value: DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH,
    },
    {
      translationKey: 'DS.DATE-RANGE-PICKER.IN-WEEK',
      value: DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK,
    },
  ];

export const DEFAULT_COUNTED_FROM: MonthlySelectValue<COUNTED_FROM_ENUM>[] = [
  {
    translationKey: 'DS.DATE-RANGE-PICKER.BEGINNING',
    value: COUNTED_FROM_ENUM.BEGINNING,
  },
  {
    translationKey: 'DS.DATE-RANGE-PICKER.END',
    value: COUNTED_FROM_ENUM.ENDING,
  },
];

export const defaultId = uuid();

export const TYPES_DATA = {
  MONTHLY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.MONTHLY',
    defaultLabel: 'Monthly',
    component: MonthlyFilter,
    definition: [
      {
        period: DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH,
        periodType: DEFAULT_COUNTED_FROM[0].value,
        definition: {},
        id: defaultId,
      },
    ],
  },
  WEEKLY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.WEEKLY',
    defaultLabel: 'Weekly',
    component: WeeklyFilter,
    definition: {},
  },
  DAILY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.DAILY',
    defaultLabel: 'Daily',
    component: DailyFilter,
    definition: {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      inverted: false,
    },
  },
};

export const SPACE_UNICODE = '\u00A0';

export const MONTHLY_SCHEDULER_INTL_KEYS_NTH_WEEK = range(1, 6).map((i) => ({
  id: `DS.DATE-RANGE-PICKER.NTH.${i}`,
  defaultMessage: `Week ${i}`,
}));

export const MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_LONG = [
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.1', defaultMessage: 'Monday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.2', defaultMessage: 'Tuesday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.3', defaultMessage: 'Wednesday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.4', defaultMessage: 'Thursday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.5', defaultMessage: 'Friday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.6', defaultMessage: 'Saturday' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.7', defaultMessage: 'Sunday' },
];

export const MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_SHORT = [
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.1', defaultMessage: 'Mon' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.2', defaultMessage: 'Tue' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.3', defaultMessage: 'Wed' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.4', defaultMessage: 'Thu' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.5', defaultMessage: 'Fri' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.6', defaultMessage: 'Sat' },
  { id: 'DS.DATE-RANGE-PICKER.WEEKDAYS_SHORT.7', defaultMessage: 'Sun' },
];
