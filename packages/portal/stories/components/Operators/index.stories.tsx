import * as React from 'react';

import Operators from '@synerise/ds-operators';
import { withState } from '@dump247/storybook-state';
import { OPERATORS_GROUPS, OPERATORS_ITEMS } from './data/index.data';

const DEFAULT_STATE = {
  value: '',
}

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = (value) => {
      store.set({value});
    }

    return (
      <Operators
        onChange={setValue}
        value={store.state.value}
        items={OPERATORS_ITEMS}
        groups={OPERATORS_GROUPS}
      />
    )
  }
)};

export default {
name: 'Components/Operators',
  config: {},
  stories,
  Component: Operators,
}
