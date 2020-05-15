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
  text?: string | React.ReactNode;
  parent?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  index?: number;
  nestedMenu?: SubMenuProps[] | undefined | string[];
  ordered?: boolean | undefined;
  description?: string | React.ReactNode;
  subMenu?: SubMenuProps[] | string[];
  copyable?: boolean;
  copyHint?: string;
  copyValue?: string;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger;
  prefixVisibilityTrigger?: VisibilityTrigger;
  onItemHover?: (e: MouseEvent) => void;
  children?: React.ReactNode;
  type?: string;
  indentLevel?: number;
}
