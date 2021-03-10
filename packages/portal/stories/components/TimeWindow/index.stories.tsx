import * as React from 'react';

import Weekly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Weekly/Weekly';
import Daily from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';

export const TIME_PICKER_PROPS: Partial<TimePickerProps> = {
  containerStyle: { width: '268px', maxWidth: 'none' },
  units: ['hour', 'minute'],
  timeFormat: 'HH:mm',
};

const stories = {
  daily: () => {
    return <Daily timePickerProps={TIME_PICKER_PROPS} />;
  },
  weekly: () => {
    return <Weekly timePickerProps={TIME_PICKER_PROPS} />;
  },
};

export default {
  name: 'Components/TimeWindow',
  config: {},
  stories,
};
