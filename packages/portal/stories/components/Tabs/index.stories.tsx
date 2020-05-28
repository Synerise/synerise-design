import * as React from 'react';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { array, boolean, number } from '@storybook/addon-knobs';
import { BooleanM, CalendarM, HashM, ListM, TextM } from '@synerise/ds-icon/dist/icons';

const decorator = storyFn => (
  <div
    style={{ width: '50%', position: 'absolute', left: '25%', maxWidth: '50%', padding: '24px', background: '#fff' }}
  >
    {storyFn()}
  </div>
);

const tabs = [
  {
    icon: <SearchM />,
  },
  {
    label: 'Tab #2',
  },
  {
    label: 'Tab #3',
    icon: <SearchM />,
  },
  {
    label: 'Disabled tab',
    icon: <SearchM />,
    disabled: true,
  },
];

const icons = [
  {
    icon: <CalendarM />,
  },
  {
    icon: <TextM />,
  },
  {
    icon: <HashM />,
  },
  {
    icon: <BooleanM />,
  },
  {
    icon: <ListM />,
  },
];

const props = () => ({
  underscore: boolean('underline', false),
});

const getTabs = array => {
  return array.map(tabLabel => ({
    label: tabLabel,
  }));
};
const defaultTabsArray = ['Tab first', 'Tab second', 'Tab third', 'Tab fourth', 'Tab fifth'];
const stories = {
  default: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      underscore={false}
      tabs={getTabs(array('Tab labels', defaultTabsArray))}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
    />
  )),
  withUnderline: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      underscore
      tabs={getTabs(array('Tab labels', defaultTabsArray))}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
    />
  )),
  withBlockTabs: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      tabs={getTabs(array('Tab labels', defaultTabsArray.slice(0, 2)))}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
      block
      underscore
    />
  )),
  withBlockIconTabs: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      tabs={icons}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
      block
      underscore
    />
  )),
  withConfigurationButton: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      {...props()}
      tabs={tabs}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
      configuration={{
        label: 'Manage dashboards',
        action: action('Manage dashboards click'),
      }}
    />
  )),
};

export default {
  name: 'Tabs|Tabs',
  decorator,
  stories,
  Component: Tabs,
};
