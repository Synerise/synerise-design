import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useEffect, useState } from 'react';

import type { ItemPickerProps } from '@synerise/ds-item-picker';
import ItemPicker from '@synerise/ds-item-picker';
import type { ListItemProps } from '@synerise/ds-list-item';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper300,
} from '../../utils';
import { NO_SNAPSHOT } from '../../utils/chromatic';
import { CompleteExample } from '../InformationCard/InformationCard.stories';
import { FLAT_DATA_SOURCE, ICONS } from './ItemPickerLegacy.data';

type Story = StoryObj<ItemPickerProps>;

export default {
  component: ItemPicker,
  title: 'Components/Pickers/ItemPicker/LegacyItemPicker',
  tags: ['autodocs', 'deprecated'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: (args) => {
    // React state, not useArgs: updateArgs does not re-render under `pnpm test-storybook`
    const [selectedItem, setSelectedItem] = useState(args.selectedItem);
    useEffect(() => setSelectedItem(args.selectedItem), [args.selectedItem]);
    const handleChange = (item: ListItemProps) => {
      setSelectedItem(item);
      args.onChange(item);
    };
    const handleClear = () => {
      setSelectedItem(undefined);
      args.onClear?.();
    };
    return (
      <ItemPicker
        {...args}
        selectedItem={selectedItem}
        onChange={handleChange}
        onClear={handleClear}
      />
    );
  },
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    placeholderIcon: {
      ...controlFromOptionsArray('select', Object.keys(ICONS)),
      mapping: ICONS,
    },
  },
  args: {
    dataSource: FLAT_DATA_SOURCE,
  },
} as Meta<ItemPickerProps>;

export const Default: Story = {
  parameters: { ...NO_SNAPSHOT },
};
export const WithPlaceholder: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    placeholder: 'Set customer',
    placeholderIcon: ICONS['user'],
  },
};

export const SelectedItem: Story = {
  args: {
    selectedItem: FLAT_DATA_SOURCE[3],
    withClearConfirmation: true,
  },
};

export const WithoutSearchBar: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    hideSearchBar: true,
  },
};

export const WithInfocard: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    selectedItem: FLAT_DATA_SOURCE[3],
    informationCardTooltipProps: {
      informationCardProps: {
        title: '',
        ...CompleteExample.args,
      },
      triggerProps: {
        popupPlacement: 'top',
      },
    },
  },
};

export const LabelDescriptionAndErrorMessage: Story = {
  parameters: { ...NO_SNAPSHOT },
  args: {
    ...Default.args,
    description: 'Field description',
    errorMessage: 'Error message',
    tooltip: 'tooltip text',
    label: 'Label',
  },
};
