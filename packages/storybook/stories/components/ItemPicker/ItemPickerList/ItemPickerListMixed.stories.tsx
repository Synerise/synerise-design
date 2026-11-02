import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { fn } from 'storybook/test';

import ItemPicker, {
  type BaseSectionType,
  ItemPickerList,
  type ItemPickerListProps,
} from '@synerise/ds-item-picker';

import { centeredPaddedWrapper, fixedWrapper588 } from '../../../utils';
import {
  createMixedSource,
  createRecents,
  type MixedStoryItem,
  MODULE_ACTIONS,
  SEARCH_BY_ACTION,
} from './ItemPickerListMixed.data';

type FolderListProps = ItemPickerListProps<MixedStoryItem, BaseSectionType>;

export default {
  component: ItemPickerList,
  title: 'Components/Pickers/ItemPicker/Mixed List',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
    },
  },
  decorators: [fixedWrapper588, centeredPaddedWrapper],
  render: (args: FolderListProps) => {
    const [selected, setSelected] = useState<MixedStoryItem | undefined>(
      args.selectedItem,
    );
    return (
      <ItemPickerList
        {...args}
        selectedItem={selected}
        onItemSelect={(item) => {
          args.onItemSelect?.(item);
          setSelected(item);
        }}
      />
    );
  },
  args: {
    onItemSelect: fn(),
    items: createMixedSource(),
    recents: createRecents(),
  },
} as Meta<FolderListProps>;

export const Default: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPickerList
  items={{ loadLevel }}
  recents={recents}
  selectedItem={selected}
  onItemSelect={setSelected}
/>`,
      },
    },
  },
};

export const SearchBy: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPickerList
  items={{ loadLevel }}
  recents={recents}
  actions={[
    {
      id: 'search-by',
      actionType: 'searchBy',
      text: 'Search by',
      searchParams: [{ paramKey: 'code', paramListLabel: 'Code', paramKeyLabel: 'Code:' }],
    },
  ]}
  selectedItem={selected}
  onItemSelect={setSelected}
/>`,
      },
    },
  },
  args: {
    actions: [SEARCH_BY_ACTION],
  },
};

export const EverythingOn: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPickerList
  items={{ loadLevel }}
  recents={recents}
  actions={[
    { id: 'create', actionType: 'custom', text: 'Create item', onClick: createItem },
    { id: 'export', actionType: 'custom', text: 'Export list', onClick: exportList, showInList: false },
    {
      id: 'search-by',
      actionType: 'searchBy',
      text: 'Search by',
      searchParams: [{ paramKey: 'code', paramListLabel: 'Code', paramKeyLabel: 'Code:' }],
    },
  ]}
  selectedItem={selected}
  onItemSelect={setSelected}
/>`,
      },
    },
  },
  args: {
    actions: [...MODULE_ACTIONS, SEARCH_BY_ACTION],
  },
};

export const LargeRows: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPickerList
  items={{ loadLevel, rowSize: 'large' }}
  recents={recents}
  selectedItem={selected}
  onItemSelect={setSelected}
/>`,
      },
    },
  },
  args: {
    items: createMixedSource({ rowSize: 'large' }),
    recents: createRecents(true),
  },
};

export const LoadingAndErrors: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPickerList
  items={{ loadLevel }} // a rejected loadLevel shows the error state; Refresh retries
  selectedItem={selected}
  onItemSelect={setSelected}
/>`,
      },
    },
  },
  args: {
    recents: undefined,
  },
  render: (args: FolderListProps) => {
    // A source per render, so every render starts with the failed load.
    const [items] = useState(() =>
      createMixedSource({ delay: 1500, failFirstLoad: true }),
    );
    return <ItemPickerList {...args} items={items} />;
  },
};

export const InTheField: StoryObj<FolderListProps> = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker
  isNewVersion
  label="Item"
  placeholder="Choose an item"
  items={{ loadLevel }}
  recents={recents}
  selectedItem={selected}
  onChange={setSelected}
  onClear={() => setSelected(undefined)}
/>`,
      },
    },
  },
  render: (args: FolderListProps) => {
    const [selected, setSelected] = useState<MixedStoryItem | undefined>();
    return (
      <ItemPicker
        isNewVersion
        label="Item"
        placeholder="Choose an item"
        items={args.items}
        recents={args.recents}
        actions={args.actions}
        selectedItem={selected}
        onChange={setSelected}
        onClear={() => setSelected(undefined)}
      />
    );
  },
};
