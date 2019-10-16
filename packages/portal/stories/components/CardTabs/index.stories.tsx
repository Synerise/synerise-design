import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';

import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '@synerise/ds-card-tabs';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const ITEMS_WITH_ICONS = [
  {
    id: '1',
    name: "Variant",
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
    name: "Variant",
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
    name: "Variant",
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
];

const ITEMS_WITH_TAGS = [
  {
    id: '1',
    name: "Variant",
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
    name: "Variant",
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
    name: "Variant",
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
];


const ITEMS_WITH_SUFFIX_ICON = [
  {
    id: '1',
    name: "Variant",
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
    name: "Variant",
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
    name: "Variant",
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
];

const stories = storiesOf('Components|CardTabs', module);
stories.addDecorator(withKnobs);

stories
  .add('with icons in prefix', () => (
    <div style={{background: '#fff', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_ICONS}
          currentTabIndex={0}
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
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
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
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
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
          onChangeOrder={action('onChangeOrder')}
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
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
          onChangeOrder={action('onChangeOrder')}
          onRemoveTab={action('onRemoveTab')}
          onDuplicateTab={action('onDuplicateTab')}
          onChangeName={action('onChangeName')}
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
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
          onChangeOrder={action('onChangeOrder')}
          onRemoveTab={action('onRemoveTab')}
          onDuplicateTab={action('onDuplicateTab')}
          onChangeName={action('onChangeName')}
        />
      </DSProvider>
    </div>
  ))
  .add('with grey background', () => (
    <div style={{background: '#f9fafb', padding: '24px'}}>
      <DSProvider code="en_GB">
        <CardTabs
          items={ITEMS_WITH_SUFFIX_ICON}
          currentTabIndex={0}
          onSelectTab={action('onSelectTab')}
          onAddTab={action('onAddTab')}
          onChangeOrder={action('onChangeOrder')}
          onRemoveTab={action('onRemoveTab')}
          onDuplicateTab={action('onDuplicateTab')}
          onChangeName={action('onChangeName')}
          greyBackground={boolean('Grey background', false)}
        />
      </DSProvider>
    </div>
  ));