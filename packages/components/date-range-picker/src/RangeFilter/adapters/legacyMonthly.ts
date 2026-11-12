import cloneDeep from 'lodash.clonedeep';

import { TYPES, TYPES_DATA } from '../constants';
import MonthlyFilter from '../Filters/MonthlyFilter/MonthlyFilter';
import type { MonthlyFilterValue } from '../RangeFilter.types';
import { denormalizeMonthly, normalizeValue, validators } from '../utils';
import type { FilterAdapter, FilterEditor } from './types';

export const legacyMonthly: FilterAdapter<'MONTHLY'> = {
  // The legacy editors' declared props do not match what they are given.
  component: MonthlyFilter as unknown as FilterEditor<
    MonthlyFilterValue['definition']
  >,
  toEditor: denormalizeMonthly,
  fromEditor: normalizeValue,
  defaultValue: () => ({
    type: TYPES.MONTHLY,
    definition: cloneDeep(TYPES_DATA.MONTHLY.definition),
  }),
  isValid: validators[TYPES.MONTHLY],
  editorProps: (context) => context,
};
