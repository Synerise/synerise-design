import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export interface Props {
  dataSource: MenuItemProps[];
  dropdownVisibleRows?: number;
  dropdownRowHeight?: number;
  onSelect: (item: MenuItemProps) => void;
  closeDropdown: () => void;
}