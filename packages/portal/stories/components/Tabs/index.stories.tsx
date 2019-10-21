import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';

const tabs = [
  {
    label: 'Tab #1',
  },
  {
    label: 'Tab #2',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />
  }
];

storiesOf('Components|Tabs', module)
.add('default', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <Tabs tabs={tabs} activeTab={store.state.activeTab} setActiveTab={(index: number) => store.set({activeTab: index})} />
    </DSProvider>
  );
}));