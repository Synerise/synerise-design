import * as React from 'react';
import range from 'lodash/range';
import CardTabs from '@synerise/ds-card-tabs';
import { withState } from '@dump247/storybook-state';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import CardTab from '@synerise/ds-card-tabs/dist/CardTab/CardTab';
import { prefixType }  from '@synerise/ds-card-tabs/dist/CardTab/CardTab.types';
import { CardTabsItem } from '@synerise/ds-card-tabs/dist/CardTabs.types';
import { action } from '@storybook/addon-actions';
import { ShowM, OptionHorizontalM } from '@synerise/ds-icon/dist/icons';
import { CardDot } from '@synerise/ds-card-tabs/dist/CardTab/CardTab.styles';



const stories = {
  default: withState({
    name: 'Example',
  })(({store}) => {
    const bg = boolean('White background', true);
    const prefix = select('Prefix type', {'tag': prefixType.TAG, 'icon': prefixType.ICON,'colorDot': prefixType.DOT}, prefixType.TAG);
    const suffixIcon = boolean('Set single icon', false);
    const isActive = boolean('Is active', false);
    const disabled = boolean('Disabled tabs', false);
    const invalid = boolean('Invalid tabs', false);
    const invalidName = boolean('Invalid tab name', false);
    const handleChangeName = (id, name) => {
      store.set({
        name
      });
    };

    return (
      <div style={{background: bg ? '#fff' : '#f9fafb', padding: '24px'}}>
        <CardTab
          id={1}
          index={1}
          name={store.state.name}
          tag={select('Select tag', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], 'A')}
          active={isActive}
          greyBackground={!bg}
          color={'yellow-600'}
          colorDot={<CardDot/>}
          prefixIcon={<ShowM />}
          suffixIcon={suffixIcon ? <OptionHorizontalM /> : null}
          disabled={disabled}
          prefix={prefix}
          onChangeName={handleChangeName}
          onRemoveTab={action('Remove tab')}
          onDuplicateTab={action('Duplicate')}
          texts={{
            changeNameTooltip: text('Set rename tooltip', 'Rename'),
            removeTooltip: text('Set remove tooltip', 'Remove'),
            duplicateTooltip: text('Set duplicate tooltip', 'Duplicate'),
          }}
          invalid={invalid}
          invalidName={invalidName}
          draggable={true}
        />
      </div>
    )
  }),
  group: withState({
    items: range(3).map((i: number) => ({
        id: i,
        name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
        tag: String.fromCharCode(65 + i).toUpperCase(),
      }
    )),
    activeTab: 0,
    nextId: 3,
  })(({store}) => {
    const bg = boolean('White background', true);
    const prefix = select('Prefix type', {'tag': prefixType.TAG, 'icon': prefixType.ICON, 'colorDot': prefixType.DOT}, prefixType.TAG);
    const suffixIcon = boolean('Set single icon', false);
    const disabled = boolean('Disabled tabs', false);
    const invalid = boolean('Invalid tabs', false);
    const invalidName = boolean('Invalid names', false);
    const maxTabCount = number('Max number of tabs', 4);
    const handleChangeName = (id, name) => {
      store.set({
        items: store.state.items.map(item => {
          return item.id === id ? {
            ...item,
            name: name
          } : item;
        }),
      });
    };

    const handleRemove = (id) => {
      store.set({
        items: store.state.items.filter(item => item.id !== id),
      });
    };

    const handleDuplicate = (id) => {
      const duplicatedTab = store.state.items.find(item => item.id === id);
      store.set({
        items: [...store.state.items, {
          ...duplicatedTab,
          tag: String.fromCharCode(65 + store.state.nextId).toUpperCase(),
          id: store.state.nextId,
        }],
        nextId: store.state.nextId + 1,
      });
    };

    const handleAddItem = () => {
      store.set({
        items: [...store.state.items, {
          id: store.state.nextId,
          name: `Variant ${String.fromCharCode(65 + store.state.nextId).toUpperCase()}`,
          tag: String.fromCharCode(65 + store.state.nextId).toUpperCase()
        }],
        nextId: store.state.nextId + 1,
      })
    };

    const handleChangeOrder = (newOrder: CardTabsItem): void => {
      store.set({items: newOrder});
    };

    const handleSelect = (id) => {
      store.set({activeTab: id});
    };

    return (
      <div style={{background: bg ? '#fff' : '#f9fafb', padding: '24px'}}>
        <CardTabs
          maxTabsCount={maxTabCount}
          onChangeOrder={ handleChangeOrder }
          onAddTab={handleAddItem}
        >
          {store.state.items.map((item) => (
            <CardTab
              id={item.id}
              name={item.name}
              tag={item.tag}
              active={item.id === store.state.activeTab}
              color={item.color}
              colorDot={<CardDot/>}
              greyBackground={!bg}
              prefixIcon={<ShowM />}
              suffixIcon={suffixIcon ? <OptionHorizontalM /> : null}
              disabled={disabled}
              prefix={prefix}
              onSelectTab={handleSelect}
              onChangeName={handleChangeName}
              onRemoveTab={handleRemove}
              onDuplicateTab={handleDuplicate}
              texts={{
                changeNameTooltip: "Rename",
                removeTooltip: "Remove",
                duplicateTooltip:"Duplicate",
              }}
              invalid={invalid}
              invalidName={invalidName}
              draggable={true}
            />
          ))}
        </CardTabs>
      </div>
    )}),
};

export default {
name: 'Components/CardTabs',
  stories,
  Component: CardTabs,
};
