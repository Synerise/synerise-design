import * as React from 'react';
import { action } from "@storybook/addon-actions";
import ManageableList from '@synerise/ds-manageable-list';
import { withState } from '@dump247/storybook-state';

const decorator = (storyFn) => (
  <div style={{ width: '200px' }}>
    <div style={{ background: '#fff', width: '300px' }}>
      {storyFn()}
    </div>
  </div>
);

const ITEMS:any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: false,
    canDelete: false,
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    name: "My folder 3",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    name: "My folder 4",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    name: "My folder 5",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
  }
];

const EMPTY_ITEM = {
  id: '',
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
};

const stories = {
  default: withState({
    items: ITEMS,
  })(({store}) => {
    const addItem = ({name}): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_ITEM,
            id: Date.now(),
            name,
          }
        ]
      });
    };

    const removeItem = ({id}): void => {
      store.set({
        items: store.state.items.filter(item => item.id !== id),
      });
    };

    const editItem = (props): void => {
      store.set({
        items: store.state.items.map(item => {
          if(item.id === props.id) {
            item.name = props.name;
          }
          return item;
        })
      })
    };

    return (
      <ManageableList
        addItemLabel="Add folder"
        showMoreLabel="show all"
        showLessLabel="show less"
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={removeItem}
        onItemEdit={editItem}
        onItemSelect={action('onItemSelect')}
        items={store.state.items}
        loading={false}
      />
    )
  }),
  emptyList: {
    addItemLabel: 'Add folder',
    showMoreLabel: 'show all',
    showLessLabel: 'show less',
    maxToShowItems: 5,
    onItemAdd: action('onItemAdd'),
    onItemRemove: action('onItemRemove'),
    onItemEdit: action('onItemEdit'),
    onItemSelect: action('onItemSelect'),
    items: [],
    loading: false,
  },
};

export default {
  name: 'Components|Manageable List',
  decorator,
  stories,
  Component: ManageableList,
};
