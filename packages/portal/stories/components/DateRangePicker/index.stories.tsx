import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { ABSOLUTE, DAYS, RELATIVE, RELATIVE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { boolean } from '@storybook/addon-knobs';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '340px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const stories = {
  default: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={console.log}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={{
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
          clear: 'Clear',
        }}
      />
    );
  },
};

export default {
  name: 'Pickers|DateRangePicker',
  config: {},
  stories,
  decorator,
};
