import { type MenuProps } from 'antd/lib/menu';
import type { ReactNode } from 'react';

import { type MenuItemProps } from '../Item/MenuItem.types';

export type SubMenuProps = Omit<MenuProps, 'dataSource' | 'footer'> & {
  key?: string | number;
  danger?: boolean;
  disabled?: boolean;
  parent?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  text?: ReactNode;
  description?: ReactNode;
  ordered?: boolean | undefined;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: ReactNode;
  copyValue?: string;
  childrenCollapsed?: boolean;
  onTitleClick?: () => void;
  checked?: boolean;
  size?: 'default' | 'large';
};
export type SubMenuState = {
  uuidKey: string;
};
export type SubMenuItemProps = SubMenuProps &
  MenuItemProps & { onClick?: (item: SubMenuProps) => void };
