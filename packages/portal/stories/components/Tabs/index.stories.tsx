import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

const tabs = [
  {
    icon: <SearchM />
  },
  {
    label: 'Tab #2',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />
  },
  {
    label: 'Tab #1',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />
  },
  {
    label: 'Tab #4',
    icon: <SearchM />,
    disabled: true,
  }
];

storiesOf('Components|Tabs', module)
.add('default', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <div style={{width: '600px', maxWidth: '100%', padding: '24px', background: '#fff'}}>
        <Tabs tabs={tabs} activeTab={store.state.activeTab} setActiveTab={(index: number) => store.set({activeTab: index})} />
      </div>
    </DSProvider>
  );
}))

.add('with configuration button', withState({
  activeTab: 0,
})(({store}) => {
  return (
    <DSProvider code="en_GB">
      <div style={{width: '600px', maxWidth: '100%', padding: '24px', background: '#fff'}}>
        <Tabs
          tabs={tabs}
          activeTab={store.state.activeTab}
          setActiveTab={(index: number) => store.set({activeTab: index})}
          configuration={{
            label: 'Manage dashboards',
            action: action('Manage dashboards click'),
          }}
        />
      </div>
    </DSProvider>
  );
}));