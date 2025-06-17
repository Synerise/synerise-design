import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { ItemPickerList } from '@synerise/ds-item-picker';

import {
  SECTIONS,
  SECTIONS_WITH_FOLDERS,
  ITEM_LOADER_CONFIG,
  RECENT,
  ACTIONS,
  ITEM_LOADER_CONFIG_ERRORS,
  SECTIONS_WITH_NESTED_FOLDERS,
} from '../ItemPicker.data';
import type { ItemType, SectionType, StoryPropsOverlay } from '../ItemPicker.types';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, fixedWrapper588, variableHeightDecorator } from '../../../utils';

export default {
  component: ItemPickerList,
  title: 'Components/Pickers/ItemPicker/List With Infinite Loader',
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

    const handleItemSelect = (item: ItemType, section?: SectionType) => {
      args.onItemSelect?.(item, section);
      setSelected(item);
    };

    return (
      <ItemPickerList
        {...args}
        selectedItem={selected}
        onItemSelect={handleItemSelect}
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
    onSectionChange: fn(),
    items: ITEM_LOADER_CONFIG,
    recents: RECENT,
    actions: ACTIONS,
    searchBarProps: {
      clearTooltip: 'Clear',
    },
  },
} as Meta<StoryPropsOverlay>;

export const FlatItems: StoryObj<StoryPropsOverlay> = {};

export const Sections: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS,
  },
};

export const SectionsAndFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_FOLDERS,
  },
};

export const SectionsAndNestedFolders: StoryObj<StoryPropsOverlay> = {
  args: {
    sections: SECTIONS_WITH_NESTED_FOLDERS,
  },
};

export const FillAvailableSpace: StoryObj<StoryPropsOverlay & { variableHeight: string }> = {
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
    sections: SECTIONS_WITH_FOLDERS,
  },
};

export const RequestErrors: StoryObj<StoryPropsOverlay> = {
  args: {
    items: ITEM_LOADER_CONFIG_ERRORS,
    sections: SECTIONS_WITH_FOLDERS,
  },
};
