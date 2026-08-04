import React from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import DateRangePicker from '@synerise/ds-date-range-picker';
import type { DateRangePickerProps } from '@synerise/ds-date-range-picker';

import { Default } from './DateRangePicker.stories';
import {
  DEFAULT_CUSTOM_RANGE,
  LIFETIME_VALUE,
  TEXTS as texts,
} from './constants';

export default {
  title: 'Components/Pickers/DateRangePicker/Tests',
  component: DateRangePicker,
  tags: ['visualtests'],
  parameters: {
    layout: 'padded',
    date: new Date('March 10, 2021 10:00:00'),
  },
  render: (args) => <DateRangePicker {...args} />,
} as Meta<DateRangePickerProps>;

type Story = StoryObj<DateRangePickerProps>;

const explicitActionArgs = {
  onApply: fn(),
  onFilterSave: fn(),
  onValueChange: fn(),
  onVisibleChange: fn(),
};

export const TestSelectingLifetimePreset: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    showRelativePicker: true,
    relativePast: true,
    texts,
    relativeModes: ['PAST'],
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });

    await step('Select relative preset', async () => {
      const lifetimePreset = canvas.getByText(texts.lifetime);
      await waitFor(() => userEvent.click(lifetimePreset));
    });

    await waitFor(() =>
      expect(args.onValueChange).toHaveBeenCalledWith(LIFETIME_VALUE),
    );
  },
};

export const TestSelectingCustomRange: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    showRelativePicker: true,
    relativePast: true,
    texts,
    showCustomRange: true,
    relativeModes: ['PAST'],
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });
    await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());

    await step('Select relative preset', async () => {
      const customRange = canvas.getByText(texts.custom);
      await waitFor(() => userEvent.click(customRange));
    });

    await waitFor(() =>
      expect(args.onValueChange).toHaveBeenCalledWith(DEFAULT_CUSTOM_RANGE),
    );
  },
};

export const TestSelectingMoreRangesDropdown: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    showRelativePicker: true,
    relativePast: true,
    texts,
    showCustomRange: true,
    relativeModes: ['PAST'],
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });
    await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());

    await step('Select relative preset', async () => {
      const rangesDropdown = canvas.getByTestId('relative-ranges-dropdown');
      await waitFor(() => userEvent.click(rangesDropdown));
    });
  },
};

export const TestToggleRelativeSection: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    texts,
    showRelativePicker: true,
    relativeModes: ['PAST'],
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });
    await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());

    await step('Select relative preset', async () => {
      const selectedRange = canvas.getByText(texts.lastWeek);
      await waitFor(() => userEvent.click(selectedRange));
    });

    await step('Toggle relative preset', async () => {
      const rangesDropdown = canvas.getByText(texts.relativeDateRange);
      await waitFor(() => userEvent.click(rangesDropdown));
    });

    const selectedRangeLabel = canvas.getByText(texts.lastWeek);
    expect(selectedRangeLabel).toBeInTheDocument();
  },
};

export const TestSelectTime: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    texts,
    showRelativePicker: true,
    relativeModes: ['PAST'],
    showTime: true,
    disableAbsoluteTimepickerInRelative: true,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });

    await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());

    expect(canvas.getByTestId('date-range-picker-select-time')).toBeDisabled();

    await step('Select absolute range', async () => {
      await waitFor(() =>
        expect(canvas.getAllByRole('gridcell')[0]).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
      const days = canvas.getAllByRole('gridcell');
      await waitFor(() => {
        userEvent.click(days[10]);
      });
      await waitFor(() => {
        userEvent.click(days[20]);
      });
    });

    await waitFor(() =>
      expect(
        canvas.getByTestId('date-range-picker-select-time'),
      ).not.toBeDisabled(),
    );

    await step('Select relative preset', async () => {
      const selectedRange = canvas.getByText(texts.lastWeek);
      await waitFor(() => userEvent.click(selectedRange));
    });

    expect(canvas.getByTestId('date-range-picker-select-time')).toBeDisabled();
  },
};

export const TestDayRangeTooltip: Story = {
  ...Default,
  args: {
    ...explicitActionArgs,
    texts,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement.parentElement!);

    await step('Open picker popover', async () => {
      const input = await canvas.findByText(texts.startDate);
      await userEvent.click(input);
    });

    await waitFor(() => expect(args.onVisibleChange).toHaveBeenCalled());

    await step('Select an absolute range', async () => {
      await waitFor(() =>
        expect(canvas.getAllByRole('gridcell')[0]).not.toHaveStyle({
          pointerEvents: 'none',
        }),
      );
      const days = canvas.getAllByRole('gridcell');
      await waitFor(() => {
        userEvent.click(days[10]);
      });
      await waitFor(() => {
        userEvent.click(days[20]);
      });
    });

    await step('Hover a selected day to reveal the range tooltip', async () => {
      const overlay = await canvas.findByTestId('ds-date-range-picker-overlay');
      const selectedForeground = await waitFor(() => {
        const element = overlay.querySelector<HTMLElement>(
          '.DayPicker-Day--selected .DayPicker-Day-FG',
        );
        if (!element) {
          throw new Error('Selected day not rendered yet');
        }
        return element;
      });
      await userEvent.hover(selectedForeground);
    });

    // The label is portaled to the body (outside the scrolling overlay), so it
    // must be queryable and visible without being clipped.
    await waitFor(() =>
      expect(canvas.getByTestId('popover-tooltip-content')).toBeVisible(),
    );
  },
};
