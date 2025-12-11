import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import DatePicker from '@synerise/ds-date-picker';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper588,
} from '../../utils';
import { baseArgs } from './constants';

const disabledDates = (date?: Date): boolean => {
  return (
    Math.abs(dayjs().startOf('day').diff(dayjs(date).startOf('day'), 'day')) > 2
  );
};

export default {
  component: DatePicker,
  title: 'Components/Pickers/DatePicker',
  tags: ['autodocs'],
  parameters: {
    date: new Date('March 10, 2021 10:00:00'),
  },
  render: (args) => {
    const [value, setValue] = useState<Date | undefined>(args.value);
    return (
      <div data-popup-container>
        <DatePicker
          {...args}
          onApply={(newValue) => {
            args.onApply?.(newValue);
            setValue(newValue);
          }}
          value={value}
        />
      </div>
    );
  },
  decorators: [fixedWrapper588],
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

export const WithQuickPicks: Story = {
  args: {
    ...baseArgs,
    hideNow: true,
    useStartOfDay: true,
    quickPicks: [
      {
        label: 'In 3 days',
        value: moment().startOf('day').add(3, 'days').toDate(),
      },
      {
        label: 'In 1 week',
        value: moment().startOf('day').add(1, 'week').toDate(),
      },
      {
        label: 'In 1 month',
        value: moment().startOf('day').add(1, 'month').toDate(),
      },
      {
        label: 'End of year',
        value: moment().endOf('year').startOf('day').toDate(),
      },
    ],
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
