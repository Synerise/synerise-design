import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import { ABSOLUTE } from '../../constants';
import { type DateRange } from '../../date.types';
import Footer from '../Footer';

/**
 * Range bounds are typed `Date | string`, and an ISO string is the form the picker itself emits —
 * so both arrive in practice, the string usually from a value hydrated out of an API and the `Date`
 * from a value the user just picked.
 *
 * These assert the two render the same text rather than pinning an exact rendering, which keeps
 * them locale-independent and targets the property that was broken: `footerDateToString` used to
 * send strings through a hardcoded moment-token pattern and only `Date`s through `formatValue`.
 * That is what kept `@date-fns/upgrade`'s `convertTokens` alive.
 */

const texts = {
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
} as never;

const rangeText = (from: Date | string, to: Date | string): string => {
  const value = { type: ABSOLUTE, from, to } as DateRange;
  const { container, unmount } = renderWithProvider(
    <Footer mode="DATE" texts={texts} value={value} showTime />,
  );
  const text = (
    container.querySelector('.ds-date-range-picker-value') as HTMLElement
  ).textContent;
  unmount();

  return text ?? '';
};

describe('Footer value types', () => {
  it.each([
    [
      'a date and time',
      new Date(2026, 8, 8, 13, 17, 0),
      new Date(2026, 8, 9, 14, 18, 0),
      '2026-09-08T13:17:00',
      '2026-09-09T14:18:00',
    ],
    [
      'midnight boundaries',
      new Date(2026, 0, 1, 0, 0, 0),
      new Date(2026, 11, 31, 23, 59, 0),
      '2026-01-01T00:00:00',
      '2026-12-31T23:59:00',
    ],
  ])(
    'renders %s the same whether bounds are Dates or ISO strings',
    (_label, fromDate, toDate, fromString, toString) => {
      expect(rangeText(fromString, toString)).toBe(rangeText(fromDate, toDate));
    },
  );

  it('falls back to the placeholders when there is no value', () => {
    const { container } = renderWithProvider(
      <Footer mode="DATE" texts={texts} showTime />,
    );
    const text = (
      container.querySelector('.ds-date-range-picker-value') as HTMLElement
    ).textContent;

    expect(text).toContain('Start date');
    expect(text).toContain('End date');
  });
});
