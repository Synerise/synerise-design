import * as React from 'react';
import { FilterValue } from '../RangeFilter.types';

export type FilterDropdownProps = {
  filters: SavedFilter[];
  onFilterSelect: (filter: SavedFilter) => void;
  label: React.ReactNode | string;
};
export type SavedFilter = FilterValue & { id: string; name: string };
