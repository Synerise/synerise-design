import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import RawDatePicker from '../RawDatePicker/RawDatePicker';

/**
 * Which day is circled as "today" TimezoneTesting.
 *
 * react-day-picker decides the `today` modifier from its own `dateLib.today()`, which is the
 * *browser's* date. A workspace far enough east or west is on a different calendar day at the
 * same instant, so the circle landed on the wrong cell — reported from a workspace on
 * Australia/Adelaide, which was circling the 16th while it was already the 17th there.
 *
 * `ds-date-range-picker` was never affected: it supplies its own `today` modifier from
 * `getNow(timeZone)`.
 */

const MARKED = () =>
  Array.from(document.querySelectorAll('.DayPicker-Day--today')).map((el) =>
    el.textContent?.trim(),
  );

// 2026-09-16T18:00Z is 16 Sep 20:00 in Warsaw and 17 Sep 03:30 in Adelaide, so the browser and
// the workspace disagree about the date at one instant.
const INSTANT = new Date('2026-09-16T18:00:00Z');
const AHEAD = 'Australia/Adelaide';
const BEHIND = 'America/Los_Angeles'; // 16 Sep 11:00 — same day as Warsaw, different clock

describe('RawDatePicker today marker TimezoneTesting', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
    vi.useFakeTimers().setSystemTime(INSTANT);
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('circles the workspace day when it is ahead of the browser', () => {
    renderWithProvider(
      <RawDatePicker timeZone={AHEAD} texts={{ apply: 'Apply', now: 'Now' }} />,
      {},
      { timeZone: AHEAD },
    );
    expect(MARKED()).toEqual(['17']);
  });

  it('circles exactly one day', () => {
    renderWithProvider(
      <RawDatePicker timeZone={AHEAD} texts={{ apply: 'Apply', now: 'Now' }} />,
      {},
      { timeZone: AHEAD },
    );
    expect(MARKED()).toHaveLength(1);
  });

  it('circles the workspace day when it is behind the browser', () => {
    renderWithProvider(
      <RawDatePicker timeZone={BEHIND} texts={{ apply: 'Apply', now: 'Now' }} />,
      {},
      { timeZone: BEHIND },
    );
    expect(MARKED()).toEqual(['16']);
  });

  // Opting out has to keep the browser's day, whatever zone the provider carries.
  it('circles the browser day when timeZone is not set', () => {
    renderWithProvider(
      <RawDatePicker texts={{ apply: 'Apply', now: 'Now' }} />,
      {},
      { timeZone: AHEAD },
    );
    expect(MARKED()).toEqual(['16']);
  });
});
