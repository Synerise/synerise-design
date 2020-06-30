import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';

const stories = {
  default: () => {
    return (
      <DateRangePicker onApply={console.log}/>
    );
  },
};

export default {
  name: 'Components|DateRangePicker',
  config: {},
  stories,
};
