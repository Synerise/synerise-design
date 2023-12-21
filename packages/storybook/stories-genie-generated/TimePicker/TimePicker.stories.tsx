{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import React from 'react';
  import TimePicker, {
    TimePickerProps
  } from './TimePicker';
  const meta: Meta < TimePickerProps > = {
    title: 'TimePicker',
    component: TimePicker,
  };
  export default meta;
  const excludedProps = ['onChange', 'defaultOpen', 'inputProps', 'overlayClassName', 'containerStyle', 'dropdownProps'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < TimePickerProps > ;
  const StoryTemplate: Story = {
    render: (args) => <TimePicker {...args} />,
    argTypes: {
      onChange: {
        action: 'onChange'
      },
      defaultOpen: {
        control: 'boolean'
      },
      inputProps: {
        control: 'object'
      },
      overlayClassName: {
        control: 'text'
      },
      containerStyle: {
        control: 'object'
      },
      dropdownProps: {
        control: 'object'
      }
    },
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      placement: 'bottomLeft',
      trigger: ['click'],
      units: ['hour', 'minute', 'second']
    }
  }