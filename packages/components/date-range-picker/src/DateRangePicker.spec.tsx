import React from 'react';
import type { PopoverProps } from 'antd/lib/popover';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { waitFor, within, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  getDefaultCustomRange,
} from './RelativeRangePicker/utils';
import RawDateRangePicker, { defaultValueTransformer } from './RawDateRangePicker';
import { DateRange, DateRangePreset, RelativeDateRange } from './date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS, ABSOLUTE, ABSOLUTE_PRESETS, ALL_TIME } from './constants';
import { DEFAULT_RANGE_START, DEFAULT_RANGE_END } from './RangeFilter/constants';
import { RelativeMode } from './DateRangePicker.types';
import DateRangePicker from './DateRangePicker';
import Weekly from './RangeFilter/Filters/new/Weekly/Weekly';
import { SavedFilter } from './RangeFilter/Shared/FilterDropdown/FilterDropdown.types';

jest.mock('uuid', () => ({ v4: () => Math.floor(Math.random()*999999999).toString() }));
const DAILY_FILTER = {
  from: "00:00:00.000",
  to: "23:59:59.999",
  type: "DAILY",
  inverted: false,
  nestingType: "IN_PLACE"
}
const WEEKLY_FILTER = {
  type: 'WEEKLY',
  nestingType: 'IN_PLACE',
  days: [
    {
      from: '00:00:00.000',
      to: '23:59:59.999',
      day: 5,
      inverted: false,
      mode: 'Range',
    },
  ],
};

const MONTHLY_FILTER = {
  "type": "MONTHLY",
  "nestingType": "IN_PLACE",
  "rules": [
    {
      "days": [
        {
          "from": "00:00:00.000",
          "to": "23:59:59.999",
          "day": 27,
          "inverted": false,
          "mode": "Range"
        }
      ],
      "type": "MONTH",
      "inverted": false
    },
    {
      "days": [
        {
          "from": "00:00:00.000",
          "to": "23:59:59.999",
          "day": 3,
          "inverted": false,
          "mode": "Range"
        }
      ],
      "type": "MONTH",
      "inverted": true
    }
  ]
}
const ABSOLUTE_VALUE = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
};
const ABSOLUTE_VALUE_WITH_FILTER = {
  ...ABSOLUTE_VALUE,
  filter: { ...WEEKLY_FILTER }
};
const ABSOLUTE_VALUE_WITH_DAILY_FILTER = {
  ...ABSOLUTE_VALUE,
  filter: { ...DAILY_FILTER }
}
const ABSOLUTE_VALUE_WITH_MONTHLY_FILTER = {
  ...ABSOLUTE_VALUE,
  filter: { ...MONTHLY_FILTER }
}
const RELATIVE_MODES = ['PAST', 'FUTURE', 'SINCE'];
const RELATIVE_VALUE = RELATIVE_PRESETS[1];

const LIFETIME_VALUE = ABSOLUTE_PRESETS.find(event => event.key === ALL_TIME);
const LIFETIME_VALUE_WITH_FILTER = {
  ...LIFETIME_VALUE,
  filter: { ...WEEKLY_FILTER }
}

const displayDateContainerClass = 'ds-date-range-picker-value';

const RANGES: RelativeDateRange[] = [
  {
    key: 'MY_RANGE',
    translationKey: 'myRange',
    type: RELATIVE,
    future: false,
    offset: { type: DAYS, value: 3 },
    duration: { type: DAYS, value: 1 },
  },
];
const texts = {
  relativeDateRange: 'Relative Picker',
  filter: 'Date Filter',
  myRange: 'myRange',
  allTime: 'Lifetime',
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
  today: 'Today',
  now: 'Now',
  more: 'More',
  custom: 'Custom',
  apply: 'Apply',
  saveFilter: 'Save filter',
  yesterday: 'yesterday',
  tomorrow: 'tomorrow',
  lastWeek: 'lastWeek',
  thisWeek: 'thisWeek',
  nextWeek: 'nextWeek',
  last7Days: 'last7Days',
  next7Days: 'next7Days',
  lastMonth: 'lastMonth',
  thisMonth: 'thisMonth',
  nextMonth: 'nextMonth',
  last3Months: 'last3Months',
  next3Months: 'next3Months',
  last6Months: 'last6Months',
  next6Months: 'next6Months',
  lastYear: 'lastYear',
  nextYear: 'nextYear',
  change: 'change',
  daily: 'daily',
  monthly: 'monthly',
  inverseSelection: 'Inverse selection'
} as any;

