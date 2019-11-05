import * as React from 'react';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';

const decorator = (storyFn) => (
  <div style={{ width: '600px', maxWidth: '100%', padding: '24px', background: '#fff' }}>
    {storyFn()}
  </div>
);

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

const stories = {
  default: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      tabs={tabs}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({activeTab: index})}
    />
  )),
  withConfigurationButton: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      tabs={tabs}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({activeTab: index})}
      configuration={{
        label: 'Manage dashboards',
        action: action('Manage dashboards click'),
      }}
    />
  )),
};

export default {
  name: 'Components|Tabs',
  decorator,
  stories,
  Component: Tabs,
};
