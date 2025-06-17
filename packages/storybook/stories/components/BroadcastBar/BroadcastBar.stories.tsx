import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import BroadcastBar from '@synerise/ds-alert/dist/BroadcastBar/BroadcastBar';
import { BOOLEAN_CONTROL, centeredPaddedWrapper, REACT_NODE_AS_STRING } from '../../utils';
import { color, type } from '../BroadcastBar/BroadcastBar.data';


export default {
  title: "Components/Alert/BroadcastBar",
  tags: ['autodocs'],
  component: BroadcastBar,
  decorators: [centeredPaddedWrapper],
  render: (args) => {
    return <BroadcastBar {...args} />;
  },
  argTypes: {
    description: REACT_NODE_AS_STRING,
    withEmphasis: REACT_NODE_AS_STRING,
    text: REACT_NODE_AS_STRING,
    withLink: REACT_NODE_AS_STRING,
    type: type,
    color: color,
    withClose: BOOLEAN_CONTROL,
    textButton: REACT_NODE_AS_STRING,
    button: BOOLEAN_CONTROL,

  },
} as Meta<typeof BroadcastBar>;

type Story = StoryObj<typeof BroadcastBar>;

export const Default: Story = {
  args: {
    description: 'No response from server, try again later',
    type: 'success',
    color: 'green',
  },
};

export const withCloseIcon: Story = {
  ...Default,
  args: {
    ...Default.args,
    withClose: true
  },
};
export const withEmphasis: Story = {
  args: {
    withEmphasis: 'There was a problem with your request.',
    text: 'Sorry!',
    type: 'success',
    color: 'green',
  },
};
export const withButton: Story = {
  ...Default,
  args: {
    ...Default.args,
    button: true,
    textButton: 'Button',
  },
};
export const withLink: Story = {
  args: {
    text: 'Sorry!',
    type: 'success',
    color: 'green',
    withLink: 'Please reset the screen',
  },
};