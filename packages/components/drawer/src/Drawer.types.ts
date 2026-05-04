import { type DrawerProps as AntdDrawerProps } from 'antd';
import { type PropsWithChildren } from 'react';

export interface DrawerProps extends PropsWithChildren<
  Omit<AntdDrawerProps, 'closable'>
> {
  title?: string;
  closable?: string;
}
