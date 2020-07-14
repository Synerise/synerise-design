import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import DateRangePicker from '../DateRangePicker';
import { ABSOLUTE } from '../../dist/constants';
import { DateRange, RelativeDateRange } from '../date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS } from '../constants';

const ABSOLUTE_VALUE = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00',
  to: '2018-12-08T23:59:59+01:00',
};

const RELATIVE_VALUE = RELATIVE_PRESETS[1];

const APPLY_BUTTON_SELECTOR = '.ds-date-range-picker-footer  button';

export const RANGES: RelativeDateRange[] = [
  {
    key: 'MY_RANGE',
    translationKey: 'MY_RANGE',
    type: RELATIVE,
    future: false,
    offset: { type: DAYS, value: 3 },
    duration: { type: DAYS, value: 1 },
  },
] ;

describe('DateRangePicker', () => {
  it('should render', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
      />
    );
    expect((await container.querySelector('.ds-date-range-picker')) as HTMLElement).toBeTruthy();
  });
  it('should display passed range', async () => {
    const onApply = jest.fn();
    const { getByText } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        forceAbsolute={false}
        value={ABSOLUTE_VALUE as DateRange}
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
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute
      />
    );
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    applyButton.click();
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(ABSOLUTE);
  });
  it('should not convert date to absolute by default', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
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
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
      />
    );
    expect(getByText(RANGES[0].translationKey as string)).toBeInTheDocument();
  });
  it('should update displayed range after selecting dates', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
      />
    );
    const valueWrapper = container.querySelector('.ds-date-range-picker-value') as HTMLElement;
    const selectedRangeStart = container.querySelector('[data-attr="1"]') as HTMLElement;
    selectedRangeStart.click();
    const selectedRangeEnd = container.querySelector('[data-attr="12"]') as HTMLElement;
    selectedRangeEnd.click();
    expect(valueWrapper.textContent).toBe("Oct 1, 2018, 00:00Oct 12, 2018, 23:59");
  });
  it('should update return absolute value when set custom date range', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={RELATIVE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
      />
    );
    const selectedRangeStart = container.querySelector('[data-attr="1"]') as HTMLElement;
    selectedRangeStart.click();
    const selectedRangeEnd = container.querySelector('[data-attr="12"]') as HTMLElement;
    selectedRangeEnd.click();
    const applyButton = container.querySelector(APPLY_BUTTON_SELECTOR) as HTMLElement;
    applyButton.click();
    const onApplyParameter = onApply.mock.calls[0][0];
    expect(onApplyParameter['type']).toBe(ABSOLUTE);
  });

  it('should change format when showTime is false', async () => {
    const onApply = jest.fn();
    const { container } = renderWithProvider(
      <DateRangePicker
        showTime={false}
        onApply={onApply}
        showFilter={false}
        showRelativePicker
        value={ABSOLUTE_VALUE as DateRange}
        forceAbsolute={false}
        ranges={RANGES}
      />
    );
    const valueWrapper = container.querySelector('.ds-date-range-picker-value') as HTMLElement;
    const selectedRangeStart = container.querySelector('[data-attr="1"]') as HTMLElement;
    selectedRangeStart.click();
    const selectedRangeEnd = container.querySelector('[data-attr="12"]') as HTMLElement;
    selectedRangeEnd.click();
    expect(valueWrapper.textContent).toBe("Oct 1, 2018Oct 12, 2018");
  });
});
