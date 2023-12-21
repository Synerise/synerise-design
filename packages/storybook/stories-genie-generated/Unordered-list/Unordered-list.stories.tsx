import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import UnorderedList, {
  ListProps
} from './UnorderedList';
const meta: Meta < ListProps > = {
  title: 'UnorderedList',
  component: UnorderedList,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < ListProps > ;
const StoryTemplate: Story = {
  render: (args) => <UnorderedList {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    data: [{
      id: 1,
      name: 'Item 1'
    }, {
      id: 2,
      name: 'Item 2'
    }, {
      id: 3,
      name: 'Item 3'
    }, ],
    indexFormatter: (index) => `${index + 1}.`,
    text: 'Example List',
  },
};