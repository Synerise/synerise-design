import { Meta, StoryObj } from '@storybook/react-vite';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useState } from 'react';

import DatePicker from '@synerise/ds-date-picker';

import {
  BOOLEAN_CONTROL,
  fixedWrapper588,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
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

  parameters: {
    mockingDate: new Date('March 10, 2021 10:00:00'),
  },
  render: (args) => {
    const [value, setValue] = useState<Date | string | undefined>(args.value);

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
    disabled: BOOLEAN_CONTROL,
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
    timeZone: {
      description:
        'Enables timezone-aware mode. `true` uses the provider timezone; a string (e.g. `"Asia/Tokyo"`) uses a specific IANA timezone. Only available when `ValueType = string`.',
      control: { type: 'text' },
    },
  },
} as Meta<typeof DatePicker>;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    ...baseArgs,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} />`,
      },
    },
  },
};

export const WithTime: Story = {
  args: {
    ...baseArgs,
    showTime: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} showTime />`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  onApply={handleApply}
  hideNow
  useStartOfDay
  quickPicks={[
    { label: 'In 3 days', value: addDays(new Date(), 3) },
    { label: 'In 1 week', value: addWeeks(new Date(), 1) },
  ]}
/>`,
      },
    },
  },
};

export const InactiveDates: Story = {
  args: {
    ...baseArgs,
    disabledDates,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} disabledDates={(date) => isTooFar(date)} />`,
      },
    },
  },
};

export const WithProviderTimezone: Story = {
  argTypes: {
    timeZone: BOOLEAN_CONTROL,
  },
  args: {
    ...baseArgs,
    showTime: true,
    timeZone: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} showTime timeZone />`,
      },
    },
  },
};

export const WithProviderTimezonePopulated: Story = {
  argTypes: {
    value: STRING_CONTROL,
    timeZone: BOOLEAN_CONTROL,
  },
  args: {
    ...baseArgs,
    showTime: true,
    timeZone: true,
    value: '2024-02-02T14:20:00Z',
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker
  value="2024-02-02T14:20:00Z"
  onApply={handleApply}
  showTime
  timeZone
/>`,
      },
    },
  },
};

export const WithSpecificTimezone: Story = {
  args: {
    ...baseArgs,
    showTime: true,
    timeZone: 'Asia/Tokyo',
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} showTime timeZone="Asia/Tokyo" />`,
      },
    },
  },
};

export const PrefixAndSuffix: Story = {
  args: {
    ...baseArgs,
    prefixel: 'Prefix',
    suffixel: 'Sufffix',
    disabledDates,
  },
  parameters: {
    docs: {
      source: {
        code: `<DatePicker onApply={handleApply} prefixel="Prefix" suffixel="Suffix" />`,
      },
    },
  },
};
