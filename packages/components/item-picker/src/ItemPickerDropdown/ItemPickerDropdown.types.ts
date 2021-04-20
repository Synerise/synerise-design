import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { SearchBarProps } from '@synerise/ds-search-bar/dist/SearchBar.types';

export interface Props {
  onChange: (item: MenuItemProps) => void;
  placeholder: string;
  dataSource: MenuItemProps[];
  closeDropdown: () => void;
  noResults: string;
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
  dropdownBottomAction?: React.ReactNode;
  closeOnBottomAction?: boolean;
  isDropdownOpened: boolean;
  searchBarProps?: Partial<SearchBarProps>;
}
