import cloneDeep from 'lodash.clonedeep';

import { TYPES, TYPES_DATA } from '../constants';
import DailyFilter from '../Filters/DailyFilter/DailyFilter';
import type { FilterDay } from '../RangeFilter.types';
import { denormalizeDaily, normalizeValue, validators } from '../utils';
import type { FilterAdapter, FilterEditor } from './types';

export const legacyDaily: FilterAdapter<'DAILY'> = {
  // The legacy editors' declared props do not match what they are given.
  component: DailyFilter as unknown as FilterEditor<FilterDay>,
  toEditor: denormalizeDaily,
  fromEditor: normalizeValue,
  defaultValue: () => ({
    type: TYPES.DAILY,
    definition: cloneDeep(TYPES_DATA.DAILY.definition),
  }),
  isValid: validators[TYPES.DAILY],
  editorProps: (context) => context,
};
