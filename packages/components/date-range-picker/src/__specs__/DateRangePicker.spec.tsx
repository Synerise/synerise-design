import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RawDateRangePicker from '../RawDateRangePicker';
import { DateRange, RelativeDateRange } from '../date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS, ABSOLUTE } from '../constants';
import { RelativeMode } from '../DateRangePicker.types';
import { fireEvent, waitFor } from '@testing-library/react';
import { ExpanderSize } from '@synerise/ds-button/dist/Expander/Expander.types';
import DateRangePicker from '../DateRangePicker';
import type { PopoverProps } from 'antd/lib/popover';
import { isLifetime } from '../RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import { normalizeRange } from '../utils';

const ABSOLUTE_VALUE = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
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
  myRange: 'myRange',
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
  today: 'Today',
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
  it.todo('month is extended to the end of the month if duration is a type of month');
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
});
