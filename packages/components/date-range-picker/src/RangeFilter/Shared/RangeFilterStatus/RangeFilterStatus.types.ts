import { ReactNode } from 'react';
import { DateFilter } from '../../../date.types';
import { Texts } from '../../../DateRangePicker.types';

export type RangeFilterStatusProps = {
  filter: DateFilter | undefined;
  disabled: boolean;
  label: ReactNode;
  texts: Pick<Texts, 'filter' | 'change' | 'remove'>;
  onClick: () => void;
  onFilterRemove: () => void;
};
