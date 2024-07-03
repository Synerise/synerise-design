import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';

import type { FormatPickerProps } from '@synerise/ds-format-picker';

import FormatPickerMeta from './FormatPicker.stories';

import { waitFor } from '../../utils';

export default {
  ...FormatPickerMeta,
  title: 'Components/Pickers/FormatPicker/Tests',
  tags: ['visualtests'],
} as Meta<FormatPickerProps>;

type Story = StoryObj<FormatPickerProps>;

export const OpenedModal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument());
  },
};

export const CurrencyType: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement.parentElement!);
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument());
    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeVisible());

    const modal = within(canvas.getByTestId('ds-format-picker-overlay'));
    await waitFor(() =>
      expect(modal.getByTestId('ds-format-picker-type-cash')).not.toHaveStyle({ pointerEvents: 'none' })
    );
    await userEvent.click(modal.getByTestId('ds-format-picker-type-cash'));
    await waitFor(() => expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument());
  },
};

export const CurrencyDropdownOpen: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open modal', async () => {
      await userEvent.click(canvas.getByRole('button'));
      await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument());
      await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeVisible());
    });
    
    const modal = within(canvas.getByTestId('ds-format-picker-overlay'));

    await step('Select cash type', async () => {
      await waitFor(() =>
        expect(modal.getByTestId('ds-format-picker-type-cash')).not.toHaveStyle({ pointerEvents: 'none' })
      );
      await userEvent.click(modal.getByTestId('ds-format-picker-type-cash'));
      await waitFor(() => expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument());
    });

    await step('Open currency dropdown', async () => {
      await userEvent.click(modal.getByTestId('ds-format-picker-currency-trigger'));
      await waitFor(() => {
        expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument();
        expect(canvas.getAllByRole('menuitem')).toHaveLength(4);
      });
    });
  },
};
