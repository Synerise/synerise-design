import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Multivalue } from '@synerise/ds-progress-bar';

import { BOOLEAN_CONTROL, fixedWrapper300 } from '../../utils';
import { COLORS } from './ProgressBar.constants';

type MultivalueProps = typeof Multivalue;

export default {
  component: Multivalue,
  title: 'Components/ProgressBar',
  decorators: [fixedWrapper300],
  render: (args) => {
    return <Multivalue {...args} />;
  },
  argTypes: {
    values: { control: false },
    stackedBars: BOOLEAN_CONTROL,
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

export const MultivalueBar: StoryObj<MultivalueProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Multivalue
  values={[
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
  ]}
/>`,
      },
    },
  },
};
export const MultiValueWithTooltips: StoryObj<MultivalueProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Multivalue
  stackedBars={false}
  values={[
    {
      percent: 10,
      color: COLORS.mars,
      tooltip: "10%",
      onClick: handleClick,
    },
    {
      percent: 15,
      color: COLORS.yellow,
      tooltip: "15%",
      onClick: handleClick,
    },
    {
      percent: 40,
      color: COLORS.cyan,
      tooltip: "40%",
      onClick: handleClick,
    },
  ]}
/>`,
      },
    },
  },
  args: {
    stackedBars: false,
    values: [
      {
        percent: 10,
        color: COLORS.mars,
        tooltip: '10%',
        onClick: fn(),
      },
      {
        percent: 15,
        color: COLORS.yellow,
        tooltip: '15%',
        onClick: fn(),
      },
      {
        percent: 40,
        color: COLORS.cyan,
        tooltip: '40%',
        onClick: fn(),
      },
    ],
  },
};
export const MultivalueBarNotStacked: StoryObj<MultivalueProps> = {
  parameters: {
    docs: {
      source: {
        code: `<Multivalue
  stackedBars={false}
  values={[
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
  ]}
/>`,
      },
    },
  },
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
  },
};
