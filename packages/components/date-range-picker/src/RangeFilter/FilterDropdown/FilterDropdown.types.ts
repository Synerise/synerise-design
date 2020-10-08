import * as React from 'react';
import { FilterValue } from '../RangeFilter.types';

export type FilterDropdownProps = {
  filters: SavedFilter[];
  onFilterSelect: (filter: SavedFilter) => void;
  onFilterRemove: (filterId: string) => void;
  label: React.ReactNode | string;
  removeTooltip: React.ReactNode | string;
};
export type SavedFilter = FilterValue & { id: string; name: string };
