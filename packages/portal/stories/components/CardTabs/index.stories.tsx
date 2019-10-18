import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import range from 'lodash/range';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '@synerise/ds-card-tabs';
import { withState } from '@dump247/storybook-state';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import CardTab, { prefixType } from '@synerise/ds-card-tabs/dist/CardTab/CardTab';

storiesOf('Components|CardTabs', module)
  .add('default', withState({
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
    const suffixIcon = boolean('Show suffix icon', false);
    const disabled = boolean('Disabled tabs', false);
    const draggable = boolean('Enable change order of tabs', false);
    const invalid = boolean('Invalid tabs', false);
    const maxTabCount = number('Max number of tabs', 4);
    const prefix = select('Prefix type', {'tag': prefixType.TAG, 'icon': prefixType.ICON}, prefixType.TAG);
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

    const handleChangeOrder = (newOrder) => {
      store.set({
        items: newOrder.map(id => store.state.items.find(item => String(item.id) === id))
      })
    }

    const handleSelect = (id) => {
      store.set({activeTab: id});
    }

    return (
      <div style={{background: bg ? '#fff' : '#f9fafb', padding: '24px'}}>
        <DSProvider code="en_GB">
          <CardTabs
            maxTabsCount={maxTabCount}
            onChangeOrder={draggable ? handleChangeOrder : null}
            onAddTab={handleAddItem}
          >
          {store.state.items.map((item, index) => (
            <CardTab
              id={item.id}
              index={index}
              name={item.name}
              tag={item.tag}
              active={item.id === store.state.activeTab}
              greyBackground={!bg}
              prefixIcon={<FileIcon />}
              suffixIcon={suffixIcon ? <FileIcon /> : null}
              disabled={disabled}
              prefix={prefix}
              onSelectTab={handleSelect}
              onChangeName={handleChangeName}
              onRemoveTab={handleRemove}
              onDuplicateTab={handleDuplicate}
              invalid={invalid}
              draggable={draggable}
            />
          ))}
          </CardTabs>
      </DSProvider>
      </div>
    )}));
