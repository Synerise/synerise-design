import { describe, expect, it } from 'vitest';

import { getLocalDateInTimeZone, toIsoString } from '../timeZone.utils';

/**
 * `toIsoString` encodes a wall clock of `timeZone` as an offset-carrying ISO string, and
 * `getLocalDateInTimeZone` decodes such a string back into a wall clock. Both are exercised
 * around DST transitions, where the offset to stamp depends on which side of the jump the value
 * falls on — reading it at the wrong moment used to shift the value by an hour.
 *
 * Every assertion is browser-independent, so the file is meaningful under each TZ the package
 * is tested with (see `test:timezones`).
 */

// The wall clock a given instant shows in a timezone, via Intl only — independent of both the
// implementation under test and the process timezone.
const wallClockIn = (instant: Date, timeZone: string): string => {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(instant);
  const get = (type: string) => parts.find((part) => part.type === type)?.value;

  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`;
};

const wallClock = (isoDateTime: string): Date => {
  const [date, time] = isoDateTime.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes, seconds] = time.split(':').map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds);
};

// A wall clock the *process* timezone skips (its own spring-forward) cannot be held in a Date's
// local fields at all, so such a sample says nothing about the code under test.
const isRepresentableLocally = (isoDateTime: string): boolean => {
  const date = wallClock(isoDateTime);
  const [, time] = isoDateTime.split('T');

  return date.getHours() === Number(time.split(':')[0]);
};

describe('toIsoString', () => {
  it.each([
    // Europe/Warsaw: CET (+01:00) until 2024-03-31 02:00, CEST (+02:00) after
    ['Europe/Warsaw', '2024-03-31T01:59:59', '2024-03-31T01:59:59+01:00'],
    ['Europe/Warsaw', '2024-03-31T03:00:00', '2024-03-31T03:00:00+02:00'],
    // ..and back to CET on 2024-10-27 03:00
    ['Europe/Warsaw', '2024-10-27T01:59:59', '2024-10-27T01:59:59+02:00'],
    ['Europe/Warsaw', '2024-10-27T03:00:01', '2024-10-27T03:00:01+01:00'],
    // America/New_York: EST (-05:00) until 2024-03-10 02:00, EDT (-04:00) after
    ['America/New_York', '2024-03-10T01:59:59', '2024-03-10T01:59:59-05:00'],
    ['America/New_York', '2024-03-10T03:00:00', '2024-03-10T03:00:00-04:00'],
    // A zone without transitions, and one on a 30-minute offset
    ['Asia/Tokyo', '2024-03-31T12:30:00', '2024-03-31T12:30:00+09:00'],
    ['Australia/Adelaide', '2024-05-15T12:00:00', '2024-05-15T12:00:00+09:30'],
  ])('stamps the offset %s has at %s', (timeZone, localDateTime, expected) => {
    expect(toIsoString(wallClock(localDateTime), timeZone)).toBe(expected);
  });

  it.each(['Europe/Warsaw', 'America/New_York', 'Australia/Lord_Howe'])(
    'round-trips every wall clock of a transition day in %s',
    (timeZone) => {
      const transitionDays = ['2024-03-31', '2024-10-27', '2024-03-10', '2024-04-07'];

      transitionDays.forEach((day) => {
        for (let minutes = 0; minutes < 24 * 60; minutes += 15) {
          const localDateTime = `${day}T${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(
            minutes % 60,
          ).padStart(2, '0')}:00`;

          if (!isRepresentableLocally(localDateTime)) {
            continue;
          }

          const encoded = toIsoString(wallClock(localDateTime), timeZone);
          const rendered = wallClockIn(new Date(encoded), timeZone);
          // A wall clock the *target* zone skips does not exist there either, and the stamped
          // offset then resolves to the hour after the jump.
          const isSkippedByTargetTransition = rendered !== localDateTime && encoded.startsWith(localDateTime);

          if (!isSkippedByTargetTransition) {
            expect(rendered).toBe(localDateTime);
          }
        }
      });
    },
  );

  // The parameter defaults to 'UTC', so `undefined` is *not* "no timezone" — only an empty
  // string reaches the plain-instant branch. Callers that mean "leave this date alone" have to
  // skip the call, not pass `undefined` (see `getDateToDisplay` in ds-date-range-picker).
  it('treats an undefined timezone as UTC and only bypasses on an empty one', () => {
    const localNoon = wallClock('2024-03-31T12:00:00');

    expect(toIsoString(localNoon, undefined)).toBe('2024-03-31T12:00:00+00:00');
    expect(toIsoString(localNoon, '')).toBe(localNoon.toISOString());
  });
});

describe('getLocalDateInTimeZone', () => {
  it.each([
    // The same instant, read as a wall clock on either side of the Warsaw transition
    ['2024-03-31T00:59:59+00:00', 'Europe/Warsaw', '2024-03-31T01:59:59'],
    ['2024-03-31T01:00:00+00:00', 'Europe/Warsaw', '2024-03-31T03:00:00'],
    // Crossing into a zone whose transition is weeks away from the source offset's
    ['2024-03-10T06:59:59+00:00', 'America/New_York', '2024-03-10T01:59:59'],
    ['2024-03-10T07:00:00+00:00', 'America/New_York', '2024-03-10T03:00:00'],
    ['2024-03-31T00:30:00+02:00', 'Asia/Tokyo', '2024-03-31T07:30:00'],
  ])('decodes %s in %s', (isoString, timeZone, expectedWallClock) => {
    const decoded = getLocalDateInTimeZone(isoString, timeZone);
    const localFields = `${decoded.getFullYear()}-${String(decoded.getMonth() + 1).padStart(2, '0')}-${String(
      decoded.getDate(),
    ).padStart(2, '0')}T${String(decoded.getHours()).padStart(2, '0')}:${String(decoded.getMinutes()).padStart(
      2,
      '0',
    )}:${String(decoded.getSeconds()).padStart(2, '0')}`;

    expect(localFields).toBe(expectedWallClock);
  });

  it.each(['Europe/Warsaw', 'America/New_York', 'Asia/Tokyo'])(
    'is the inverse of toIsoString in %s',
    (timeZone) => {
      ['2024-03-31T04:15:00', '2024-10-27T05:45:00', '2024-06-15T12:00:00'].forEach((localDateTime) => {
        const encoded = toIsoString(wallClock(localDateTime), timeZone);
        const decoded = getLocalDateInTimeZone(encoded, timeZone);

        expect(toIsoString(decoded, timeZone)).toBe(encoded);
      });
    },
  );
});
