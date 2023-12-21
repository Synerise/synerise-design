{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import Tabs, {
    TabsProps
  } from './Tabs';
  import {
    TabItem
  } from './Tabs.types';
  const meta: Meta < TabsProps > = {
    title: 'Tabs',
    component: Tabs,
  };
  export default meta;
  const tabs: TabItem[] = [{
    label: 'Tab 1',
    icon: null,
    disabled: false,
    suffixel: null,
  }, {
    label: 'Tab 2',
    icon: null,
    disabled: false,
    suffixel: null,
  }, {
    label: 'Tab 3',
    icon: null,
    disabled: false,
    suffixel: null,
  }, ];
  const handleTabClick = (index: number): void => {
    console.log(`Tab clicked: ${index}`);
  };
  const Template: StoryObj < TabsProps > = {
    render: (args) => (<Tabs
      activeTab={args.activeTab}
      tabs={args.tabs}
      handleTabClick={handleTabClick}
      configuration={args.configuration}
      underscore={args.underscore}
      block={args.block}
      visible={args.visible}
    />),
  };
  export const Primary = {
    ...Template,
    args: {
      activeTab: 0,
      tabs: tabs,
      handleTabClick: handleTabClick,
      configuration: {
        label: 'Configuration',
        action: () => {
          console.log('Configuration button clicked');
        },
        disabled: false,
      },
      underscore: true,
      block: false,
      visible: true,
    },
  };
}