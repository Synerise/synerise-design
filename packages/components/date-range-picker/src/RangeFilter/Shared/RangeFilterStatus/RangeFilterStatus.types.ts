import type { ReactNode } from 'react';

import type { Texts } from '../../../DateRangePicker.types';
import type { RangeFilterValue } from '../../RangeFilter.types';

export type RangeFilterStatusProps = {
  filter: RangeFilterValue | undefined;
  disabled: boolean;
  label: ReactNode;
  texts: Texts;
  onClick: () => void;
  onFilterRemove: () => void;
};
