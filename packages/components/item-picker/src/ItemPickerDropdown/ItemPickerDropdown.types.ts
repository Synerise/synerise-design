import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export interface Props {
  onChange: (item: MenuItemProps) => void;
  placeholder: string;
  dataSource: MenuItemProps[];
  closeDropdown: () => void;
  noResults: string;
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
}