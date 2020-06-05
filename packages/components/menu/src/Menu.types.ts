import { MenuProps } from 'antd/lib/menu';
import { MenuItemProps } from './Elements/Item/MenuItem.types';

export interface AntdMenuProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  dataSource?: MenuItemProps[];
  ordered?: boolean;
}
export enum VisibilityTrigger {
  DEFAULT = 'default',
  HOVER = 'hover',
}
