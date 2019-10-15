import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';

import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '@synerise/ds-card-tabs';

const ITEMS_WITH_ICONS = [
  {
    id: '1',
    label: "Variant",
    variant: {
      tag: 'A',
      color: 'yellow-500'
    },
    prefixIcon: <FileIcon />,
    showTag: false,
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
    prefixIcon: <FileIcon />,
    showTag: false,
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
    prefixIcon: <FileIcon />,
    showTag: false,
    disabled: true,
    invalid: false,
    tabIndex: -1,
  }
]

const ITEMS_WITH_TAGS = [
  {
    id: '1',
    label: "Variant",
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


const ITEMS_WITH_SUFFIX_ICON = [
  {
    id: '1',
    label: "Variant",
    variant: {
      tag: 'A',
      color: 'yellow-500'
    },
    prefixIcon: null,
    suffixIcon: <FileIcon />,
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
    suffixIcon: <FileIcon />,
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
    suffixIcon: <FileIcon />,
    showTag: true,
    disabled: true,
    invalid: false,
    tabIndex: -1,
  }
]

storiesOf('Components|CardTabs', module)
  .add('with icons in prefix', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_ICONS}
          currentTabIndex={0}
          onAddTab={() => {}}
        />
      </DSProvider>
    </div>
  ))
  .add('with tags in prefix', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_TAGS}
          currentTabIndex={0}
          onAddTab={() => {}}
        />
      </DSProvider>
    </div>
  ))
  .add('with draggable items', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_TAGS}
          currentTabIndex={0}
          onAddTab={() => {}}
          onChangeOrder={() => {}}
        />
      </DSProvider>
    </div>
  ))
  .add('with actions in suffix', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_TAGS}
          currentTabIndex={0}
          onAddTab={() => {}}
          onChangeOrder={() => {}}
          onRemoveTab={() => {}}
          onDuplicateTab={() => {}}
          onChangeName={() => {}}
        />
      </DSProvider>
    </div>
  ))
  .add('with icon in suffix', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_SUFFIX_ICON}
          currentTabIndex={0}
          onAddTab={() => {}}
          onChangeOrder={() => {}}
          onRemoveTab={() => {}}
          onDuplicateTab={() => {}}
          onChangeName={() => {}}
        />
      </DSProvider>
    </div>
  ));