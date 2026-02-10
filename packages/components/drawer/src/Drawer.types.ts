import { type DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { type PropsWithChildren } from 'react';

export interface DrawerProps extends PropsWithChildren<
  Omit<AntdDrawerProps, 'closable'>
> {
  title?: string;
  closable?: string;
}
