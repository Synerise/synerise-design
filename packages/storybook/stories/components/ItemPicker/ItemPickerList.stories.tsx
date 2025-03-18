import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ItemPickerList, ItemPickerTrigger } from '@synerise/ds-item-picker';
import Dropdown from '@synerise/ds-dropdown';

import {
  FLAT_DATA_SOURCE,
  SECTIONS,
  SECTIONS_WITH_FOLDERS,
  ITEM_LOADER_CONFIG,
  ITEMS_IN_SECTIONS,
  RECENT,
  ACTIONS,
  ITEMS_IN_SECTIONS_SHORT,
  ITEM_LOADER_CONFIG_ERRORS,
  SECTIONS_WITH_NESTED_FOLDERS,
  ITEMS_IN_SECTIONS_NESTED,
} from './ItemPicker.data';
import type { ItemType, StoryPropsOverlay } from './ItemPicker.types';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, fixedWrapper588, variableHeightDecorator } from '../../utils';

export default {
  component: ItemPickerList,
  title: 'Components/Pickers/ItemPicker/ItemPickerList',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
    },
  },
  decorators: [fixedWrapper588, centeredPaddedWrapper],
  render: (args: StoryPropsOverlay) => {
    const [selected, setSelected] = useState<ItemType | undefined>(args.selectedItem);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleItemSelect = (item: ItemType) => {
      args.onItemSelect?.(item);
      setSelected(item);
    };
    // 'fixed items' refreshing happens outside the component
    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    };
    return (
      <ItemPickerList
        {...args}
        isVisible={visible}
        selectedItem={selected}
        onItemSelect={handleItemSelect}
        onRefresh={handleRefresh}
        isLoading={loading || args.isLoading}
        closeDropdown={() => setVisible(false)}
      />
    );
  },
  argTypes: {
    showItemsSectionLabel: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    includeSearchBar: BOOLEAN_CONTROL,
    includeFooter: BOOLEAN_CONTROL,
  },
  args: {
    items: FLAT_DATA_SOURCE.slice(0, 50),
    recents: RECENT,
    actions: ACTIONS,
    searchBarProps: {
      clearTooltip: 'Clear',
    },
  },
} as Meta<StoryPropsOverlay>;

export const WithFixedItems: StoryObj<StoryPropsOverlay> = {};
export const FlatListRelativeHeight: StoryObj<StoryPropsOverlay> = {
  args: {
    items: FLAT_DATA_SOURCE.slice(0, 5),
    recents: undefined,
    actions: undefined,
    containerHeight: 'fitContent',
  },
};

export const WithSections: StoryObj<StoryPropsOverlay> = {
  ...WithFixedItems,
  args: {
    sections: SECTIONS,
    items: ITEMS_IN_SECTIONS,
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const WithFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_FOLDERS,
    items: ITEMS_IN_SECTIONS,
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const WithPickerTrigger: StoryObj<StoryPropsOverlay> = {
  render: (args: StoryPropsOverlay) => {
    const [selected, setSelected] = useState<ItemType | undefined>(args.selectedItem);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleItemSelect = (item: ItemType) => {
      args.onItemSelect?.(item);
      setSelected(item);
    };
    // 'fixed items' refreshing happens outside the component
    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 800);
    };
    const handleClear = () => {
      setSelected(undefined);
    };
    const onVisibilityChange = (visibleState: boolean) => {
      setVisible(visibleState);
    };

    return (
      <Dropdown
        visible={visible}
        onVisibleChange={onVisibilityChange}
        trigger={['click']}
        overlayStyle={{ width: '480px' }}
        overlay={
          <ItemPickerList
            {...args}
            isVisible={visible}
            selectedItem={selected}
            onItemSelect={handleItemSelect}
            onRefresh={handleRefresh}
            isLoading={loading}
            closeDropdown={() => setVisible(false)}
          />
        }
      >
        <ItemPickerTrigger
          selected={selected}
          onClear={handleClear}
          placeholder={'select item'}
          openDropdown={() => setVisible(true)}
          closeDropdown={() => setVisible(false)}
          size="small"
          clear="clear"
          opened={visible}
          clearConfirmTitle="are you sure?"
          yesText="yes"
          noText="no"
          withClearConfirmation={false}
        />
      </Dropdown>
    );
  },
  args: {
    sections: SECTIONS_WITH_FOLDERS,
    items: ITEMS_IN_SECTIONS,
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const WithFoldersRelativeHeight: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_FOLDERS,
    items: ITEMS_IN_SECTIONS_SHORT,
    recents: undefined,
    actions: ACTIONS,
    containerHeight: 'fitContent',
  },
};

export const WithInfiniteLoader: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG,
  },
};

export const WithInfiniteLoaderAndSections: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG,
    sections: SECTIONS,
  },
};

export const WithInfiniteLoaderSectionsAndFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG,
    sections: SECTIONS_WITH_FOLDERS,
  },
};

export const WithInfiniteLoaderSectionsAndNestedFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG,
    sections: SECTIONS_WITH_NESTED_FOLDERS,
  },
};

export const WithFixedItemsSectionsAndNestedFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEMS_IN_SECTIONS_NESTED,
    sections: SECTIONS_WITH_NESTED_FOLDERS,
  },
};


export const FillContent: StoryObj<StoryPropsOverlay & { variableHeight: string}> = {
  decorators: [variableHeightDecorator],
  argTypes: {
    variableHeight: { 
      description: 'Adjust outer container height to preview `fillSpace` containerHeight prop value',
      table: { category: 'Story options' },
    }
  },
  args: {
    variableHeight: '900px',
    containerHeight: 'fillSpace',
    items: ITEM_LOADER_CONFIG,
    sections: SECTIONS_WITH_FOLDERS,
  },
};

export const WithInfiniteLoaderRandomErrors: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG_ERRORS,
    sections: SECTIONS_WITH_FOLDERS,
  },
};
