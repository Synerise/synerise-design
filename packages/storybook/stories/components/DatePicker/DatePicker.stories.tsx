import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Meta, StoryObj } from '@storybook/react';

import DatePicker from '@synerise/ds-date-picker';

import { BOOLEAN_CONTROL, fixedWrapper200, REACT_NODE_AS_STRING, STRING_CONTROL } from '../../utils';
import { baseArgs } from './constants';

const disabledDates = (date?: Date): boolean => {
  return Math.abs(dayjs().startOf('day').diff(dayjs(date).startOf('day'), 'day')) > 2;
};

export default {
  component: DatePicker,
  title: 'Components/Pickers/DatePicker',
  tags: ['autodocs'],
  // parameters: {
  //   date: new Date('March 10, 2021 10:00:00'),
  // },
  render: (args, context) => {
    const [value, setValue] = useState<Date | string | undefined>(args.value);
    
    return (
      <div data-popup-container>
        <>datepicker value:
        <div> {JSON.stringify(value)}</div>
          
        </>
        <hr />
        <DatePicker
          {...args}
          onApply={newValue => {
            args.onApply?.(newValue);
            setValue(newValue);
          }}
          value={value}
        />
      </div>
    );
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


export const WithProviderTimezone: Story = {
  argTypes: {
    includeTimezoneOffset: BOOLEAN_CONTROL
  },
  args: {
    ...baseArgs,
    showTime: true,
    includeTimezoneOffset: true
  },
};



export const WithProviderTimezonePopulated: Story = {
  argTypes: {
    value: STRING_CONTROL,
    includeTimezoneOffset: BOOLEAN_CONTROL
  },
  args: {
    ...baseArgs,
    showTime: true,
    includeTimezoneOffset: true,
    value: '2024-02-02T14:20:00Z'
  },
};


export const WithSpecificTimezone: Story = {
  args: {
    ...baseArgs,
    showTime: true,
    includeTimezoneOffset: 'Asia/Tokyo'
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
