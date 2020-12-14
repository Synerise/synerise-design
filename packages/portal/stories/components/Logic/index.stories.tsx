import * as React from 'react';

import Logic from '@synerise/ds-logic';
import { withState } from '@dump247/storybook-state';

const DEFAULT_STATE = {
  value: 'AND',
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const handleChange = value => store.set({ value });
    return <Logic value={store.state.value} onChange={handleChange} />;
  }),
};

export default {
  name: 'Components/Logic',
  config: {},
  stories,
  Component: Logic,
};
