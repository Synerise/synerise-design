import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import ItemPicker from '@synerise/ds-item-picker';
import type { ItemPickerProps } from '@synerise/ds-item-picker';
import type { MenuItemProps } from '@synerise/ds-menu';

import { FLAT_DATA_SOURCE, ICONS } from './ItemPicker.data';
import { CompleteExample } from '../InformationCard/InformationCard.stories';

import { centeredPaddedWrapper, fixedWrapper300, reactNodeAsSelect } from '../../utils';

type Story = StoryObj<ItemPickerProps>;

export default {
  component: ItemPicker,
  title: 'Components/Pickers/ItemPicker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: (args) => {
    const [{ selectedItem }, updateArgs] = useArgs();
    const handleChange = (item: MenuItemProps) => {
      updateArgs({ selectedItem: item });
      args.onChange(item);
    };
    const handleClear = () => {
      updateArgs({ selectedItem: undefined });
      args.onClear?.();
    };
    return <ItemPicker {...args} selectedItem={selectedItem} onChange={handleChange} onClear={handleClear} />;
  },
  argTypes: {
    placeholderIcon: {
      ...reactNodeAsSelect('select', Object.keys(ICONS)),
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
  },
};

export const WithInfocard: Story = {
  args: {
    selectedItem: FLAT_DATA_SOURCE[3],
    informationCardTooltipProps: {
      informationCardProps: CompleteExample.args,
      triggerProps: {
        popupPlacement: 'top'
      }
    },
  },
};
