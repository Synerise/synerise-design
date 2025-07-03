import React, { useState } from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Dropdown from '@synerise/ds-dropdown';
import { ItemPickerList, ItemPickerTrigger } from '@synerise/ds-item-picker';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  fixedWrapper588,
} from '../../../utils';
import {
  ACTIONS,
  FLAT_DATA_SOURCE,
  ITEMS_IN_SECTIONS,
  ITEMS_IN_SECTIONS_NESTED,
  ITEMS_IN_SECTIONS_SHORT,
  RECENT,
  SECTIONS,
  SECTIONS_WITH_FOLDERS,
  SECTIONS_WITH_NESTED_FOLDERS,
} from '../ItemPicker.data';
import type {
  ItemType,
  SectionType,
  StoryPropsOverlay,
} from '../ItemPicker.types';

export default {
  component: ItemPickerList,
  title: 'Components/Pickers/ItemPicker/List With Predefined Items',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'grey',
    },
  },
  decorators: [fixedWrapper588, centeredPaddedWrapper],
  render: (args: StoryPropsOverlay) => {
    const [selected, setSelected] = useState<ItemType | undefined>(
      args.selectedItem,
    );
    const [loading, setLoading] = useState(false);

    const handleItemSelect = (item: ItemType, section?: SectionType) => {
      args.onItemSelect?.(item, section);
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
        selectedItem={selected}
        onItemSelect={handleItemSelect}
        onRefresh={handleRefresh}
        isLoading={loading || args.isLoading}
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
    onItemSelect: fn(),
    onLoadedData: fn(),
    onSectionChange: fn(),
    items: FLAT_DATA_SOURCE.slice(0, 50),
    recents: RECENT,
    actions: ACTIONS,
    searchBarProps: {
      clearTooltip: 'Clear',
    },
  },
} as Meta<StoryPropsOverlay>;

export const FlatItems: StoryObj<StoryPropsOverlay> = {};
export const FlatItemsRelativeHeight: StoryObj<StoryPropsOverlay> = {
  args: {
    items: FLAT_DATA_SOURCE.slice(0, 5),
    recents: undefined,
    actions: undefined,
    containerHeight: 'fitContent',
  },
};

export const Sections: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  args: {
    sections: SECTIONS,
    items: ITEMS_IN_SECTIONS,
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const SectionsCustomLimit: StoryObj<StoryPropsOverlay> = {
  ...FlatItems,
  args: {
    sections: SECTIONS,
    items: {
      limitPerSection: 5,
      items: ITEMS_IN_SECTIONS,
    },
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const SectionsAndFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_FOLDERS,
    items: ITEMS_IN_SECTIONS,
    recents: RECENT,
    actions: ACTIONS,
  },
};
export const WithPickerTrigger: StoryObj<StoryPropsOverlay> = {
  render: (args: StoryPropsOverlay) => {
    const [selected, setSelected] = useState<ItemType | undefined>(
      args.selectedItem,
    );
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleItemSelect = (item: ItemType, section?: SectionType) => {
      args.onItemSelect?.(item, section);
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
export const SectionsAndFoldersRelativeHeight: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_FOLDERS,
    items: ITEMS_IN_SECTIONS_SHORT,
    recents: undefined,
    actions: ACTIONS,
    containerHeight: 'fitContent',
  },
};

export const SectionsAndNestedFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEMS_IN_SECTIONS_NESTED,
    sections: SECTIONS_WITH_NESTED_FOLDERS,
  },
};
