import React from 'react';

import ContextSelector from '@synerise/ds-context-selector';
import { withState } from '@dump247/storybook-state';
import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from './data/index.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS, FLAT_LIST_ITEMS } from './data/client.data';
import { ItemSize } from '@synerise/ds-menu';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

const DEFAULT_STATE = {
  value: undefined,
};

const stories = {
  businessContext: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };

    return (
      <ContextSelector
        texts={CONTEXT_TEXTS}
        onSelectItem={setValue}
        selectedItem={store.state.value}
        defaultDropdownVisibility={boolean('Default dropdown visibility', false)}
        items={CONTEXT_ITEMS}
        groups={CONTEXT_GROUPS}
        onActivate={action('onActivate')}
        onDeactivate={action('onDeactivate')}
        loading={boolean('Set loading', false)}
        disabled={boolean('Set disabled', false)}
        readOnly={boolean('Set readOnly', false)}
        hideSearchField={boolean('Hide Search Field', false)}
      />
    );
  }),
  largeItems: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };

    return (
      <ContextSelector
        texts={CONTEXT_TEXTS}
        onSelectItem={setValue}
        defaultDropdownVisibility={boolean('Default dropdown visibility', false)}
        selectedItem={store.state.value}
        items={CONTEXT_ITEMS}
        groups={CONTEXT_GROUPS}
        menuItemHeight={ItemSize.LARGE}
        onActivate={action('onActivate')}
        onDeactivate={action('onDeactivate')}
        disabled={boolean('Set disabled', false)}
        readOnly={boolean('Set readOnly', false)}
        hideSearchField={boolean('Hide Search Field', false)}
      />
    );
  }),
  clientContext: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };

    return (
      <ContextSelector
        texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
        onSelectItem={setValue}
        defaultDropdownVisibility={boolean('Default dropdown visibility', false)}
        selectedItem={store.state.value}
        items={CONTEXT_CLIENT_ITEMS}
        groups={CONTEXT_CLIENT_GROUPS}
        addMode={true}
        onActivate={action('onActivate')}
        onDeactivate={action('onDeactivate')}
        disabled={boolean('Set disabled', false)}
        readOnly={boolean('Set readOnly', false)}
        hideSearchField={boolean('Hide Search Field', false)}
      />
    );
  }),
  flatContextSelector: withState(DEFAULT_STATE)(({ store }) => {
    const setValue = value => {
      store.set({ value });
    };

    return (
      <ContextSelector
        texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
        onSelectItem={setValue}
        defaultDropdownVisibility={boolean('Default dropdown visibility', false)}
        selectedItem={store.state.value}
        items={FLAT_LIST_ITEMS}
        groups={[]}
        addMode={true}
        onActivate={action('onActivate')}
        onDeactivate={action('onDeactivate')}
        disabled={boolean('Set disabled', false)}
        readOnly={boolean('Set readOnly', false)}
        hideSearchField={boolean('Hide Search Field', false)}
      />
    );
  }),
};

export default {
  name: 'Components/Filter/ContextSelector',
  config: {},
  stories,
  Component: ContextSelector,
};
