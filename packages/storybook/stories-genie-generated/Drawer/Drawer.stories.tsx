import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Drawer from './Drawer';
const meta: Meta = {
  title: 'Drawer',
  component: Drawer,
};
export default meta;
const excludedProps = ['children'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof Drawer > ;
const StoryTemplate: Story = {
  render: (args) => <Drawer {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    title: 'Example Drawer',
    closable: true,
    children: 'Content goes here',
  },
};