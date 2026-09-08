import { describe, expect, it } from 'vitest';

import { toIsoString } from './utils';

/**
 * `toIsoString` encodes a wall clock of `timeZone` — a `Date` whose *local* fields hold the reading
 * that zone shows — as an offset-carrying ISO string. The fields are emitted verbatim; the only
 * thing looked up is the offset to stamp on the end.
 *
 * The cases below are all browser-independent: `wallClock` builds a `Date` from local fields, and
 * every expectation is a property of the target zone rather than of the process one.
 */

const wallClock = (isoDateTime: string): Date => {
  const [date, time] = isoDateTime.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
};

describe('toIsoString', () => {
  it.each([
    // Whole-hour zones, as controls.
    ['Asia/Tokyo', '2024-05-15T12:00:00', '2024-05-15T12:00:00+09:00'],
    ['America/New_York', '2024-01-15T12:00:00', '2024-01-15T12:00:00-05:00'],
    ['UTC', '2024-05-15T12:00:00', '2024-05-15T12:00:00+00:00'],
    // Zones whose offset is not a whole number of hours. The minutes are the point: an encoder
    // that takes the offset modulo the wrong unit drops them and silently emits a whole hour.
    ['Asia/Kolkata', '2024-05-15T12:00:00', '2024-05-15T12:00:00+05:30'],
    ['Australia/Adelaide', '2024-05-15T12:00:00', '2024-05-15T12:00:00+09:30'],
    ['Asia/Kathmandu', '2024-05-15T12:00:00', '2024-05-15T12:00:00+05:45'],
    ['Pacific/Chatham', '2024-05-15T12:00:00', '2024-05-15T12:00:00+12:45'],
    // A half-hour zone west of UTC, so the sign and the minutes are read independently.
    ['America/St_Johns', '2024-01-15T12:00:00', '2024-01-15T12:00:00-03:30'],
  ])('stamps the offset %s has at %s', (timeZone, localDateTime, expected) => {
    expect(toIsoString(wallClock(localDateTime), timeZone)).toBe(expected);
  });

  it.each([
    // Europe/Warsaw: CET (+01:00) until 2024-03-31 02:00, CEST (+02:00) after.
    ['Europe/Warsaw', '2024-03-31T01:59:59', '2024-03-31T01:59:59+01:00'],
    ['Europe/Warsaw', '2024-03-31T03:00:00', '2024-03-31T03:00:00+02:00'],
    // ..and back to CET on 2024-10-27 03:00.
    ['Europe/Warsaw', '2024-10-27T01:59:59', '2024-10-27T01:59:59+02:00'],
    ['Europe/Warsaw', '2024-10-27T03:00:01', '2024-10-27T03:00:01+01:00'],
    // America/New_York: EST (-05:00) until 2024-03-10 02:00, EDT (-04:00) after.
    ['America/New_York', '2024-03-10T01:59:59', '2024-03-10T01:59:59-05:00'],
    ['America/New_York', '2024-03-10T03:00:00', '2024-03-10T03:00:00-04:00'],
  ])(
    'resolves which side of a transition %s is on at %s',
    (timeZone, localDateTime, expected) => {
      expect(toIsoString(wallClock(localDateTime), timeZone)).toBe(expected);
    },
  );

  // The parameter defaults to 'UTC', so `undefined` is *not* "no timezone" — only an empty string
  // reaches the plain-instant branch.
  it('treats an undefined timezone as UTC and only bypasses on an empty one', () => {
    const localNoon = wallClock('2024-05-15T12:00:00');

    expect(toIsoString(localNoon, undefined)).toBe('2024-05-15T12:00:00+00:00');
    expect(toIsoString(localNoon, '')).toBe(localNoon.toISOString());
  });
});
