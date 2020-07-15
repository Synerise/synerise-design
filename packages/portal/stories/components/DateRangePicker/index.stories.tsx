import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { ABSOLUTE, DAYS, RELATIVE, RELATIVE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { boolean } from '@storybook/addon-knobs';
import { RelativeDateRange } from '@synerise/ds-date-range-picker/dist/date.types';
const stories = {
  default: () => {
    const value = RELATIVE_PRESETS[0];
    const showTime = boolean('Set showTime', true);
    return (
      <DateRangePicker
        onApply={console.log}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
      />
    );
  },
};

export default {
  name: 'Components|DateRangePicker',
  config: {},
  stories,
};
