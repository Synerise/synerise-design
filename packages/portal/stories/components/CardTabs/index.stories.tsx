import * as React from 'react';
import range from 'lodash/range';
import CardTabs from '@synerise/ds-card-tabs';
import { withState } from '@dump247/storybook-state';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { CardTab } from '@synerise/ds-card-tabs';
import { prefixType } from '@synerise/ds-card-tabs';
import type { CardTabsItem } from '@synerise/ds-card-tabs';
import { action } from '@storybook/addon-actions';
import { ShowM, OptionHorizontalM } from '@synerise/ds-icon';
import { CardTabsStyles } from '@synerise/ds-card-tabs';
import { defaultColorsOrder } from '@synerise/ds-core';

const { CardTab: { CardDot } } = CardTabsStyles;

const suffixIcon = {
  singleIcon: <OptionHorizontalM />,
  cruds: null,
  menu: null
};
const types = {
  singleIcon: 'singleIcon',
  cruds: 'cruds',
  menu: 'menu'
};

const stories = {
  default: withState({
    name: 'Example',
  })(({ store }) => {
    const bg = boolean('White background', true);
    const prefix = select(
      'Set prefix type',
      { tag: prefixType.TAG, icon: prefixType.ICON, colorDot: prefixType.DOT, dragHandle: prefixType.HANDLE },
      prefixType.TAG
    );
    
    const suffixType = select('Set suffix type', types, 'menu');
    const isActive = boolean('Is active', false);
    const disabled = boolean('Disabled tabs', false);
    const invalid = boolean('Invalid tabs', false);
    const invalidName = boolean('Invalid tab name', false);
    const setCustomColor = boolean('Set custom color', false);
    const renameEnabled = boolean('Rename enabled', true);

    const selectCustomColor = setCustomColor ? select('Pick custom color',defaultColorsOrder, 'blue-500') : undefined;
    const handleChangeName = (id, name) => {
      store.set({
        name,
      });
    };
    const handleSelect = id => {
      store.set({ activeTab: id });
    };
    const handleChangeOrder = (newOrder: CardTabsItem[]): void => {
      store.set({ items: newOrder });
    };
    
    return (
      <div style={{ background: bg ? '#fff' : '#f9fafb', padding: '12px' }}>
        <CardTabs onChangeOrder={boolean('Draggable card tabs', true) ? handleChangeOrder : undefined}>
          <CardTab
            id={1}
            index={1}
            name={store.state.name}
            tag={select('Select tag', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 'A')}
            active={isActive}
            greyBackground={!bg}
            color={setCustomColor ?`${selectCustomColor}` : undefined}
            colorDot={<CardDot />}
            prefixIcon={<ShowM />}
            suffixIcon={suffixIcon[suffixType]}
            actionsAsDropdown={suffixType==='menu'}
            disabled={disabled}
            prefix={prefix}
            onSelectTab={handleSelect}
            onChangeName={renameEnabled ? handleChangeName : undefined}
            onRemoveTab={boolean('Removing enabled', true) ? action('Remove tab') : undefined}
            onDuplicateTab={boolean('Duplicate enabled', true) ? action('Duplicate tab') : undefined}
            texts={{
              changeNameMenuItem: text('Set rename menu item', 'Rename'),
              removeMenuItem: text('Set remove menu item', 'Remove'),
              duplicateMenuItem: text('Set duplicate menu item', 'Duplicate'),
            }}
            invalid={invalid}
            invalidName={invalidName}
          />
        </CardTabs>
      </div>
    );
  }),
  group: withState({
    items: range(3).map((i: number) => ({
      id: i,
      name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
      tag: String.fromCharCode(65 + i).toUpperCase(),
      itemData: {
        age: i * 10,
        name: `Name ${String.fromCharCode(65 + i).toUpperCase()}`,
        city: `City ${String.fromCharCode(65 + i).toUpperCase()}`,
      },
    })),
    activeTab: 0,
    nextId: 3,
  })(({ store }) => {
    
    const bg = boolean('White background', true);
    const prefix = select(
      'Set prefix type',
      { tag: prefixType.TAG, icon: prefixType.ICON, colorDot: prefixType.DOT, dragHandle: prefixType.HANDLE },
      prefixType.TAG
    );
    const suffixType = select('Set suffix type', types, 'menu');
    const disabled = boolean('Disabled tabs', false);
    const invalid = boolean('Invalid tabs', false);
    const invalidName = boolean('Invalid names', false);
    const maxTabCount = number('Max number of tabs', 4);
    const setCustomColor = boolean('Set custom color', false);
    const renameEnabled = boolean('Rename enabled', true);

    const handleChangeName = (id, name) => {
      store.set({
        items: store.state.items.map(item => {
          return item.id === id
            ? {
                ...item,
                name: name,
              }
            : item;
        }),
      });
    };

    const getIndex = id => {
      return store.state.items.findIndex(item => item.id === id)
    }

    const handleRemove = id => {
      store.set({
        items: store.state.items.filter(item => item.id !== id),
      });
    };
    const customColorTag = (id) => {
      store.set({
        items: store.state.items.map(item => {
          return item.id === id
            ? {
              ...item,
              name: name,
            }
            : item;
        }),
      });
    };

    const handleDuplicate = id => {
      const duplicatedTab = store.state.items.find(item => item.id === id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...duplicatedTab,
            tag: String.fromCharCode(65 + store.state.nextId).toUpperCase(),
            id: store.state.nextId,
          },
        ],
        nextId: store.state.nextId + 1,
      });
    };
    
    const handleAddItem = () => {
      store.set({
        items: [
          ...store.state.items,
          {
            id: store.state.nextId,
            name: `Variant ${String.fromCharCode(65 + store.state.nextId).toUpperCase()}`,
            tag: String.fromCharCode(65 + store.state.nextId).toUpperCase(),
            itemData: {
              age: store.state.nextId * 10,
              name: `Name ${String.fromCharCode(65 + store.state.nextId).toUpperCase()}`,
              city: `City ${String.fromCharCode(65 + store.state.nextId).toUpperCase()}`,
            },
          },
        ],
        nextId: store.state.nextId + 1,
      });
    };
    
    const handleChangeOrder = (newOrder: CardTabsItem[]): void => {
      store.set({ items: [ ...newOrder ] });
    };
    const handleSelect = id => {
      store.set({ activeTab: id });
    };

    const isTabsLimitNotExceeded = store.state.items.length < maxTabCount;

    const maxWidth = number('Container\'s max-width (e.g. 588px)', 0);
    const additionalStyle = maxWidth ? {'maxWidth': maxWidth} : {};
    const addTabLabel = text('Add new card label', '');

    return (
      <div style={{ background: bg ? '#fff' : '#f9fafb', padding: '12px', ...additionalStyle }}>
        <CardTabs
          maxTabsCount={maxTabCount}
          onChangeOrder={boolean('Draggable card tabs', true) ? handleChangeOrder : undefined}
          onAddTab={handleAddItem}
          addTabLabel={addTabLabel}
        >
          {store.state.items.map((item,i) => (
            <CardTab
              id={item.id}
              name={item.name}
              tag={item.tag}
              active={item.id === store.state.activeTab}
              color={setCustomColor ? `${select(`Pick custom card-tabs's color (card-tab ${i + 1})`, defaultColorsOrder, `${defaultColorsOrder[i + 1 % defaultColorsOrder.length]}`)}`: item.color}
              colorDot={<CardDot />}
              greyBackground={!bg}
              prefixIcon={<ShowM />}
              suffixIcon={suffixIcon[suffixType]}
              disabled={disabled}
              prefix={prefix}
              onSelectTab={handleSelect}
              onChangeName={renameEnabled ? handleChangeName : undefined}
              onRemoveTab={boolean('Removing enabled', true) ? handleRemove : undefined}
              onDuplicateTab={
                boolean('Enable not displaying "duplicate" action if reached cards limit', true)
                  ? isTabsLimitNotExceeded
                    ? handleDuplicate
                    : undefined
                  : handleDuplicate
              }
              texts={{
                changeNameMenuItem: 'Rename',
                removeMenuItem: 'Remove',
                duplicateMenuItem: 'Duplicate',
              }}
              actionsAsDropdown={suffixType==='menu'}
              invalid={invalid}
              invalidName={invalidName}
              itemData={item.itemData}
            />
          ))}
        </CardTabs>
      </div>
    );
  }),
};

export default {
  name: 'Components/CardTabs',
  stories,
  Component: CardTabs,
};
