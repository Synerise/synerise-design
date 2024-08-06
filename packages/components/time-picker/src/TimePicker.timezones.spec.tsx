import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import TimePicker from './index';

const HOURS = '04';
const INITIAL_DATE_TIME_STRING = '2024-10-10T00:00:00';

export const TEST_CASES = [
  {
    id: 'Regression - TimePicker using local time',
    initialDate: (new Date(INITIAL_DATE_TIME_STRING)).toISOString(),
    providerTimeZone: undefined,
    includeTimezoneOffset: undefined,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  }, 
  {
    id: 'Provider timeZone 1',
    initialDate: (new Date(INITIAL_DATE_TIME_STRING)).toISOString(),
    providerTimeZone: 'Asia/Tokyo',
    includeTimezoneOffset: undefined,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone 2',
    initialDate: `${INITIAL_DATE_TIME_STRING}+02:00`,
    providerTimeZone: 'Europe/Warsaw', 
    includeTimezoneOffset: true,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone UTC',
    initialDate: `${INITIAL_DATE_TIME_STRING}+00:00`,
    providerTimeZone: 'UTC',
    includeTimezoneOffset: true,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone 3',
    initialDate: `${INITIAL_DATE_TIME_STRING}-04:00`,
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: true,
    EUTime: '04:00:00',
    USTime: '4:00:00', 
  },
  {
    id: 'Provider timeZone and prop timeZone matching',
    initialDate: `${INITIAL_DATE_TIME_STRING}-04:00`,
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: 'America/New_York',
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone different',
    initialDate: `${INITIAL_DATE_TIME_STRING}+09:00`,
    providerTimeZone: 'America/New_York',
    includeTimezoneOffset: 'Asia/Tokyo',
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
];

describe('TimePicker TimezoneTesting', () => {
  it.each(TEST_CASES)(
    'should emit onChange with correct values in US notation',
    ({ providerTimeZone, includeTimezoneOffset, USTime, initialDate }) => {
      const handleChange = jest.fn();
      const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];
      
      renderWithProvider(
        <TimePicker value={initialDate} raw onChange={handleChange} includeTimezoneOffset={includeTimezoneOffset} />,
        {},
        { notation: 'US', timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));
      expect(getLastCallParams()[1]).toBe(`${USTime} AM`);
    }
  );

  it.each(TEST_CASES)(
    'should emit onChange with correct values in EU notation',
    ({ providerTimeZone, includeTimezoneOffset, EUTime }) => {
      const handleChange = jest.fn();
      const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];

      renderWithProvider(
        <TimePicker raw onChange={handleChange} includeTimezoneOffset={includeTimezoneOffset} />,
        {},
        { notation: 'EU', timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));
      expect(getLastCallParams()[1]).toBe(EUTime);
    }
  );
});
