import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProvider } from '@synerise/ds-core/testing';

import TimePicker from './index';

const HOURS = '04';
const INITIAL_DATE_TIME_STRING = '2024-10-10T00:00:00';

export const TEST_CASES = [
  {
    id: 'Regression - TimePicker using local time',
    initialDate: (new Date(INITIAL_DATE_TIME_STRING)).toISOString(),
    providerTimeZone: undefined,
    timeZone: undefined,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  }, 
  {
    id: 'Provider timeZone 2',
    initialDate: `${INITIAL_DATE_TIME_STRING}+02:00`,
    providerTimeZone: 'Europe/Warsaw', 
    timeZone: true,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone UTC',
    initialDate: `${INITIAL_DATE_TIME_STRING}+00:00`,
    providerTimeZone: 'UTC',
    timeZone: true,
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone 3',
    initialDate: `${INITIAL_DATE_TIME_STRING}-04:00`,
    providerTimeZone: 'America/New_York',
    timeZone: true,
    EUTime: '04:00:00',
    USTime: '4:00:00', 
  },
  {
    id: 'Provider timeZone and prop timeZone matching',
    initialDate: `${INITIAL_DATE_TIME_STRING}-04:00`,
    providerTimeZone: 'America/New_York',
    timeZone: 'America/New_York',
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone different',
    initialDate: `${INITIAL_DATE_TIME_STRING}+09:00`,
    providerTimeZone: 'America/New_York',
    timeZone: 'Asia/Tokyo',
    EUTime: '04:00:00',
    USTime: '4:00:00',
  },
];

const normalizeSpaces = (content: string | null) => {
  return content?.replace(/\u00A0|\u202F/g, ' ')
}

describe('TimePicker TimezoneTesting', () => {
  it.each(TEST_CASES)(
    'should emit onChange with correct values in US notation [$id]',
    ({ providerTimeZone, timeZone, USTime, initialDate }) => {
      const handleChange = vi.fn();
      const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];
      
      renderWithProvider(
        <TimePicker value={initialDate} raw onChange={handleChange} timeZone={timeZone} />,
        {},
        { notation: 'US', applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));
      expect(normalizeSpaces(getLastCallParams()[1])).toBe(`${USTime} AM`);
    }
  );

  // The rendered time must not depend on the consumer's `applyTimeZoneOffset`: getTimeString
  // hands formatValue a real instant on purpose and asks for the projection itself, so this
  // runs the same matrix again with the default data-format config, where the flag is `false`.
  it.each(TEST_CASES)(
    'should emit onChange with correct values without applyTimeZoneOffset [$id]',
    ({ providerTimeZone, timeZone, EUTime }) => {
      const handleChange = vi.fn();
      const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];

      renderWithProvider(
        <TimePicker raw onChange={handleChange} timeZone={timeZone} />,
        {},
        { notation: 'EU', timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));
      expect(getLastCallParams()[1]).toBe(EUTime);
    }
  );

  it.each(TEST_CASES)(
    'should emit onChange with correct values in EU notation [$id]',
    ({ providerTimeZone, timeZone, EUTime }) => {
      const handleChange = vi.fn();
      const getLastCallParams = () => handleChange.mock.calls[handleChange.mock.calls.length - 1];

      renderWithProvider(
        <TimePicker raw onChange={handleChange} timeZone={timeZone} />,
        {},
        { notation: 'EU', applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));
      expect(getLastCallParams()[1]).toBe(EUTime);
    }
  );

  /**
   * Opting out has to mean the ambient provider zone is not consulted at all.
   *
   * This used to be a `TEST_CASES` row expecting `04:00:00` under a projecting consumer config,
   * which asserted the opposite: that a provider zone alone re-bases the picker. It cannot live
   * in that matrix either way, because opted out the rendered string *does* depend on the
   * consumer's `applyTimeZoneOffset` — the picker hands over a plain local date and the
   * consumer's own config projects it, which is the whole point.
   *
   * Written against the emitted `Date` rather than a literal, so it holds under every `TZ` the
   * `test:timezones` matrix runs.
   */
  it('leaves the provider timezone alone when timeZone is not set', () => {
    const handleChange = vi.fn();
    const getLastCallParams = () =>
      handleChange.mock.calls[handleChange.mock.calls.length - 1];

    renderWithProvider(
      <TimePicker raw onChange={handleChange} />,
      {},
      { notation: 'EU', applyTimeZoneOffset: true, timeZone: 'Asia/Tokyo' }
    );
    userEvent.click(
      within(screen.getByTestId('ds-time-picker-unit-hour')).getByText(HOURS)
    );

    const [emitted, rendered] = getLastCallParams();
    // The value is the host's own 04:00, untouched.
    expect((emitted as Date).getHours()).toBe(Number(HOURS));
    // And the shift visible in the string is the consumer's config projecting that instant,
    // not the picker having re-based it.
    expect(rendered).toBe(
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(emitted as Date)
    );
  });

  /**
   * The cases above only ever assert `onChange`'s *second* argument, the formatted time string,
   * so nothing pinned the emitted value itself. This pins it: `timeZone` opts into a `TZDate`
   * carrying the resolved zone, and its absence must leave the value a plain `Date`. The
   * passthrough is the load-bearing half — widening it would silently change what every consumer
   * that serializes the value sends, with no compiler error.
   */
  it.each(TEST_CASES)(
    'emits a zoned Date only when timeZone is set',
    ({ providerTimeZone, timeZone }) => {
      const handleChange = vi.fn();
      const getLastCallParams = () =>
        handleChange.mock.calls[handleChange.mock.calls.length - 1];

      renderWithProvider(
        <TimePicker raw onChange={handleChange} timeZone={timeZone} />,
        {},
        { notation: 'EU', timeZone: providerTimeZone }
      );
      const hoursWrapper = within(screen.getByTestId('ds-time-picker-unit-hour'));
      userEvent.click(hoursWrapper.getByText(HOURS));

      const emitted = getLastCallParams()[0];
      expect(emitted).toBeInstanceOf(Date);
      expect((emitted as { timeZone?: string }).timeZone).toBe(
        // eslint-disable-next-line no-nested-ternary
        !timeZone
          ? undefined
          : typeof timeZone === 'string'
            ? timeZone
            : providerTimeZone
      );
    }
  );
});
