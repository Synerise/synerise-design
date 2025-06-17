import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';

import MonthlyDateFilter from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Monthly/Monthly';
import { MonthlySchedule, MonthlyProps } from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Monthly/Monthly.types';

import { fixedWrapper588 } from '../../../utils';
import { schedulerCommonArgTypes } from '../argTypes';
import { TIME_PICKER_PROPS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Schedulers',
  component: MonthlyDateFilter,
  tags: ['autodocs'],
  decorators: [fixedWrapper588],
  render: (args) => <MonthlyDateFilter {...args} />,
  argTypes: {
    ...schedulerCommonArgTypes,
  },

} as Meta<MonthlyProps>;

type Story = StoryObj<MonthlyProps>;

export const MonthlyFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState<MonthlySchedule>({});
    return <MonthlyDateFilter
      {...args}
      onChange={(newValue) => { action('onChange')(newValue); setValue(newValue); }}
      value={value}
    />
  },
  args: {
    timePickerProps: TIME_PICKER_PROPS,
  },
};
