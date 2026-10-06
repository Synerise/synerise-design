import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import CompletedWithin, {
  CompletedWithinProps,
} from '@synerise/ds-completed-within';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  NUMBER_CONTROL,
  REACT_NODE_AS_STRING,
} from '../../utils';

export default {
  title: 'Components/Filter/CompletedWithin',
  tags: ['autodocs'],
  render: (args) => {
    const [value, setValue] = useState<CompletedWithinProps['value']>(
      args.value,
    );
    return (
      <CompletedWithin
        {...args}
        value={value}
        onSetValue={(value) => {
          args.onSetValue && args.onSetValue(value);
          setValue(value);
        }}
      />
    );
  },
  component: CompletedWithin,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    maxValue: NUMBER_CONTROL,
    placeholder: REACT_NODE_AS_STRING,
    readonly: BOOLEAN_CONTROL,
    tooltip: REACT_NODE_AS_STRING,
  },
  args: {
    value: { value: undefined, period: undefined },
    text: {
      header: 'Completed within',
      completedLabel: 'Completed within',
      clear: 'Clear',
      periodPlaceholder: 'Interval',
    },
    maxValue: 100,
    placeholder: 'Completed within',
    tooltip:
      'Filter by time elapsed between completing the first and last step in the funnel.',
  },
} as Meta<CompletedWithinProps>;

type Story = StoryObj<CompletedWithinProps>;

export const Default: Story = {};
