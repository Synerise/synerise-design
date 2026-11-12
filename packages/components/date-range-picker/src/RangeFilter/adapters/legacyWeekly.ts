import cloneDeep from 'lodash.clonedeep';

import { TYPES, TYPES_DATA } from '../constants';
import WeeklyFilter from '../Filters/WeeklyFilter/WeeklyFilter';
import type { WeeklyFilterValue } from '../RangeFilter.types';
import { denormalizeWeekly, normalizeValue, validators } from '../utils';
import type { FilterAdapter, FilterEditor } from './types';

export const legacyWeekly: FilterAdapter<'WEEKLY'> = {
  // The legacy editors' declared props do not match what they are given.
  component: WeeklyFilter as unknown as FilterEditor<
    WeeklyFilterValue['definition']
  >,
  toEditor: denormalizeWeekly,
  fromEditor: normalizeValue,
  defaultValue: () => ({
    type: TYPES.WEEKLY,
    definition: cloneDeep(TYPES_DATA.WEEKLY.definition),
  }),
  isValid: validators[TYPES.WEEKLY],
  editorProps: (context) => context,
};
