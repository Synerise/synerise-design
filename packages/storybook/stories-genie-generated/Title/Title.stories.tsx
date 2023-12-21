import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Title, {
  Props
} from '../components/Title';
const meta: Meta < Props > = {
  title: 'Title',
  component: Title,
};
export default meta;
const excludedProps = ['level', 'withoutMargin', 'ellipsis'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Props > ;
const StoryTemplate: Story = {
  render: (args) => <Title {...args}>Sample Title</Title>,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    className: 'sample-class',
  },
};
export const Level2 = {
  ...StoryTemplate,
  args: {
    level: 2,
  },
};
export const WithoutMargin = {
  ...StoryTemplate,
  args: {
    withoutMargin: true,
  },
};
export const Ellipsis = {
  ...StoryTemplate,
  args: {
    ellipsis: {
      lines: 2,
    },
  },
};