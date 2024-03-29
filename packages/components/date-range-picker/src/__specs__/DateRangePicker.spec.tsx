import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RawDateRangePicker from '../RawDateRangePicker';
import { DateRange, RelativeDateRange } from '../date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS, ABSOLUTE } from '../constants';
import { DEFAULT_RANGE_START, DEFAULT_RANGE_END } from '../RangeFilter/constants';
import { RelativeMode } from '../DateRangePicker.types';
import { fireEvent, getByTestId, getAllByTestId, waitFor, act } from '@testing-library/react';
import { ExpanderSize } from '@synerise/ds-button';
import DateRangePicker from '../DateRangePicker';
import type { PopoverProps } from 'antd/lib/popover';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import { normalizeRange } from '../utils';

const ABSOLUTE_VALUE = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
};
const ABSOLUTE_VALUE_WITH_FILTER = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
  filter: {
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
  },
};
const RELATIVE_MODES = ['PAST', 'FUTURE', 'SINCE'];
const RELATIVE_VALUE = RELATIVE_PRESETS[1];

const APPLY_BUTTON_SELECTOR = '.ds-date-range-picker-footer  button';

const displayDateContainerClass = 'ds-date-range-picker-value';

export const RANGES: RelativeDateRange[] = [
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
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
  today: 'Today',
  now: 'Now',
  more: 'More',
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
        // @ts-ignore
        texts={texts}
      />
    );
    expect((await container.querySelector('.ds-date-range-picker')) as HTMLElement).toBeTruthy();
  });
  it('should display passed range', async () => {
    const onApply = jest.fn();
    const { getByText } = renderWithProvider(
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
    const leftSideMonth = getByText('Oct');
    const rightSideMonth = getByText('Dec');
    expect(leftSideMonth).toBeInTheDocument();
    expect(rightSideMonth).toBeInTheDocument();
  });
  it('should convert date to absolute when forceAbsolute mode is enabled', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
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
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    applyButton.click();
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(ABSOLUTE);
  });
  it.todo('relative date-filter addon should render saving filters only if saving setter function is provided');
  it('should not convert date to absolute by default', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
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
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    applyButton.click();
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(RELATIVE_VALUE.type);
  });
  it('should render custom ranges', async () => {
    const onApply = jest.fn();
    const { getByText } = renderWithProvider(
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
    await getByText(texts.relativeDateRange).click();
    await waitFor(
      () => {
        expect(getByText(texts[RANGES[0].translationKey as string])).toBeInTheDocument();
      },
      { timeout: 50 }
    );
  });
  it.todo('should render Lifetime option by default in ranges');
  it('should update displayed range after selecting dates', async () => {
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
    findDayCell(1).click();
    findDayCell(1).click();
    expect(valueWrapper.textContent).toBe('1 Oct 2018, 00:00 – 1 Oct 2018, 23:59');
    findDayCell(2).click();
    findDayCell(12).click();
    expect(valueWrapper.textContent).toBe('2 Oct 2018, 00:00 – 12 Oct 2018, 23:59');
  });

  it.todo('should set to last 30 days if relative-date-range custom range');
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
    findDayCell(2).click();
    findDayCell(14).click();
    expect(valueWrapper.textContent).toBe('2.10.2018 – 14.10.2018');
  });
  it('should display custom color for arrow popup', async () => {
    const onApply = jest.fn();
    const popoverRef = React.createRef<Partial<PopoverProps> & { getPopupDomNode: () => HTMLElement }>();
    const { container, getByText } = renderWithProvider(
      <DateRangePicker
        onApply={() => {}}
        showTime
        relativeFuture
        forceAbsolute
        showRelativePicker
        texts={texts}
        popoverProps={{ placement: 'topLeft', mouseEnterDelay: 0, ref: popoverRef } as Partial<PopoverProps>}
        arrowColor={{ topLeft: 'grey' }}
        forceAdjacentMonths={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
      />
    );
    const element = getByText(texts.startDatePlaceholder);
    fireEvent.click(element);
    const popoverWrapper = popoverRef.current.getPopupDomNode() as HTMLElement;
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
    const { container, getByText } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        // @ts-ignore
        texts={texts}
      />
    );
    const getDayButton = () => container.querySelector('.DayPicker-Body .DayPicker-Day');
    fireEvent.click(getDayButton());
    fireEvent.click(getDayButton());
    const applyButton = container.querySelector('.ds-date-range-picker-footer .ds-button');
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    fireEvent.click(applyButton);
    expect(getLastCallParams().from).toBeDefined();
    expect(getLastCallParams().to).toBeDefined();
    expect(getLastCallParams().offset).not.toBeDefined();
    expect(getLastCallParams().duration).not.toBeDefined();
    expect(getLastCallParams().future).not.toBeDefined();
    const expander = container.querySelector('.addon-wrapper .ds-expander');
    expect(expander).toBeTruthy();
    fireEvent.click(expander);
    fireEvent.click(getByText(texts['today']));
    fireEvent.click(applyButton);
    expect(getLastCallParams().from).not.toBeDefined();
    expect(getLastCallParams().to).not.toBeDefined();
    expect(getLastCallParams().offset).toBeDefined();
    expect(getLastCallParams().duration).toBeDefined();
    expect(getLastCallParams().future).toBeDefined();
    // set the date once again to an absolute (expect no relative date props)
    fireEvent.click(getDayButton());
    fireEvent.click(getDayButton());
    fireEvent.click(applyButton);
    expect(getLastCallParams().offset).not.toBeDefined();
    expect(getLastCallParams().duration).not.toBeDefined();
    expect(getLastCallParams().future).not.toBeDefined();
  });
  it.todo('should properly set primary class in RangeButtons for currentRange');
  it.todo('should disable select time if selected ALL_TIME');
  it.todo('should switch to MODES.DATE if was in selecting time and selected ALL_TIME');
  it.todo('all relative modes (including lifetime) mode make apply button enabled');
  it.todo('CUSTOM relative mode sets key to undefined (handleCustomClick)');
  it.todo('relative range addon should be formatted accordingly to provided styles even if base styled are imported');
  it.todo('when in ALL_TIME - time picker should be disabled');
  it.todo('if time picker is shown - switching to Lifetime switches to MODE.DATE');
  it.todo('transformed value with valueTransformer is selected in RangesDropdown');
  it.todo('transformed Lifetime value can be applied');
  it.todo('lifetime is after transformation is properly displayed in the footer');
  it.todo('onApply emits transformedValue');
  it.todo('default value is not recognized as lifetime');
  it.todo(
    'ALL_TIME should emit only type: absolute and no other keys' /*, () => {
    const valueFromRelativeDateRangeAddon: DateRange = {
      "key": "ALL_TIME",
      "translationKey": "allTime",
      "type": "ABSOLUTE",
      "future": false
    }
    expect(defaultValueTransformer).toDeepEqual({"type": "ABSOLUTE"})
  }*/
  );
  it.todo('clicking button DATE-PICKER.NOW sets the type to absolute');
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
    const { container, getByText } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
        // @ts-ignore
        texts={texts}
      />
    );

    act(() => {
      getByText(texts.filter).click();
    });
    const addFilterButton = getByTestId(container, 'ds-add-button-label');
    act(() => {
      addFilterButton.click();
    });
    const inputs = getAllByTestId(container, 'tp-input');
    const wrapper0 = inputs[0].closest('div');
    const wrapper1 = inputs[1].closest('div');

    act(() => {
      inputs[0].click();
    });
    const clearIcon = wrapper0.querySelector('svg');
    act(() => {
      fireEvent.click(clearIcon);
    });
    expect(inputs[0]).toHaveValue(DEFAULT_RANGE_START.substring(0, 8));

    act(() => {
      inputs[1].click();
    });
    const clearIcon1 = wrapper1.querySelector('svg');
    act(() => {
      fireEvent.click(clearIcon1);
    });
    expect(inputs[1]).toHaveValue(DEFAULT_RANGE_END.substring(0, 8));
  });
  it.todo('relative custom range form values should persist when swithing to absolute range and back to custom');
  it.todo('relative custom range form values should persist when swithing to predefined relative range and back to custom');
  it.todo('relative custom range form values should persist when swithing to lifetime and back to custom');
  it.todo('relative custom range form values should reset when switching custom range mode');
  it('filters should persist when date range changes', async () => {
    const onApply = jest.fn();
    const { container, getByText } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={true}
        showRelativePicker={false}
        forceAbsolute={false}
        value={ABSOLUTE_VALUE_WITH_FILTER as DateRange}
        // @ts-ignore
        texts={texts}
      />
    );
    const getDayButton = () => container.querySelector('.DayPicker-Body .DayPicker-Day');
    const applyButton = await container.querySelector('.ds-date-range-picker-footer .ds-button');
    const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
    fireEvent.click(getDayButton());
    fireEvent.click(getDayButton());
    fireEvent.click(applyButton);
    expect(getLastCallParams().filter).toBe(ABSOLUTE_VALUE_WITH_FILTER.filter);
  });
  it('clicking "more" should toggle relative ranges dropdown', async () => {
    const onApply = jest.fn();
    const { container, getByText } = renderWithProvider(
      <RawDateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker={true}
        forceAbsolute={false}
        relativeModes={RELATIVE_MODES as RelativeMode[]}
        value={ABSOLUTE_VALUE as DateRange}
        // @ts-ignore
        texts={texts}
      />
    );

    act(() => {
      getByText(texts.relativeDateRange).click();
    });
    const moreLabel = getByText(texts.more);
    if (moreLabel) {
      const moreButton = moreLabel.closest('button');
      const dropdown = moreButton.nextElementSibling;
      act(() => {
        moreButton.click();
      });
      expect(dropdown).toHaveStyle('display:flex');
      act(() => {
        moreButton.click();
      });
    }
  });
  it.todo('monthly scheduler should render');
  it.todo('monthly scheduler should render from beginning or end');
  it.todo('monthly scheduler should render days of week or month');
  it.todo('monthly scheduler in days of week mode should return "day" key values within 1-7 range');
  it.todo(
    'SINCE dateFilter next or last is being properly distinguished while shown on the month view (future is recognized)'
  );
  it('datepicker with isTruncateMs=false prop should not truncate miliseconds', () => {
    const onApply = jest.fn();
    const from = new Date();
    const to = new Date();
    to.setMinutes(to.getMinutes()+1);
    
    const VALUE_WITH_MS = {
      type: ABSOLUTE,
      from: from.toISOString(),
      to: to.toISOString(),
    };

    const { container, getByText } = renderWithProvider(
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
    
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    act(() => {
      applyButton.click();
    })
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['from']).toBe(from.toISOString());
    expect(onApplyParameter['to']).toBe(to.toISOString());
  });
  it('datepicker value.from && value.to, if defined, should have 0ms', () => {
    const onApply = jest.fn();
    const { container, getByText } = renderWithProvider(
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
    
    act(() => {
      getByText(texts.now).click();
    });
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    act(() => {
      applyButton.click();
    })
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['from'].slice(-5)).toBe('.000Z');
    expect(onApplyParameter['to'].slice(-5)).toBe('.000Z');
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
});
