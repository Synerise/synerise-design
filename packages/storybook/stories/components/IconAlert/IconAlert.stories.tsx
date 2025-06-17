import React from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

// This is called InlineNote in figma
import { IconAlert } from '@synerise/ds-alert';

import { centeredPaddedWrapper, REACT_NODE_AS_STRING, controlFromOptionsArray, BOOLEAN_CONTROL } from '../../utils';

const TYPES = ['success', 'warning', 'alert', 'info'] as const;

export default {
  title: 'Components/Alert/IconAlert',
  tags: ['autodocs'],
  component: IconAlert,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    type: { ...controlFromOptionsArray('select', TYPES) },
    message: REACT_NODE_AS_STRING,
    withEmphasis: REACT_NODE_AS_STRING,
    withLink: REACT_NODE_AS_STRING,
    iconAlert: BOOLEAN_CONTROL,
    hoverButton: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
    customIcon: { control: false },
  },
  args: {
    type: 'success',
    iconAlert: true,
    message: 'This is a sample message',
  },
} as Meta<typeof IconAlert>;

type Story = StoryObj<typeof IconAlert>;

export const Default: Story = {
  args: {
    type: 'success',
  },
};

export const withLink: Story = {
  args: {
    type: 'success',
    withLink: 'Reset the screen!'
  },
};

export const withEmphasis: Story = {
  args: {
    type: 'success',
    withEmphasis: 'There was a problem with your request.',
  },
};

export const AllTypes: Story = {
  render: args => {
    return (
      <div>
        {TYPES.map(type => (
          <IconAlert {...args} type={type} />
        ))}
      </div>
    );
  },
  args: {
    type: 'alert',
    message: 'This is a sample message',
  },
};
