import React from 'react';
import { type RequiredProps } from '@synerise/ds-utils';
import { within, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type DataFormatNotationType } from '@synerise/ds-core';
import { renderWithProvider } from '@synerise/ds-core/testing';

import RawDateRangePicker from './RawDateRangePicker';
import { type AbsoluteDateRange, type RelativeDateRange } from './date.types';
import { ABSOLUTE, RELATIVE_PRESETS } from './constants';
import DateRangePicker from './DateRangePicker';

const SYSTEM_NOW = '2024-03-01T00:00:00';

type TestCase = {
  id: string;
  providerTimeZone?: string;
  showTime: boolean;
  from: string;
  to: string;
  fromDate?: string;
  toDate?: string;
  fromTime?: { h: string; m: string; meridiem?: string };
  toTime?: { h: string; m: string; meridiem?: string };
  fromValueParam: string;
  toValueParam: string;
  updatedFromValueParam: string;
  updatedToValueParam: string;
  notation: DataFormatNotationType;
  value: AbsoluteDateRange;
  nowValueParam?: {
    from: string;
    to: string;
  };
};

type TestCaseWithTime = RequiredProps<TestCase, 'fromTime' | 'toTime' | 'fromDate' | 'toDate'>

const ABSOLUTE_VALUE: AbsoluteDateRange = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00', // PL Summer Time
  to: '2018-12-08T23:59:59+01:00', // PL Winter Time
};

const TEXTS = {
  apply: 'apply',
  selectTime: 'select time',
  now: 'now',
};

