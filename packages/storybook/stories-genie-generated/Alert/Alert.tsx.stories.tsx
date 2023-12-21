import * as React from 'react';
import {
  Meta,
  StoryObj
} from '@storybook/react';
import Alert, {
  Props
} from './Alert';
const meta: Meta < Props > = {
  title: "Alert",
  component: Alert,
};
export default meta;
const excludedProps = [];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < Props > ;
const StoryTemplate: Story = {
  render: (args) => <Alert {...args} />
};
export const Primary = {
  ...StoryTemplate,
  args: {
    icon: <Check2M />,
    type: "success",
    message: "Example Message"
  }
}