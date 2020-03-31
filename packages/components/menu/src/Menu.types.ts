import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';
import { MenuItemProps } from './Elements/Item/MenuItem.types';

export interface AntdMenuProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  dataSource: MenuItemProps[][];
  radio?: boolean;
  dashed?: boolean;
  prefixel?: React.ReactNode;
  subMenu?: string[];
  ordered?: boolean | undefined;
}
