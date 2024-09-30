import { ReactNode } from 'react';
import { MenuProps } from 'antd/lib/menu';
import { MenuItemProps } from './Elements/Item/MenuItem.types';

export type MenuTexts = {
  showLess: ReactNode;
  showMore: ReactNode;
};

export type AntdMenuProps = Omit<MenuProps, 'dataSource' | 'footer'> & {
  dataSource?: MenuItemProps[];
  ordered?: boolean;
  asDropdownMenu?: boolean;
  showTextTooltip?: boolean;
  asInfoCardContainer?: boolean;
  maxToShowItems?: number;
  texts?: Partial<MenuTexts>;
};

export type MenuDividerProps = {
  higher?: boolean;
  level?: number;
};

export enum VisibilityTrigger {
  DEFAULT = 'default',
  HOVER = 'hover',
}
