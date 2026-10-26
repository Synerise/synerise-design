import dayjs from 'dayjs';
import flatten from 'lodash.flatten';
import groupBy from 'lodash.groupby';
import reverse from 'lodash.reverse';
import values from 'lodash.values';

import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  DEFAULT_TIME_FORMAT,
} from '../../Filters/new/constants';
import type { FilterDefinition } from '../../RangeFilter.types';
import type { DateLimitMode } from './RangeFormContainer/RangeForm/RangeForm.types';

// Only a carrier for the date part of a time-of-day string — a recurring schedule has no
// calendar day, and only the time is ever read back. Deliberately fixed rather than read per
// call, so every window in one filter is built on the same day even across midnight.
const TODAY = new Date();

export const getDateFromDayValue = (
  dayValue?: string,
  hourTimeFormat?: string,
): Date => {
  const DAY_FORMAT = `YYYY-MM-DD`;
  const todayToString = dayjs(TODAY).format(DAY_FORMAT);
  const input = `${todayToString}-${dayValue}`;
  const hourFormat = hourTimeFormat || DEFAULT_TIME_FORMAT;
  return dayjs(input, `${DAY_FORMAT}-${hourFormat}`).toDate();
};
export const reverseRange = (
  inputRange: number[],
  groupItem: number,
): number[] => {
  const grouping = (item: number): number => Math.floor(item / groupItem);
  return flatten(reverse(values(groupBy(inputRange, grouping))));
};

export const getDefaultFilterForLimitMode = (
  mode: DateLimitMode,
): Partial<FilterDefinition> => {
  switch (mode) {
    case 'Hour':
      return {
        start: DEFAULT_RANGE_START,
        stop: DEFAULT_RANGE_START,
      };
    case 'Range':
      return {
        start: DEFAULT_RANGE_START,
        stop: DEFAULT_RANGE_END,
      };
    default:
      return {};
  }
};
