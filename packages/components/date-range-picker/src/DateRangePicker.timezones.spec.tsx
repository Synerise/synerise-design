/**
 * @testEnvironment jest-environment-jsdom
 */

import React from 'react';
import type { PopoverProps } from 'antd/lib/popover';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { waitFor, within, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getDefaultCustomRange } from './RelativeRangePicker/utils';
import RawDateRangePicker, { defaultValueTransformer } from './RawDateRangePicker';
import { AbsoluteDateRange, DateRange, RelativeDateRange } from './date.types';
import { DAYS, RELATIVE, RELATIVE_PRESETS, ABSOLUTE, ABSOLUTE_PRESETS, ALL_TIME } from './constants';
import { DEFAULT_RANGE_START, DEFAULT_RANGE_END } from './RangeFilter/constants';
import { RelativeMode } from './DateRangePicker.types';
import DateRangePicker from './DateRangePicker';
import Weekly from './RangeFilter/Filters/new/Weekly/Weekly';
import { SavedFilter } from './RangeFilter/Shared/FilterDropdown/FilterDropdown.types';

import { DataFormatNotationType } from '@synerise/ds-data-format';

// const SYSTEM_NOW = '2024-03-01T00:00:00';
jest.mock('uuid', () => ({ v4: () => Math.floor(Math.random() * 999999999).toString() }));
// jest.useFakeTimers('modern').setSystemTime(new Date(SYSTEM_NOW));

type TestCase = {
  id: string;
  providerTimeZone?: string;
  showTime: boolean;
  from: string;
  to: string;
  fromValueParam: string;
  toValueParam: string;
  notation: DataFormatNotationType;
  value: AbsoluteDateRange;
};

const ABSOLUTE_VALUE: AbsoluteDateRange = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00', // PL Summer Time 
  to: '2018-12-08T23:59:59+01:00', // PL Winter Time
};

const TEXTS = {
  apply: 'apply'
} as any;

