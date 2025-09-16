import { type MenuItemProps } from '@synerise/ds-menu';

export type SidebarWithButtonProps = {
  dataSource: MenuItemProps[];
  buttonLabel?: string;
  title?: string;
};
