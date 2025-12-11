import type { ReactNode } from 'react';

import type { ListItemProps } from '@synerise/ds-list-item';

import { type DropdownSharedProps } from '../../Dropdown.types';

export type DropdownMenuTexts = {
  searchPlaceholder: string;
  noSearchResults: ReactNode;
  searchClearTooltip: ReactNode;
};

export type DropdownMenuProps<ItemType extends ListItemProps> = Omit<
  DropdownSharedProps,
  'overlay' | 'dropdownRender' | 'defaultOpen' | 'align' | 'hideOnItemClick'
> & {
  dataSource: ItemType[];
  hideOnItemClick?: boolean;
  virtualised?: boolean;
  withSearch?: boolean;
  maxVisibleItems?: number;
  texts?: Partial<DropdownMenuTexts>;
  itemMatchesSearchQuery?: (item: ItemType, query: string) => boolean;
  onSearchQueryChange?: (query: string) => void;
};
