import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import Typography from 'antd/lib/typography';
import { DrawerBody, DrawerContent, DrawerHeader } from '../Drawer.styles';
import Drawer from '../Drawer';

const DRAWER = (visible: boolean) => (<Drawer
  visible={visible}
  placement='right'
  width={400}
>
  <>
    <DrawerHeader>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24}}>
        <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Example drawer</Typography.Title>
      </div>
    </DrawerHeader>
    <DrawerBody>
      <DrawerContent>
        <p>Content</p>
      </DrawerContent>
    </DrawerBody>
  </>
</Drawer>);

describe('Drawer component', () => {
  it('should render', () => {
    const {getByTestId} = renderWithProvider(DRAWER(true));
    expect(getByTestId('ds-drawer')).toBeTruthy();
  });

  it('should not render', () => {
    const {queryAllByTestId} = renderWithProvider(DRAWER(false));
    expect(queryAllByTestId('ds-drawer').length).toBe(0);
  });
});