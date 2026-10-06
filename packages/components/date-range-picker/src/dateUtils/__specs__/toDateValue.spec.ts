import { describe, expect, it } from 'vitest';

import { toDateValue } from '../toDateValue';

/**
 * `toDateValue` replaced `legacyParse` from `@date-fns/upgrade`. These pin its behaviour rather
 * than its implementation, because the whole point of the replacement was to change nothing: every
 * expectation below was captured from `legacyParse` before the shim was removed, across all three
 * timezones this package is tested in.
 *
 * Browser-independent: every string case either carries its own offset, or is asserted through the
 * local fields it is meant to land on.
 */

const localFields = (date: Date): string => {
  const pad = (value: number) => String(value).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

describe('toDateValue', () => {
  it.each([
    // A naive string is read as LOCAL time. This is the case that rules out `new Date` and
    // `toDate` as substitutes: for a date-only form the spec says UTC, and they obey it.
    ['2024-01-15', '2024-01-15T00:00:00'],
    ['2024-06-15', '2024-06-15T00:00:00'],
    ['2024-01-15T10:30:00', '2024-01-15T10:30:00'],
  ])('reads the naive string %s as local time', (input, expected) => {
    expect(localFields(toDateValue(input))).toBe(expected);
  });

  it.each([
    // Offset-carrying strings denote one instant, so they are asserted as instants.
    ['2024-01-15T10:30:00Z', '2024-01-15T10:30:00.000Z'],
    ['2024-01-15T10:30:00+05:30', '2024-01-15T05:00:00.000Z'],
    ['2024-06-15T12:00:00+09:30', '2024-06-15T02:30:00.000Z'],
  ])('decodes %s by its own offset', (input, expected) => {
    expect(toDateValue(input).toISOString()).toBe(expected);
  });

  it('passes a number through as a timestamp', () => {
    expect(toDateValue(1705314600000).toISOString()).toBe(
      '2024-01-15T10:30:00.000Z',
    );
  });

  it('copies a Date rather than returning the same instance', () => {
    const original = new Date(1705314600000);
    const result = toDateValue(original);

    expect(result.getTime()).toBe(original.getTime());
    expect(result).not.toBe(original);
  });

  /**
   * `null` is the trap. `new Date(null)` is the epoch, and `isValid` reports the epoch as valid —
   * so a nullish bound does not fail a validity guard, it silently becomes 1 January 1970. That is
   * what `legacyParse` did, and call sites are written around it, so it is preserved deliberately.
   */
  it('turns null into the epoch, which is a valid date', () => {
    expect(toDateValue(null).getTime()).toBe(0);
  });

  it.each([[undefined], [''], ['nonsense']])(
    'yields an Invalid Date for %p',
    (input) => {
      expect(Number.isNaN(toDateValue(input).getTime())).toBe(true);
    },
  );
});
