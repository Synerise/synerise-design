import React from 'react';

import {
  AntdDrawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerHeaderBack,
  DrawerHeaderBar,
  DrawerHeaderWithoutPadding,
} from './Drawer.styles';
import { type DrawerProps } from './Drawer.types';
import './style/index.less';

class Drawer extends React.PureComponent<DrawerProps> {
  static DrawerBody = DrawerBody;
  static DrawerHeader = DrawerHeader;
  static DrawerHeaderBar = DrawerHeaderBar;
  static DrawerHeaderWithoutPadding = DrawerHeaderWithoutPadding;
  static DrawerContent = DrawerContent;
  static DrawerHeaderBack = DrawerHeaderBack;
  render(): React.ReactNode {
    const { title, closable, children, ...drawerProps } = this.props;
    return (
      <AntdDrawer {...drawerProps} closable={false}>
        {children}
      </AntdDrawer>
    );
  }
}

export default Drawer;
