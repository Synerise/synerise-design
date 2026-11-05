import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

import type { DailySchedule } from '@synerise/ds-date-range-picker';
import { WeeklyDateFilter } from '@synerise/ds-date-range-picker';

import { fixedWrapper588 } from '../../../utils';
import { schedulerCommonArgTypes } from '../argTypes';
import { TEXTS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Tests',
  component: WeeklyDateFilter,
  tags: ['visualtests'],
  decorators: [fixedWrapper588],
  render: (args) => {
    const [value, setValue] = useState<DailySchedule[]>(args.value);
    return (
      <WeeklyDateFilter
        {...args}
        texts={TEXTS}
        value={value}
        onChange={(newValue) => {
          args.onChange(newValue);
          setValue(newValue);
        }}
      />
    );
  },
  args: {
    valueSelectionMode: ['Hour'],
    maxEntries: 2,
    onChange: fn(),
  },
  argTypes: {
    ...schedulerCommonArgTypes,
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
