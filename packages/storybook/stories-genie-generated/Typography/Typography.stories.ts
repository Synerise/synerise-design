import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import Typography from 'antd/lib/typography';
import type {
  Meta,
  StoryObj
} from '@storybook/react';
const meta: Meta < typeof Typography > = {
  title: 'Typography',
  component: Typography,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < typeof Typography > ;
const StoryTemplate: Story = {
  render: (args) => (<Typography {...args}>
      This is a storybook component.
    </Typography>),
};
export const Primary = {
  ...StoryTemplate,
  args: {
    // add component's props if applicable
  },
};