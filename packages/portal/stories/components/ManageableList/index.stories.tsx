import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ManageableList from '@synerise/ds-manageablelist/dist/Manageable-list';
import { withState } from '@dump247/storybook-state';


const DEFAULT_ITEMS:any = [
  {
    catalogId: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: false,
    canDeleteCatalog: false,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: false,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
]

const ITEMS:any = [
  {
    catalogId: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: false,
    canDeleteCatalog: false,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000004",
    name: "My folder 3",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000005",
    name: "My folder 4",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  },
  {
    catalogId: "00000000-0000-0000-0000-000000000006",
    name: "My folder 5",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    canUpdateCatalog: true,
    canDeleteCatalog: true,
  }
];

const EMPTY_ITEM = {
  catalogId: '',
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  canUpdateCatalog: true,
  canDeleteCatalog: true
}

storiesOf('Components|Manageable List', module)
  .add('default', withState({
    items: ITEMS,
  })(({store}) => {
    const addItem = ({name}): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_ITEM,
            catalogId: Date.now(),
            name,
          }
        ]
      });
    };

    const removeItem = ({id}): void => {
      store.set({
        items: store.state.items.filter(item => item.catalogId !== id),
      });
    }

    const editItem = (props): void => {
      store.set({
        items: store.state.items.map(item => {
          if(item.catalogId === props.id) {
            item.name = props.name;
          }
          return item;
        })
      })
    };

    return (
      <div style={{ width: '200px' }}>
        <DSProvider code="en_GB">
          <div style={{ background: "#fff", width: '300px' }}>
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
          </div>
        </DSProvider>
      </div>
    )
  }))
  .add('empty list', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", width: '300px' }}>
          <ManageableList
            addItemLabel="Add folder"
            showMoreLabel="show all"
            showLessLabel="show less"
            maxToShowItems={5}
            onItemAdd={action('onItemAdd')}
            onItemRemove={action('onItemRemove')}
            onItemEdit={action('onItemEdit')}
            onItemSelect={action('onItemSelect')}
            items={[]}
            loading={false}
          />
        </div>
      </DSProvider>
    </div>
  ));
