import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { within, screen, prettyDOM } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { DataFormatNotationType } from '@synerise/ds-data-format';

import RawDateRangePicker from './RawDateRangePicker';
import { AbsoluteDateRange } from './date.types';
import { ABSOLUTE } from './constants';
import DateRangePicker from './DateRangePicker';

const SYSTEM_NOW = '2024-03-01T00:00:00';
jest.mock('uuid', () => ({ v4: () => Math.floor(Math.random() * 999999999).toString() }));

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

const ABSOLUTE_VALUE: AbsoluteDateRange = {
  type: ABSOLUTE,
  from: '2018-10-09T00:00:00+02:00', // PL Summer Time
  to: '2018-12-08T23:59:59+01:00', // PL Winter Time
};

const TEXTS = {
  apply: 'apply',
  selectTime: 'select time',
  now: 'now',
} as any;

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

const TEST_CASES_WITH_TIME = TEST_CASES.filter(testData => testData.showTime);

describe('DateRangePicker TimezoneTesting', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(SYSTEM_NOW + 'Z'));
  });
  afterEach(() => jest.useRealTimers());
  it.each(TEST_CASES)(
    'should render trigger input value in provider timezone',
    ({ providerTimeZone, showTime, value, notation, from, to }) => {
      renderWithProvider(
        <DateRangePicker showTime={showTime} onApply={jest.fn()} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
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

  it.each(TEST_CASES)(
    'Click on specific days & click "apply": onApply param should have updated range with provider timezone offset',
    async ({ providerTimeZone, showTime, value, notation, updatedFromValueParam, updatedToValueParam }) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime={showTime} onApply={onApply} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );

      const leftSide = within(screen.getByTestId('ds-date-range-picker-side-left'));

      userEvent.click(leftSide.getByText('15'));
      userEvent.click(leftSide.getByText('17'));
      userEvent.click(screen.getByText(TEXTS.apply));
      const paramValue = getLastCallParams();

      expect(paramValue.from).toBe(updatedFromValueParam);
      expect(paramValue.to).toBe(updatedToValueParam);
    }
  );

  it.each(TEST_CASES_WITH_TIME)(
    'Time mode should show "from" and "to" time in provider timezone',
    async ({ providerTimeZone, value, notation, toDate, toTime, fromDate, fromTime }) => {
      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime onApply={jest.fn} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      userEvent.click(screen.getByText(TEXTS.selectTime));
      const rightSide = within(screen.getByTestId('ds-date-range-picker-side-right'));
      const leftSide = within(screen.getByTestId('ds-date-range-picker-side-left'));

      expect(within(leftSide.getByTestId('ds-time-picker-unit-hour')).getByText(fromTime?.h!)).toHaveAttribute(
        'data-selected'
      );
      expect(within(leftSide.getByTestId('ds-time-picker-unit-minute')).getByText(fromTime?.m!)).toHaveAttribute(
        'data-selected'
      );
      expect(leftSide.getByTestId('ds-date-picker-nav-title')).toHaveTextContent(fromDate!);
      if (fromTime?.meridiem) {
        expect(
          within(leftSide.getByTestId('ds-time-picker-unit-meridiem')).getByText(fromTime.meridiem)
        ).toHaveAttribute('data-selected');
      }

      expect(rightSide.getByTestId('ds-date-picker-nav-title')).toHaveTextContent(toDate!);
      expect(within(rightSide.getByTestId('ds-time-picker-unit-hour')).getByText(toTime?.h!)).toHaveAttribute(
        'data-selected'
      );
      expect(within(rightSide.getByTestId('ds-time-picker-unit-minute')).getByText(toTime?.m!)).toHaveAttribute(
        'data-selected'
      );
      if (toTime?.meridiem) {
        expect(
          within(rightSide.getByTestId('ds-time-picker-unit-meridiem')).getByText(toTime.meridiem)
        ).toHaveAttribute('data-selected');
      }
    }
  );

  it.each(TEST_CASES_WITH_TIME)(
    'NOW button should set to current time in provider timezone',
    async ({ providerTimeZone, value, notation, nowValueParam }) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1][0];

      renderWithProvider(
        <RawDateRangePicker texts={TEXTS} showTime onApply={onApply} value={value} />,
        {},
        { notation, timeZone: providerTimeZone }
      );
      userEvent.click(screen.getByText(TEXTS.now));
      userEvent.click(screen.getByText(TEXTS.apply));

      const applyParams = getLastCallParams();
      expect(applyParams.from).toBe(nowValueParam?.from);
      expect(applyParams.to).toBe(nowValueParam?.to);
    }
  );

  it.todo('TODAY relative range should render footer value using current day in provider timezone'); // FIXME component needs fixing
  it.todo('YESTERDAY relative range should render footer value using previous day in provider timezone'); // FIXME component needs fixing
  it.todo('LAST_MONTH relative range should render footer value using previous month in provider timezone'); // FIXME component needs fixing
  it.todo('TODAY relative range should display current day in footer in provider timezone'); // FIXME component needs fixing
  it.todo('TODAY relative range should set to current day in provider timezone'); // FIXME component needs fixing
});
