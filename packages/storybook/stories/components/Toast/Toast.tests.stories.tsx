import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import Toast, { ToastProps } from '@synerise/ds-toast';
import { userEvent, waitFor, within, expect } from 'storybook/test';

import {
  BOOLEAN_CONTROL,
  controlFromOptionsArray,
  fixedWrapper400,
  gappedColumnDecorator,
  REACT_NODE_AS_STRING,
  sleep,
} from '../../utils';
import { ShowToast } from './Toast.stories';

export default {
  title: 'Components/Toast/Tests',
  tags: ['autodocs'],
  component: Toast,
  decorators: [gappedColumnDecorator, fixedWrapper400],
  render: args => {
    return <Toast {...args} />;
  },
  argTypes: {
    message: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    type: controlFromOptionsArray('select', ['success', 'warning', 'negative', 'informative']),
    withClose: BOOLEAN_CONTROL,
    expander: BOOLEAN_CONTROL,
    expanded: BOOLEAN_CONTROL,
    button: {
      control: false,
    },
    expandedContent: {
      control: false,
    },
  },
} as Meta<ToastProps>;

type Story = StoryObj<ToastProps>;

const TOAST_MESSAGE = 'TOAST_MESSAGE';
export const ShowSingleToast: Story = {
  ...ShowToast,
  args: {
    ...ShowToast.args,
    message: TOAST_MESSAGE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.getByRole('button'));
    await waitFor(async () => expect(await canvas.findByText(TOAST_MESSAGE)).toBeInTheDocument());
  },
};


export const ShowMultipleToasts: Story = {
  ...ShowToast,
  args: {
    ...ShowToast.args,
    message: TOAST_MESSAGE,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(await canvas.getByRole('button'));
    await waitFor(async () => expect(await canvas.findByText(TOAST_MESSAGE)).toBeInTheDocument());
    await sleep(500);
    await userEvent.click(await canvas.getByRole('button'));
    await waitFor(async () => expect(await canvas.findAllByText(TOAST_MESSAGE)).toHaveLength(2));
  },
};
