import { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import type {
  DateRange,
  RawDateRangePickerProps,
} from '@synerise/ds-date-range-picker';
import { RawDateRangePicker } from '@synerise/ds-date-range-picker';

const VALUE: DateRange = {
  type: 'ABSOLUTE',
  from: '2021-03-01T00:00:00+01:00',
  to: '2021-03-14T23:59:59+01:00',
};

const FILTER_TEXTS = {
  filter: 'Date filter',
  change: 'Change',
  daily: 'Everyday',
  weekly: 'Every week',
  monthly: 'Every month',
  addTime: 'Add time',
  inverseSelection: 'Inverse selection',
};

export default {
  title: 'Components/Pickers/DateRangePicker/Tests/Filter',
  component: RawDateRangePicker,
  tags: ['visualtests'],
  parameters: {
    layout: 'padded',
    mockingDate: new Date('March 10, 2021 10:00:00'),
  },
  render: (args) => {
    const [value, setValue] = useState<DateRange | undefined>(args.value);
    return (
      <RawDateRangePicker
        {...args}
        value={value}
        onApply={(applied) => {
          args.onApply(applied);
          setValue(applied);
        }}
      />
    );
  },
  args: {
    value: VALUE,
    showFilter: true,
    showRelativePicker: false,
    forceAbsolute: false,
    texts: FILTER_TEXTS,
    onApply: fn(),
  },
} as Meta<RawDateRangePickerProps>;

type Story = StoryObj<RawDateRangePickerProps>;

const filterPanel = (canvasElement: HTMLElement) =>
  within(
    within(canvasElement).getByTestId('range-filter-footer')
      .parentElement as HTMLElement,
  );

const openFilter = async (canvasElement: HTMLElement) => {
  await userEvent.click(
    within(canvasElement).getByTestId('ds-add-button-label'),
  );
  await waitFor(() =>
    expect(
      within(canvasElement).getByTestId('range-filter-footer'),
    ).toBeInTheDocument(),
  );
};

const applyFilter = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('range-filter-apply-button'));
  await userEvent.click(
    await canvas.findByTestId('date-range-picker-apply-button'),
  );
};

const lastAppliedFilter = (onApply: RawDateRangePickerProps['onApply']) => {
  const { calls } = (onApply as ReturnType<typeof fn>).mock;
  return calls[calls.length - 1][0]?.filter;
};

export const TestAddDailyFilterInSliderMode: Story = {
  args: {
    filterRangeDisplayMode: 'slider',
    filterValueSelectionModes: ['Range'],
  },
  play: async ({ args, canvasElement, step }) => {
    await step('Open the filter addon', () => openFilter(canvasElement));

    await step('Invert the daily range', async () => {
      await userEvent.click(
        filterPanel(canvasElement).getByText(FILTER_TEXTS.inverseSelection),
      );
    });

    await step('Apply the filter and the range', () =>
      applyFilter(canvasElement),
    );

    await waitFor(() =>
      expect(lastAppliedFilter(args.onApply)).toMatchObject({
        type: 'DAILY',
        inverted: true,
      }),
    );
    await expect(
      within(canvasElement).getByText(FILTER_TEXTS.change),
    ).toBeInTheDocument();
  },
};

export const TestAddWeeklyFilter: Story = {
  play: async ({ args, canvasElement, step }) => {
    await step('Open the filter addon', () => openFilter(canvasElement));

    await step('Set a range on Monday', async () => {
      const panel = filterPanel(canvasElement);
      await userEvent.click(panel.getByText(FILTER_TEXTS.weekly));
      await userEvent.click(panel.getByText('Mon'));
      await userEvent.click(panel.getByText(FILTER_TEXTS.addTime));
    });

    await step('Apply the filter and the range', () =>
      applyFilter(canvasElement),
    );

    await waitFor(() =>
      expect(lastAppliedFilter(args.onApply)).toMatchObject({
        type: 'WEEKLY',
        days: [{ day: 1 }],
      }),
    );
    await expect(
      within(canvasElement).getByText(FILTER_TEXTS.change),
    ).toBeInTheDocument();
  },
};

export const TestAddMonthlyFilter: Story = {
  play: async ({ args, canvasElement, step }) => {
    await step('Open the filter addon', () => openFilter(canvasElement));

    await step('Set a range on the 15th', async () => {
      const panel = filterPanel(canvasElement);
      await userEvent.click(panel.getByText(FILTER_TEXTS.monthly));
      await userEvent.click(panel.getByText('15th'));
      await userEvent.click(panel.getByText(FILTER_TEXTS.addTime));
    });

    await step('Apply the filter and the range', () =>
      applyFilter(canvasElement),
    );

    await waitFor(() =>
      expect(lastAppliedFilter(args.onApply)).toMatchObject({
        type: 'MONTHLY',
        rules: [{ type: 'MONTH', days: [{ day: 15 }] }],
      }),
    );
    await expect(
      within(canvasElement).getByText(FILTER_TEXTS.change),
    ).toBeInTheDocument();
  },
};
