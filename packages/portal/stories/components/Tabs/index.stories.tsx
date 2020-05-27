import * as React from 'react';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, number } from '@storybook/addon-knobs';

const decorator = (storyFn) => (
  <div style={{ width: '100%', position: 'absolute', left: 0, maxWidth: '100%', padding: '24px', background: '#fff' }}>
    {storyFn()}
  </div>
);

const tabs = [
  {
    icon: <SearchM />
  },
  {
    label: 'Tab #2 Lorem ispum dolor sit amet ore et labore',
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
});

const getTabs = (count) => {
  const tabs = new Array(count).fill(count);
  return tabs.map((i, index) => ({
    label: `Tab #${index}`,
  }));
};

const stories = {
  default: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      {...props()}
      tabs={getTabs(number('Number of tabs', 12))}
      block
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
      block
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
