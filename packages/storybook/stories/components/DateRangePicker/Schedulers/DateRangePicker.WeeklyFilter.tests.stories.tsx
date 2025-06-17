import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { fn } from 'storybook/test';

import { WeeklyDateFilter } from '@synerise/ds-date-range-picker';
import { DailySchedule } from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily.types';

import { schedulerCommonArgTypes } from '../argTypes';

import { fixedWrapper588 } from '../../../utils';
import { TEXTS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Tests',
  component: WeeklyDateFilter,
  tags: ['visualtests'],
  decorators: [fixedWrapper588],
  render: (args) => {
    const [value, setValue] = useState<DailySchedule[]>(args.value);
    return <WeeklyDateFilter
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

} as Meta<typeof WeeklyDateFilter>;

type Story = StoryObj<typeof WeeklyDateFilter>;

// export const TestMultipleDays: Story = {
//   play: async ({ canvasElement, step, args }) => {
//     const canvas = within(canvasElement);
//     await userEvent.click(canvas.getByText(''));
//     await userEvent.click(canvas.getByText(TEXTS.addTime));
//     expect(args.onChange).toHaveBeenCalledTimes(2);    
//     expect(canvas.queryByText(TEXTS.addTime)).not.toBeInTheDocument();
//   }
// };

