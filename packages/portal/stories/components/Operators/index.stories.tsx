import * as React from 'react';

import Operators from '@synerise/ds-operators';
import { withState } from '@dump247/storybook-state';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from './data/index.data';
import { action } from '@storybook/addon-actions';

const DEFAULT_STATE = {
  value: '',
};

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };

    return (
      <Operators
        texts={OPERATORS_TEXTS}
        onChange={setValue}
        value={store.state.value}
        items={OPERATORS_ITEMS}
        groups={OPERATORS_GROUPS}
        onDeactivate={action('deactivate')}
      />
    );
  }),
};

export default {
  name: 'Components/Filter/Operators',
  config: {},
  stories,
  Component: Operators,
};
