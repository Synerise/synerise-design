import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

export interface MenuItemProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  parent?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  index?: number;
  text: string | React.ReactNode;
  nestedMenu?: SubMenuProps[] | undefined | string[];
  ordered?: boolean | undefined;
  description?: string | React.ReactNode;
  subMenu?: SubMenuProps[] | string[];
  copyable?: boolean;
  copyHint?: string;
  copyValue?: string;
}
