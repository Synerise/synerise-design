import { type MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export type SidebarWithButtonProps = {
  dataSource: MenuItemProps[];
  buttonLabel?: string;
  title?: string;
};
