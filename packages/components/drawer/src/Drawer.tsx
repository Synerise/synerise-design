import * as React from 'react';
import { DrawerProps as AntdDrawerProps } from 'antd/lib/drawer';
import { AntdDrawer, DrawerBody, DrawerContent, DrawerHeader } from './Drawer.styles';
import './style/index.less';

export type DrawerProps = {
  title?: string;
  closable?: string;
  header: React.ReactNode;
  content: React.ReactNode;
};

const Drawer: React.FC<DrawerProps & AntdDrawerProps> = ({ title, closable, content, header, ...drawerProps }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <AntdDrawer {...drawerProps} closable={false} data-testid="ds-drawer">
      <DrawerHeader>{header}</DrawerHeader>
      <DrawerBody>
        <DrawerContent>{content}</DrawerContent>
      </DrawerBody>
    </AntdDrawer>
  );
};
export default Drawer;
