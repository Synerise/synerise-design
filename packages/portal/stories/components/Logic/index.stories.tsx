import * as React from 'react';

import Logic from '@synerise/ds-logic';
import { withState } from '@dump247/storybook-state';
import { boolean, text } from '@storybook/addon-knobs';

const DEFAULT_STATE = {
  value: 'AND',
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const handleChange = value => store.set({ value });
    return <Logic value={store.state.value} onChange={handleChange} readOnly={boolean('Set readOnly', false)} />;
  }),
  matching: withState({ matching: true })(({ store }) => {
    const handleChange = matching => store.set({ matching });
    return (
      <Logic.Matching
        sentence={text('Set matching sentence', 'find all items #MATCHING_TOGGLE# this condition')}
        matching={store.state.matching}
        onChange={handleChange}
        readOnly={boolean('Set readOnly', false)}
      />
    );
  }),
};

export default {
  name: 'Components/Filter/Logic',
  config: {},
  stories,
  Component: Logic,
};
