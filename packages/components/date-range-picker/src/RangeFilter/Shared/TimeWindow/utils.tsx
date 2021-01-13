// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
import { flatten, groupBy, reverse, values } from 'lodash';
import { DateLimitMode } from './RangeFormContainer/RangeForm/RangeForm.types';
import { FilterDefinition } from '../../RangeFilter.types';

const TODAY = new Date();
const START_OF_DAY = '00:00:00.000';
const END_OF_DAY = '23:59:59.999';

export const getDateFromDayValue = (dayValue: string): Date => {
  const DAY_FORMAT = `YYYY-MM-DD`;
  const todayToString = dayjs(TODAY).format(DAY_FORMAT);
  const input = `${todayToString}-${dayValue}`;
  return dayjs(input, `${DAY_FORMAT}-HH:mm:ss.SSS`).toDate();
};
export const reverseRange = (inputRange: number[], groupItem: number): number[] => {
  const grouping = (item: number): number => Math.floor(item / groupItem);
  return flatten(reverse(values(groupBy(inputRange, grouping))));
};

export const getDefaultFilterForLimitMode = (mode: DateLimitMode): Partial<FilterDefinition> => {
  switch (mode) {
    case 'Hour':
      return {
        start: START_OF_DAY,
        stop: START_OF_DAY,
      };
    case 'Range':
      return {
        start: START_OF_DAY,
        stop: END_OF_DAY,
      };
    default:
      return {};
  }
};
