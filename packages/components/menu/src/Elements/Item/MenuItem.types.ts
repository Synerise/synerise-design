import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';
import { VisibilityTrigger } from 'Menu.types';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

export enum ItemType {
  DEFAULT = 'default',
  SELECT = 'select',
  DANGER = 'danger',
  DIVIDER = 'divider',
}

export enum ItemSize {
  DEFAULT = 'default',
  LARGE = 'large',
}

export interface MenuItemProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  key?: React.ReactText;
  text?: string | React.ReactNode;
  parent?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  disabled?: boolean;
  ordered?: boolean | undefined;
  description?: string | React.ReactNode;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: string | React.ReactNode;
  copyValue?: string;
  copyTooltip?: string | React.ReactNode;
  timeToHideTooltip?: number;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger;
  prefixVisibilityTrigger?: VisibilityTrigger;
  onItemHover?: (e: MouseEvent) => void;
  children?: React.ReactNode;
  type?: ItemType | string;
  indentLevel?: number;
  menuItemKey?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
}
