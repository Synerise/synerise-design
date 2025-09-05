import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';
import InlineAlert from '@synerise/ds-inline-alert';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
} from '../../utils';

const TYPES = ['success', 'warning', 'alert', 'info'] as const;

export default {
  title: 'Components/Alert/InlineAlert',
  tags: ['autodocs'],
  component: InlineAlert,
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
} as Meta<typeof InlineAlert>;

type Story = StoryObj<typeof InlineAlert>;

export const Default: Story = {
  args: {
    type: 'success',
  },
};

export const withLink: Story = {
  args: {
    type: 'success',
    withLink: 'Reset the screen!',
  },
};

export const withEmphasis: Story = {
  args: {
    type: 'success',
    withEmphasis: 'There was a problem with your request.',
  },
};

export const AllTypes: Story = {
  render: (args) => {
    return (
      <div>
        {TYPES.map((type) => (
          <InlineAlert {...args} type={type} />
        ))}
      </div>
    );
  },
  args: {
    type: 'alert',
    message: 'This is a sample message',
  },
};
