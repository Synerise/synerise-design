import React, { useState } from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { RawDateRangePickerProps } from '../DateRangePicker.types';
import RawDateRangePicker from '../RawDateRangePicker';
import type { RangeFilterValue } from '../RangeFilter/RangeFilter.types';
import type { SavedFilter } from '../RangeFilter/Shared/FilterDropdown/FilterDropdown.types';
import type { DateRange } from '../date.types';
import {
  APPLIED,
  type AppliedScenario,
  REAPPLIED,
  REOPENED,
  TEXTS,
} from './rangeFilterGolden.fixtures';

// The `filter` payload is stored by consumers and read back to reopen a value. These fixtures were recorded on master 4547f33b8c; they are the regression
// gate of the scheduler consolidation and must not be edited to make a change pass.

const ABSOLUTE = {
  type: 'ABSOLUTE',
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
} as DateRange;

type RenderOptions = Partial<RawDateRangePickerProps> & {
  notation?: 'EU' | 'US';
};

const renderPicker = ({ notation, ...props }: RenderOptions = {}) => {
  const onApply = vi.fn();
  renderWithProvider(
    <RawDateRangePicker
      showFilter
      forceAbsolute={false}
      showRelativePicker={false}
      texts={TEXTS}
      value={ABSOLUTE}
      onApply={onApply}
      {...props}
    />,
    undefined,
    notation ? { notation } : undefined,
  );
  return onApply;
};

const panel = () =>
  screen.getByTestId('range-filter-footer').parentElement as HTMLElement;

const grids = () =>
  Array.from(panel().querySelectorAll<HTMLElement>('.time-window-grid'));

const openNewFilter = () =>
  userEvent.click(screen.getByTestId('ds-add-button-label'));

const openStoredFilter = async () =>
  userEvent.click(await screen.findByText(TEXTS.change));

const pickType = (label: string) =>
  userEvent.click(within(panel()).getByText(label));

// In the WEEK period every weekday label repeats once per week; `nth` picks the week.
const clickDay = (label: string, gridIndex = 0, nth = 0) =>
  userEvent.click(within(grids()[gridIndex]).getAllByText(label)[nth]);

const withKeyHeld = async (
  key: 'Control' | 'Shift',
  action: () => Promise<void>,
  gridIndex = 0,
) => {
  const timeWindow = grids()[gridIndex].closest(
    '[tabindex="0"]',
  ) as HTMLElement;
  fireEvent.keyDown(timeWindow, { key });
  await action();
  fireEvent.keyUp(timeWindow, { key });
};

const addTime = async (index = 0) =>
  userEvent.click(within(panel()).getAllByText(TEXTS.addTime)[index]);

const setHour = async (inputIndex: number, hour: string) => {
  fireEvent.click(within(panel()).getAllByTestId('tp-input')[inputIndex]);
  const hours = await screen.findAllByTestId('ds-time-picker-unit-hour');
  fireEvent.click(within(hours[hours.length - 1]).getByText(hour));
};

const setMode = async (label: string) => {
  const form = within(panel()).getByTestId('range-filter-form');
  await userEvent.click(within(form).getByText(TEXTS.range));
  await userEvent.click(await screen.findByText(label));
};

const rangeAction = async (label: string, index = 0) => {
  await userEvent.click(
    within(panel()).getAllByTestId(
      'popover-date-range-picker-filter-actions-trigger',
    )[index],
  );
  await userEvent.click(await screen.findByText(label));
};

const monthlySelect = async (name: string, option: string, rule = 0) => {
  const input = panel().querySelectorAll<HTMLInputElement>(
    `input[name="${name}"]`,
  )[rule];
  await userEvent.click(input);
  await userEvent.click(await screen.findByText(option));
};

const appliedFilter = async (onApply: ReturnType<typeof vi.fn>) => {
  await userEvent.click(screen.getByTestId('range-filter-apply-button'));
  await userEvent.click(
    await screen.findByTestId('date-range-picker-apply-button'),
  );
  await waitFor(() => expect(onApply).toHaveBeenCalled());
  return onApply.mock.calls[onApply.mock.calls.length - 1][0].filter as
    | RangeFilterValue
    | undefined;
};

