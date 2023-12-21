import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import {
  Props
} from './InputNumber.types';
import InputNumber from './InputNumber';
const meta: Meta < Props > = {
  title: 'InputNumber',
  component: InputNumber,
};
export default meta;
const excludedProps = ['onChange'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Props > ;
const StoryTemplate: Story = {
  render: (args) => <InputNumber {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    label: 'Input Number',
    description: 'This is an input number component',
    errorText: 'Error',
    raw: false,
    error: false,
    prefixel: '$',
    suffixel: 'US',
    style: {},
    tooltip: 'This is a tooltip',
    tooltipConfig: {},
    valueFormatOptions: {},
    onChange: (value) => console.log(`Value changed to ${value}`),
  },
};