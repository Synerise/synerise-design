import React from 'react';

import Operators from '@synerise/ds-operators';
import { withState } from '@dump247/storybook-state';
import { OPERATORS_GROUPS, OPERATORS_ITEMS, OPERATORS_TEXTS } from './data/index.data';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

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
        onDeactivate={action('onDeactivate')}
        onActivate={action('onActivate')}
        readOnly={boolean('Set readOnly', false)}
      />
    );
  }),
  singleGroup: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };
    const group = OPERATORS_GROUPS[0];
    const items = OPERATORS_ITEMS.filter( item => item.groupId == group.id)
    return (
      <Operators
        texts={OPERATORS_TEXTS}
        onChange={setValue}
        value={store.state.value}
        items={items}
        groups={[group]}
        onDeactivate={action('onDeactivate')}
        onActivate={action('onActivate')}
        readOnly={boolean('Set readOnly', false)}
      />
    );
  })
};

export default {
  name: 'Components/Filter/Operators',
  config: {},
  stories,
  Component: Operators,
};
