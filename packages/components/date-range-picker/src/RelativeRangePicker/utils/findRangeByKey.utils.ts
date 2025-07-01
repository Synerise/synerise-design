import { type DateRange } from '../../date.types';

export const findRangeByKey = (ranges: DateRange[], key: string) => {
  return ranges.find((range) => range.key === key);
};
