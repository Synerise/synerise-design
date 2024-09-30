import React from 'react';
import { withState } from '@dump247/storybook-state';
import { boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ItemsRoll from '@synerise/ds-items-roll';
import { Add3M, SaveM } from '@synerise/ds-icon';

import {
  ACTIONS,
  actionsSelectOptions,
  AfterClearInfo,
  DEFAULT_GROUPED_STATE,
  DEFAULT_STATE,
  getTexts,
  GROUPED_ITEMS,
  groupOptions,
  ITEMS_100,
  ITEMS_1000,
  onChangeSelectionOptions,
  SEARCH_PLACEHOLDER,
} from './dataset';
import Icon from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import { renderFooter } from '../Dropdown/index.stories';

const decorator = storyFn => (
  <div style={{ width: '800px' }}>
    <div style={{ background: '#fff', width: '628px', padding: '20px' }}>{storyFn()}</div>
  </div>
);

const onSearchClear = store => {
  store.set({
    searchValue: '',
    items: ITEMS_100,
  });
};

const onSearch = (value, store) => {
  const lookupItems = ITEMS_100;

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
  actions: boolean(`Show Actions menu`, true) && ACTIONS,
  className: 'custom-class',
  items: store.state.items,
  visibleItemsLimit: number('visibleItemsLimit', 10),
  onChangeSelection: select('onChangeSelection', onChangeSelectionOptions, onChangeSelectionOptions.function),
  onClearAll: select('onClearAll', onClearAllOptions, onClearAllOptions.function),
  onItemClick: action('onItemClick'),
  onItemRemove: action('onItemRemove'),
  onSearch: value => onSearch(value, store),
  onSearchClear: () => onSearchClear(store),
  searchPlaceholder: SEARCH_PLACEHOLDER,
  searchValue: store.state.searchValue,
  showMoreStep: number('showMoreStep', 10),
  useFooter: boolean('useFooter', true),
  useVirtualizedList: boolean('useVirtualizedList', false),
  hideSearch: boolean('Hide search', false),
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

  withVirtualizedList: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [visible, setVisible] = React.useState(true);

    const filteredItems = React.useMemo(() => {
      return !searchValue
        ? ITEMS_1000
        : ITEMS_1000.filter(item => {
            return item.text.toLowerCase().includes(searchValue.toLowerCase());
          });
    }, [searchValue]);

    const props = {
      actions: select(`Actions menu`, actionsSelectOptions, actionsSelectOptions.actions),
      className: 'custom-class',
      items: filteredItems,
      onChangeSelection: select('onChangeSelection', onChangeSelectionOptions, onChangeSelectionOptions.function),
      onClearAll: () => setVisible(false),
      onItemClick: action('onItemClick'),
      onItemRemove: action('onItemRemove'),
      onSearchClear: () => setSearchValue(''),
      searchPlaceholder: SEARCH_PLACEHOLDER,
      searchValue: searchValue,
      useFooter: boolean('useFooter', true),
      visibleItemsLimit: number('visibleItemsLimit', 20),
      onSearch: value => setSearchValue(value),
      showMoreStep: number('showMoreStep', 100),
      useVirtualizedList: boolean('useVirtualizedList', true),
    };

    return visible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  },

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
          searchValue: '',
          items: lookupItems,
        });
      }
    };

    const onSearchClear = (store) => {
      store.set({
        searchValue: '',
        items: GROUPED_ITEMS.items,
      });
    };

    const props = {
      ...generateProps(store, { onClearAllOptions }),
      onSearchClear: () => onSearchClear(store),
      groups: select('withGroups', groupOptions, groupOptions.yes),
      onSearch: value => onSearchGrouped(value, store),
    };

    return store.state.componentVisible ? <ItemsRoll {...props} /> : <AfterClearInfo />;
  }),
  withChangeSelectionDropdown: () => {
    const [visible, setVisible] = React.useState(false);

    const data = [
      { text: 'Option 1' },
      { text: 'Option 2' },
    ];

    const props = {
      actions: select(`Actions menu`, actionsSelectOptions, actionsSelectOptions.actions),
      className: 'custom-class',
      items: ITEMS_100.slice(0, 10),
      onClearAll: () => setVisible(false),
      onItemClick: action('onItemClick'),
      onItemRemove: action('onItemRemove'),
      onSearchClear: () => {},
      searchPlaceholder: SEARCH_PLACEHOLDER,
      searchValue: '',
      useFooter: boolean('useFooter', true),
      visibleItemsLimit: number('visibleItemsLimit', 20),
      onSearch: () => {},
      showMoreStep: number('showMoreStep', 100),
      useVirtualizedList: boolean('useVirtualizedList', true),
      onChangeSelection: () => {},
      changeSelectionDropdownProps: {
        overlay: (
          <Dropdown.Wrapper
            style={{ width: '157px' }}
            onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
          >
            <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }} />
          </Dropdown.Wrapper>
        ),
        trigger: ['click'],
        visible,
        onVisibleChange: () => setVisible(!visible)
      }
    };

    // @ts-ignore
    return <ItemsRoll {...props} />;
  },
  withCustomSideBarActions: withState(DEFAULT_STATE)(({store}) => {

    const onClearAllOptions = {
      function: () => onClearAll(store),
      none: undefined,
    };
    const props = generateProps(store, { onClearAllOptions });

    return (
        <ItemsRoll
          {...props}
          onChangeSelection={!boolean('Hide change selection', true) && props.onChangeSelection}
          customSidebarActions={
            <div style={{ display: 'flex', marginRight: '8px' }}>
              <Button
                mode='icon-label'
                type='ghost'
                icon={
                  <Icon
                    component={<SaveM />}
                    color={theme.palette['grey-600']}
                  />
                }
                onClick={() => window.alert('Click custom action')}
              >
                Save list
              </Button>
            </div>
          }
        />
      );
  })
};

export default {
  name: 'Components/ItemsRoll',
  decorator,
  stories,
  Component: ItemsRoll,
};