const TEST_CASES: TestCase[] = [
  // Europe/Warsaw +1/+2
  // from: '2018-10-09T00:00:00+02:00'  -> Oct 9, 2018, 00:00
  // to: '2018-12-08T23:59:59+01:00'  -> Dec 8, 2018, 23:59
  {
    id: 'Provider timeZone 1 - date + time',
    providerTimeZone: 'Europe/Warsaw',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'US',
    from: 'Oct 9, 2018, 12:00 AM',
    to: 'Dec 8, 2018, 11:59 PM',
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
  },
  {
    id: 'Provider timeZone 1 - date + time',
    providerTimeZone: 'Europe/Warsaw',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '9 Oct 2018, 00:00',
    to: '8 Dec 2018, 23:59',
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
  },
  {
    id: 'Provider timeZone 1 - date only',
    providerTimeZone: 'Europe/Warsaw',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'US',
    from: '10/9/2018',
    to: '12/8/2018',
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
  },
  {
    id: 'Provider timeZone 1 - date only',
    providerTimeZone: 'Europe/Warsaw',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'EU',
    from: '9.10.2018',
    to: '8.12.2018',
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
  },
  // Asia/Tokyo +9
  // from: '2018-10-09T00:00:00+02:00'  -> Oct 10, 2018, 7:00 AM
  // to: '2018-12-08T23:59:59+01:00'  -> Dec 9, 2018, 7:59 AM
  {
    id: 'Provider timeZone 2 - date + time',
    providerTimeZone: 'Asia/Tokyo',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'US',
    from: 'Oct 9, 2018, 7:00 AM',
    to: 'Dec 9, 2018, 7:59 AM',
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
  },
  {
    id: 'Provider timeZone 2 - date + time',
    providerTimeZone: 'Asia/Tokyo',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '9 Oct 2018, 07:00',
    to: '9 Dec 2018, 07:59',
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
  },
  {
    id: 'Provider timeZone 2 - date only',
    providerTimeZone: 'Asia/Tokyo',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'US',
    from: '10/9/2018',
    to: '12/9/2018',
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
  },
  {
    id: 'Provider timeZone 2 - date only',
    providerTimeZone: 'Asia/Tokyo',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'EU',
    from: '9.10.2018',
    to: '9.12.2018',
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
  },
  // UTC
  // from: '2018-10-09T00:00:00+02:00'  -> Oct 8, 2018, 22:00 PM UTC
  // to: '2018-12-08T23:59:59+01:00'  -> Dec 8, 2018, 22:59 UTC
  {
    id: 'Provider timeZone UTC, US date + time',
    providerTimeZone: 'UTC',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'US',
    from: 'Oct 8, 2018, 10:00 PM',
    to: 'Dec 8, 2018, 10:59 PM',
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
  },
  {
    id: 'Provider timeZone UTC, EU  date + time',
    providerTimeZone: 'UTC',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '8 Oct 2018, 22:00',
    to: '8 Dec 2018, 22:59',
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
  },
  {
    id: 'Provider timeZone UTC, US date only',
    providerTimeZone: 'UTC',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'US',
    from: '10/8/2018',
    to: '12/8/2018',
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
  },
  {
    id: 'Provider timeZone UTC EU date only',
    providerTimeZone: 'UTC',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'EU',
    from: '8.10.2018',
    to: '8.12.2018',
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
  },
  // America/New_York
  // from: '2018-10-09T00:00:00+02:00'  -> Oct 9, 2018, 6:00 PM
  // to: '2018-12-08T23:59:59+01:00'  -> Dec 9, 2018, 5:59 PM
  {
    id: 'Provider timeZone NY, US date + time',
    providerTimeZone: 'America/New_York',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'US',
    from: 'Oct 8, 2018, 6:00 PM',
    to: 'Dec 8, 2018, 5:59 PM',
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
  },
  {
    id: 'Provider timeZone NY, EU date + time',
    providerTimeZone: 'America/New_York',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '8 Oct 2018, 18:00',
    to: '8 Dec 2018, 17:59',
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
  },
  {
    id: 'Provider timeZone NY, US date only',
    providerTimeZone: 'America/New_York',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'US',
    from: '10/8/2018',
    to: '12/8/2018',
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
  },
  {
    id: 'Provider timeZone NY EU date only',
    providerTimeZone: 'America/New_York',
    value: ABSOLUTE_VALUE,
    showTime: false,
    notation: 'EU',
    from: '8.10.2018',
    to: '8.12.2018',
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
  },
];

describe('DateRangePicker TimezoneTesting', () => {
  it.each(TEST_CASES)(
    'should render trigger input value in provider timezone',
    ({ id, providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <DateRangePicker showTime={showTime} onApply={jest.fn()} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      if (!screen.queryByText(from)) {
        console.log(id, from);
      }
      expect(screen.getByText(from)).toBeInTheDocument();
      expect(screen.getByText(to)).toBeInTheDocument();
    }
  );

  it.each(TEST_CASES)(
    'should render picker footer text render in provider timezone',
    async ({ providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime={showTime} onApply={jest.fn()} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      const footer = within(screen.getByTestId('ds-date-range-picker-footer'));
      expect(await footer.findByText(from)).toBeInTheDocument();
      expect(await footer.findByText(to)).toBeInTheDocument();
    }
  );
  it.each(TEST_CASES)(
    'onApply to / from params should have provider timezone offset',
    async ({ providerTimeZone, showTime, value, notation, fromValueParam, toValueParam }) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime={showTime} onApply={onApply} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      userEvent.click(screen.getByText(TEXTS.apply));
      const paramValue = getLastCallParams();

      expect(paramValue.from).toBe(fromValueParam);
      expect(paramValue.to).toBe(toValueParam);
    }
  );

  it.todo('NOW button should set to current time in provider timezone'); // FIXME useFakeTimers

  it.todo('TODAY relative range should render footer value using current day in provider timezone'); // FIXME component needs fixing
  it.todo('YESTERDAY relative range should render footer value using previous day in provider timezone'); // FIXME component needs fixing
  it.todo('LAST_MONTH relative range should render footer value using previous month in provider timezone'); // FIXME component needs fixing
  it.todo('TODAY relative range should display current day in footer in provider timezone'); // FIXME component needs fixing
  it.todo('TODAY relative range should set to current day in provider timezone'); // FIXME component needs fixing
});
