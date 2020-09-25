import dayjs from 'dayjs';
import { flatten, groupBy, reverse, values } from 'lodash';

const TODAY = new Date();
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
