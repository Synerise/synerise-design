import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect, fn, waitFor } from '@storybook/test';


import Popconfirm, { ConfirmMessageProps } from '@synerise/ds-popconfirm';
import Button from '@synerise/ds-button';
import Icon, { WarningFillM } from '@synerise/ds-icon';

import { BOOLEAN_CONTROL, fixedWrapper300, centeredPaddedWrapper } from '../../utils';

type Story = StoryObj<ConfirmMessageProps>;

export default {
  component: Popconfirm.ConfirmMessage,
  title: 'Components/Popconfirm',
  tags: ['autodocs'],
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: args => {
    return <Popconfirm.ConfirmMessage {...args} />;
  },
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    onClick: {
      action: 'onClick',
    },
  },
  args: {
    children: <Button>Click to show ConfirmMessage!</Button>,
    title: 'Copied! Keep it somewhere safe.',
    displayDuration: 5000,
    placement: 'topLeft',
    icon: <Icon component={<WarningFillM />} color={'#ffc300'} />,
    onClick: showMessage => {
      showMessage();
    },
  },
} as Meta<ConfirmMessageProps>;

export const ConfirmMessage: Story = {};
export const ConfirmMessageOpen: Story = {
  play: async ({ args, canvasElement}) => {
    const canvas = within(canvasElement.parentElement!);
    userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByText(args.title)).toBeInTheDocument());
  }
};
