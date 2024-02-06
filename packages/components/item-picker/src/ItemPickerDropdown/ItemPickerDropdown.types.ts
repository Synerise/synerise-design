import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { ScrollbarAdditionalProps } from '@synerise/ds-scrollbar';
import { SearchBarProps } from '@synerise/ds-search-bar/dist/SearchBar.types';

export interface Props {
  onChange: (item: MenuItemProps) => void;
  placeholder: string;
  clearSearchQuery?: number;
  dataSource: MenuItemProps[];
  closeDropdown: () => void;
  noResults: string;
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
  dropdownBottomAction?: React.ReactNode;
  closeOnBottomAction?: boolean;
  isDropdownOpened: boolean;
  searchBarProps?: Partial<SearchBarProps>;
  scrollbarProps?: ScrollbarAdditionalProps;
}
