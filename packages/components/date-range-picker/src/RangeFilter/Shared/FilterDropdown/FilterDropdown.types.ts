import type { ReactNode } from 'react';

import type { FilterValue } from '../../RangeFilter.types';

export type FilterDropdownProps = {
  filters: SavedFilter[];
  onFilterSelect: (filter: SavedFilter) => void;
  onFilterRemove: (filterId: string) => void;
  label: ReactNode;
  removeTooltip: ReactNode;
};
export type SavedFilter = FilterValue & { id: string; name: string };
