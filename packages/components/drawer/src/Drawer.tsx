import * as React from 'react';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { AntdDrawer } from './Drawer.styles';
import './style/index.less';

export type DrawerProps = {
  children: React.ReactChild;
  title?: string;
  closable?: string;
};

const Drawer: React.FC<DrawerProps & AntdDrawerProps> = ({ children, title, closable, ...drawerProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdDrawer {...drawerProps} closable={false} data-testid="ds-drawer">
      {children}
    </AntdDrawer>
  );
};
export default Drawer;
