import * as React from 'react';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { AntdDrawer, DrawerBody, DrawerContent, DrawerHeader, DrawerHeaderWithoutPadding } from './Drawer.styles';
import './style/index.less';

export interface DrawerProps extends Omit<AntdDrawerProps, 'closable'> {
  title?: string;
  closable?: string;
}

class Drawer extends React.PureComponent<DrawerProps> {
  static DrawerBody = DrawerBody;
  static DrawerHeader = DrawerHeader;
  static DrawerHeaderWithoutPadding = DrawerHeaderWithoutPadding;
  static DrawerContent = DrawerContent;

  render(): React.ReactNode {
    const { title, closable, children, ...drawerProps } = this.props;
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <AntdDrawer {...drawerProps} closable={false} data-testid="ds-drawer">
        {children}
      </AntdDrawer>
    );
  }
}

export default Drawer;
