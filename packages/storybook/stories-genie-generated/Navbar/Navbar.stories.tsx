Here 's the modified code for your Storybook CSF3 story:
``
`javascript
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import Navbar from './Navbar';

const meta: Meta<NavbarProps> = {
  title: 'Navbar',
  component: Navbar,
};

export default meta;

const excludedProps = [];

const excludeRegexp = new RegExp(`($ {
  excludedProps.join('|')
})`, 'g');

type Story = StoryObj<NavbarProps>;

const StoryTemplate: Story = {
  render: (args) => <Navbar {...args} />,
};

export const Primary = {
  ...StoryTemplate,
  args: {
    className: '',
    color: 'blue',
    logo: 'logo.png',
    description: 'This is the Navbar component',
    children: null,
    actions: 'Actions',
    additionalNodes: null,
    alertNotification: 'Alert Notification',
  },
};
`
``