describe('DateRangePicker', () => {
  it('should render', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    expect((container.querySelector('.ds-date-range-picker')) as HTMLElement).toBeTruthy();
  });
  it('should render with NOW button by default', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    const nowButton = screen.getByText(texts.now);
    expect(nowButton).toBeInTheDocument();
  });
  it('should render without NOW button if set to false', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        showNowButton={false}
        onApply={onApply}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    const nowButton = screen.queryByText(texts.now);
    expect(nowButton).toBeFalsy();
  });
  it('should display passed range', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const leftSideMonth = screen.getByText('Oct');
    const rightSideMonth = screen.getByText('Dec');
    expect(leftSideMonth).toBeInTheDocument();
    expect(rightSideMonth).toBeInTheDocument();
  });
  it('should convert date to absolute when forceAbsolute mode is enabled', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        forceAbsolute
        texts={texts}
      />
    );
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    userEvent.click(applyButton);
    
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(ABSOLUTE);
  });
  it('relative date-filter addon should render saving filter button if saving setter function (onFilterSave) is provided', async () => {
    const onApply = jest.fn();
    const setFilters = jest.fn();
    const savedFilters: SavedFilter[] = [];
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        onFilterSave={setFilters}
        savedFilters={savedFilters}
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        texts={texts}
      />
    );
    const filterTrigger = screen.getByText(texts.filter);
    expect(filterTrigger).toBeInTheDocument();

    userEvent.click(filterTrigger);
    
    const addFilterButton = screen.getByTestId('ds-add-button-label');
    expect(addFilterButton).toBeInTheDocument();
    userEvent.click(addFilterButton);
    
    const saveFilterButton = screen.getByText(texts.saveFilter);
    expect(saveFilterButton).toBeInTheDocument();

  });

  it('relative date-filter addon should NOT render saving filter button if saving setter function (onFilterSave) is provided', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        texts={texts}
      />
    );
    const filterTrigger = screen.getByText(texts.filter);
    expect(filterTrigger).toBeInTheDocument();

    userEvent.click(filterTrigger);
    
    const addFilterButton = screen.getByTestId('ds-add-button-label');
    expect(addFilterButton).toBeInTheDocument();
    userEvent.click(addFilterButton);

    const saveFilterButton = screen.queryByText(texts.saveFilter);
    expect(saveFilterButton).toBeNull();
  });
  it('should not convert date to absolute by default', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    userEvent.click(applyButton);
    
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(RELATIVE_VALUE.type);
  });
  it('should render custom ranges', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    

    await waitFor(
      () => {
        expect(screen.getByText(texts[RANGES[0].translationKey as string])).toBeInTheDocument();
      },
      { timeout: 50 }
    );
  });
  it('should render Lifetime option by default in ranges', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    
    const lifetimeMenuItem = await screen.findByText(texts[LIFETIME_VALUE?.translationKey as string])
    expect(lifetimeMenuItem).toBeInTheDocument();
  });
  it.only('should update displayed range after selecting dates', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
        footerProps={{
          displayDateContainerClass,
        }}
      />
    );
    const valueWrapper = container.querySelector('.' + displayDateContainerClass) as HTMLElement;
    const findDayCell = (text: number) => container.querySelector(`[data-attr="${text}"]`) as HTMLElement;
    userEvent.click(findDayCell(1));
    userEvent.click(findDayCell(1));
    await waitFor(() => expect(valueWrapper.textContent).toBe('1 Oct 2018, 00:00 – 1 Oct 2018, 23:59'));
    userEvent.click(findDayCell(2));
    userEvent.click(findDayCell(12));
    await waitFor(() => expect(valueWrapper.textContent).toBe('2 Oct 2018, 00:00 – 12 Oct 2018, 23:59'));
  });

  it('should set to last 30 days if "custom" range selected for the first time', async () => {
    const onApply = jest.fn();
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    const defaultCustomRange = getDefaultCustomRange(null);
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={true}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    
    const relativeRanges = screen.getByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();

    
    
    const customButton = await screen.findByTestId('relative-range-preset-custom');
    expect(customButton).toBeInTheDocument();
    userEvent.click(customButton);

    userEvent.click(applyButton);
    
    expect(getLastCallParams().from).not.toBeDefined();
    expect(getLastCallParams().to).not.toBeDefined();
    expect(getLastCallParams().type).toBe('RELATIVE');
    expect(getLastCallParams().offset).toStrictEqual(defaultCustomRange.offset);
    expect(getLastCallParams().duration).toStrictEqual(defaultCustomRange.duration);
    
  });
  it('should change format when showTime is false', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <RawDateRangePicker
        showTime={false}
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
        footerProps={{
          displayDateContainerClass,
        }}
      />
    );
    const valueWrapper = container.querySelector('.' + displayDateContainerClass) as HTMLElement;
    const findDayCell = (text: number) => container.querySelector(`[data-attr="${text}"]`) as HTMLElement;
    userEvent.click(findDayCell(2));
    await waitFor(() => expect(valueWrapper.textContent).toBe('2.10.2018 – End date'));
    userEvent.click(findDayCell(14));
    await waitFor(() => expect(valueWrapper.textContent).toBe('2.10.2018 – 14.10.2018'));
  });
  it('should display custom color for arrow popup', async () => {
    const popoverRef = React.createRef<Partial<PopoverProps> & { getPopupDomNode: () => HTMLElement }>();
    renderWithProvider(
      <DateRangePicker
        onApply={() => {}}
        showTime
        relativeFuture
        forceAbsolute
        showRelativePicker
        texts={texts}
        popoverProps={{ placement: 'topLeft', mouseEnterDelay: 0, ref: popoverRef } as Partial<PopoverProps>}
        // @ts-ignore
        arrowColor={{ topLeft: 'grey' }}
        forceAdjacentMonths={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
      />
    );
    const element = screen.getByText(texts.startDatePlaceholder);
    userEvent.click(element);
    const popoverWrapper = popoverRef.current!.getPopupDomNode() as HTMLElement;
    const arrowElement = popoverWrapper.querySelector('.ant-popover-content > .ant-popover-arrow');
    expect(arrowElement).toHaveStyle(`background-color: ${(props): string => props.theme.palette['grey-050']}`);
  });
  it.todo('date-fns format function wrapper skips execution for invalid date');
  it.todo('handleRangeChange does not propagate invalid date range');
  it.todo('getSideState is able to parse Invalid Date (for months)');
  it.todo('normalizeRange properly forwards Invalid Date');
  it.todo('RangePickerInput getModifiers are able to handle invalid date range');
  it.todo('RangePickerInput.getText accepts Invalid Date');
  it.todo('date range picker relative addon internals is able to handle invalid ranges');
  it.todo('should render DecadePicker (YearPicker.decadeMode) when no initial value');
  it.todo(
    'should render DecadePicker (YearPicker.decadeMode) in MODES.SINCE when no initial value (data comes from renderYearPicker state.side=utils getSidesState)'
  );
  it('should omit non-absolute properties if emitting an absolute date-range value', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    const getDayButton = () => container.querySelector('.DayPicker-Body .DayPicker-Day:not(.DayPicker-Day--today)');
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    // @ts-ignore
    userEvent.click(getDayButton());
    // @ts-ignore
    userEvent.click(getDayButton());

    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    userEvent.click(applyButton);
    
    expect(getLastCallParams().from).toBeDefined();
    expect(getLastCallParams().to).toBeDefined();
    expect(getLastCallParams().offset).not.toBeDefined();
    expect(getLastCallParams().duration).not.toBeDefined();
    expect(getLastCallParams().future).not.toBeDefined();
    
    userEvent.click(screen.getByText(texts['today']));
    userEvent.click(applyButton);
    expect(getLastCallParams().from).not.toBeDefined();
    expect(getLastCallParams().to).not.toBeDefined();
    expect(getLastCallParams().offset).toBeDefined();
    expect(getLastCallParams().duration).toBeDefined();
    expect(getLastCallParams().future).toBeDefined();
    // set the date once again to an absolute (expect no relative date props)
    // @ts-ignore
    userEvent.click(getDayButton());
    // @ts-ignore
    userEvent.click(getDayButton());
    userEvent.click(applyButton);
    expect(getLastCallParams().offset).not.toBeDefined();
    expect(getLastCallParams().duration).not.toBeDefined();
    expect(getLastCallParams().future).not.toBeDefined();
  });
  it.todo('should properly set primary class in RangeButtons for currentRange');
  it('should disable select time if ALL_TIME was set as the default value', () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={LIFETIME_VALUE as DateRange}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const timeButton = document.querySelector('.ds-date-time-switch'); 
    expect(timeButton).toBeDisabled();
  });

  it.todo('should disable select time if selected ALL_TIME'); // FIXME fails when lifetime is provided as default value.... 
  it('should switch to MODES.DATE if was in selecting time and selected ALL_TIME', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={ABSOLUTE_VALUE as DateRange}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    

    const timeButton = document.querySelector('.ds-date-time-switch'); 
    const lifetimeMenuItem = screen.getByText(texts[LIFETIME_VALUE?.translationKey as string])
    expect(timeButton).toBeInTheDocument();
    expect(lifetimeMenuItem).toBeInTheDocument();

    if (timeButton) {
      userEvent.click(timeButton);
      
      expect(document.querySelector('.ds-time-picker')).not.toBeNull();
      
      userEvent.click(lifetimeMenuItem);
      
      expect(document.querySelector('.ds-time-picker')).toBeNull();
    }
    else {
      fail('time mode button not available')
    }
  });

  it('should disable select time if switched to ALL_TIME', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    expect(document.querySelector('.ds-date-time-switch')).not.toBeDisabled();
    const relativeRanges = screen.getByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();

    

    const lifetimeOption = await screen.findByText(texts[LIFETIME_VALUE?.translationKey as string])
    expect(lifetimeOption).toBeInTheDocument();

    userEvent.click(lifetimeOption);
    
    expect(document.querySelector('.ds-date-time-switch')).toBeDisabled();
  });
  

  it('all relative modes (including lifetime) mode make apply button enabled', async () => {
    const rangePresets = [ ...RELATIVE_PRESETS, ...ABSOLUTE_PRESETS ];
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        ranges={rangePresets}
        value={ABSOLUTE_VALUE as DateRange}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        texts={texts}
      />
    );
    
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();

    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    

    for (const rangePreset of rangePresets) {
      const rangePresetButton = screen.getByText(texts[rangePreset.translationKey as string])
      expect(rangePresetButton).toBeInTheDocument()
      userEvent.click(rangePresetButton);
      expect(applyButton).not.toBeDisabled();
    }
  });
  it.todo('CUSTOM relative mode sets key to undefined (handleCustomClick)');
  it.todo('relative range addon should be formatted accordingly to provided styles even if base styled are imported');
  it.todo('transformed value with valueTransformer is selected in RangesDropdown');
  it.todo('transformed Lifetime value can be applied');
  it.todo('lifetime is after transformation is properly displayed in the footer');
  it.todo('onApply emits transformedValue');
  it.todo('default value is not recognized as lifetime');
  it('ALL_TIME should emit type: absolute and optional filter key', () => {
    const transformedLifetimeValue = defaultValueTransformer(LIFETIME_VALUE as DateRange);
    const transformedLifetimeValueWithFilter = defaultValueTransformer(LIFETIME_VALUE_WITH_FILTER as DateRange);
    
    expect(Object.keys(transformedLifetimeValue).sort()).toEqual(["type","translationKey"].sort());
    expect(Object.keys(transformedLifetimeValueWithFilter).sort()).toEqual(["type", "filter","translationKey"].sort());
    
  });
  it('clicking button DATE-PICKER.NOW sets the type to absolute', () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={false}
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        texts={texts}
      />
    );
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();

    const nowButton = screen.getByText(texts.now);
    expect(nowButton).toBeInTheDocument();
    
    userEvent.click(nowButton);
    userEvent.click(applyButton);
    
    expect(getLastCallParams().type).toBe(ABSOLUTE);
  });
  it.todo('RangePicker is able to render relative dates (decorate with relativeToAbsolute)');
  it.todo('selecting last x days/months automatically switches to selected date');
  it.todo('months view, year view highlights selected (even relative) date range');
  it.todo('clicking NOW when replaces translationKey to `now`');
  it.todo('from, to are optional (lifetime option does not have them by definition)');
  it.todo('selecting time when selected relative date-range gets reset to an absolute date-range');
  it.todo('future is not preserved when switching from relative date to lifetime');
  it.todo('can click on select-time when lifetime');
  // it.skip('switch a whole month view at least to the month of the selected date (e.g. when last 3 months)') // TODO
  it.todo('can clear both relative and absolute dates');
  it.todo(
    'LAST_MONTH (normalizeRange) returns proper range' /* () => {
    const date = RELATIVE_PRESETS.find(e => e.key === 'LAST_MONTH')
    const dateRange = normalizeRange(date)
    expect(isLifetime(dateRange)).toBeTruthy()
  } */
  );
  it.todo('clicking button calls onApply with the current value');
  it.todo('custom range properly calculates finishing date (end of the month, if month date, normalizeRange)');
  it.todo('range gets updated to show selected visible');
  it.todo('onChange is called only when apply button is clicked');
  it.todo('right side should not be earlier than left side');
  it.todo('month is extended to the end of the month if duration is a type of month'); // not exactly - right side should be rounded to the more granular type among offset and duration
  it.todo('the default value is distinguishable from lifetime (no from nor to property)');
  it.todo('LAST_MONTH selects all days in a month');
  it.todo('LAST_MONTH (with option before n days) not necessarily selects a whole month');
  it.todo('changing to custom mode should enforce currentRange.type=RELATIVE');
  it.todo(
    'clearing relative custom SINCE should reset value to non-undefined (and what follows - preserve custom view)'
  );
  it.todo('SINCE is usnig durationModifier == LAST');
  it.todo('sinceTimestamp in SINCE is actually emitted');
  it.todo('date type SINCE can be passed to onApply (isValid)');
  it.todo('SINCE dateFilter value has future prop indicating whether it is next or last');
  it.todo(
    'SINCE dateFilter next or last is being properly distinguished while shown on the month view (future is recognized)'
  );
  it.todo('all three date filter buttons render when allowedFilterTypes prop is not present');
  it.todo('selected date filter buttons render when allowedFilterTypes prop is set');
  it.todo(
    'when from is selected from the right side of the picker the picker re-renders with from on the left side and the subsequent month rendered on the right side.'
  );
  it.todo('monthly date filter - periodType dropdown display value should show currently selected period type');
  it.todo(
    'monthly date filter - periodCountedFrom dropdown display value should show currently selected countedFrom value'
  );
  it('date filter with time - clicking clear button should reset to DEFAULT_RANGE_START / DEFAULT_RANGE_END (i.e. not current time)', () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );

    
    const filterButton = screen.getByText(texts.filter);
    expect(filterButton).toBeInTheDocument();
    
    userEvent.click(filterButton);

    const addFilterButton = screen.getByTestId('ds-add-button-label');
    expect(addFilterButton).toBeInTheDocument();
    
    userEvent.click(addFilterButton);
    
    const inputs = screen.getAllByTestId('tp-input');
    const wrapper0 = inputs[0].closest('div');
    const wrapper1 = inputs[1].closest('div');
    if (!wrapper1 || !wrapper0) {
      fail('No timepickers in dom')
    }
    
    userEvent.click(inputs[0]);
    
    const clearIcon = wrapper0.querySelector('svg');
    if (!clearIcon) {
      fail('No "clear" icon in dom')
    }
    act(() => {
      userEvent.click(clearIcon);
    });
    
    expect(inputs[0]).toHaveValue(DEFAULT_RANGE_START.substring(0, 8));
    
    userEvent.click(inputs[1]);
    
    const clearIcon1 = wrapper1.querySelector('svg');
    if (!clearIcon1) {
      fail('No "clear" icon in dom')
    }
    act(() => {
      userEvent.click(clearIcon1);
    });
    expect(inputs[1]).toHaveValue(DEFAULT_RANGE_END.substring(0, 8));
  });

  it.todo('relative custom range form values should persist when swithing to absolute range and back to custom');
  it.todo('relative custom range form values should persist when swithing to predefined relative range and back to custom');
  it.todo('relative custom range form values should persist when swithing to lifetime and back to custom');
  it.todo('relative custom range form values should reset when switching custom range mode');
  it('filters should persist when date range changes', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE_WITH_FILTER as DateRange}
        texts={texts}
      />
    );
    const getDayButton = () => container.querySelector('.DayPicker-Body .DayPicker-Day');
    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();

    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    // @ts-ignore
    userEvent.click(getDayButton());
    // @ts-ignore
    userEvent.click(getDayButton());
    userEvent.click(applyButton);
    expect(getLastCallParams().filter).toBe(ABSOLUTE_VALUE_WITH_FILTER.filter);
  });
  it('should render filter as slider', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        filterRangeDisplayMode='slider'
        value={ABSOLUTE_VALUE_WITH_MONTHLY_FILTER as DateRange}
        texts={texts}
      />
    );
    
    const filterAddOn = screen.getByText(texts.filter);
    expect(filterAddOn).toBeInTheDocument();

    const filterButton = screen.getByText(texts.change);
    expect(filterButton).toBeInTheDocument();
    
    userEvent.click(filterButton);

    const filterLabel = await screen.findByText(texts.daily);
    expect(filterLabel).toBeInTheDocument();

    userEvent.click(filterLabel);
    
    const slider = screen.getAllByRole('slider');
    expect(slider.length).toBeGreaterThan(0);
    
  });

  it('should allow inverted filter in slider mode', async () => {
    const onApply = jest.fn();
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        filterRangeDisplayMode='slider'
        value={ABSOLUTE_VALUE_WITH_DAILY_FILTER as DateRange}
        texts={texts}
      />
    );
    
    const filterAddOn = screen.getByText(texts.filter);
    expect(filterAddOn).toBeInTheDocument();

    const filterButton = screen.getByText(texts.change);
    expect(filterButton).toBeInTheDocument();
    
    userEvent.click(filterButton);

    const filterLabel = await screen.findByText(texts.daily)
    expect(filterLabel).toBeInTheDocument();

    userEvent.click(filterLabel);
    
    const inverseLink = screen.getByText(texts.inverseSelection);
    expect(inverseLink).toBeInTheDocument();

    userEvent.click(inverseLink);

    
    const applyFilter = screen.getByTestId('range-filter-apply-button');
    expect(applyFilter).toBeInTheDocument();

    userEvent.click(applyFilter);
    
    const applyRange = screen.getByTestId('date-range-picker-apply-button');
    expect(applyRange).toBeInTheDocument();

    userEvent.click(applyRange);

    expect(onApply).toHaveBeenCalled();
    expect(getLastCallParams().filter.inverted).toBe(true);
    
  });
  it('clicking "more" should toggle relative ranges dropdown', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={true}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    

    const moreLabel = screen.getByText(texts.more);
    if (moreLabel) {
      const moreButton = moreLabel.closest('button');
      if (!moreButton) {
        fail('No "more" button in dom')
      }
      const dropdown = moreButton.nextElementSibling;
      moreButton.click();
      
      await waitFor(() => expect(dropdown).not.toHaveStyle('display:none'));
      
      moreButton.click();
      
    }
  });
  it('"more" button should be tertiary if no range within it selected (i.e. by default)', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={true}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        value={ABSOLUTE_VALUE as DateRange}
        texts={texts}
      />
    );
    
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    

    const moreLabel = screen.getByText(texts.more);
    expect(moreLabel).toBeInTheDocument();

    const moreButton = screen.getByTestId('relative-ranges-dropdown');
    expect(moreButton).toBeInTheDocument();
    expect(moreButton).toHaveClass('ant-btn-tertiary');
      
    
  });
  it('"more" button should be primary if range within it is selected (i.e. "lifetime")', async () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={true}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        value={LIFETIME_VALUE as DateRange}
        texts={texts}
      />
    );
    
    const relativeRanges = await screen.findByText(texts.relativeDateRange);
    expect(relativeRanges).toBeInTheDocument();
    
    const rangesDropdown = screen.getByTestId('relative-ranges-dropdown');
    expect(rangesDropdown).toBeInTheDocument();
    expect(rangesDropdown).toHaveClass('ant-btn-primary');
  });
  it.todo('monthly scheduler should render');
  it.todo('monthly scheduler should render from beginning or end');
  it.todo('monthly scheduler should render days of week or month');
  it.todo('monthly scheduler in days of week mode should return "day" key values within 1-7 range');
  it.todo(
    'SINCE dateFilter next or last is being properly distinguished while shown on the month view (future is recognized)'
  );
  it.skip('datepicker with isTruncateMs=false prop should not truncate miliseconds', () => {
    const onApply = jest.fn();
    const from = new Date();
    const to = new Date();
    to.setMinutes(to.getMinutes() + 1);

    const VALUE_WITH_MS = {
      type: ABSOLUTE,
      from: from.toISOString(),
      to: to.toISOString(),
    };
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={false}
        value={VALUE_WITH_MS as DateRange}
        forceAbsolute={false}
        texts={texts}
        isTruncateMs={false}
      />
    );

    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    userEvent.click(applyButton);

    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['from']).toBe(from.toISOString());
    expect(onApplyParameter['to']).toBe(to.toISOString());
  });
  it('datepicker value.from && value.to, if defined, should have 0ms', () => {
    const onApply = jest.fn();
    renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={false}
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        texts={texts}
      />
    );

    screen.getByText(texts.now).click();

    const applyButton = screen.getByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    userEvent.click(applyButton);

    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['from'].slice(-5)).toBe('00:00');
    expect(onApplyParameter['to'].slice(-5)).toBe('00:00');
  });
  it.todo('RangePickerInput should render correct date time for 24 hours clock');
  it.todo('RangePickerInput should render correct date time for 12 hours clock');
  it.todo('Footer should render correct date time for 24 hours clock');
  it.todo('Footer should render correct date time for 12 hours clock');
  it.todo('TimeWindow::Everyday should render correct time for 24 hours clock');
  it.todo('TimeWindow::Everyday should render correct time for 12 hours clock');
  it.todo('TimeWindow::EveryWeek should render correct days order for Monday first notation');
  it.todo('TimeWindow::EveryWeek should render correct days order for Sunday first notation');
  it.todo('TimeWindow::EveryMonth::DaysOfWeek should render correct days order for Monday first notation');
  it.todo('TimeWindow::EveryMonth::DaysOfWeek should render correct days order for Sunday first notation');

  it('weekly filter with range - selecting range end time should NOT reset start time', async () => {
    const onChange = jest.fn();
    const getLastCallParams = () => onChange.mock.calls[onChange.mock.calls.length - 1][0];
    
    const dayValue = {
      "start": "06:00:00.000",
      "stop": "20:59:59.999",
      "restricted": true,
      "display": false,
      "inverted": false,
      "mode": "Range"
    };
    const value = {
      "6235e246-fa7e-4882-9223c-44d72aaa1e8e": {
        0: dayValue
      },
    };
    const expectedDayValue = { "0": { ...dayValue, stop: "07:59:59.999" } };
    
    renderWithProvider(
      <Weekly
        onChange={onChange}
        valueSelectionMode={['Range']}
        texts={texts}
        // @ts-ignore
        value={value}
      />
    );
    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons.length).toBe(7)
    userEvent.click(dayButtons[0]);
    
    const inputs = await screen.findAllByTestId('tp-input');
    expect(inputs.length).toBe(2);
    userEvent.click(inputs[1])

    const hoursWrapper = await screen.findByTestId('ds-time-picker-unit-hour');
    expect(hoursWrapper).toBeInTheDocument();

    const hours = within(hoursWrapper).getByText('07');
    expect(hours).toBeInTheDocument();
    userEvent.click(hours);
    
    expect(onChange).toHaveBeenCalled();
    
    const changedValue = Object.values(getLastCallParams())[0];
    expect(changedValue).toEqual(expectedDayValue);

  });

  it('monthly filter - default values for "counted from" and "days of" should be correct', async () => {
    const onApply = jest.fn();
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    const expectedLength = ABSOLUTE_VALUE_WITH_MONTHLY_FILTER.filter.rules.length;
    renderWithProvider(
      <RawDateRangePicker
        onApply={onApply}
        showFilter={true}
        value={ABSOLUTE_VALUE_WITH_MONTHLY_FILTER as DateRange}
        texts={texts}
      />
    );

    const filterButton = screen.getByText(texts.filter);
    expect(filterButton).toBeInTheDocument();
    
    userEvent.click(filterButton);

    const filterLabel = await screen.findByText(texts.monthly)
    expect(filterLabel).toBeInTheDocument();

    userEvent.click(filterLabel);

    const inlineInputs = document.querySelectorAll('.ds-inline-edit input');

    const countedFromInputs = [].filter.call(inlineInputs, (input: HTMLInputElement) => { return input.name === 'counted-from-select'})
    const daysOfInputs = [].filter.call(inlineInputs, (input: HTMLInputElement) => { return input.name === 'days-of-period'})
    
    expect(countedFromInputs.length).toBe(expectedLength);
    expect(daysOfInputs.length).toBe(expectedLength);

    countedFromInputs.forEach((input: HTMLInputElement, index: number) => {
      const invertedValue = ABSOLUTE_VALUE_WITH_MONTHLY_FILTER.filter.rules[index].inverted ? 'end' : 'beginning';
      expect(input.value).toBe(invertedValue);
    });

    daysOfInputs.forEach((input: HTMLInputElement, index: number) => {
      const daysOfValue = ABSOLUTE_VALUE_WITH_MONTHLY_FILTER.filter.rules[index].type === 'MONTH' ? 'month' : 'week';
      expect(input.value).toBe(daysOfValue);
    });
    
    const applyFilterButton = await screen.findByTestId('range-filter-apply-button');
    expect(applyFilterButton).toBeInTheDocument();

    userEvent.click(applyFilterButton);
    
    const applyButton = await screen.findByTestId('date-range-picker-apply-button');
    expect(applyButton).toBeInTheDocument();
    
    userEvent.click(applyButton);

    expect(onApply).toBeCalled();
    const appliedFilter = getLastCallParams().filter;
    expect(appliedFilter).toEqual(ABSOLUTE_VALUE_WITH_MONTHLY_FILTER.filter);

  });
});
