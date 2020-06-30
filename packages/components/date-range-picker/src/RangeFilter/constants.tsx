import * as React from 'react';
import { range } from 'lodash';

import { FormattedMessage } from 'react-intl';

import fnsFormat from '../dateUtils/format';
import MonthlyFilter from './MonthlyFilter/MonthlyFilter';
import WeeklyFilter from './WeeklyFilter/WeeklyFilter';
import DailyFilter from './DailyFilter/DailyFilter';
import { fnsAddDays } from "../fns";

const LONG_MONTH = new Date(0, 0, 1);

export const MONTH_DAYS = (locale: string) =>
  range(0, 31).map((i: number) => (locale === 'pl' ? `${++i}.` : fnsFormat(fnsAddDays(LONG_MONTH, i), 'Do')));

export const MONTHLY_TYPES = {
  DAY_OF_MONTH: 'MONTH',
  DAY_OF_WEEK: 'WEEK',
};

export const TYPES = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
};

export const PERIODS = [
  {
    name: <FormattedMessage id="SNRS.DATE.MONTHIN" />,
    value: MONTHLY_TYPES.DAY_OF_MONTH,
  },
  {
    name: <FormattedMessage id="SNRS.DATE.WEEKIN" />,
    value: MONTHLY_TYPES.DAY_OF_WEEK,
  },
];

export const PERIODS_TYPE = [
  {
    name: <FormattedMessage id="SNRS.MONTHLY-PICKER.BEGINNING" />,
    value: 'beginning',
  },
  {
    name: <FormattedMessage id="SNRS.MONTHLY-PICKER.END" />,
    value: 'ending',
  },
];

export const defaultId = Math.random();

export const TYPES_DATA = {
  MONTHLY: {
    labelTranslationKey: 'SNRS.DATE.MONTHLY',
    component: MonthlyFilter,
    definition: [
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id: defaultId },
    ],
  },
  WEEKLY: { labelTranslationKey: 'SNRS.DATE.WEEKLY', component: WeeklyFilter, definition: {} },
  DAILY: {
    labelTranslationKey: 'SNRS.DATE.DAILY',
    component: DailyFilter,
    definition: {
      start: '00:00:00.000',
      stop: '23:59:59.999',
      inverted: false,
    },
  },
};

export const MAX_RULES_ALLOWED = 4;
