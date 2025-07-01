import { type ReactNode } from 'react';

import { type ListItemProps } from '@synerise/ds-list-item';
import { type ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';
import { type SearchBarProps } from '@synerise/ds-search-bar/dist/SearchBar.types';

export type ItemPickerDropdownProps = {
  onChange: (item: ListItemProps) => void;
  placeholder: string;
  clearSearchQuery?: number;
  dataSource: ListItemProps[];
  closeDropdown: () => void;
  noResults: string;
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
  dropdownBottomAction?: ReactNode;
  closeOnBottomAction?: boolean;
  isDropdownOpened: boolean;
  searchBarProps?: Partial<SearchBarProps>;
  scrollbarProps?: ScrollbarAdditionalProps;
  hideSearchBar?: boolean;
};

// @deprecated
export type Props = ItemPickerDropdownProps;
