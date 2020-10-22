import { MenuProps } from 'antd/lib/menu';
import * as React from 'react';

export interface SubMenuProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  key?: React.ReactText;
  danger?: boolean;
  disabled?: boolean;
  parent?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  text?: string | React.ReactNode;
  description?: string | React.ReactNode;
  ordered?: boolean | undefined;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: string | React.ReactNode;
  copyValue?: string;
  childrenCollapsed?: boolean;
  onTitleClick?: () => void;
  checked?: boolean;
  size?: 'default' | 'large';
}
export interface SubMenuState {
  uuidKey: string;
}
export type SubMenuItemProps = SubMenuProps & { onClick?: (item: SubMenuProps) => void };
