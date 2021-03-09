import * as React from 'react';

import Daily from '@synerise/ds-time-window/dist/Elements/Daily/Daily';
import Weekly from '@synerise/ds-time-window/dist/Elements/Weekly/Weekly';

const stories = {
  daily: () => {
    return <Daily />;
  },
  weekly: () => {
    return <Weekly />;
  },
};

export default {
  name: 'Components/TimeWindow',
  config: {},
  stories,
};
