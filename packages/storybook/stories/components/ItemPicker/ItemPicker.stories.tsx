import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

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
  sideBySide,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  fixedWrapper800,
  sleep,
} from '../../utils';


export type Story = StoryObj<StoryProps>;

const DEPRECATED = { control: false, description: 'deprecated', table: { category: 'Deprecated props' } };

const ItemPickerStory = (args) => {
  const [selectedItem, setSelectedItem] = useState(args.selectedItem)
  const handleChange = item => {
    setSelectedItem(item);
    args.onChange?.(item);
  };
  const handleClear = () => {
    setSelectedItem(undefined);
    args.onClear?.();
  };
  return (
    <div style={{ flex: '1 1 auto' }}><ItemPicker {...args} isNewVersion selectedItem={selectedItem} onChange={handleChange} onClear={handleClear} /></div>
  );
}
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
  render: args => {
    return (
      <ItemPickerStory {...args} />
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
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  args: { showItemsSectionLabel: false },
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion items={FLAT_DATA_SOURCE} showItemsSectionLabel={false} />`
      }
    }
  },
};
export const RelativeHeight: Story = {
  parameters: { layout: 'padded' },
  decorators: [sideBySide, fixedWrapper800,],
  render: ({ items, ...args }) => {
    const itemsLong = [...items, ...items.slice(0, 5)];
    return (
      <>
        <ItemPickerStory {...args} opened placeholder='5 items' items={items.slice(0, 5)} />
        <ItemPickerStory {...args} opened placeholder='10 items' items={items.slice(0, 10)} />
        <ItemPickerStory {...args} open placeholder={`${itemsLong.length} items`} items={itemsLong} />
      </>
    );
  },
  args: {
    showItemsSectionLabel: false,
    items: LEGACY_FLAT_DATA_SOURCE as ItemType[],
    containerHeight: 'fitContent',
    texts: { searchPlaceholder: 'Search' }
  }
};
export const WithPlaceholder: Story = {
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion placeholder="Set customer" placeholderIcon={ICONS['user']} items={FLAT_DATA_SOURCE} />`
      }
    }
  },
  args: {
    placeholder: 'Set customer',
    placeholderIcon: ICONS['user'],
  },
};

export const SelectedItem: Story = {
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion placeholder="Set customer" placeholderIcon={ICONS['user']} items={FLAT_DATA_SOURCE} />`
      }
    }
  },
  args: {
    selectedItem: FLAT_DATA_SOURCE[3],
  },
};
export const LargeTriggerSize: Story = {
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion selectedItem={FLAT_DATA_SOURCE[3]} triggerProps={{ size: 'large', allowClear: true, withChangeButton: true }} items={FLAT_DATA_SOURCE} />`
      }
    }
  },
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
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion renderTrigger={({ selected, openDropdown }) => (
    <Button onClick={openDropdown}>{selected?.text || 'Select'}</Button>
  )} items={FLAT_DATA_SOURCE} />`
      }
    }
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  args: {
    renderTrigger: ({ selected, openDropdown, closeDropdown }) => (
      <Button onClick={openDropdown}>{selected?.text || 'Select'}</Button>
    ),
  },
};

export const LabelDescriptionAndErrorMessage: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ItemPicker isNewVersion
    description="Field description"
    errorMessage="Error message"
    tooltip="tooltip text"
    label="Label"
    items={FLAT_DATA_SOURCE}
  />`
      }
    }
  },
  args: {
    ...Default.args,
    description: "Field description",
    errorMessage: "Error message",
    tooltip: "tooltip text",
    label: "Label"
  }
};
