import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import RawDateRangePicker from '../RawDateRangePicker';
import { DateRange, RelativeDateRange } from '../date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS, ABSOLUTE } from '../constants';
import { RelativeMode } from '../DateRangePicker.types';
import { fireEvent, waitFor } from "@testing-library/react";
import { ExpanderSize } from '@synerise/ds-button/dist/Expander/Expander.types';
import DateRangePicker from '../DateRangePicker';
import type { PopoverProps } from 'antd/lib/popover';

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
    expect(valueWrapper.textContent).toBe('Oct 1, 2018, 00:00 – Oct 1, 2018, 23:59');
    findDayCell(2).click();
    findDayCell(12).click();
    expect(valueWrapper.textContent).toBe('Oct 2, 2018, 00:00 – Oct 12, 2018, 23:59');
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
    expect(valueWrapper.textContent).toBe('Oct 2, 2018 – Oct 14, 2018');
  });
  it('should display custom color for arrow popup', async () => {
    const onApply = jest.fn();
    const popoverRef = React.createRef<Partial<PopoverProps> & { getPopupDomNode: () => HTMLElement}>();
    const { container, getByText } = renderWithProvider(
      <DateRangePicker
        onApply={() => {}}
        showTime
        relativeFuture
        forceAbsolute
        showRelativePicker
        texts={texts}
        popoverProps={{ placement: 'topLeft', mouseEnterDelay: 0, ref: popoverRef} as Partial<PopoverProps> }
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
  it.todo('should render DecadePicker (YearPicker.decadeMode) in MODES.SINCE when no initial value (data comes from renderYearPicker state.side=utils getSidesState)');
  it.todo('should properly set primary class in RangeButtons for currentRange');
});
