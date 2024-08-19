import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ProgressBar, { ProgressProps } from '@synerise/ds-progress-bar';

import {
  fixedWrapper300,
} from '../../utils';


type Story = StoryObj<ProgressProps>;

export default {
  component: ProgressBar,
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    return <ProgressBar {...args} />;
  },
  args: {
    amount: 60,
    percent: 21,
    showLabel: false,
  },
} as Meta<ProgressProps>;

export const SoloBar: Story = {};
export const SoloBarSmall: Story = {
  args: {
    thick: true,
  },
};
export const SoloBarWithLabel: Story = {
  args: {
    showLabel: true,
    maxPercent: true,
  },
};

export const SoloBarWithLabelAndDescription: Story = {
  args: {
    ...SoloBarWithLabel.args,
    description: 'Description',
  },
};

