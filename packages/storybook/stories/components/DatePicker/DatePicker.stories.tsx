import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatePicker from '@synerise/ds-date-picker';

import { BOOLEAN_CONTROL, fixedWrapper200, REACT_NODE_AS_STRING } from '../../utils';
import { baseArgs } from './constants';

const disabledDates = (date?: Date): boolean => {
  return Math.abs(dayjs().startOf('day').diff(dayjs(date).startOf('day'), 'day')) > 2;
};

export default {
  component: DatePicker,
  title: 'Components/Pickers/DatePicker',
  tags: ['autodocs'],
  render: (args) => {
    const [value, setValue] = useState<Date>();
    return <DatePicker 
      {...args}
      onValueChange={(newValue) => { action('onChange')(newValue); setValue(newValue); }}
      value={value} 
    />
  },
  parameters: {
    date: new Date('March 10, 2021 10:00:00'),
  },
  decorators: [fixedWrapper200],
  argTypes: {
    prefixel: {
      ...REACT_NODE_AS_STRING,
    },
    suffixel: {
      ...REACT_NODE_AS_STRING,
    },
    showTime: {
      ...BOOLEAN_CONTROL,
    },
    useEndOfDay: {
      ...BOOLEAN_CONTROL,
    },
    useStartOfDay: {
      ...BOOLEAN_CONTROL,
    },
  },
} as Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const WithTime: Story = {
  args: {
    ...baseArgs,
    showTime: true,
  },
};

export const InactiveDates: Story = {
  args: {
    ...baseArgs,
    disabledDates,
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    ...baseArgs,
    prefixel: 'Prefix',
    suffixel: 'Sufffix',
    disabledDates,
  },
};
