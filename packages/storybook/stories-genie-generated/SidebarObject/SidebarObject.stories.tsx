{
  import React from 'react';
  import SidebarObject from './SidebarObject';
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import {
    HeaderType
  } from './Elements/Header/Header.types';
  const meta: Meta = {
    title: 'SidebarObject',
    component: SidebarObject,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < typeof SidebarObject > ;
  const StoryTemplate: Story = {
    render: (args) => <SidebarObject {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      avatar: 'https://dummyimage.com/500x500',
      headerPreffix: 'Preffix',
      headerTabs: [{
        id: 1,
        label: 'Tab 1'
      }, {
        id: 2,
        label: 'Tab 2'
      }],
      inputObject: {
        id: 1,
        name: 'Object 1'
      },
      inlineEditInputProps: {},
      onEdit: () => {},
      onDelete: () => {},
      onDuplicate: () => {},
      onMove: () => {},
      onId: () => {},
      texts: {
        cancel: 'Cancel',
        apply: 'Apply'
      },
      onCloseClick: () => {},
      onArrowUp: () => {},
      onArrowDown: () => {},
      withScrollbar: true,
      handleTabClick: () => {},
      footer: 'Footer content',
      name: 'Object name',
      onRename: () => {},
      onCancelClick: () => {},
      onApplyClick: () => {},
      activeTab: 0,
      headerType: HeaderType.READONLY,
      typeButtons: [],
    },
  };