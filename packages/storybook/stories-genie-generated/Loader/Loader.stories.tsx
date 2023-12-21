import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import Loader from './Loader';
// Types
import type {
  LoaderProps
} from './Loader.types';
const meta: Meta < LoaderProps > = {
  title: 'Loader',
  component: Loader,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < LoaderProps > ;
const StoryTemplate: Story = {
  render: (args) => <Loader {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    size: 'M',
    label: 'Loading...',
    labelPosition: 'right',
    color: 'grey',
    percent: 50,
    percentFormatter: (percent) => `${percent}%`,
    text: 'Loading...',
    fontSize: 'M',
    mode: 'indeterminate',
  },
};