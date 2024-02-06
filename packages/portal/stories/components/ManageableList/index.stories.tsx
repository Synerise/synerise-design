import React, { Key } from 'react';
import ManageableList from '@synerise/ds-manageable-list';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { EMPTY_CONTENT_ITEM, CONTENT_ITEMS, EMPTY_ITEM, FILTER_LIST_ITEMS, ITEMS, ACCORDION_ITEMS } from './index.data';
import { theme } from '@synerise/ds-core';
import { Settings2S } from '@synerise/ds-icon';

const decorator = storyFn => (
  <div style={{ width: '600px' }}>
    <div style={{ background: '#fff', width: '600px' }}>{storyFn()}</div>
  </div>
);

const removeItem = (props, store): void => {
  store.set({
    items: store.state.items.filter(item => item.id !== props.id),
  });
};

const editItem = (props, store): void => {
  store.set({
    items: store.state.items.map(item => {
      if (item.id === props.id) {
        item.name = props.name;
      }
      return item;
    }),
  });
};

const setSelectedItem = (props, store): void => {
  store.set({
    selectedItemId: props.id,
  });
};

const getTexts = () => ({
  addItemLabel: text('Add item label', 'Add position'),
  showMoreLabel: text('Show more label', 'show all'),
  showLessLabel: text('Show less label', 'show less'),
  more: text('More', 'more'),
  less: text('Less', 'less'),
  activateItemTitle: text('Activate item', 'By activating this filter, you will cancel your unsaved filter settings'),
  activate: text('Activate', 'Activate'),
  cancel: text('Cancel', 'Cancel'),
  deleteConfirmationTitle: text('Delete confirmation title', 'Delete filter'),
  deleteConfirmationDescription: text(
    'Delete confirmation description',
    'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.'
  ),
  deleteLabel: text('Delete', 'Delete'),
  moveToTopTooltip: text('Move to the top of list', 'Move to the top of list'),
  moveToBottomTooltip: text('Move to the bottom of list', 'Move to the bottom of list'),
});

const stories = {
  default: withState({
    items: ITEMS,
    selectedId: undefined,
  })(({ store }) => {
    const addItem = ({ name }): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_ITEM,
            id: Date.now(),
            name,
          },
        ],
      });
    };

    return (
      <ManageableList
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={({ id }) => store.set({ selectedId: id })}
        selectedItemId={store.state.selectedId}
        items={store.state.items}
        loading={false}
        placeholder={'Folder name'}
        texts={getTexts()}
        additionalActions={[
          {
            color: theme.palette['blue-600'],
            tooltip: 'Additional action',
            icon: <Settings2S />,
            onClick: action('additional action'),
          },
        ]}
      />
    );
  }),
  emptyList: () => {
    const texts = getTexts();
    return (
      <ManageableList
        maxToShowItems={5}
        onItemAdd={action('onItemAdd')}
        onItemRemove={action('onItemRemove')}
        onItemEdit={action('onItemEdit')}
        onItemSelect={action('onItemSelect')}
        items={[]}
        loading={false}
        texts={texts}
      />
    );
  },
  contentList: withState({
    items: CONTENT_ITEMS,
  })(({ store }) => {
    const handleChangeOrder = newOrder => {
      store.set({ items: newOrder });
    };

    const addItem = (): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_CONTENT_ITEM,
            id: Date.now(),
          },
        ],
      });
    };

    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: Date.now(),
          },
        ],
      });
    };

    const onRemove = props => removeItem(props, store);
    const onEdit = props => editItem(props, store);
    const texts = getTexts();
    return (
      <ManageableList
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={onRemove}
        onItemEdit={onEdit}
        onItemSelect={action('onItemSelect')}
        onItemDuplicate={duplicateItem}
        onChangeOrder={boolean('Change order available', false) ? handleChangeOrder : null}
        changeOrderByButtons={boolean('Change order by buttons', false)}
        type="content"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        texts={texts}
      />
    );
  }),
  filterItemsList: withState({
    items: FILTER_LIST_ITEMS,
    selectedItemId: '00000000-0000-0000-0000-000000000000',
  })(({ store }) => {
    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: String(Date.now()),
          },
        ],
      });
    };

    return (
      <ManageableList
        maxToShowItems={5}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={props => setSelectedItem(props, store)}
        onItemDuplicate={duplicateItem}
        onChangeOrder={null}
        type="filter"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        selectedItemId={store.state.selectedItemId}
        texts={getTexts()}
      />
    );
  }),
  accordion: withState({
    items: ACCORDION_ITEMS,
  })(({ store }) => {
    const handleChangeOrder = newOrder => {
      store.set({ items: newOrder });
    };

    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: Date.now(),
          },
        ],
      });
    };

    const onExpand = (id, isExp) => {
      const updatedItems = store.state.items.map( item => ({
        ...item,
        expanded: isExp && item.id === id
      }));
      store.set({
        items: updatedItems
      })
      
    };
    return (
      <ManageableList
        maxToShowItems={5}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={action('onItemSelect')}
        onItemDuplicate={duplicateItem}
        onChangeOrder={boolean('Change order available', false) ? handleChangeOrder : null}
        type="content"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        texts={getTexts()}
        onExpand={onExpand}
      />
    );
  }),
  accordionDeprecated: withState({
    items: ACCORDION_ITEMS,
    expandedIds: [] as Key[],
  })(({ store }) => {
    const handleChangeOrder = newOrder => {
      store.set({ items: newOrder });
    };

    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.items.find(item => item.id === props.id);
      store.set({
        items: [
          ...store.state.items,
          {
            ...itemForDuplication,
            id: Date.now(),
          },
        ],
      });
    };
    const onExpand = (id: Key, _isExp: boolean) => {
      if (store.state.expandedIds.includes(id)) {
        store.set({
          expandedIds: [],
        });
      } else {
        store.set({
          expandedIds: [id],
        });
      }
    };
    return (
      <ManageableList
        maxToShowItems={5}
        onItemRemove={props => removeItem(props, store)}
        onItemEdit={props => editItem(props, store)}
        onItemSelect={action('onItemSelect')}
        onItemDuplicate={duplicateItem}
        onChangeOrder={boolean('Change order available', false) ? handleChangeOrder : null}
        type="content"
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
        texts={getTexts()}
        expandedIds={store.state.expandedIds}
        onExpand={onExpand}
      />
    );
  }),
};

export default {
  name: 'Components/Manageable list/Examples',
  decorator,
  stories,
  Component: ManageableList,
};
