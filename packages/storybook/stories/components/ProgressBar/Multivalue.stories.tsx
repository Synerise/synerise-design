import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Multivalue } from '@synerise/ds-progress-bar';
import { COLORS } from './ProgressBar.constants';
import { BOOLEAN_CONTROL, fixedWrapper300 } from '../../utils';

type MultivalueProps = typeof Multivalue;

export default {
  component: Multivalue,
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  decorators: [fixedWrapper300],
  render: args => {
    return <Multivalue {...args} />;
  },
  argTypes: {
    values: { control: false },
    stackedBars: BOOLEAN_CONTROL
  },
  args: {
    values: [
      {
        percent: 10,
        color: COLORS.mars,
      },
      {
        percent: 15,
        color: COLORS.yellow,
      },
      {
        percent: 40,
        color: COLORS.cyan,
      },
    ],
  },
} as Meta<MultivalueProps>;

export const MultivalueBar: StoryObj<MultivalueProps> = {};
export const MultivalueBarNotStacked: StoryObj<MultivalueProps> = {
  args: {
    stackedBars: false,
    values: [
      {
        percent: 10,
        color: COLORS.mars,
      },
      {
        percent: 25,
        color: COLORS.yellow,
      },
      {
        percent: 65,
        color: COLORS.grey,
      },
    ],
  }
};
