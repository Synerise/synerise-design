import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import message from '@synerise/ds-message';
import Button from '@synerise/ds-button';

export default {
  title: 'Components/Message',
  component: message,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return (
      <Button {...args} onClick={() => message.success('Thanks!')}>
        Click me!
      </Button>
    );
  },
  argTypes: {},
} as Meta<typeof message>;

type Story = StoryObj<typeof message>;

export const Default: Story = {};
