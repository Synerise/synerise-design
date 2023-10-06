import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { PropsWithChildren } from 'react';

export interface DrawerProps extends PropsWithChildren<Omit<AntdDrawerProps, 'closable'>> {
  title?: string;
  closable?: string;
}