// datetimestring (sans tz offset) after clicking 15 and 17 on range picker
const DATE_TIME_STRING_POST_UPDATE = {
  FROM: '2018-10-15T00:00:00',
  TO: '2018-10-17T23:59:59',
};

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
    // value rendered in provider timezone
    from: 'Oct 9, 2018, 12:00 AM',
    fromDate: 'Oct 9, 2018',
    fromTime: {
      h: '12',
      m: '00',
      meridiem: 'AM',
    },
    to: 'Dec 8, 2018, 11:59 PM',
    toDate: 'Dec 8, 2018',
    toTime: { h: '11', m: '59', meridiem: 'PM' },
    // param passed when apply is clicked
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
    // param passed onApply after clicking on 15 and then 17 (of Oct 2018)
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+02:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+02:00`,

    // clicked "now", mocked system time is 2024-03-01T00:00:00Z
    nowValueParam: {
      from: '2024-03-01T01:00:00+01:00',
      to: '2024-03-01T01:01:00+01:00',
    },
  },
  {
    id: 'Provider timeZone 1 - date + time',
    providerTimeZone: 'Europe/Warsaw',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    fromDate: '9 Oct 2018',
    fromTime: { h: '00', m: '00' },
    toDate: '8 Dec 2018',
    toTime: { h: '23', m: '59' },
    from: '9 Oct 2018, 00:00',
    to: '8 Dec 2018, 23:59',
    fromValueParam: '2018-10-09T00:00:00+02:00',
    toValueParam: '2018-12-08T23:59:59+01:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+02:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+02:00`,
    nowValueParam: {
      from: '2024-03-01T01:00:00+01:00',
      to: '2024-03-01T01:01:00+01:00',
    },
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+02:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+02:00`,
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+02:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+02:00`,
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
    fromDate: 'Oct 9, 2018',
    fromTime: { h: '07', m: '00', meridiem: 'AM' },
    to: 'Dec 9, 2018, 7:59 AM',
    toDate: 'Dec 9, 2018',
    toTime: { h: '07', m: '59', meridiem: 'AM' },
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+09:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+09:00`,
    nowValueParam: {
      from: '2024-03-01T09:00:00+09:00',
      to: '2024-03-01T09:01:00+09:00',
    },
  },
  {
    id: 'Provider timeZone 2 - date + time',
    providerTimeZone: 'Asia/Tokyo',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '9 Oct 2018, 07:00',
    fromDate: '9 Oct 2018',
    fromTime: { h: '07', m: '00' },
    to: '9 Dec 2018, 07:59',
    toDate: '9 Dec 2018',
    toTime: { h: '07', m: '59' },
    fromValueParam: '2018-10-09T07:00:00+09:00',
    toValueParam: '2018-12-09T07:59:59+09:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+09:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+09:00`,
    nowValueParam: {
      from: '2024-03-01T09:00:00+09:00',
      to: '2024-03-01T09:01:00+09:00',
    },
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+09:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+09:00`,
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+09:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+09:00`,
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
    fromDate: 'Oct 8, 2018',
    fromTime: { h: '10', m: '00', meridiem: 'PM' },
    to: 'Dec 8, 2018, 10:59 PM',
    toDate: 'Dec 8, 2018',
    toTime: { h: '10', m: '59', meridiem: 'PM' },
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+00:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+00:00`,
    nowValueParam: {
      from: '2024-03-01T00:00:00+00:00',
      to: '2024-03-01T00:01:00+00:00',
    },
  },
  {
    id: 'Provider timeZone UTC, EU  date + time',
    providerTimeZone: 'UTC',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '8 Oct 2018, 22:00',
    fromDate: '8 Oct 2018',
    fromTime: { h: '22', m: '00' },
    to: '8 Dec 2018, 22:59',
    toDate: '8 Dec 2018',
    toTime: { h: '22', m: '59' },
    fromValueParam: '2018-10-08T22:00:00+00:00',
    toValueParam: '2018-12-08T22:59:59+00:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+00:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+00:00`,
    nowValueParam: {
      from: '2024-03-01T00:00:00+00:00',
      to: '2024-03-01T00:01:00+00:00',
    },
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+00:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+00:00`,
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}+00:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}+00:00`,
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
    fromDate: 'Oct 8, 2018',
    fromTime: { h: '06', m: '00', meridiem: 'PM' },
    to: 'Dec 8, 2018, 5:59 PM',
    toDate: 'Dec 8, 2018',
    toTime: { h: '05', m: '59', meridiem: 'PM' },
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}-04:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}-04:00`,
    nowValueParam: {
      from: '2024-02-29T19:00:00-05:00',
      to: '2024-02-29T19:01:00-05:00',
    },
  },
  {
    id: 'Provider timeZone NY, EU date + time',
    providerTimeZone: 'America/New_York',
    value: ABSOLUTE_VALUE,
    showTime: true,
    notation: 'EU',
    from: '8 Oct 2018, 18:00',
    fromDate: '8 Oct 2018',
    fromTime: { h: '18', m: '00' },
    to: '8 Dec 2018, 17:59',
    toDate: '8 Dec 2018',
    toTime: { h: '17', m: '59' },
    fromValueParam: '2018-10-08T18:00:00-04:00',
    toValueParam: '2018-12-08T17:59:59-05:00',
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}-04:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}-04:00`,
    nowValueParam: {
      from: '2024-02-29T19:00:00-05:00',
      to: '2024-02-29T19:01:00-05:00',
    },
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}-04:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}-04:00`,
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
    updatedFromValueParam: `${DATE_TIME_STRING_POST_UPDATE.FROM}-04:00`,
    updatedToValueParam: `${DATE_TIME_STRING_POST_UPDATE.TO}-04:00`,
  },
];

const TEST_CASES_WITH_TIME: TestCaseWithTime[] = TEST_CASES.filter(testData => (testData.showTime && testData.fromTime && testData.toTime));

// A day selected by clicking it twice spans 00:00:00-23:59:59 of the provider timezone, so the
// rendered wall clock is the clicked day in every timezone — only the emitted offset differs.
const SINGLE_DAY = '2018-10-20';
const SINGLE_DAY_TEXTS: Record<DataFormatNotationType, { date: string; from: string; to: string }> = {
  US: { date: '10/20/2018', from: 'Oct 20, 2018, 12:00 AM', to: 'Oct 20, 2018, 11:59 PM' },
  EU: { date: '20.10.2018', from: '20 Oct 2018, 00:00', to: '20 Oct 2018, 23:59' },
};

const getSingleDayTexts = ({ notation, showTime }: TestCase): [string, string] =>
  showTime
    ? [SINGLE_DAY_TEXTS[notation].from, SINGLE_DAY_TEXTS[notation].to]
    : [SINGLE_DAY_TEXTS[notation].date, SINGLE_DAY_TEXTS[notation].date];

// Every case's offset for October 2018 is already encoded in its updated params.
const getProviderOffset = ({ updatedFromValueParam }: TestCase): string => updatedFromValueParam.slice(-6);

/**
 * An emitted bound, against the offset-carrying ISO string the case tables hold.
 *
 * Those tables describe an *instant*: each provider zone re-expresses the same moment, which is
 * what the zone-aware decode makes possible. Opted in, the bound is a `TZDate` carrying that
 * instant plus the zone rather than one string form the component picked, so the two are compared
 * through `toISOString` — millisecond-precise, hence `withMillis` — and the zone separately.
 */
const withMillis = (iso: string) => iso.replace(/([+-]\d\d:\d\d|Z)$/, '.000$1');

const expectBound = (actual: unknown, expectedIso: string, timeZone?: string) => {
  expect(actual).toBeInstanceOf(Date);
  expect((actual as Date).toISOString()).toBe(withMillis(expectedIso));
  expect((actual as { timeZone?: string }).timeZone).toBe(timeZone);
};

const getSingleDayValue = (testCase: TestCase): AbsoluteDateRange => ({
  type: ABSOLUTE,
  from: `${SINGLE_DAY}T00:00:00${getProviderOffset(testCase)}`,
  to: `${SINGLE_DAY}T23:59:59${getProviderOffset(testCase)}`,
});

// A relative range resolves against "now" on the *provider's* clock. The mocked system time is
// 2024-03-01T00:00:00Z, so America/New_York is still on Feb 29 — a leap day — while the others
// have already rolled over to Mar 1. These are the days each preset must land on, whatever the
// browser timezone is.
const PROVIDER_DAYS: Record<
  string,
  { offset: string; today: string; yesterday: string; lastMonth: [string, string] }
> = {
  'Europe/Warsaw': {
    offset: '+01:00',
    today: '2024-03-01',
    yesterday: '2024-02-29',
    lastMonth: ['2024-02-01', '2024-02-29'],
  },
  'Asia/Tokyo': {
    offset: '+09:00',
    today: '2024-03-01',
    yesterday: '2024-02-29',
    lastMonth: ['2024-02-01', '2024-02-29'],
  },
  UTC: {
    offset: '+00:00',
    today: '2024-03-01',
    yesterday: '2024-02-29',
    lastMonth: ['2024-02-01', '2024-02-29'],
  },
  'America/New_York': {
    offset: '-05:00',
    today: '2024-02-29',
    yesterday: '2024-02-28',
    lastMonth: ['2024-01-01', '2024-01-31'],
  },
};

const toDateText = (isoDay: string, notation: DataFormatNotationType): string => {
  const [year, month, day] = isoDay.split('-').map(Number);
  return notation === 'US' ? `${month}/${day}/${year}` : `${day}.${month}.${year}`;
};

const getRelativePreset = (key: string): RelativeDateRange =>
  RELATIVE_PRESETS.find((preset) => preset.key === key) as RelativeDateRange;

// Date-only cases: the assertion is about which *day* a preset resolves to.
const DATE_ONLY_TEST_CASES = TEST_CASES.filter(({ showTime }) => !showTime);

const expectRangeTexts = (container: ReturnType<typeof within>, [fromText, toText]: [string, string]) => {
  if (fromText === toText) {
    // Both ends of a one-day range render the same text.
    expect(container.getAllByText(fromText)).toHaveLength(2);
    return;
  }
  expect(container.getByText(fromText)).toBeInTheDocument();
  expect(container.getByText(toText)).toBeInTheDocument();
};

describe('DateRangePicker TimezoneTesting', () => {
  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date(SYSTEM_NOW + 'Z'))
    console.log('TZ offset', (new Date()).getTimezoneOffset()/60)
  });
  afterAll(() => vi.restoreAllMocks());
  it.each(TEST_CASES)(
    'should render trigger input value in provider timezone',
    ({ providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <DateRangePicker timeZone showTime={showTime} onApply={vi.fn()} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );
      expect(screen.getByText(from)).toBeInTheDocument();
      expect(screen.getByText(to)).toBeInTheDocument();
    }
  );

  it.each(TEST_CASES)(
    'should render picker footer text render in provider timezone',
    ({ providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime={showTime} onApply={vi.fn()} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );
      const footer = within(screen.getByTestId('ds-date-range-picker-footer'));
      expect(footer.getByText(from)).toBeInTheDocument();
      expect(footer.getByText(to)).toBeInTheDocument();
    }
  );
  it.each(TEST_CASES)(
    'onApply to / from params should have provider timezone offset',
    ({ providerTimeZone, showTime, value, notation, fromValueParam, toValueParam }) => {
      const onApply = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime={showTime} onApply={onApply} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );
      fireEvent.click(screen.getByText(TEXTS.apply));
      
      expect(onApply).toHaveBeenCalled();
      
      const paramValue = getLastCallParams();

      expectBound(paramValue.from, fromValueParam, providerTimeZone);
      expectBound(paramValue.to, toValueParam, providerTimeZone);
    }
  );

  it.each(TEST_CASES)(
    'Click on specific days & click "apply": onApply param should have updated range with provider timezone offset',
    ({ providerTimeZone, showTime, value, notation, updatedFromValueParam, updatedToValueParam }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
      renderWithProvider(
        <RawDateRangePicker timeZone
          texts={TEXTS}
          onValueChange={onValueChange}
          showTime={showTime}
          onApply={onApply}
          value={value}
        />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const leftSide = within(screen.getByTestId('date-range-picker-side-left'));

      fireEvent.click(leftSide.getByText('15'));
      expect(onValueChange).toHaveBeenCalled();
      fireEvent.click(leftSide.getByText('17'));
      expect(onValueChange).toHaveBeenCalled();
      fireEvent.click(screen.getByText(TEXTS.apply));
      expect(onApply).toHaveBeenCalled();
      const paramValue = getLastCallParams();

      expectBound(paramValue.from, updatedFromValueParam, providerTimeZone);
      expectBound(paramValue.to, updatedToValueParam, providerTimeZone);
    }
  );

  it.each(TEST_CASES_WITH_TIME)(
    'Time mode should show "from" and "to" time in provider timezone',
    ({ providerTimeZone, value, notation, toDate, toTime, fromDate, fromTime }) => {
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime onApply={vi.fn()} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );
      fireEvent.click(screen.getByText(TEXTS.selectTime));
      
      expect(screen.getByTestId('date-range-picker-side-right')).toHaveAttribute('mode', 'time');
      expect(screen.getByTestId('date-range-picker-side-left')).toHaveAttribute('mode', 'time');
      
      const rightSide = within(screen.getByTestId('date-range-picker-side-right'));
      const leftSide = within(screen.getByTestId('date-range-picker-side-left'));

      expect(within(leftSide.getByTestId('ds-time-picker-unit-hour')).getByText(fromTime.h)).toHaveAttribute(
        'data-selected'
      );
      expect(within(leftSide.getByTestId('ds-time-picker-unit-minute')).getByText(fromTime.m)).toHaveAttribute(
        'data-selected'
      );
      expect(leftSide.getByTestId('ds-date-picker-nav-title')).toHaveTextContent(fromDate!);
      if (fromTime.meridiem) {
        expect(
          within(leftSide.getByTestId('ds-time-picker-unit-meridiem')).getByText(fromTime.meridiem)
        ).toHaveAttribute('data-selected');
      }
      
      expect(rightSide.getByTestId('ds-date-picker-nav-title')).toHaveTextContent(toDate!);
      expect(within(rightSide.getByTestId('ds-time-picker-unit-hour')).getByText(toTime.h)).toHaveAttribute(
        'data-selected'
      );
      expect(within(rightSide.getByTestId('ds-time-picker-unit-minute')).getByText(toTime.m)).toHaveAttribute(
        'data-selected'
      );
      if (toTime.meridiem) {
        expect(
          within(rightSide.getByTestId('ds-time-picker-unit-meridiem')).getByText(toTime.meridiem)
        ).toHaveAttribute('data-selected');
      }

    }
  );

  it.each(TEST_CASES_WITH_TIME)(
    'NOW button should set to current time in provider timezone',
    ({ providerTimeZone, value, notation, nowValueParam }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];

      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime onApply={onApply} onValueChange={onValueChange} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );
      fireEvent.click(screen.getByText(TEXTS.now));
      expect(onValueChange).toHaveBeenCalled();
      fireEvent.click(screen.getByText(TEXTS.apply));
      expect(onApply).toHaveBeenCalled();

      const applyParams = getLastCallParams();
      expectBound(applyParams.from, nowValueParam?.from as string, providerTimeZone);
      expectBound(applyParams.to, nowValueParam?.to as string, providerTimeZone);
    }
  );

  // Selecting one day by clicking it twice used to render as two different days, shifted by the
  // browser-to-provider timezone delta: from (00:00) and to (23:59:59) sit on opposite sides of
  // the OS-local day boundary, so any drift moves one of them to a neighbouring day.
  it.each(TEST_CASES)(
    'clicking the same day twice keeps the footer on that single day',
    (testCase) => {
      const { providerTimeZone, showTime, value, notation } = testCase;
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime={showTime} onApply={vi.fn()} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const leftSide = within(screen.getByTestId('date-range-picker-side-left'));
      fireEvent.click(leftSide.getByText('20'));
      fireEvent.click(leftSide.getByText('20'));

      expectRangeTexts(within(screen.getByTestId('ds-date-range-picker-footer')), getSingleDayTexts(testCase));
    }
  );

  it.each(TEST_CASES)(
    'clicking the same day twice emits that day bounded in the provider timezone',
    (testCase) => {
      const { providerTimeZone, showTime, value, notation } = testCase;
      const onApply = vi.fn();
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime={showTime} onApply={onApply} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const leftSide = within(screen.getByTestId('date-range-picker-side-left'));
      fireEvent.click(leftSide.getByText('20'));
      fireEvent.click(leftSide.getByText('20'));
      fireEvent.click(screen.getByText(TEXTS.apply));

      const { from, to } = getSingleDayValue(testCase);
      const paramValue = onApply.mock.calls[onApply.mock.calls.length - 1][0];
      expect(paramValue.type).toBe(ABSOLUTE);
      expectBound(paramValue.from, from as string, providerTimeZone);
      expectBound(paramValue.to, to as string, providerTimeZone);
    }
  );

  it.each(TEST_CASES)(
    'renders the emitted single-day range back in the trigger as one day',
    (testCase) => {
      const { providerTimeZone, showTime, notation } = testCase;
      renderWithProvider(
        <DateRangePicker timeZone showTime={showTime} onApply={vi.fn()} value={getSingleDayValue(testCase)} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      expectRangeTexts(within(screen.getByTestId('date-range-picker-input-wrapper')), getSingleDayTexts(testCase));
    }
  );

  // A `Date` in `value` is a real instant, so `new Date(emittedIsoString)` has to render the same
  // day as the string it came from.
  it.each(TEST_CASES)('renders Date bounds as the same instant as their ISO form', (testCase) => {
    const { providerTimeZone, showTime, notation } = testCase;
    const { from, to } = getSingleDayValue(testCase);
    renderWithProvider(
      <DateRangePicker timeZone
        showTime={showTime}
        onApply={vi.fn()}
        value={{ type: ABSOLUTE, from: new Date(from as string), to: new Date(to as string) }}
      />,
      {},
      { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
    );

    expectRangeTexts(within(screen.getByTestId('date-range-picker-input-wrapper')), getSingleDayTexts(testCase));
  });

  // The display must not depend on the consumer's `applyTimeZoneOffset`: the pickers hand
  // formatValue a real instant on purpose and ask for the projection themselves. This runs the
  // whole matrix again with the default data-format config, where the flag is `false`.
  it.each(TEST_CASES)(
    'renders trigger and footer in the provider timezone without applyTimeZoneOffset',
    ({ providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <DateRangePicker timeZone showTime={showTime} onApply={vi.fn()} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      expect(screen.getByText(from)).toBeInTheDocument();
      expect(screen.getByText(to)).toBeInTheDocument();

      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime={showTime} onApply={vi.fn()} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      const footer = within(screen.getByTestId('ds-date-range-picker-footer'));
      expect(footer.getByText(from)).toBeInTheDocument();
      expect(footer.getByText(to)).toBeInTheDocument();
    }
  );

  // Editing a time was only covered up to the initial render. 24h notation only, so the hour
  // cell can be addressed without the meridiem column.
  it.each(TEST_CASES_WITH_TIME.filter(({ notation }) => notation === 'EU'))(
    'keeps a time edited in the time panel, in the provider timezone',
    ({ providerTimeZone, value, notation, fromValueParam, toValueParam }) => {
      const onApply = vi.fn();
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} showTime onApply={onApply} value={value} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      fireEvent.click(screen.getByText(TEXTS.selectTime));
      const leftSide = within(screen.getByTestId('date-range-picker-side-left'));
      fireEvent.click(within(leftSide.getByTestId('ds-time-picker-unit-hour')).getByText('05'));
      fireEvent.click(screen.getByText(TEXTS.apply));

      const [paramValue] = onApply.mock.calls[onApply.mock.calls.length - 1];
      // Same day and offset as the untouched value, only the hour moves to the clicked one.
      expectBound(
        paramValue.from,
        `${fromValueParam.slice(0, 10)}T05:00:00${fromValueParam.slice(-6)}`,
        providerTimeZone
      );
      expectBound(paramValue.to, toValueParam, providerTimeZone);
    }
  );

  // Relative presets used to resolve against the browser's clock, so "today" could be the wrong
  // day for the provider — most visibly across the date line, where the two never agree.
  it.each(DATE_ONLY_TEST_CASES)(
    'TODAY resolves to the provider current day in the footer',
    ({ providerTimeZone, notation }) => {
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} onApply={vi.fn()} value={getRelativePreset('TODAY')} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const { today } = PROVIDER_DAYS[providerTimeZone as string];
      const dayText = toDateText(today, notation);
      expectRangeTexts(within(screen.getByTestId('ds-date-range-picker-footer')), [dayText, dayText]);
    }
  );

  it.each(DATE_ONLY_TEST_CASES)(
    'YESTERDAY resolves to the provider previous day in the footer',
    ({ providerTimeZone, notation }) => {
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} onApply={vi.fn()} value={getRelativePreset('YESTERDAY')} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const { yesterday } = PROVIDER_DAYS[providerTimeZone as string];
      const dayText = toDateText(yesterday, notation);
      expectRangeTexts(within(screen.getByTestId('ds-date-range-picker-footer')), [dayText, dayText]);
    }
  );

  it.each(DATE_ONLY_TEST_CASES)(
    'LAST_MONTH resolves to the provider previous month in the footer',
    ({ providerTimeZone, notation }) => {
      renderWithProvider(
        <RawDateRangePicker timeZone texts={TEXTS} onApply={vi.fn()} value={getRelativePreset('LAST_MONTH')} />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const [monthStart, monthEnd] = PROVIDER_DAYS[providerTimeZone as string].lastMonth;
      expectRangeTexts(within(screen.getByTestId('ds-date-range-picker-footer')), [
        toDateText(monthStart, notation),
        toDateText(monthEnd, notation),
      ]);
    }
  );

  it.each(DATE_ONLY_TEST_CASES)(
    'TODAY applied with forceAbsolute emits the provider current day',
    ({ providerTimeZone, notation }) => {
      const onApply = vi.fn();
      renderWithProvider(
        <RawDateRangePicker timeZone
          texts={TEXTS}
          forceAbsolute
          onApply={onApply}
          value={getRelativePreset('TODAY')}
        />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      fireEvent.click(screen.getByText(TEXTS.apply));

      const { today, offset } = PROVIDER_DAYS[providerTimeZone as string];
      const paramValue = onApply.mock.calls[onApply.mock.calls.length - 1][0];
      expect(paramValue.type).toBe(ABSOLUTE);
      expectBound(paramValue.from, `${today}T00:00:00${offset}`, providerTimeZone);
      expectBound(paramValue.to, `${today}T23:59:59${offset}`, providerTimeZone);
    }
  );

  /**
   * Everything above passes `timeZone` as a bare flag, resolving to the provider's zone. This
   * pins the *string* form of the prop — naming a zone directly — against the same expectations,
   * which only agree because each case's provider zone and named zone are the same one.
   */
  it.each(TEST_CASES)(
    'emits TZDate bounds when the timeZone prop is set',
    ({
      providerTimeZone,
      showTime,
      value,
      notation,
      updatedFromValueParam,
      updatedToValueParam,
    }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () =>
        onApply.mock.calls[onApply.mock.calls.length - 1][0];
      renderWithProvider(
        <RawDateRangePicker
          texts={TEXTS}
          onValueChange={onValueChange}
          showTime={showTime}
          onApply={onApply}
          value={value}
          timeZone={providerTimeZone}
        />,
        {},
        { applyTimeZoneOffset: true, notation, timeZone: providerTimeZone }
      );

      const leftSide = within(
        screen.getByTestId('date-range-picker-side-left')
      );

      fireEvent.click(leftSide.getByText('15'));
      fireEvent.click(leftSide.getByText('17'));
      fireEvent.click(screen.getByText(TEXTS.apply));
      expect(onApply).toHaveBeenCalled();
      const paramValue = getLastCallParams();

      expectBound(paramValue.from, updatedFromValueParam, providerTimeZone);
      expectBound(paramValue.to, updatedToValueParam, providerTimeZone);
    }
  );

  /**
   * Everything above passes `timeZone`. This is the other half of the contract: without it the
   * component must behave exactly as it did before the prop existed, because every consumer that
   * has not migrated is sitting under an `IntlProvider` that already carries a zone — reading it
   * would re-base all of them at once.
   *
   * The legacy decode is `rmvTZOffset`: strip a `±hh:mm` suffix and read the rest as a browser
   * wall clock. It discards the offset rather than honouring it, which is the bug `timeZone`
   * exists to fix — so these tests pin behaviour that is *wrong on purpose*, and are expected to
   * be deleted once every consumer has opted in.
   */
  describe('without the timeZone prop', () => {
    const PROVIDER = 'Asia/Tokyo';

    it('emits ISO strings, not TZDates', () => {
      const onApply = vi.fn();
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime onApply={onApply} value={ABSOLUTE_VALUE} />,
        {},
        { applyTimeZoneOffset: true, notation: 'EU', timeZone: PROVIDER }
      );
      fireEvent.click(screen.getByText(TEXTS.apply));

      const paramValue = onApply.mock.calls[onApply.mock.calls.length - 1][0];
      expect(typeof paramValue.from).toBe('string');
      expect(typeof paramValue.to).toBe('string');
    });

    const applyAndRead = (timeZone: string) => {
      const onApply = vi.fn();
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime onApply={onApply} value={ABSOLUTE_VALUE} />,
        {},
        { applyTimeZoneOffset: true, notation: 'EU', timeZone }
      );
      fireEvent.click(screen.getByText(TEXTS.apply));
      return onApply.mock.calls[onApply.mock.calls.length - 1][0];
    };

    // Fed its own previous output under the zone that produced it, the legacy decode round-trips
    // losslessly: strip `+02:00`, keep the wall clock, stamp Warsaw's offset back on.
    it('round-trips its own output unchanged', () => {
      const paramValue = applyAndRead('Europe/Warsaw');
      expect(paramValue.from).toBe(ABSOLUTE_VALUE.from);
      expect(paramValue.to).toBe(ABSOLUTE_VALUE.to);
    });

    /**
     * The discriminating case, and the bug itself.
     *
     * `ABSOLUTE_VALUE` carries `+02:00` while the provider is Tokyo, so the two decodes disagree:
     * the legacy one discards the offset and keeps the literal `00:00` fields, and the zone-aware
     * one honours it and reads Tokyo's `07:00` for that instant. Opted out it has to be `00:00` —
     * wrong, and the reason `timeZone` exists — because that is what consumers see today.
     */
    it('discards the offset rather than honouring it', () => {
      const paramValue = applyAndRead(PROVIDER);
      expect(paramValue.from).toBe('2018-10-09T00:00:00+09:00');
      expect(paramValue.to).toBe('2018-12-08T23:59:59+09:00');
    });

    // Stated as an equivalence rather than against literals: whatever the trigger renders, a
    // provider zone must not change it.
    //
    // `applyTimeZoneOffset` is deliberately left off. With it on, `formatValue` projects into the
    // config's zone and the two renders differ for a reason that has nothing to do with the
    // picker — that is the consumer's own formatting, and opting out means inheriting it. With it
    // off nothing else can move the value, so any difference here is the component having read
    // `intl.timeZone` on its own, which is exactly the regression this guards.
    it('renders the trigger identically with and without a provider timezone', () => {
      const triggerText = (timeZone?: string) => {
        const { unmount } = renderWithProvider(
          <DateRangePicker showTime onApply={vi.fn()} value={ABSOLUTE_VALUE} />,
          {},
          { notation: 'EU', timeZone }
        );
        const text = screen.getByTestId('date-range-picker-input-wrapper').textContent;
        unmount();
        return text;
      };

      expect(triggerText(PROVIDER)).toBe(triggerText(undefined));
      // Pinned as a literal too: the legacy decode keeps `ABSOLUTE_VALUE`'s written-down fields,
      // so this is the same under every host zone — and it is `00:00`, not the `07:00` Tokyo
      // shows at that instant.
      expect(triggerText(PROVIDER)).toBe('9 Oct 2018, 00:008 Dec 2018, 23:59');
    });
  });
});
