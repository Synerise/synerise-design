import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import ProgressBar from '@synerise/ds-progress-bar';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../utils';

export default {
  component: ProgressBar,
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  argTypes: {
    description: STRING_CONTROL,
    label: STRING_CONTROL,
    percent: NUMBER_CONTROL,
    thin: BOOLEAN_CONTROL,
    customColor: STRING_CONTROL,
    steps: NUMBER_CONTROL,
    width: STRING_CONTROL,
    inline: BOOLEAN_CONTROL,
  },
} as Meta<typeof ProgressBar>;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    percent: 21,
    width: '300px',
    inline: false,
  },
};

export const withLabelAndDescription: Story = {
  ...Default,
  args: {
    ...Default.args,
    description: 'Description',
    label: 'ProgressBar Label',
  },
};

export const withSteps: Story = {
  ...Default,
  args: {
    ...Default.args,
    steps: 6,
  },
};
export const thinProgressBar: Story = {
  ...Default,
  args: {
    ...Default.args,
    thin: true,
  },
};
