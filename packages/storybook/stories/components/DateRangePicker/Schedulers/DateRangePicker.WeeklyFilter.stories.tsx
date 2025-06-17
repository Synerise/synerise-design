import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';

import { WeeklyDateFilter, WeeklySchedule } from '@synerise/ds-date-range-picker';


import { fixedWrapper588 } from '../../../utils';
import { schedulerCommonArgTypes } from '../argTypes';
import { TIME_PICKER_PROPS } from '../constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Schedulers',
  component: WeeklyDateFilter,
  tags: ['autodocs'],
  decorators: [fixedWrapper588],
  render: (args) => <WeeklyDateFilter {...args} />,
  argTypes: {
    ...schedulerCommonArgTypes,
  }
} as Meta<typeof WeeklyDateFilter>;

type Story = StoryObj<typeof WeeklyDateFilter>;

export const WeeklyFilter: Story = {
  render: (args) => {
    const [value, setValue] = useState<WeeklySchedule>({});
    return <WeeklyDateFilter
      {...args}
      onChange={(newValue) => { action('onChange')(newValue); setValue(newValue); }}
      value={value}
    />
  },
  args: {
    timePickerProps: TIME_PICKER_PROPS,
  },
};
