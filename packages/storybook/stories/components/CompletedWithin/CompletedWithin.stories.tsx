import React, { useState } from 'react';

import type { StoryObj, Meta } from '@storybook/react-webpack5';

import CompletedWithin from '@synerise/ds-completed-within';
import { CompletedWithinProps } from '@synerise/ds-completed-within';

import {
  centeredPaddedWrapper,
  REACT_NODE_AS_STRING,
  NUMBER_CONTROL, BOOLEAN_CONTROL,
} from '../../utils';


export default {
  title: "Components/Filter/CompletedWithin",
  tags: ['autodocs'],
  render: (args) => {
    const [value, setValue] = useState<CompletedWithinProps['value']>(args.value);
    return (
      <CompletedWithin
        {...args}
        value={value}
        onSetValue={value => {
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
    value: {value: undefined, period: undefined},
    text: {
      header: 'Completed within',
      completedLabel: 'Completed within',
      clear: 'Clear',
      periodPlaceholder: 'Interval',
    },
    maxValue: 100,
    placeholder: 'Completed within',
    tooltip: 'Filter by time elapsed between completing the first and last step in the funnel.',
  },
} as Meta<CompletedWithinProps>;

type Story = StoryObj<CompletedWithinProps>;

export const Default: Story = {
  
};
