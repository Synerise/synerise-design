import type { ReactNode } from 'react';

import type { RangeFilterValue } from '../../RangeFilter.types';

export type FilterDropdownProps = {
  filters: SavedFilter[];
  onFilterSelect: (filter: SavedFilter) => void;
  onFilterRemove: (filterId: string) => void;
  label: ReactNode;
  removeTooltip: ReactNode;
};
/** A named filter payload, as `onApply` emits it. */
export type SavedFilter = RangeFilterValue & { id: string; name: string };
