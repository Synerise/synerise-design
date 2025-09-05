import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import BroadcastBar from '@synerise/ds-broadcast-bar';
import Button from '@synerise/ds-button';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  centeredPaddedWrapper,
  controlFromOptionsArray,
} from '../../utils';
import { type } from '../BroadcastBar/BroadcastBar.data';

export default {
  title: 'Components/Alert/BroadcastBar',
  tags: ['autodocs'],
  component: BroadcastBar,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <BroadcastBar {...args} />;
  },
  argTypes: {
    description: REACT_NODE_AS_STRING,
    text: REACT_NODE_AS_STRING,
    type: {
      ...controlFromOptionsArray('select', ['success', 'warning', 'negative']),
    },
    withClose: BOOLEAN_CONTROL,
    button: REACT_NODE_AS_STRING,
  },
} as Meta<typeof BroadcastBar>;

type Story = StoryObj<typeof BroadcastBar>;

export const Default: Story = {
  args: {
    description: 'No response from server, try again later',
    type: 'success',
  },
};

export const withCloseIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    withClose: true,
  },
};
export const withButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    button: (
      <Button mode="label" type="tertiary-white">
        Button
      </Button>
    ),
  },
};
