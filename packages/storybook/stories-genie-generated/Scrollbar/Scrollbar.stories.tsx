{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import * as React from 'react';
  import Icon, {
    SpinnerM
  } from '@synerise/ds-icon';
  import {
    theme
  } from '@synerise/ds-core';
  import * as S from './Scrollbar.styles';
  import {
    ScrollbarProps
  } from './Scrollbar.types';
  import {
    DnDScrollbar
  } from './DnDScrollbar';
  import {
    VirtualScrollbar
  } from './VirtualScrollbar';
  // Define the meta information for the storybook component
  const meta: Meta < ScrollbarProps > = {
    title: 'Scrollbar',
    component: Scrollbar
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < ScrollbarProps > ;
  const StoryTemplate: Story = {
    render: (args) => (<Scrollbar {...args}>
      <div style={{ height: '300px' }}>
        <p>Scrollable content goes here...</p>
      </div>
    </Scrollbar>)
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      className: 'custom-class',
      loading: false,
      withDnd: false,
      fetchData: () => {}
    }
  };
}