import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import ItemPicker from '@synerise/ds-item-picker';
import Button from '@synerise/ds-button';

import { FLAT_DATA_SOURCE, ICONS } from './ItemPicker.data';
import { FLAT_DATA_SOURCE as LEGACY_FLAT_DATA_SOURCE } from './ItemPickerLegacy.data';
import { ItemType, StoryProps } from './ItemPicker.types';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper300,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
} from '../../utils';


type Story = StoryObj<StoryProps>;

const DEPRECATED = { control: false, description: 'deprecated', table: { category: 'Deprecated props' } };

export default {
  component: ItemPicker,
  title: 'Components/Pickers/ItemPicker/ItemPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['dataSource'],
    },
  },

  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: args => {
    const [{ selectedItem }, updateArgs] = useArgs();
    const handleChange = item => {
      updateArgs({ selectedItem: item });
      args.onChange?.(item);
    };
    const handleClear = () => {
      updateArgs({ selectedItem: undefined });
      args.onClear?.();
    };
    return (
      <ItemPicker {...args} isNewVersion selectedItem={selectedItem} onChange={handleChange} onClear={handleClear} />
    );
  },
  argTypes: {
    items: { control: false },

    isNewVersion: { control: false },
    placeholderIcon: {
      ...controlFromOptionsArray('select', Object.keys(ICONS)),
      mapping: ICONS,
    },

    disabled: BOOLEAN_CONTROL,
    showItemsSectionLabel: BOOLEAN_CONTROL,
    withClearConfirmation: BOOLEAN_CONTROL,
    error: BOOLEAN_CONTROL,
    isLoading: BOOLEAN_CONTROL,
    errorMessage: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    placeholder: REACT_NODE_AS_STRING,
    searchPlaceholder: STRING_CONTROL,
    tooltip: REACT_NODE_AS_STRING,

    dropdownBottomAction: { ...DEPRECATED },
    dropdownVisibleRows: { ...DEPRECATED },
    changeButtonLabel: { ...DEPRECATED },
    size: { ...DEPRECATED },
    intl: { ...DEPRECATED },
    clear: { ...DEPRECATED },
    yesText: { ...DEPRECATED, ...STRING_CONTROL },
    noText: { ...DEPRECATED, ...STRING_CONTROL },
    clearConfirmTitle: { ...DEPRECATED, ...STRING_CONTROL },
    noResults: { ...DEPRECATED, ...STRING_CONTROL },
    closeOnBottomAction: { ...DEPRECATED },
  },
  args: {
    items: FLAT_DATA_SOURCE,
  },
} as Meta<StoryProps>;

export const Default: Story = {
  args: { showItemsSectionLabel: false },
};
export const RelativeHeight: Story = {
  args: {
    showItemsSectionLabel: false,
    items: LEGACY_FLAT_DATA_SOURCE as ItemType[],
    containerHeight: 'fitContent',
  },
};
export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Set customer',
    placeholderIcon: ICONS['user'],
  },
};

export const SelectedItem: Story = {
  args: {
    selectedItem: FLAT_DATA_SOURCE[3],
  },
};
export const LargeTriggerSize: Story = {
  args: {
    triggerProps: {
      size: 'large',
      allowClear: true,
      withChangeButton: true,
    },
    selectedItem: FLAT_DATA_SOURCE[3],
  },
};

export const CustomTrigger: Story = {
  args: {
    renderTrigger: ({ selected, openDropdown, closeDropdown }) => (
      <Button onClick={openDropdown}>{selected?.text || 'Select'}</Button>
    ),
  },
};
