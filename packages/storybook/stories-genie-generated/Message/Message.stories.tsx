import React from 'react';
import message from './path-to-message';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
const meta: Meta < {
  duration: number
} > = {
  title: 'Storybook CSF3 Story',
  component: message,
};
export default meta;
const excludedProps = ['config'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < {
  duration: number
} > ;
const StoryTemplate: Story = {
  render: (args) => <message {...args}></message>,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    duration: 3,
  },
};