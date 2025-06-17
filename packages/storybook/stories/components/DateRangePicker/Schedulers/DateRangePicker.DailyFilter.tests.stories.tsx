import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, userEvent, expect, fn } from 'storybook/test';

import { DailyDateFilter } from '@synerise/ds-date-range-picker';
import { DailySchedule } from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily.types';

import { schedulerCommonArgTypes } from '../argTypes';

import { fixedWrapper588 } from '../../../utils';
import { DAILY_FILTER_VALUE_HOUR, DAILY_FILTER_VALUE_RANGE, TEXTS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Tests',
  component: DailyDateFilter,
  tags: ['visualtests'],
  decorators: [fixedWrapper588],
  render: (args) => {
    const [value, setValue] = useState<DailySchedule[]>(args.value);
    return <DailyDateFilter
      {...args}
      texts={TEXTS}
      value={value}
      onChange={(newValue) => { args.onChange(newValue); setValue(newValue); }}
    />
  },
  args: {
    valueSelectionMode: ['Hour'],
    maxEntries: 2,
    onChange: fn()
  },
  argTypes: {
    ...schedulerCommonArgTypes
  },

} as Meta<typeof DailyDateFilter>;

type Story = StoryObj<typeof DailyDateFilter>;

export const TestMaxEntries: Story = {
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(TEXTS.addTime));
    await userEvent.click(canvas.getByText(TEXTS.addTime));
    expect(args.onChange).toHaveBeenCalledTimes(2);
    expect(canvas.queryByText(TEXTS.addTime)).not.toBeInTheDocument();
  }
};


export const VisualRangeSelectionMode: Story = {
  args: {
    valueSelectionMode: ['Range'],
    value: [
      { ...DAILY_FILTER_VALUE_HOUR, start: '07:11:00.000', stop: '11:08:55.000' },
      { ...DAILY_FILTER_VALUE_HOUR, start: '11:43:21.000', stop: '13:43:21.000' }
    ]
  }
};

export const VisualHourSelectionMode: Story = {
  args: {
    valueSelectionMode: ['Hour'],
    value: [
      { ...DAILY_FILTER_VALUE_HOUR, start: '03:14:18.000', stop: '03:14:18.000' },
      { ...DAILY_FILTER_VALUE_HOUR, start: '13:43:21.000', stop: '13:43:21.000' }
    ]
  }
};

export const VisualBothSelectionModes: Story = {
  args: {
    valueSelectionMode: ['Hour', 'Range'],
    value: [
      { ...DAILY_FILTER_VALUE_HOUR, start: '03:14:18.000', stop: '13:14:18.000' },
      { ...DAILY_FILTER_VALUE_RANGE, start: '13:43:21.999', stop: '20:15:00.999' }
    ]
  }
};
