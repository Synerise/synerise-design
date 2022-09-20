import { MenuProps } from 'antd/lib/menu';
import { MenuItemProps } from './Elements/Item/MenuItem.types';

export interface AntdMenuProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  dataSource?: MenuItemProps[];
  ordered?: boolean;
  asDropdownMenu?: boolean;
  showTextTooltip?: boolean;
  asInfoCardContainer?: boolean;
}

export type MenuDividerProps = {
  higher?: boolean;
  level?: number;
};

export enum VisibilityTrigger {
  DEFAULT = 'default',
  HOVER = 'hover',
}
