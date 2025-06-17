import { Meta, StoryObj } from '@storybook/react-webpack5';
import { waitFor, userEvent, within, expect, fn } from 'storybook/test';

import type { FormatPickerProps } from '@synerise/ds-format-picker';

import FormatPickerMeta from './FormatPicker.stories';

const WAIT_FOR_OPTIONS = {
  timeout: 800,
};

export default {
  ...FormatPickerMeta,
  title: 'Components/Pickers/FormatPicker/Tests',
  tags: ['visualtests'],
} as Meta<FormatPickerProps>;

type Story = StoryObj<FormatPickerProps>;

export const OpenedModal: Story = {
  args: {
    onFormattedValueChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);
    await waitFor(() => expect(args.onFormattedValueChange).toHaveBeenCalled());
    await userEvent.click(canvas.getByRole('button'));
    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument());
  },
};

export const CurrencyType: Story = {
  args: {
    onFormattedValueChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await waitFor(() => expect(args.onFormattedValueChange).toHaveBeenCalled());

    await userEvent.click(canvas.getByRole('button'));

    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
    await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeVisible(), WAIT_FOR_OPTIONS);

    const modal = within(canvas.getByTestId('ds-format-picker-overlay'));
    await waitFor(
      () => expect(modal.getByTestId('ds-format-picker-type-cash')).not.toHaveStyle({ pointerEvents: 'none' }),
      WAIT_FOR_OPTIONS
    );
    await userEvent.click(modal.getByTestId('ds-format-picker-type-cash'));
    await waitFor(
      () => expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument(),
      WAIT_FOR_OPTIONS
    );
  },
};

export const CurrencyDropdownOpen: Story = {
  args: {
    onFormattedValueChange: fn(),
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open modal', async () => {
      await waitFor(() => expect(args.onFormattedValueChange).toHaveBeenCalled());
      await userEvent.click(canvas.getByRole('button'));
      await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeInTheDocument(), WAIT_FOR_OPTIONS);
      await waitFor(() => expect(canvas.getByTestId('ds-format-picker-overlay')).toBeVisible(), WAIT_FOR_OPTIONS);
    });

    const modal = within(canvas.getByTestId('ds-format-picker-overlay'));

    await step('Select cash type', async () => {
      await waitFor(
        () => expect(modal.getByTestId('ds-format-picker-type-cash')).not.toHaveStyle({ pointerEvents: 'none' }),
        WAIT_FOR_OPTIONS
      );
      await userEvent.click(modal.getByTestId('ds-format-picker-type-cash'));
      await waitFor(
        () => expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument(),
        WAIT_FOR_OPTIONS
      );
    });

    await step('Open currency dropdown', async () => {
      await userEvent.click(modal.getByTestId('ds-format-picker-currency-trigger'));
      await waitFor(() => {
        expect(modal.getByTestId('ds-format-picker-currency-trigger')).toBeInTheDocument();
        expect(canvas.getAllByRole('menuitem')).toHaveLength(4);
      }, WAIT_FOR_OPTIONS);
    });
  },
};
