import * as React from 'react';
import Tabs from '@synerise/ds-tabs';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { array, boolean, number } from '@storybook/addon-knobs';
import { SearchM, BooleanM, CalendarM, HashM, ListM, TextM } from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';

const decorator = storyFn => (
  <div
    style={{ width: '50%', position: 'absolute', left: '25%', maxWidth: '50%', padding: '24px', background: '#fff' }}
  >
    {storyFn()}
  </div>
);

const labelsAndIcons = [
  {
    icon: <SearchM />,
    label: <span>Tab first</span>,
  },
  {
    icon: <SearchM />,
    label: <span>Tab second</span>,
  },
  {
    icon: <SearchM />,
    label: 'Tab third',
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
  disabled: boolean('Set disabled', false),
});
const getHardcodedTab = (array, disabled) => {
  return array.map(item => ({ ...item, disabled: disabled,}));
};
const getHardcodedTabs = (array, disabled,suffixel) => {
  return array.map(item => ({ ...item, disabled: disabled,suffixel: suffixel,}));
};
const getTabsFromUserInput = (array,disabled,suffixel) => {
  return array.map(tabLabel => ({
    label: tabLabel,
    disabled: disabled,
    suffixel: suffixel,
  }));
};

const defaultTabsArray = ['Tab first', 'Tab second', 'Tab third', 'Tab fourth', 'Tab fifth'];
const stories = {
 default: withState({
    activeTab: 0,
  })(({ store }) => {
   const hasSufix = boolean('Set counter', true);
   const counter = number('count', 1);
   const badgeComponent = <Badge
     count={counter}
     overflowCount={number('overflowCount', 99)}
     style={{
       backgroundColor: 'transparent',
       color: theme.palette['grey-500'],
       alignItems: 'center',
       marginRight: String(counter).length > 1? '-1px': '-3px'
     }}
   />
   return (
     <Tabs
       underscore={false}
       tabs={getTabsFromUserInput(array('Tab labels', defaultTabsArray), props().disabled, hasSufix && badgeComponent)}
       activeTab={store.state.activeTab}
       handleTabClick={(index: number) => store.set({ activeTab: index })}
     />)
 }),
  withUnderline: withState({
    activeTab: 0,
  })(({ store }) => {
    const hasSufix = boolean('Set counter', true);
    const counter = number('count', 1);
    const badgeComponent = <Badge
      count={counter}
      overflowCount={number('overflowCount', 99)}
      style={{
        backgroundColor: 'transparent',
        color: theme.palette['grey-500'],
        alignItems: 'center',
        marginRight: String(counter).length > 1? '-1px': '-3px'
      }}
    />
    return (
      <Tabs
        underscore
        tabs={getTabsFromUserInput(array('Tab labels', defaultTabsArray), props().disabled,hasSufix && badgeComponent)}
        activeTab={store.state.activeTab}
        handleTabClick={(index: number) => store.set({ activeTab: index })}
      />)
  }),
  withBlockTabs: withState({
    activeTab: 0,
  })(({ store }) => {
    const hasSufix = boolean('Set counter', true);
    const counter = number('count', 1);
    const badgeComponent = <Badge
      count={counter}
      overflowCount={number('overflowCount', 99)}
      style={{
        backgroundColor: 'transparent',
        color: theme.palette['grey-500'],
        alignItems: 'center',
        marginRight: String(counter).length > 1? '-1px': '-3px'
      }}
    />
    return (
      <Tabs
        tabs={getTabsFromUserInput(array('Tab labels', defaultTabsArray.slice(0, 2)), props().disabled, hasSufix && badgeComponent)}
        activeTab={store.state.activeTab}
        handleTabClick={(index: number) => store.set({ activeTab: index })}
        block
        underscore
      />)
  }),
  withBlockIconTabs: withState({
    activeTab: 0,
  })(({ store }) => (
    <Tabs
      tabs={getHardcodedTab(icons, props().disabled)}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
      block
      underscore
    />
  )),
  withMenu: withState({
    activeTab: 0,
  })(({ store }) => {  const hasSufix = boolean('Set counter', true);
    const counter = number('count', 1);
    const badgeComponent = <Badge
      count={counter}
      overflowCount={number('overflowCount', 99)}
      style={{
        backgroundColor: 'transparent',
        color: theme.palette['grey-500'],
        alignItems: 'center',
        marginRight: String(counter).length > 1? '-1px': '-3px'
      }}
    />
  return(
    <Tabs
      underscore
      tabs={getHardcodedTabs(labelsAndIcons, props().disabled,hasSufix && badgeComponent)}
      activeTab={store.state.activeTab}
      handleTabClick={(index: number) => store.set({ activeTab: index })}
      configuration={{
        label: 'Manage dashboards',
        action: action('Manage dashboards click'),
        disabled: props().disabled,
      }}
    />)
  }),
};

export default {
  name: 'Components/Tabs',
  decorator,
  stories,
  Component: Tabs,
};
