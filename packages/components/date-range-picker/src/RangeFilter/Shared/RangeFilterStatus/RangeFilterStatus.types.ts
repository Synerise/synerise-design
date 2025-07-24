import { type ReactNode } from 'react';

import { type Texts } from '../../../DateRangePicker.types';
import { type DateFilter } from '../../../date.types';

export type RangeFilterStatusProps = {
  filter: DateFilter | undefined;
  disabled: boolean;
  label: ReactNode;
  texts: Texts;
  onClick: () => void;
  onFilterRemove: () => void;
};