const expectBytes = (actual: unknown, expected: unknown) => {
  expect(actual).toStrictEqual(expected);
  expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
};

const SCENARIOS: Record<
  AppliedScenario,
  { props?: RenderOptions; steps: () => Promise<void> }
> = {
  dailyDefault: { steps: openNewFilter },
  dailyRangeOnly: {
    props: { filterValueSelectionModes: ['Range'] },
    steps: openNewFilter,
  },
  dailyEndHour: {
    steps: async () => {
      await openNewFilter();
      await setHour(1, '07');
    },
  },
  dailyStartHour: {
    steps: async () => {
      await openNewFilter();
      await setHour(0, '08');
    },
  },
  dailyHourMode: {
    steps: async () => {
      await openNewFilter();
      await setMode(TEXTS.hour);
    },
  },
  dailySlider: {
    props: {
      filterRangeDisplayMode: 'slider',
      filterValueSelectionModes: ['Range'],
    },
    steps: openNewFilter,
  },
  dailySliderInverted: {
    props: {
      filterRangeDisplayMode: 'slider',
      filterValueSelectionModes: ['Range'],
    },
    steps: async () => {
      await openNewFilter();
      await userEvent.click(within(panel()).getByText(TEXTS.inverseSelection));
    },
  },
  weeklyOneDay: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Mon');
      await addTime();
    },
  },
  weeklyOneDayEndHour: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Wed');
      await addTime();
      await setHour(1, '07');
    },
  },
  weeklyHourMode: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Fri');
      await addTime();
      await setMode(TEXTS.hour);
    },
  },
  weeklyCtrlSelect: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Mon');
      await withKeyHeld('Control', async () => {
        await clickDay('Wed');
        await clickDay('Fri');
      });
      await addTime();
      await setHour(0, '09');
    },
  },
  weeklyShiftSelect: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Tue');
      await withKeyHeld('Shift', () => clickDay('Thu'));
      await addTime();
    },
  },
  weeklyShiftSelectUs: {
    props: { notation: 'US' },
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Sun');
      await withKeyHeld('Shift', () => clickDay('Tue'));
      await addTime();
    },
  },
  weeklySelectAll: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await userEvent.click(within(panel()).getByText(TEXTS.selectAll));
      await addTime();
    },
  },
  weeklyCopyPaste: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Mon');
      await addTime();
      await setHour(1, '07');
      await rangeAction(TEXTS.copyRange);
      await clickDay('Thu');
      await addTime();
      await rangeAction(TEXTS.pasteRange);
    },
  },
  weeklyClear: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Mon');
      await addTime();
      await clickDay('Tue');
      await addTime();
      await clickDay('Mon');
      await rangeAction(TEXTS.clearRange);
    },
  },
  monthlyDay: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await clickDay('15th');
      await addTime();
    },
  },
  monthlyDayEndHour: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await clickDay('31st');
      await addTime();
      await setHour(1, '07');
    },
  },
  monthlyCountedFromEnd: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await monthlySelect('counted-from-select', 'end');
      await clickDay('1st');
      await addTime();
    },
  },
  monthlyWeek: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await monthlySelect('days-of-period', 'week');
      await clickDay('Mon');
      await addTime();
    },
  },
  monthlyWeekCountedFromEnd: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await monthlySelect('days-of-period', 'week');
      await monthlySelect('counted-from-select', 'end');
      await clickDay('Fri');
      await addTime();
    },
  },
  monthlyTwoRules: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await clickDay('15th');
      await addTime();
      await userEvent.click(within(panel()).getByText(TEXTS.addRule));
      await clickDay('1st', grids().length - 1);
      await addTime();
    },
  },
  monthlyRemoveRule: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await clickDay('15th');
      await addTime();
      await userEvent.click(within(panel()).getByText(TEXTS.addRule));
      await clickDay('1st', grids().length - 1);
      await addTime();
      const removeActions = within(panel()).getAllByTestId('list-item-remove');
      await userEvent.click(
        removeActions[removeActions.length - 1]
          .firstElementChild as HTMLElement,
      );
    },
  },
  monthlyPeriodChangeResets: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.monthly);
      await clickDay('15th');
      await addTime();
      await monthlySelect('days-of-period', 'week');
      await clickDay('Tue');
      await addTime();
    },
  },
  typeSwitchKeepsDaily: {
    steps: async () => {
      await openNewFilter();
      await setHour(1, '07');
      await pickType(TEXTS.weekly);
      await clickDay('Mon');
      await addTime();
      await pickType(TEXTS.daily);
    },
  },
  typeSwitchKeepsWeekly: {
    steps: async () => {
      await openNewFilter();
      await pickType(TEXTS.weekly);
      await clickDay('Sat');
      await addTime();
      await pickType(TEXTS.monthly);
      await pickType(TEXTS.weekly);
    },
  },
  disallowedStoredType: {
    props: {
      allowedFilterTypes: ['WEEKLY', 'MONTHLY'],
      value: {
        ...ABSOLUTE,
        filter: REOPENED.dailyStoredByConsumer.stored,
      } as DateRange,
    },
    steps: openStoredFilter,
  },
};

