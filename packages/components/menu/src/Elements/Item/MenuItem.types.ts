import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';
import { VisibilityTrigger } from 'Menu.types';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

export enum ItemType {
  DEFAULT = 'default',
  SELECT = 'select',
  DANGER = 'danger',
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
  copyHint?: string;
  copyValue?: string;
  copyTooltip?: string | React.ReactNode;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger;
  prefixVisibilityTrigger?: VisibilityTrigger;
  onItemHover?: (e: MouseEvent) => void;
  children?: React.ReactNode;
  type?: 'default' | 'select' | 'danger' | string;
  indentLevel?: number;
  menuItemKey?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
}
