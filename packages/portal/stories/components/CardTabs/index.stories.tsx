import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';

// import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '@synerise/ds-card-tabs';

const ITEMS = [
  {
    id: '1',
    label: "Variant",
    onChangeName: () => {},
    onDuplicateTab: () => {},
    onRemoveTab: () => {},
    variant: {
      tag: 'A',
      color: 'yellow-500'
    },
    prefixIcon: null,
    showTag: true,
    disabled: false,
    invalid: false,
    tabIndex: -1,
  },
  {
    id: '2',
    label: "Variant",
    variant: {
      tag: 'B',
      color: 'orange-500'
    },
    prefixIcon: null,
    showTag: true,
    disabled: false,
    invalid: false,
    tabIndex: -1,
  },
  {
    id: '3',
    label: "Variant",
    variant: {
      tag: 'C',
      color: 'blue-500'
    },
    prefixIcon: null,
    showTag: true,
    disabled: true,
    invalid: false,
    tabIndex: -1,
  }
]

storiesOf('Components|CardTabs', module)
  .add('default', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS}
          currentTabIndex={0}
          onChangeOrder={() => {}}
          onAddTab={() => {}}
        />
      </DSProvider>
    </div>
  ));