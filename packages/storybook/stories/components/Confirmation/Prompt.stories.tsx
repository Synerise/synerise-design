import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Prompt, PromptProps } from '@synerise/ds-confirmation';
import { Input } from '@synerise/ds-input';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';

export default {
  component: Prompt,
  title: 'Components/Confirmation/Prompt',
  parameters: {
    layout: 'padded',
  },
  tags: ['new'],
  args: {
    type: 'informative',
    title: 'Campaign name',
    open: true,
    texts: {
      mainButtonLabel: 'Next',
      secondaryButtonLabel: 'Cancel',
    },
    onCancel: fn(),
    onOk: fn(),
  },
  argTypes: {
    title: REACT_NODE_AS_STRING,
    content: REACT_NODE_AS_STRING,
    open: BOOLEAN_CONTROL,
    zIndex: NUMBER_CONTROL,
    icon: { control: false },
    mainButtonProps: { control: false },
    secondaryButtonProps: { control: false },
    texts: { control: false },
  },
} as Meta<PromptProps>;

export const Default: StoryObj<PromptProps> = {
  args: {
    content: (
      <Input resetMargin label="Name" placeholder="Enter campaign name" />
    ),
  },
};
