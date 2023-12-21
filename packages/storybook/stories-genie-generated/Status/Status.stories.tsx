{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import {
    TagShape
  } from '@synerise/ds-tags';
  import * as S from './Status.styles';
  import {
    StatusProps
  } from './Status.types';
  const meta: Meta < StatusProps > = {
    title: 'Status',
    component: Status,
  };
  export default meta;
  const excludedProps = [];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < StatusProps > ;
  const StoryTemplate: Story = {
    render: (args) => <Status {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      type: 'primary',
      onClick: () => {},
      className: '',
      label: 'Primary',
      color: 'blue',
    },
  };