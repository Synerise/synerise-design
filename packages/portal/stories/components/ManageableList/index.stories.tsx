import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ManageableList from '@synerise/ds-manageablelist/dist/Manageable-list';

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
  }
]

storiesOf('Components|Manageable List', module)
  .add('default', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '300px' }}>
          <ManageableList
            addItemLabel="Add folder"
            showMoreLabel="show more"
            maxToShowItems={5}
            onItemAdd={action('onItemAdd')}
            onItemRemove={action('onItemRemove')}
            onItemEdit={action('onItemEdit')}
            onItemSelect={action('onItemSelect')}
            items={ITEMS}
            loading={false}
          />
        </div>
      </DSProvider>
    </div>
  ));
