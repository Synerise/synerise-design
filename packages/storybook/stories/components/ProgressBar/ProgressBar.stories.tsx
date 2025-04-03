import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ProgressBar, { ProgressProps } from '@synerise/ds-progress-bar';

import {
  BOOLEAN_CONTROL,
  COLOR_CONTROL,
  fixedWrapper300,
  NUMBER_CONTROL,
  STRING_CONTROL,
} from '../../utils';


type Story = StoryObj<Omit<ProgressProps, 'thick'>>;

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
  argTypes: {
    strokeColor: COLOR_CONTROL,
    description: STRING_CONTROL,
    amount: NUMBER_CONTROL,
    percent: NUMBER_CONTROL,
    maxPercent: BOOLEAN_CONTROL,
    showLabel: BOOLEAN_CONTROL,
    thick: BOOLEAN_CONTROL,
    thin: BOOLEAN_CONTROL
  }
} as Meta<ProgressProps>;

export const SoloBar: Story = {};
export const SoloBarSmall: Story = {
  args: {
    thin: true,
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

