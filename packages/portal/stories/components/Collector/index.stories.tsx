import * as React from 'react';

import Collector from '@synerise/ds-collector';

const decorator = storyFn => (
  <div style={{ width: '588px' }}>
    <div style={{ background: '#fff', width: '588px' }}>{storyFn()}</div>
  </div>
);

const stories = {
  default: () => ({}),
};

export default {
  name: 'Components|Collector',
  config: {},
  stories,
  Component: Collector,
  decorator,
};
