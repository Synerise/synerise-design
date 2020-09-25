import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';

export interface DrawerProps extends Omit<AntdDrawerProps, 'closable'> {
  title?: string;
  closable?: string;
}