import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { ABSOLUTE, RELATIVE_PRESETS } from '@synerise/ds-date-range-picker/dist/constants';
import { boolean } from '@storybook/addon-knobs';

const stories = {
  default: () => {
    return <DateRangePicker onApply={console.log} />;
  },
  absolute: () => {
    const showTime = boolean('showTime', true);
    const value = {
      type: ABSOLUTE,
      from: '2018-11-08T00:00:00+01:00',
      to: '2018-11-08T23:59:59+01:00',
    };
    return <DateRangePicker showTime={showTime} value={value} onApply={() => {}} />;
  },
  relative: () => {
    const showTime = boolean('showTime', true);
    const value = RELATIVE_PRESETS[0];
    const forceAbsolute = boolean('forceAbsolute', false);

    return (
      <DateRangePicker
        showTime={showTime}
        value={value}
        onApply={() => {}}
        relativeFuture
        forceAbsolute={forceAbsolute}
      />
    );
  },
  withFilter: () => {
    const showTime = boolean('showTime', true);
    //const value = RELATIVE_PRESETS[0];
    return <DateRangePicker showTime={showTime} showFilter onApply={() => {}} relativeFuture />;
  },
};

export default {
  name: 'Components|DateRangePicker',
  config: {},
  stories,
};
