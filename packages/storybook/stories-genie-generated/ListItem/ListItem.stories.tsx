import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import ListItem, {
  ListItemProps
} from './ListItem';
const meta: Meta < ListItemProps > = {
  title: 'ListItem',
  component: ListItem,
};
export default meta;
const excludedProps = ['prefixCls', 'switch', 'danger'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ListItemProps > ;
const StoryTemplate: Story = {
  render: (args) => <ListItem {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    className: 'my-list-item',
    children: 'List Item',
    icon: <span>Icon</span>,
    danger: false,
    title: 'List Item Title',
    noHover: false,
    size: 'default',
    selectable: true,
    ...args,
  },
};