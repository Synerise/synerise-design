import { range } from 'lodash';
import MonthlyFilter from './MonthlyFilter/MonthlyFilter';
import WeeklyFilter from './WeeklyFilter/WeeklyFilter';
import DailyFilter from './DailyFilter/DailyFilter';
import { fnsAddDays, fnsFormat } from '../fns';
import { Period } from './RangeFilter.types';

const LONG_MONTH = new Date(0, 0, 1);

export const MONTH_DAYS = (locale: string): string[] =>
  range(0, 31).map((i: number) => (locale === 'pl' ? `${i + 1}.` : fnsFormat(fnsAddDays(LONG_MONTH, i), 'Do')));

export const MONTHLY_TYPES = {
  DAY_OF_MONTH: 'MONTH',
  DAY_OF_WEEK: 'WEEK',
};

export const TYPES = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export const PERIODS: Period[] = [
  {
    translationKey: 'DS.DATE-RANGE-PICKER.MONTHIN',
    name: 'DS.DATE-RANGE-PICKER.MONTHIN',
    value: MONTHLY_TYPES.DAY_OF_MONTH,
  },
  {
    translationKey: 'DS.DATE-RANGE-PICKER.WEEKIN',
    name: 'DS.DATE-RANGE-PICKER.WEEKIN',
    value: MONTHLY_TYPES.DAY_OF_WEEK,
  },
];

export const PERIODS_TYPE: Period[] = [
  {
    translationKey: 'DS.DATE-RANGE-PICKER.BEGINNING',
    name: 'DS.DATE-RANGE-PICKER.BEGINNING',
    value: 'beginning',
  },
  {
    translationKey: 'DS.DATE-RANGE-PICKER.END',
    name: 'DS.DATE-RANGE-PICKER.END',
    value: 'ending',
  },
];

export const defaultId = Math.random();

export const TYPES_DATA = {
  MONTHLY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.MONTHLY',
    component: MonthlyFilter,
    definition: [
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id: defaultId },
    ],
  },
  WEEKLY: { labelTranslationKey: 'DS.DATE-RANGE-PICKER.WEEKLY', component: WeeklyFilter, definition: {} },
  DAILY: {
    labelTranslationKey: 'DS.DATE-RANGE-PICKER.DAILY',
    component: DailyFilter,
    definition: {
      start: '00:00:00.000',
      stop: '23:59:59.999',
      inverted: false,
    },
  },
};

export const MAX_RULES_ALLOWED = 4;
