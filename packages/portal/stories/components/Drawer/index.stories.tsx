import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import { DrawerContent, DrawerHeader, DrawerBody } from '@synerise/ds-drawer/dist/Drawer.styles';
import Tabs from '@synerise/ds-tabs';
import { action } from '@storybook/addon-actions';
import Typography from 'antd/lib/typography';

const TABS = [
  {
    label: 'Design',
  },
  {
    label: 'Data',
  },
  {
    label: 'Validation',
  },
  {
    label: 'Layout',
  }
]

const stories = {
  default: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);

    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type='primary'>Show drawer</Button>
        <Drawer
          visible={drawerVisible}
          placement='right'
          width={400}
          onClose={() => setDrawerVisible(false)}
        >
          <>
            <DrawerHeader>
              {/* TODO: use PageHeader Component*/}
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24}}>
                <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Example drawer</Typography.Title>
                <Button type={'ghost'} onClick={() => setDrawerVisible(false)}>Cancel</Button>
                <Button style={{marginLeft: '20px'}} type={'primary'} onClick={() => setDrawerVisible(false)}>Save</Button>
              </div>
              <Tabs activeTab={activeTab} tabs={TABS} handleTabClick={setActiveTab} configuration={{label: 'Configure', action: action('onConfigurationClick')}} />
            </DrawerHeader>
            <DrawerBody>
              <DrawerContent>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
                <p>Content</p>
              </DrawerContent>
            </DrawerBody>
          </>
        </Drawer>
      </div>
    )
  },
};

export default {
  name: 'Components|Drawer',
  config: {},
  stories,
  Component: Drawer,
}
