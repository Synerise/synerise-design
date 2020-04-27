import * as React from 'react';
import { withState } from '@dump247/storybook-state';
import { boolean, select, number } from '@storybook/addon-knobs';
import ItemsRoll from '@synerise/ds-items-roll';
import { Add3M } from '@synerise/ds-icon/dist/icons';

import {
  actionsSelectOptions,
  AfterClearInfo,
  DEFAULT_GROUPED_STATE,
  DEFAULT_STATE,
  DEFAULT_STATE_VIRTUALIZED,
  getTexts,
  GROUPED_ITEMS,
  groupOptions,
  ITEMS_100,
  ITEMS_1000,
  onChangeSelectionOptions,
  SEARCH_PLACEHOLDER,
} from './dataset';

const decorator = storyFn => (
  <div style={{ width: '800px' }}>
    <div style={{ background: '#fff', width: '628px', padding: '20px' }}>{storyFn()}</div>
  </div>
);

const onSearchClear = store => {
  store.set({
    searchValue: '',
  });
};

const onSearch = (value, store, virtualized = false) => {
  const lookupItems = virtualized ? ITEMS_1000 : ITEMS_100;

  if (store.state.searchValue !== value) {
    const filteredItems = lookupItems.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

    store.set({
      searchValue: value,
      items: filteredItems,
    });
  }

  if (value === '') {
    store.set({
      items: lookupItems,
    });
  }
};

const onClearAll = store => {
  store.set({
    searchValue: '',
    items: [],
    componentVisible: false,
  });
};

const generateProps = (store, { onClearAllOptions }) => ({
  actions: select(`Actions menu`, actionsSelectOptions, actionsSelectOptions.actions),
  className: 'custom-class',
  items: store.state.items,
  maxToShowItems: number('maxToShowItems', 10),
  onChangeSelection: select('onChangeSelection', onChangeSelectionOptions, onChangeSelectionOptions.function),
  onClearAll: select('onClearAll', onClearAllOptions, onClearAllOptions.function),
  onSearch: value => onSearch(value, store),
  onSearchClear: () => onSearchClear(store),
  searchPlaceholder: SEARCH_PLACEHOLDER,
  searchValue: store.state.searchValue,
  showMoreStep: number('showMoreStep', 10),
  useFooter: boolean('useFooter', true),
  useVirtualizedList: boolean('useVirtualizedList', false),
});

const stories = {
  default: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = generateProps(store, { onClearAllOptions });

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withCustomChangeSelectIcon: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = {
      ...generateProps(store, { onClearAllOptions }),
      changeSelectionIcon: Add3M,
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withCustomTexts: withState(DEFAULT_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = {
      ...generateProps(store, { onClearAllOptions }),
      texts: getTexts() as any,
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withVirtualizedList: withState(DEFAULT_STATE_VIRTUALIZED)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = {
      ...generateProps(store, { onClearAllOptions }),
      maxToShowItems: number('maxToShowItems', 200),
      onSearch: value => onSearch(value, store, true),
      showMoreStep: number('showMoreStep', 200),
      useVirtualizedList: boolean('useVirtualizedList', true),
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),

  withGroups: withState(DEFAULT_GROUPED_STATE)(({ store }) => {
    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };

    const onSearchGrouped = (value, store) => {
      const lookupItems = GROUPED_ITEMS.items;

      if (store.state.searchValue !== value) {
        const filteredItems = lookupItems.filter(item => item.text.toLowerCase().includes(value.toLowerCase()));

        store.set({
          searchValue: value,
          items: filteredItems,
        });
      }

      if (value === '') {
        store.set({
          items: GROUPED_ITEMS.items,
        });
      }
    };

    const props = {
      ...generateProps(store, { onClearAllOptions }),
      groups: select('withGroups', groupOptions, groupOptions.yes),
      onSearch: value => onSearchGrouped(value, store),
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),
};

export default {
  name: 'Components|ItemsRoll',
  decorator,
  stories,
  Component: ItemsRoll,
};
