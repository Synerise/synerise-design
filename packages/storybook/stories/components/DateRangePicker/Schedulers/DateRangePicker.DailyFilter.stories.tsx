import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';


import { DailyDateFilter } from '@synerise/ds-date-range-picker';
import { DailySchedule } from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily.types';

import { fixedWrapper588 } from '../../../utils';
import { schedulerCommonArgTypes } from '../argTypes';
import { TEXTS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Schedulers',
  component: DailyDateFilter,
  tags: ['autodocs'],
  decorators: [fixedWrapper588],
  render: (args) => <DailyDateFilter {...args} />,
  argTypes: {
    ...schedulerCommonArgTypes
  },

} as Meta<typeof DailyDateFilter>;

type Story = StoryObj<typeof DailyDateFilter>;

export const DailyFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState<DailySchedule[]>([]);

    console.log(args.valueSelectionMode)

    return <DailyDateFilter
      {...args}
      texts={TEXTS}
      value={value}
      onChange={(newValue) => { action('onChange')(newValue); setValue(newValue); }}
    />
  },
  args: {
    valueSelectionMode: ['Hour', 'Range'],
    maxEntries: 4
  },
};
