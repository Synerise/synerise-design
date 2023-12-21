{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import IconPicker, {
    IconPickerProps
  } from './IconPicker';
  const meta: Meta < IconPickerProps > = {
    title: 'IconPicker',
    component: IconPicker,
  };
  export default meta;
  const excludedProps = ['noResultMsg'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < IconPickerProps > ;
  const StoryTemplate: Story = {
    render: (args) => <IconPicker {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      button: null,
      data: [],
      onSelect: () => {},
      trigger: ['hover'],
      placeholder: 'Search',
      noResultMsg: 'No results found',
    },
  };