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
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar
  percent={21}
  width="300px"
  inline={false}
/>`,
      },
    },
  },
  args: {
    percent: 21,
    width: '300px',
    inline: false,
  },
};

export const withLabelAndDescription: Story = {
  ...Default,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar
  percent={21}
  width="300px"
  inline={false}
  description="Description"
  label="ProgressBar Label"
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    description: 'Description',
    label: 'ProgressBar Label',
  },
};

export const InlineCustomLabel: Story = {
  ...Default,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar
  percent={(4 / 6) * 100}
  width="300px"
  inline={true}
  description="Description"
  label="4/6"
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    inline: true,
    percent: (4 / 6) * 100,
    description: 'Description',
    label: '4/6',
  },
};

export const withSteps: Story = {
  ...Default,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar
  percent={21}
  width="300px"
  inline={false}
  steps={6}
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    steps: 6,
  },
};
export const thinProgressBar: Story = {
  ...Default,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar
  percent={21}
  width="300px"
  inline={false}
  thin={true}
/>`,
      },
    },
  },
  args: {
    ...Default.args,
    thin: true,
  },
};
