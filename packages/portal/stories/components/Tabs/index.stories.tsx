import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import Tabs from '@synerise/ds-tabs';
const { TabPane } = Tabs;


storiesOf('Components|Tabs', module)
.add('default', () => {
  return (
    <DSProvider code="en_GB">
      <Tabs defaultActiveKey="2">
        <TabPane tab="Tab 1" key="1">
          TestTab1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          TestTab2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          TestTab3
        </TabPane>
      </Tabs>
    </DSProvider>
  );
  });