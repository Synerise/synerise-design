import { Meta, StoryObj } from '@storybook/react';

import { within, waitFor, userEvent, fn, expect } from '@storybook/test';
import type { ItemPickerProps } from '@synerise/ds-item-picker';
import { FLAT_DATA_SOURCE } from './ItemPickerLegacy.data';

import ItemPickerMeta, { Default } from './ItemPickerLegacy.stories';

export default {
  ...ItemPickerMeta,
  title: 'Components/Pickers/ItemPicker/LegacyItemPicker/Tests',
  tags: ['visualtests'],
} as Meta<ItemPickerProps>;

type Story = StoryObj<ItemPickerProps>;

const runOpenDropdown = async (canvas, args) => {
  await userEvent.click(canvas.getByText(args.placeholder as string));
  await waitFor(() => expect(canvas.getByTestId('ds-item-picker-dropdown')).toBeInTheDocument());
  await waitFor(() => expect(canvas.getByTestId('ds-item-picker-dropdown')).toBeVisible());
  await canvas.findByPlaceholderText(args.searchPlaceholder!);
  const dropdown = within(canvas.getByTestId('ds-item-picker-dropdown'));
  await waitFor(() => expect(dropdown.getAllByRole('menuitem')).toHaveLength(FLAT_DATA_SOURCE.length));
  
  return {
    dropdown
  };
};

export const DropdownOpen: Story = {
    args: {
      placeholder: 'Placeholder text',
      searchPlaceholder: 'Search',
      onChange: fn(),
      onClear: fn()
    },
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      await runOpenDropdown(canvas, args)
    },
  };
  
  export const SelectItem: Story = {
    ...DropdownOpen,
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      const { dropdown } = await runOpenDropdown(canvas, args)
      const itemIndex = 2;
      await waitFor(() => expect(dropdown.getAllByRole('menuitem')[itemIndex]).not.toHaveStyle({pointerEvents: 'none'}));
      await userEvent.click(dropdown.getAllByRole('menuitem')[itemIndex]);
      await waitFor(() => expect(canvas.getByTestId('ds-item-picker-dropdown')).not.toBeVisible());
      expect(args.onChange).toHaveBeenCalled();
    },
  };

  export const ClearSelectedItem: Story = {
    ...DropdownOpen,
    args: {
        ...DropdownOpen.args,
        selectedItem: FLAT_DATA_SOURCE[2]
    },
    play: async ({ canvasElement, args }) => {
      const canvas = within(canvasElement.parentElement!);
      await userEvent.click(canvas.getByTestId('clear-icon'));
      
      await waitFor(() => expect(canvas.getByText(args.placeholder as string)).toBeInTheDocument());
      expect(args.onClear).toHaveBeenCalled();
    },
  };

  