import type { RangeFilterType } from '../constants';
import { legacyDaily } from './legacyDaily';
import { legacyMonthly } from './legacyMonthly';
import { legacyWeekly } from './legacyWeekly';
import type { FilterAdapter, FilterAdapters } from './types';

export const FILTER_ADAPTERS: FilterAdapters = {
  DAILY: legacyDaily,
  WEEKLY: legacyWeekly,
  MONTHLY: legacyMonthly,
};

export const filterAdapter = <Type extends RangeFilterType>(
  type: Type,
): FilterAdapter<Type> => FILTER_ADAPTERS[type];

export type * from './types';
