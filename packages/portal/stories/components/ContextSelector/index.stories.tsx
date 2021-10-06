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

    // const items = Array(500).fill(0);

    return (
      <ContextSelector
        texts={{ ...CONTEXT_TEXTS, buttonLabel: 'Add filter' }}
        onSelectItem={setValue}
        selectedItem={store.state.value}
        items={FLAT_LIST_ITEMS}
        groups={[]}
        addMode={true}
      />

      // <div style={{ width: '300px', height: '402px', overflowY: 'auto', border: '1px solid #000' }}>
      //   <FixedSizeList
      //     itemSize={20}
      //     height={400}
      //     itemCount={items.length}
      //     width={'100%'}
      //     overscanCount={1}
      //     useIsScrolling
      //   >
      //     {({ index, style }) => {
      //       return (
      //         <div key={`item-${index}`} style={{ ...style, width: '100%', height: '20' }}>
      //           {index}
      //         </div>
      //       );
      //     }}
      //   </FixedSizeList>
      // </div>
    );
  }),
};

export default {
  name: 'Components/Filter/ContextSelector',
  config: {},
  stories,
  Component: ContextSelector,
};
