import { range } from 'lodash';
import MonthlyFilter from './Filters/MonthlyFilter/MonthlyFilter';
import WeeklyFilter from './Filters/WeeklyFilter/WeeklyFilter';
import DailyFilter from './Filters/DailyFilter/DailyFilter';
import { fnsAddDays, fnsFormat } from '../fns';
import { MonthlySelectValue } from './RangeFilter.types';

const LONG_MONTH = new Date(0, 0, 1);

export const TIME_FORMAT = 'HH:mm:ss.SSS';
export const DEFAULT_RANGE_START = '00:00:00.000';
export const DEFAULT_RANGE_END = '23:59:59.999';

export const MONTH_DAYS = (locale: string): string[] =>
  range(0, 31).map((i: number) => (locale === 'pl' ? `${i + 1}.` : fnsFormat(fnsAddDays(LONG_MONTH, i), 'Do')));

export enum DAYS_OF_PERIOD_ENUM {
  DAY_OF_MONTH = 'month',
  DAY_OF_WEEK = 'week',
}
export enum COUNTED_FROM_ENUM {
  BEGINNING = 'beginning',
  ENDING = 'ending',
}
export const TYPES = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export const DEFAULT_DAYS_OF_PERIODS: MonthlySelectValue<DAYS_OF_PERIOD_ENUM>[] = [
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

export const defaultId = Math.random();

export const TYPES_DATA = {
  MONTHLY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.MONTHLY',
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
  WEEKLY: { labelTranslationKey: 'DS.DATE-RANGE-PICKER.WEEKLY', component: WeeklyFilter, definition: {} },
  DAILY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.DAILY',
    component: DailyFilter,
    definition: {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      inverted: false,
    },
  },
};

export const MAX_RULES_ALLOWED = 4;
export const SPACE_UNICODE = '\u00A0';
