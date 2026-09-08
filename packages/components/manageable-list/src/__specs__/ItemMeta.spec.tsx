import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-core';

import ItemMeta from '../Item/ItemMeta/ItemMeta';

/**
 * `ItemMeta` renders one thing of substance: a relative-time string for `created`. It had no spec
 * when the date library under it was swapped from moment to dayjs (STOR-2373), so these cases pin
 * the output rather than the implementation — every assertion below is a string moment produced
 * too, verified against it across the same boundaries.
 *
 * The clock is frozen because `fromNow()` is relative by definition, and `created` is given as a
 * UTC instant because the component reads it as one (`dayjs.utc`) — a naive string would be read in
 * the runner's timezone and the expectations would drift with `TZ`.
 */

const NOW = new Date('2026-03-01T12:00:00.000Z');

const USER = {
  firstname: 'Ada',
  lastname: 'Lovelace',
  avatar_url: undefined,
  email: 'ada@example.com',
};

const agoBy = (milliseconds: number): string =>
  new Date(NOW.getTime() - milliseconds).toISOString();

describe('ItemMeta', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    ['a few seconds ago', 5 * 1000],
    ['a minute ago', 46 * 1000],
    ['2 minutes ago', 90 * 1000],
    ['an hour ago', 45 * 60 * 1000],
    ['5 hours ago', 5 * 60 * 60 * 1000],
    ['a day ago', 23 * 60 * 60 * 1000],
    ['5 days ago', 5 * 24 * 60 * 60 * 1000],
    ['a month ago', 26 * 24 * 60 * 60 * 1000],
    ['5 months ago', 150 * 24 * 60 * 60 * 1000],
    ['a year ago', 330 * 24 * 60 * 60 * 1000],
    ['3 years ago', 1100 * 24 * 60 * 60 * 1000],
  ])('renders %s', (expected, milliseconds) => {
    renderWithProvider(<ItemMeta user={USER} created={agoBy(milliseconds)} />);

    expect(screen.getByText(expected)).toBeTruthy();
  });

  /**
   * `created` is typed `string` and callers may pass a naive one, so the UTC reading is load-bearing.
   * The value below has no offset: read as UTC it is 09:00Z and so three hours before `NOW`, while
   * read in the runner's local zone it lands somewhere else entirely. That makes this the case that
   * actually pins `dayjs.utc` rather than a bare `dayjs` — an offset-carrying string parses the same
   * either way and would assert nothing.
   *
   * Deterministic under any `TZ`: `dayjs.utc` gives 09:00Z regardless, so the expectation never
   * shifts. Under `TZ=UTC` the two readings coincide and the case is merely vacuous, not wrong.
   */
  it('reads a naive created string as UTC, not as local time', () => {
    renderWithProvider(<ItemMeta user={USER} created="2026-03-01T09:00:00" />);

    expect(screen.getByText('3 hours ago')).toBeTruthy();
  });

  it('renders nothing for the timestamp when created is absent', () => {
    renderWithProvider(<ItemMeta user={USER} created={undefined} />);

    expect(screen.queryByText(/ago$/)).toBeNull();
  });
});
