import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import RawDatePicker from '../RawDatePicker/RawDatePicker';
import DatePicker from '../DatePicker';
import { currentTimeInTimezone } from '@synerise/ds-data-format/dist/utils';
import { toIsoString } from '@synerise/ds-data-format/dist/utils/timeZone.utils';

const INITIAL_DATE_TIME_STRING = '2024-10-10T00:00:00';
const CHANGED_DATE_TIME_STRING = '2024-10-15T11:39:51';
type TestCase = {
  id: string;
  initialDate?: Date;
  providerTimeZone?: string;
  expectedTZOffset?: string;
  providerTZOffset?: string;
  USDateTime: string;
  EUDateTime: string;
  includeTimezoneOffset?: boolean | string;
};
export const TEST_CASES_WITHOUT_TZ_OFFSET = [
  {
    id: 'Regression - DatePicker using local time',
    initialDate: new Date(INITIAL_DATE_TIME_STRING),
    providerTimeZone: undefined,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Regression - Provider timeZone 1',
    providerTZOffset: '+09:00',
    providerTimeZone: 'Asia/Tokyo',
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
];
export const TEST_CASES = [
  {
    id: 'Provider timeZone 2',
    providerTZOffset: '+02:00',
    expectedTZOffset: '+02:00',
    providerTimeZone: 'Europe/Warsaw',
    includeTimezoneOffset: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone UTC',
    providerTZOffset: '+00:00',
    expectedTZOffset: '+00:00',
    providerTimeZone: 'UTC',
    includeTimezoneOffset: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone 3',
    providerTZOffset: '-04:00',
    expectedTZOffset: '-04:00',
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone matching',
    providerTZOffset: '-04:00',
    expectedTZOffset: '-04:00',
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: 'America/New_York',
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone different',
    providerTZOffset: '-04:00',
    expectedTZOffset: '+09:00',
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: 'Asia/Tokyo',
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
];

describe('DatePicker TimezoneTesting', () => {
  it.each([...TEST_CASES, ...TEST_CASES_WITHOUT_TZ_OFFSET])(
    'renders correct value in US notation',
    async ({ id, providerTimeZone, includeTimezoneOffset, providerTZOffset, USDateTime, initialDate }: TestCase) => {
      const onApply = jest.fn();
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      renderWithProvider(
        <DatePicker
          value={value}
          onApply={onApply}
          showTime
          includeTimezoneOffset={includeTimezoneOffset}
          texts={{
            apply: 'Apply',
            now: 'Now',
          }}
        />,
        undefined,
        { notation: 'US', timeZone: providerTimeZone }
      );

      await waitFor(() => expect(screen.getByTestId('input-autosize-input')).toHaveValue(USDateTime));
    }
  );
  it.each([...TEST_CASES, ...TEST_CASES_WITHOUT_TZ_OFFSET])(
    'renders correct value in EU notation',
    async ({ id, providerTimeZone, includeTimezoneOffset, providerTZOffset, EUDateTime, initialDate }: TestCase) => {
      const onApply = jest.fn();
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const tzProp =
        includeTimezoneOffset !== undefined
          ? {
              includeTimezoneOffset,
            }
          : {};
      renderWithProvider(
        <DatePicker
          value={value}
          onApply={onApply}
          showTime
          {...tzProp}
          texts={{
            apply: 'Apply',
            now: 'Now',
          }}
        />,
        undefined,
        { notation: 'EU', timeZone: providerTimeZone }
      );
      await waitFor(() => expect(screen.getByTestId('input-autosize-input')).toHaveValue(EUDateTime));
    }
  );

  const NOW_THRESHOLD = 100; // allow 100ms difference between clicked "now" and created "now" date

  it.each(TEST_CASES)(
    'uses NOW value in timezone',
    async ({ providerTimeZone, includeTimezoneOffset, providerTZOffset, initialDate }: TestCase) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const NOW_LABEL = 'now';
      renderWithProvider(
        <RawDatePicker
          value={value}
          onApply={onApply}
          showTime
          includeTimezoneOffset={includeTimezoneOffset}
          texts={{
            apply: 'Apply',
            now: NOW_LABEL,
          }}
        />,
        undefined,
        { timeZone: providerTimeZone }
      );
      const nowButton = await screen.findByText(NOW_LABEL);

      userEvent.click(nowButton);

      const timeZone = typeof includeTimezoneOffset === 'string' ? includeTimezoneOffset : providerTimeZone;
      const NOW = currentTimeInTimezone(timeZone as string);
      const receivedTime = new Date(getLastCallParams()[0]).getTime();
      const expectedTime = new Date(toIsoString(NOW, timeZone)).getTime();
      expect(Math.abs(receivedTime - expectedTime)).toBeLessThan(NOW_THRESHOLD);
    }
  );
  it.each(TEST_CASES_WITHOUT_TZ_OFFSET)(
    'uses NOW value in timezone',
    async ({ providerTimeZone, providerTZOffset, initialDate }: TestCase) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const NOW_LABEL = 'now';
      renderWithProvider(
        <RawDatePicker
          value={value}
          onApply={onApply}
          showTime
          texts={{
            apply: 'Apply',
            now: NOW_LABEL,
          }}
        />,
        undefined,
        { timeZone: providerTimeZone }
      );
      const nowButton = await screen.findByText(NOW_LABEL);
      const NOW_ISO = new Date().toISOString();
      userEvent.click(nowButton);

      const receivedTime = new Date(getLastCallParams()[0]).getTime();
      const expectedTime = new Date(NOW_ISO).getTime();
      expect(Math.abs(receivedTime - expectedTime)).toBeLessThan(NOW_THRESHOLD);
    }
  );

  it.each(TEST_CASES)(
    'correct values in onApply - with timezone offsets, onApply param is string',
    async ({
      providerTimeZone,
      includeTimezoneOffset,
      expectedTZOffset,
      providerTZOffset,
      initialDate,
    }: TestCase) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const APPLY_LABEL = 'Apply';
      const tzProp =
        includeTimezoneOffset !== undefined
          ? {
              includeTimezoneOffset,
            }
          : {};
      renderWithProvider(
        <RawDatePicker
          onApply={onApply}
          showTime
          value={value}
          {...tzProp}
          texts={{
            apply: APPLY_LABEL,
            now: 'now',
          }}
        />,
        undefined,
        { timeZone: providerTimeZone }
      );
      const day15 = await screen.findByText('15');
      userEvent.click(day15);

      const hours = await screen.findByTestId('ds-time-picker-unit-hour');
      const minutes = await screen.findByTestId('ds-time-picker-unit-minute');
      const seconds = await screen.findByTestId('ds-time-picker-unit-second');

      userEvent.click(within(hours).getByText('11'));
      userEvent.click(within(minutes).getByText('39'));
      userEvent.click(within(seconds).getByText('51'));
      userEvent.click(screen.getByText(APPLY_LABEL));

      expect(getLastCallParams()[0]).toBe(`${CHANGED_DATE_TIME_STRING}${expectedTZOffset}`);
    }
  );

  it.each(TEST_CASES_WITHOUT_TZ_OFFSET)(
    'correct values in onApply - without timezone offsets, onApply param is Date',
    async ({ providerTimeZone, providerTZOffset, initialDate }: TestCase) => {
      const onApply = jest.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const APPLY_LABEL = 'Apply';

      renderWithProvider(
        <RawDatePicker
          onApply={onApply}
          showTime
          value={value}
          texts={{
            apply: APPLY_LABEL,
            now: 'now',
          }}
        />,
        undefined,
        { timeZone: providerTimeZone }
      );
      const day15 = await screen.findByText('15');
      userEvent.click(day15);

      const hours = await screen.findByTestId('ds-time-picker-unit-hour');
      const minutes = await screen.findByTestId('ds-time-picker-unit-minute');
      const seconds = await screen.findByTestId('ds-time-picker-unit-second');

      userEvent.click(within(hours).getByText('11'));
      userEvent.click(within(minutes).getByText('39'));
      userEvent.click(within(seconds).getByText('51'));
      userEvent.click(screen.getByText(APPLY_LABEL));
      const result = getLastCallParams()[0];
      expect(result instanceof Date).toBeTruthy()
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(11);
      expect(result.getMinutes()).toBe(39);
      expect(result.getSeconds()).toBe(51);
    }
  );
});
