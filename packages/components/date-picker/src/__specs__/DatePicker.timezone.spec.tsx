import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { currentTimeInTimezone, toIsoString } from '@synerise/ds-core';
import { renderWithProvider } from '@synerise/ds-core/testing';

import RawDatePicker from '../RawDatePicker/RawDatePicker';
import DatePicker from '../DatePicker';

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
  timeZone?: true | string;
};
export const TEST_CASES_WITHOUT_TZ_OFFSET: TestCase[] = [
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
export const TEST_CASES: TestCase[] = [
  {
    id: 'Provider timeZone 2',
    providerTZOffset: '+02:00',
    expectedTZOffset: '+02:00',
    providerTimeZone: 'Europe/Warsaw',
    timeZone: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone UTC',
    providerTZOffset: '+00:00',
    expectedTZOffset: '+00:00',
    providerTimeZone: 'UTC',
    timeZone: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone 3',
    providerTZOffset: '-04:00',
    expectedTZOffset: '-04:00',
    providerTimeZone: 'America/New_York',
    timeZone: true,
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone matching',
    providerTZOffset: '-04:00',
    expectedTZOffset: '-04:00',
    providerTimeZone: 'America/New_York',
    timeZone: 'America/New_York',
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
  {
    id: 'Provider timeZone and prop timeZone different',
    providerTZOffset: '-04:00',
    expectedTZOffset: '+09:00',
    providerTimeZone: 'America/New_York',
    timeZone: 'Asia/Tokyo',
    USDateTime: 'Oct 10, 2024, 12:00 AM',
    EUDateTime: '10 Oct 2024, 00:00',
  },
];

const normalizeSpaces = (content: string | null) => {
  return content?.replace(/\u00A0|\u202F/g, ' ')
}

describe('DatePicker TimezoneTesting', () => {
  it.each([...TEST_CASES, ...TEST_CASES_WITHOUT_TZ_OFFSET])(
    'renders correct value in US notation',
    async ({ providerTimeZone, timeZone, providerTZOffset, USDateTime, initialDate }) => {
      const onApply = vi.fn();
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      renderWithProvider(
        <DatePicker
          value={value}
          onApply={onApply}
          showTime
          timeZone={timeZone}
          texts={{
            apply: 'Apply',
            now: 'Now',
          }}
        />,
        undefined,
        { notation: 'US', applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );

      await waitFor(() => expect(normalizeSpaces(screen.getByTestId<HTMLInputElement>('input-autosize-input').value)).toBe(USDateTime));
    }
  );
  // The trigger must not depend on the consumer's `applyTimeZoneOffset`: in timezone mode the
  // input formats a real instant and asks for the projection into the provider timezone itself,
  // so this runs the same matrix again with the default data-format config (flag `false`).
  //
  // Only the opted-in rows. Without `timeZone` the input formats a plain local date and does not
  // ask for a projection, so what it renders is by design whatever the consumer's own config
  // does with it — see the dedicated test below.
  it.each(TEST_CASES)(
    'renders correct value without applyTimeZoneOffset',
    async ({ providerTimeZone, timeZone, providerTZOffset, USDateTime, initialDate }) => {
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      renderWithProvider(
        <DatePicker
          value={value}
          onApply={vi.fn()}
          showTime
          timeZone={timeZone}
          texts={{
            apply: 'Apply',
            now: 'Now',
          }}
        />,
        undefined,
        { notation: 'US', timeZone: providerTimeZone }
      );

      await waitFor(() => expect(normalizeSpaces(screen.getByTestId<HTMLInputElement>('input-autosize-input').value)).toBe(USDateTime));
    }
  );
  /**
   * Opting out has to mean the ambient provider zone is not consulted at all.
   *
   * This was previously covered by a `TEST_CASES_WITHOUT_TZ_OFFSET` row asserting `12:00 AM`
   * under a *non*-projecting consumer config, which only held because the input inferred
   * "this is an instant" from `typeof value === 'string'` and then re-based it on `intl.timeZone`
   * — reaching every string-valued consumer that never asked for it.
   *
   * Derived from the host zone rather than written out, so it holds under every `TZ` the
   * `test:timezones` matrix runs.
   */
  it('leaves the provider timezone alone when timeZone is not set', async () => {
    renderWithProvider(
      <DatePicker
        value={`${INITIAL_DATE_TIME_STRING}+09:00`}
        onApply={vi.fn()}
        showTime
        texts={{ apply: 'Apply', now: 'Now' }}
      />,
      undefined,
      { notation: 'US', timeZone: 'Asia/Tokyo' }
    );

    const inHostZone = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(`${INITIAL_DATE_TIME_STRING}+09:00`));

    await waitFor(() =>
      expect(
        normalizeSpaces(
          screen.getByTestId<HTMLInputElement>('input-autosize-input').value
        )
      ).toBe(normalizeSpaces(inHostZone))
    );
  });

  it.each([...TEST_CASES, ...TEST_CASES_WITHOUT_TZ_OFFSET])(
    'renders correct value in EU notation',
    async ({ providerTimeZone, timeZone, providerTZOffset, EUDateTime, initialDate }) => {
      const onApply = vi.fn();
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const tzProp =
        timeZone !== undefined
          ? {
            timeZone,
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
        { notation: 'EU', applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      await waitFor(() => expect(screen.getByTestId('input-autosize-input')).toHaveValue(EUDateTime));
    }
  );

  const NOW_THRESHOLD = 1001; // allow 1s difference between clicked "now" and created "now" date

  it.each(TEST_CASES)(
    'uses NOW value in timezone',
    async ({ providerTimeZone, timeZone, providerTZOffset, initialDate }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const NOW_LABEL = 'now';
      renderWithProvider(
        <RawDatePicker
          value={value}
          onApply={onApply}
          onValueChange={onValueChange}
          showTime
          timeZone={timeZone}
          texts={{
            apply: 'Apply',
            now: NOW_LABEL,
          }}
        />,
        undefined,
        { applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const nowButton = await screen.findByText(NOW_LABEL);

      userEvent.click(nowButton);
      await waitFor(() => expect(onApply).toHaveBeenCalled());

      const resolvedTimeZone =
        typeof timeZone === 'string' ? timeZone : providerTimeZone;
      const NOW = currentTimeInTimezone(resolvedTimeZone as string);
      const receivedTime = new Date(getLastCallParams()[0]).getTime();
      const expectedTime = new Date(toIsoString(NOW, resolvedTimeZone)).getTime();
      expect(Math.abs(receivedTime - expectedTime)).toBeLessThan(NOW_THRESHOLD);
    }
  );
  it.each(TEST_CASES_WITHOUT_TZ_OFFSET)(
    'uses NOW value in timezone',
    async ({ providerTimeZone, providerTZOffset, initialDate }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const NOW_LABEL = 'now';
      renderWithProvider(
        <RawDatePicker
          value={value}
          onApply={onApply}
          onValueChange={onValueChange}
          showTime
          texts={{
            apply: 'Apply',
            now: NOW_LABEL,
          }}
        />,
        undefined,
        { applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const nowButton = await screen.findByText(NOW_LABEL);
      const NOW_ISO = new Date().toISOString();
      userEvent.click(nowButton);
      await waitFor(() => expect(onApply).toHaveBeenCalled());

      const receivedTime = new Date(getLastCallParams()[0]).getTime();
      const expectedTime = new Date(NOW_ISO).getTime();
      expect(Math.abs(receivedTime - expectedTime)).toBeLessThan(NOW_THRESHOLD);
    }
  );

  it.each(TEST_CASES)(
    'correct values in onApply - with timezone offsets, onApply param is a zoned Date',
    async ({
      providerTimeZone,
      timeZone,
      expectedTZOffset,
      providerTZOffset,
      initialDate,
    }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const APPLY_LABEL = 'Apply';
      const tzProp =
        timeZone !== undefined
          ? {
            timeZone,
          }
          : {};
      renderWithProvider(
        <RawDatePicker
          onApply={onApply}
          onValueChange={onValueChange}
          showTime
          value={value}
          {...tzProp}
          texts={{
            apply: APPLY_LABEL,
            now: 'now',
          }}
        />,
        undefined,
        { applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const day15 = await screen.findByText('15');
      userEvent.click(day15);
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());

      const hours = await screen.findByTestId('ds-time-picker-unit-hour');
      const minutes = await screen.findByTestId('ds-time-picker-unit-minute');
      const seconds = await screen.findByTestId('ds-time-picker-unit-second');

      userEvent.click(within(hours).getByText('11'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(within(minutes).getByText('39'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(within(seconds).getByText('51'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(screen.getByText(APPLY_LABEL));
      await waitFor(() => expect(onApply).toHaveBeenCalled());

      const applied = getLastCallParams()[0];

      // The opt-in used to hand over a formatted string. It now hands over a `TZDate` — the same
      // instant, plus the zone it was resolved in — so the call site picks its own wire format
      // instead of being given the one the component chose. `toISOString` still emits the offset
      // form the string contract produced, millisecond-precise.
      expect(applied).toBeInstanceOf(Date);
      expect(applied.toISOString()).toBe(
        `${CHANGED_DATE_TIME_STRING}.000${expectedTZOffset}`
      );
      expect((applied as { timeZone?: string }).timeZone).toBe(
        typeof timeZone === 'string'
          ? timeZone
          : providerTimeZone
      );
    }
  );

  it.each(TEST_CASES_WITHOUT_TZ_OFFSET)(
    'correct values in onApply - without timezone offsets, onApply param is Date',
    async ({ providerTimeZone, providerTZOffset, initialDate }) => {
      const onApply = vi.fn();
      const onValueChange = vi.fn();
      const getLastCallParams = () => onApply.mock.calls[onApply.mock.calls.length - 1];
      const value = initialDate ? initialDate : `${INITIAL_DATE_TIME_STRING}${providerTZOffset}`;
      const APPLY_LABEL = 'Apply';

      renderWithProvider(
        <RawDatePicker
          onApply={onApply}
          showTime
          value={value}
          onValueChange={onValueChange}
          texts={{
            apply: APPLY_LABEL,
            now: 'now',
          }}
        />,
        undefined,
        { applyTimeZoneOffset: true, timeZone: providerTimeZone }
      );
      const day15 = await screen.findByText('15');
      userEvent.click(day15);
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());

      const hours = await screen.findByTestId('ds-time-picker-unit-hour');
      const minutes = await screen.findByTestId('ds-time-picker-unit-minute');
      const seconds = await screen.findByTestId('ds-time-picker-unit-second');

      userEvent.click(within(hours).getByText('11'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(within(minutes).getByText('39'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(within(seconds).getByText('51'));
      await waitFor(() => expect(onValueChange).toHaveBeenCalled());
      userEvent.click(screen.getByText(APPLY_LABEL));
      await waitFor(() => expect(onApply).toHaveBeenCalled());

      const result = getLastCallParams()[0];
      expect(result instanceof Date).toBeTruthy()
      // Without the opt-in the value must pass through untouched — a plain `Date`, never a
      // `TZDate`. Widening this branch to the provider or browser zone would silently change
      // what every consumer that serializes the value sends, with no compiler error.
      expect((result as { timeZone?: string }).timeZone).toBeUndefined();
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(11);
      expect(result.getMinutes()).toBe(39);
      expect(result.getSeconds()).toBe(51);
    }
  );
});
