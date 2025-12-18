import React from 'react';
import { useArgs } from 'storybook/preview-api';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import ItemPicker from '@synerise/ds-item-picker';
import type { ItemPickerProps } from '@synerise/ds-item-picker';
import type { ListItemProps } from '@synerise/ds-list-item';

import {
  centeredPaddedWrapper,
  controlFromOptionsArray,
  fixedWrapper300,
} from '../../utils';
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
    const [{ selectedItem }, updateArgs] = useArgs();
    const handleChange = (item: ListItemProps) => {
      updateArgs({ selectedItem: item });
      args.onChange(item);
    };
    const handleClear = () => {
      updateArgs({ selectedItem: undefined });
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
    placeholderIcon: {
      ...controlFromOptionsArray('select', Object.keys(ICONS)),
      mapping: ICONS,
    },
  },
  args: {
    dataSource: FLAT_DATA_SOURCE,
  },
} as Meta<ItemPickerProps>;

export const Default: Story = {};
export const WithPlaceholder: Story = {
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
  args: {
    hideSearchBar: true,
  },
};

export const WithInfocard: Story = {
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
  args: {
    ...Default.args,
    description: 'Field description',
    errorMessage: 'Error message',
    tooltip: 'tooltip text',
    label: 'Label',
  },
};
