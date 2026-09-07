import React from 'react';
import { injectIntl } from 'react-intl';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-vite';
import DateRangePicker, {
  RawDateRangePicker,
} from '@synerise/ds-date-range-picker';
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

/** The day buttons in document order — the gridcell itself is no longer clickable. */
const dayButtons = (canvasElement: HTMLElement): HTMLElement[] =>
  Array.from(
    (
      canvasElement.parentElement ?? canvasElement
    ).querySelectorAll<HTMLElement>('.DayPicker-Day-Button'),
  );

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
      const days = dayButtons(canvasElement);
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
      const days = dayButtons(canvasElement);
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

/**
 * Visual baselines for the calendar-grid modifier states.
 *
 * The `DayPicker-Day--*` classes below are the entire visual language of the range calendar, and
 * several of them had no Chromatic coverage at all. They are rendered without the popover so the
 * grid is always on screen and the snapshot is stable.
 */
const InlineCalendar = injectIntl(RawDateRangePicker);

const calendarStateStory = (args: Partial<DateRangePickerProps>): Story => ({
  parameters: {
    date: new Date('March 10, 2021 10:00:00'),
    layout: 'centered',
  },
  render: (storyArgs) => <InlineCalendar {...storyArgs} texts={texts} />,
  args: {
    ...explicitActionArgs,
    showTime: false,
    showFilter: false,
    showRelativePicker: false,
    texts,
    ...args,
  } as DateRangePickerProps,
});

/** Baseline for --start / --end / --selected across a range, plus --outside and --today. */
export const TestCalendarSelectedRange: Story = calendarStateStory({
  value: {
    type: 'ABSOLUTE',
    from: new Date('2021-03-03T00:00:00'),
    to: new Date('2021-03-17T23:59:59'),
  },
} as Partial<DateRangePickerProps>);

/**
 * Baseline for a range that crosses the month boundary, so both calendars show `--outside` days
 * that are inside the selection: March's grid carries 1-5 April in its trailing rows and April's
 * grid carries 29-31 March in its leading one.
 */
export const TestCalendarSelectedRangeAcrossMonths: Story = calendarStateStory({
  value: {
    type: 'ABSOLUTE',
    from: new Date('2021-03-25T00:00:00'),
    to: new Date('2021-04-05T23:59:59'),
  },
} as Partial<DateRangePickerProps>);

/** Baseline for --disabled sitting next to selected and outside days. */
export const TestCalendarDisabledDays: Story = {
  ...calendarStateStory({
    value: {
      type: 'ABSOLUTE',
      from: new Date('2021-03-08T00:00:00'),
      to: new Date('2021-03-12T23:59:59'),
    },
    disabledDate: (date?: Date) => {
      const day = date?.getDay();
      return day === 0 || day === 6;
    },
  } as Partial<DateRangePickerProps>),
};

/**
 * Baseline for the disabled day, which is the one day that carries no chip at all: it has neither
 * the resting background an enabled in-month day gets nor the in-range text colour, in or out of
 * the selection. The range crosses the month boundary so disabled days show up in every position
 * that matters — in-month, outside, and outside-but-inside-the-selection.
 */
export const TestCalendarDisabledDaysAcrossMonths: Story = calendarStateStory({
  value: {
    type: 'ABSOLUTE',
    from: new Date('2021-03-25T00:00:00'),
    to: new Date('2021-04-05T23:59:59'),
  },
  disabledDate: (date?: Date) => {
    const day = date?.getDay();
    return day === 0 || day === 6;
  },
} as Partial<DateRangePickerProps>);

/**
 * Baseline for a hover preview that runs past the month edge, so `--outside--entered` days are on
 * screen. Their text takes the in-range colour here exactly as it does once the range is committed
 * — the pair with `TestCalendarSelectedRangeAcrossMonths` is what pins that the two agree.
 */
export const TestCalendarHoverPreviewAcrossMonths: Story = {
  ...calendarStateStory({
    value: { type: 'ABSOLUTE', from: null, to: null },
  } as Partial<DateRangePickerProps>),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Anchor the range late in the month', async () => {
      await canvas.findAllByRole('gridcell');
      const days = dayButtons(canvasElement);
      await waitFor(() =>
        expect(days[0]).not.toHaveStyle({ pointerEvents: 'none' }),
      );
      // March 2021 starts on a Monday, so index 24 is 25 March and index 35 is 5 April, which
      // March's own grid renders as an outside day.
      await userEvent.click(days[24]);
    });

    await step('Hover into the next month', async () => {
      const days = dayButtons(canvasElement);
      await userEvent.hover(days[35]);
      await waitFor(() =>
        expect(
          canvasElement.querySelector(
            '.DayPicker-Day--outside.DayPicker-Day--entered',
          ),
        ).toBeTruthy(),
      );
    });
  },
};

/**
 * Baseline for disabled days caught inside a hover preview — the state between the two clicks,
 * where only the start is set. A disabled day is skipped by the range, so it must look the same
 * here as it does once the end lands: no range background, only the muted text.
 */
export const TestCalendarDisabledDaysInHoverPreview: Story = {
  ...calendarStateStory({
    value: { type: 'ABSOLUTE', from: null, to: null },
    disabledDate: (date?: Date) => {
      const day = date?.getDay();
      return day === 0 || day === 6;
    },
  } as Partial<DateRangePickerProps>),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Anchor the range on an enabled day', async () => {
      await canvas.findAllByRole('gridcell');
      const days = dayButtons(canvasElement);
      await waitFor(() =>
        expect(days[0]).not.toHaveStyle({ pointerEvents: 'none' }),
      );
      // March 2021 starts on a Monday, so index 10 is 11 March (Thursday) and index 25 is
      // 26 March (Friday) — the preview between them spans four disabled weekend days.
      await userEvent.click(days[10]);
    });

    await step(
      'Hover a later day so the preview covers the weekends',
      async () => {
        const days = dayButtons(canvasElement);
        await userEvent.hover(days[25]);
        await waitFor(() =>
          expect(
            canvasElement.querySelector(
              '.DayPicker-Day--disabled.DayPicker-Day--entered',
            ),
          ).toBeTruthy(),
        );
      },
    );
  },
};

/**
 * Baseline for the hover preview: --entered, --entered-start, --entered-end and
 * --initial-entered. This is the state a user sees between the first and second click, and it had
 * no visual coverage before.
 */
export const TestCalendarHoverPreview: Story = {
  ...calendarStateStory({
    value: { type: 'ABSOLUTE', from: null, to: null },
  } as Partial<DateRangePickerProps>),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Anchor the range on a day', async () => {
      await canvas.findAllByRole('gridcell');
      const days = dayButtons(canvasElement);
      await waitFor(() =>
        expect(days[0]).not.toHaveStyle({ pointerEvents: 'none' }),
      );
      await userEvent.click(days[10]);
    });

    await step('Hover a later day to reveal the pending range', async () => {
      const days = dayButtons(canvasElement);
      await userEvent.hover(days[16]);
      await waitFor(() =>
        expect(
          canvasElement.querySelector('.DayPicker-Day--entered-end'),
        ).toBeTruthy(),
      );
    });
  },
};
