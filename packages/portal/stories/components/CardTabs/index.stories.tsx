import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import range from 'lodash/range';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '@synerise/ds-card-tabs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import CardTab from '@synerise/ds-card-tabs/dist/CardTab/CardTab';

storiesOf('Components|CardTabs', module)
  .add('with icons in prefix', withState({
    items: range(3).map((i: number) => ({
        id: i,
        name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
        tag: String.fromCharCode(65 + i).toUpperCase(),
      }
    )),
    activeTab: 0
  })(({store}) => {
    const bg = boolean('White background', true);
    const prefixIcon = boolean('Show prefix icon', false);
    const suffixIcon = boolean('Show suffix icon', false);
    const disabled = boolean('Disable tabs', false);
    const showTag = boolean('Show prefix tag', true);
    const draggable = boolean('Enable change order of tabs', false);
    const invalid = boolean('Show invalid tabs', false);

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
      console.log(id, store.state.items.filter(item => item.id !== id));
      store.set({
        items: store.state.items.filter(item => item.id !== id),
      });
    };

    const handleDuplicate = (id) => {
      const duplicatedTab = store.state.items.find(item => item.id === id);
      duplicatedTab.id = store.state.items.length + 1;
      console.log(duplicatedTab, store.state.items.length + 1);
      store.set({
        items: [...store.state.items, duplicatedTab]
      });
    };

    const handleAddItem = () => {
      const nextItemId = store.state.items.length;
      store.set({
        items: [...store.state.items, {
          id: nextItemId,
          name: `Variant ${String.fromCharCode(65 + nextItemId).toUpperCase()}`,
          tag: String.fromCharCode(65 + nextItemId).toUpperCase()
        }],
      })
    };

    const handleChangeOrder = (newOrder) => {
      store.set({
        items: newOrder.map(id => store.state.items.find(item => String(item.id) === id))
      })
    }

    return (
      <div style={{background: bg ? '#fff' : '#f9fafb', padding: '24px'}}>
        <DSProvider code="en_GB">
          <CardTabs
            items={store.state.items}
            activeTab={store.state.activeTab}
            maxTabsCount={store.state.maxTabsCount}
            onChangeOrder={draggable ? handleChangeOrder : false}
            greyBackground={!bg}
            prefixIcon={prefixIcon ? <FileIcon /> : null}
            suffixIcon={suffixIcon ? <FileIcon /> : null}
            disabled={disabled}
            showTag={showTag}
            onSelectTab={id => store.set({ activeTab: id})}
            onChangeName={handleChangeName}
            onRemoveTab={handleRemove}
            onDuplicateTab={handleDuplicate}
            onAddTab={handleAddItem}
            invalid={invalid}
          />
          {/*{store.state.items.map((item, index) => (*/}
          {/*  <CardTab*/}
          {/*    key={`card-tab-${item.id}`}*/}
          {/*    id={item.id}*/}
          {/*    index={index}*/}
          {/*    name={item.name}*/}
          {/*    tag={item.tag}*/}
          {/*    active={item.id === store.state.activeTab}*/}
          {/*    greyBackground={!bg}*/}
          {/*    prefixIcon={prefixIcon ? <FileIcon /> : null}*/}
          {/*    disabled={disabled}*/}
          {/*    showTag={showTag}*/}
          {/*    onSelectTab={(id) => store.set({activeTab: id})}*/}
          {/*  />*/}
          {/*))}*/}
      </DSProvider>
      </div>
    )}));
