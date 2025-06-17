import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';

import Logic from '@synerise/ds-logic';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, controlFromOptionsArray } from '../../utils';

export default {
  component: Logic,
  title: 'Components/Filter/Logic',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  argTypes: {
    readOnly: BOOLEAN_CONTROL,
    options: {
      control: false
    },
    value: controlFromOptionsArray('inline-radio', ['AND', 'OR'])
  },
} as Meta<typeof Logic>;

type Story = StoryObj<typeof Logic>;

export const Default: Story = {
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    function onChange(value: string) {
      args.onChange && args.onChange(value);
      updateArgs({ value });
    }
    return <Logic {...args} value={value} onChange={onChange} />;
  },
  args: {
    value: 'AND',
  },
};

export const CustomOptions: Story = {
  render: args => {
    const [{ value }, updateArgs] = useArgs();
    function onChange(value: string) {
      args.onChange && args.onChange(value);
      updateArgs({ value });
    }
    return <Logic {...args} value={value} onChange={onChange} />;
  },
  argTypes: {
    value: controlFromOptionsArray('inline-radio', ['INCLUDES', 'EXCLUDES'])
  },
  args: {
    options: [
      { value: 'INCLUDES', label: 'Includes' },
      { value: 'EXCLUDES', label: 'Excludes' },
    ],
    value: 'INCLUDES',
  },
};
