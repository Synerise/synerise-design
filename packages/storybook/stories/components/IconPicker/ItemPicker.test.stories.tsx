import { Meta, StoryObj } from '@storybook/react-webpack5';

import { within, waitFor, userEvent, fn, expect } from 'storybook/test';
import type { IconPickerProps, DataSource } from '@synerise/ds-icon-picker';

import IconPickerMeta from './IconPicker.stories';

export default {
  ...IconPickerMeta,
  title: 'Components/Pickers/IconPicker/Tests',
  tags: ['visualtests'],
} as Meta<IconPickerProps<DataSource[]>>;

type Story = StoryObj<IconPickerProps<DataSource[]>>;

export const DropdownOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByPlaceholderText('search')).toHaveFocus());
  },
};

export const SelectIcon: Story = {
  args: {
    onSelect: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByPlaceholderText('search')).toHaveFocus());
    await waitFor(() => expect(canvas.getAllByTestId('icon-2')[0]).not.toHaveStyle({ pointerEvents: 'none' }));
    await userEvent.click(canvas.getAllByTestId('icon-2')[0]);
    expect(args.onSelect).toHaveBeenCalled();
  },
};
