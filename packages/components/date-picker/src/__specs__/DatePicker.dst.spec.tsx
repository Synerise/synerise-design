import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import RawDatePicker from '../RawDatePicker/RawDatePicker';

/**
 * Clicking a day must carry the current value's *local clock* onto the clicked day, whichever
 * side of a DST transition the two dates fall on.
 *
 * This used to be re-derived from a seconds difference, against a calendar-day count multiplied
 * by a hard-coded `86400` (`changeDayWithHoursPreserved`). A day that contains a transition is
 * 23 or 25 hours long, so any pair straddling one came out an hour wrong — and under
 * `useStartOfDay` / `useEndOfDay` that hour crossed midnight and moved the *day*, which is how
 * it reached a customer: picking 25 Feb produced 24 Feb 23:59:59.
 *
 * Written against the host zone's real transitions rather than fixed instants, so it holds
 * wherever it runs. `pnpm test:dst` pins Europe/Warsaw so CI always exercises it; under a zone
 * with no DST at all there is nothing to assert and the suite skips itself.
 */

const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

const offsetMinutesAt = (d: Date): number => {
  // `Date.getTimezoneOffset` is minutes *behind* UTC; flip it so "ahead" reads positive.
  return -d.getTimezoneOffset();
};

/** The two instants in `year` at which the host zone changes offset, if it has any. */
const findTransitions = (year: number): Date[] => {
  const found: Date[] = [];
  let prev = offsetMinutesAt(new Date(year, 0, 1, 12));
  for (let day = 1; day < 366; day += 1) {
    const d = new Date(year, 0, 1 + day, 12);
    if (d.getFullYear() !== year) break;
    const off = offsetMinutesAt(d);
    if (off !== prev) {
      found.push(d);
      prev = off;
    }
  }
  return found;
};

const YEAR = 2026;
const transitions = findTransitions(YEAR);

const pad = (n: number) => String(n).padStart(2, '0');
const local = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${String(
    d.getMilliseconds(),
  ).padStart(3, '0')}`;

type Case = {
  label: string;
  /** Value the picker starts on. */
  from: Date;
  /** Day-of-month to click; always in the month of `to`. */
  to: Date;
  props: { useStartOfDay?: boolean; useEndOfDay?: boolean };
};

/**
 * A date on one side of a transition, at a given local time of day.
 *
 * Both sides stay inside the transition's own month so the panel never has to be navigated: a
 * transition falls on the last Sunday, so its day-of-month is always >= 22 and `- 7` cannot
 * leave the month. Sampled at noon, the transition day itself is already on the new offset, so
 * it serves as the "after" side.
 */
const sideOf = (transition: Date, days: number, h = 0, m = 0, s = 0, ms = 0) =>
  new Date(
    transition.getFullYear(),
    transition.getMonth(),
    transition.getDate() + days,
    h,
    m,
    s,
    ms,
  );

const buildCases = (): Case[] => {
  const out: Case[] = [];
  transitions.forEach((t, i) => {
    const dir = i === 0 ? 'forward' : 'back';
    const before = sideOf(t, -7);
    const after = sideOf(t, 0);
    const variants: Case['props'][] = [
      { useStartOfDay: true },
      { useEndOfDay: true },
      {},
    ];
    variants.forEach((props) => {
      const name = props.useStartOfDay
        ? 'useStartOfDay'
        : props.useEndOfDay
          ? 'useEndOfDay'
          : 'time preserved';
      // Midday on the source so "time preserved" has something non-trivial to carry.
      out.push({
        label: `${dir} · ${name} · before -> after`,
        from: sideOf(t, -7, 12, 34, 56),
        to: after,
        props,
      });
      out.push({
        label: `${dir} · ${name} · after -> before`,
        from: sideOf(t, 0, 12, 34, 56),
        to: before,
        props,
      });
    });
  });
  return out;
};

const expectedFor = ({ from, to, props }: Case): Date => {
  if (props.useStartOfDay) {
    return new Date(to.getFullYear(), to.getMonth(), to.getDate(), 0, 0, 0, 0);
  }
  if (props.useEndOfDay) {
    return new Date(
      to.getFullYear(),
      to.getMonth(),
      to.getDate(),
      23,
      59,
      59,
      999,
    );
  }
  return new Date(
    to.getFullYear(),
    to.getMonth(),
    to.getDate(),
    from.getHours(),
    from.getMinutes(),
    from.getSeconds(),
    from.getMilliseconds(),
  );
};

const suite = transitions.length >= 2 ? describe : describe.skip;

suite(`RawDatePicker DaylightSavings (host zone ${TZ})`, () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it('the host zone has two transitions in the fixture year', () => {
    expect(transitions.map((d) => local(d).slice(0, 10))).toHaveLength(2);
  });

  it.each(buildCases())('$label', async (testCase) => {
    const { from, to, props } = testCase;
    const onValueChange = vi.fn();

    renderWithProvider(
      <RawDatePicker
        showTime
        value={from}
        {...props}
        onValueChange={onValueChange}
        texts={{ apply: 'Apply', now: 'Now' }}
      />,
    );

    // No navigation: `from` and `to` are in the same month by construction, so the panel already
    // opens on it.
    expect(to.getMonth()).toBe(from.getMonth());

    const cells = await screen.findAllByText(String(to.getDate()));
    // Outside-days from the neighbouring month render with the same label; the in-month cell is
    // the one that is not dimmed.
    const cell =
      cells.find((c) => !c.closest('.DayPicker-Day--outside')) ?? cells[0];
    fireEvent.click(cell);

    await waitFor(() => expect(onValueChange).toHaveBeenCalled());

    const emitted = onValueChange.mock.calls.at(-1)?.[0] as Date;
    expect(local(emitted)).toBe(local(expectedFor(testCase)));
  });
});
