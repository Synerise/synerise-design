import * as React from 'react';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

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

const props = () => ({
  underscore: boolean('underscore', false)
})

const stories = {
  default: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      {...props()}
      tabs={tabs}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({activeTab: index})}
    />
  )),
  withConfigurationButton: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      {...props()}
      tabs={tabs}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({activeTab: index})}
      configuration={{
        label: 'Manage dashboards',
        action: action('Manage dashboards click'),
      }}
    />
  )),
  withLabelAsNodes: {
    tabs: [
      {
        icon: <SearchM />
      },
      {
        label: (<React.Fragment>Tab #2</React.Fragment>),
      },
      {
        label: (<React.Fragment>Tab #3</React.Fragment>),
        icon: <SearchM />
      },
      {
        label: (<React.Fragment>Tab #4</React.Fragment>),
      },
      {
        label: <span style={{ color: 'red' }}>Tab #3</span>,
        icon: <SearchM />
      },
      {
        label: (<span>Test</span>),
        icon: <SearchM />,
        disabled: true,
      }
    ],
    activeTab: 1,
    handleTabClick: action('handleTabClick'),
  },
};

export default {
  name: 'Components|Tabs',
  decorator,
  stories,
  Component: Tabs,
};
