import * as React from 'react';

import ContextSelector from '@synerise/ds-context-selector';
import { withState } from '@dump247/storybook-state';
import { CONTEXT_GROUPS, CONTEXT_ITEMS, CONTEXT_TEXTS } from './data/index.data';
import { CONTEXT_CLIENT_GROUPS, CONTEXT_CLIENT_ITEMS, FLAT_LIST_ITEMS } from './data/client.data';
// import { FixedSizeList } from 'react-window';

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
        items={CONTEXT_ITEMS}
        groups={CONTEXT_GROUPS}
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
        selectedItem={store.state.value}
        items={CONTEXT_CLIENT_ITEMS}
        groups={CONTEXT_CLIENT_GROUPS}
        addMode={true}
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
        selectedItem={store.state.value}
        items={FLAT_LIST_ITEMS}
        groups={[]}
        addMode={true}
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
