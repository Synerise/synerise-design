import * as React from 'react';
import { FilterValue } from '../RangeFilter.types';

export type FilterDropdownProps = {
  filters: NamedFilter[];
  onFilterSelect: (filter: NamedFilter) => void;
  label: React.ReactNode | string;
};
export type NamedFilter = FilterValue & {name: string};