const SavingPicker = ({
  onApply,
  ...props
}: Partial<RawDateRangePickerProps> & {
  onApply: RawDateRangePickerProps['onApply'];
}) => {
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  return (
    <RawDateRangePicker
      showFilter
      forceAbsolute={false}
      showRelativePicker={false}
      texts={TEXTS}
      value={ABSOLUTE}
      onApply={onApply}
      savedFilters={savedFilters}
      onFilterSave={setSavedFilters}
      {...props}
    />
  );
};

const SAVED_SCENARIOS: AppliedScenario[] = [
  'dailyEndHour',
  'weeklyCtrlSelect',
  'monthlyTwoRules',
];

describe('RangeFilter golden payloads TimezoneTesting', () => {
  beforeAll(() => {
    vi.setConfig({ testTimeout: 30_000 });
  });
  afterAll(() => {
    vi.resetConfig();
  });

  describe('apply', () => {
    it.each(Object.keys(SCENARIOS) as AppliedScenario[])('%s', async (name) => {
      const { props, steps } = SCENARIOS[name];
      const onApply = renderPicker(props);
      await steps();
      expectBytes(await appliedFilter(onApply), APPLIED[name]);
    });
  });

  describe('reopen a stored value and apply it unchanged', () => {
    it.each(Object.keys(REOPENED) as (keyof typeof REOPENED)[])(
      '%s',
      async (name) => {
        const { stored, expected } = REOPENED[name];
        const onApply = renderPicker({
          value: { ...ABSOLUTE, filter: stored } as DateRange,
        });
        await openStoredFilter();
        expectBytes(await appliedFilter(onApply), expected);
      },
    );
  });

  describe('reopen every applied payload and apply it unchanged', () => {
    it.each(Object.keys(SCENARIOS) as AppliedScenario[])('%s', async (name) => {
      const onApply = renderPicker({
        value: { ...ABSOLUTE, filter: APPLIED[name] } as DateRange,
      });
      await openStoredFilter();
      expectBytes(await appliedFilter(onApply), REAPPLIED[name]);
    });
  });

  describe('save a filter, then load it', () => {
    it.each(SAVED_SCENARIOS)('%s', async (name) => {
      const { steps } = SCENARIOS[name];
      const onApply = vi.fn();
      renderWithProvider(<SavingPicker onApply={onApply} />);
      await steps();

      await userEvent.click(within(panel()).getByText(TEXTS.saveFilter));
      await userEvent.type(
        within(panel()).getByPlaceholderText(TEXTS.filterName),
        name,
      );
      const formButtons = within(
        within(panel()).getByTestId('drp-save-filter-form'),
      ).getAllByRole('button');
      await userEvent.click(formButtons[formButtons.length - 1]);

      await pickType(
        APPLIED[name].type === 'DAILY' ? TEXTS.weekly : TEXTS.daily,
      );
      await userEvent.click(
        within(panel()).getByText(TEXTS.savedFiltersTrigger),
      );
      await userEvent.click(await screen.findByText(name));

      expectBytes(await appliedFilter(onApply), APPLIED[name]);
    });
  });
});
