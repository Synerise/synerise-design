import React from 'react';

import { EU_NOTATION, US_NOTATION, renderWithProvider } from '@synerise/ds-core';
import userEvent from '@testing-library/user-event';

import RawDatePicker from '../RawDatePicker/RawDatePicker';

/**
 * Characterisation tests for the calendar grid that `react-day-picker` renders.
 *
 * These pin the DOM contract the styles, the sibling `date-range-picker` package and the
 * Chromatic stories all depend on: the `DayPicker-*` class names, the 6x7 grid, the day-cell
 * internals and the modifier classes. They exist so the react-day-picker 7 -> 10 upgrade has to
 * reproduce the contract deliberately rather than by accident.
 */

const VALUE = new Date('1996-10-27T03:24:00');
const ROWS = 6;
const WEEKDAYS = 7;

const renderCalendar = (
  props: Partial<React.ComponentProps<typeof RawDatePicker>> = {},
  notation?: typeof EU_NOTATION,
  locale?: string,
) =>
  renderWithProvider(
    <RawDatePicker onApply={vi.fn()} value={VALUE} {...props} />,
    {},
    { ...(notation ? { notation } : {}), ...(locale ? { locale } : {}) },
  );

const dayCells = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>('.DayPicker-Day'));

const cellFor = (container: HTMLElement, dayOfMonth: number): HTMLElement => {
  const text = container.querySelector<HTMLElement>(
    `.DayPicker-Day:not(.DayPicker-Day--outside) [data-attr="${dayOfMonth}"]`,
  );
  const cell = text?.closest<HTMLElement>('.DayPicker-Day');
  if (!cell) {
    throw new Error(`No in-month day cell for ${dayOfMonth}`);
  }
  return cell;
};

/** The interactive element inside a day cell — a `<button>` since v10. */
const buttonFor = (container: HTMLElement, dayOfMonth: number): HTMLElement => {
  const button = cellFor(container, dayOfMonth).querySelector<HTMLElement>(
    '.DayPicker-Day-Button',
  );
  if (!button) {
    throw new Error(`Day cell ${dayOfMonth} has no button`);
  }
  return button;
};

const modifierClasses = (cell: Element): string[] =>
  Array.from(cell.classList)
    .filter((name) => name.startsWith('DayPicker-Day--'))
    .sort();

describe('DayPicker DOM contract', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  describe('grid structure', () => {
    it('renders a fixed 6x7 grid of day cells', () => {
      const { container } = renderCalendar();

      expect(dayCells(container)).toHaveLength(ROWS * WEEKDAYS);
      expect(container.querySelectorAll('.DayPicker-Week')).toHaveLength(ROWS);
      expect(container.querySelectorAll('.DayPicker-Weekday')).toHaveLength(
        WEEKDAYS,
      );
    });

    it('nests the structural class names the stylesheet targets', () => {
      const { container } = renderCalendar();

      const root = container.querySelector('.DayPicker');
      expect(root).toBeTruthy();
      expect(root?.querySelector('.DayPicker-Months')).toBeTruthy();
      expect(root?.querySelector('.DayPicker-Month')).toBeTruthy();
      expect(root?.querySelector('.DayPicker-Weekdays')).toBeTruthy();
      expect(root?.querySelector('.DayPicker-Body')).toBeTruthy();
      expect(
        root?.querySelector('.DayPicker-Body .DayPicker-Week .DayPicker-Day'),
      ).toBeTruthy();
    });

    it('exposes the grid and its cells to assistive technology', () => {
      const { container } = renderCalendar();

      expect(container.querySelector('[role="grid"]')).toBeTruthy();
      expect(container.querySelectorAll('[role="gridcell"]')).toHaveLength(
        ROWS * WEEKDAYS,
      );
    });

    // react-day-picker v10 renders the weekday header as a real `<thead>` marked `aria-hidden`,
    // where v7 stamped `role="columnheader"` on each header cell. Upstream's reasoning is that
    // every day button already carries the full date in its accessible name, so the column
    // header adds nothing for a screen reader. Pinned because it is a deliberate a11y change.
    it('hides the weekday header row from assistive technology', () => {
      const { container } = renderCalendar();
      const header = container.querySelector('.DayPicker-Weekdays');

      expect(header).toBeTruthy();
      expect(header?.getAttribute('aria-hidden')).toBe('true');
      expect(container.querySelectorAll('[role="columnheader"]')).toHaveLength(
        0,
      );
    });
  });

  describe('day cell internals', () => {
    it('renders background, text and foreground layers inside every cell', () => {
      const { container } = renderCalendar();

      dayCells(container).forEach((cell) => {
        // v10 wraps the day content in a real <button>; v7 put the three layers straight
        // into the cell. The layers themselves are unchanged.
        const button = cell.querySelector('.DayPicker-Day-Button');
        expect(button).toBeTruthy();
        expect(button?.children).toHaveLength(3);
      });
    });

    it('tags the text layer with data-attr carrying the day of the month', () => {
      const { container } = renderCalendar();

      expect(cellFor(container, 27).querySelector('[data-attr="27"]')).toBeTruthy();
      expect(cellFor(container, 27).textContent).toBe('27');
    });
  });

  describe('week start', () => {
    it('starts the week on Monday in EU notation', () => {
      const { container } = renderCalendar({}, EU_NOTATION);

      expect(
        Array.from(container.querySelectorAll('.DayPicker-Weekday')).map(
          (node) => node.textContent,
        ),
      ).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
    });

    it('starts the week on Sunday in US notation', () => {
      const { container } = renderCalendar({}, US_NOTATION);

      expect(
        Array.from(container.querySelectorAll('.DayPicker-Weekday')).map(
          (node) => node.textContent,
        ),
      ).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    });

    it('localises the weekday headers', () => {
      const { container } = renderCalendar({}, undefined, 'pl');

      expect(
        Array.from(container.querySelectorAll('.DayPicker-Weekday')).map(
          (node) => node.textContent,
        ),
      ).toEqual(['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']);
    });
  });

  describe('modifier classes', () => {
    it('marks the selected day as selected, start and end', () => {
      const { container } = renderCalendar();

      expect(modifierClasses(cellFor(container, 27))).toEqual([
        'DayPicker-Day--end',
        'DayPicker-Day--selected',
        'DayPicker-Day--start',
      ]);
    });

    it('marks days from the neighbouring months as outside, and still renders their number', () => {
      const { container } = renderCalendar();

      const outside = container.querySelectorAll('.DayPicker-Day--outside');
      expect(outside.length).toBeGreaterThan(0);
      outside.forEach((cell) => {
        expect(cell.querySelector('[data-attr]')?.textContent).toBeTruthy();
      });
    });

    it('marks days rejected by disabledDates as disabled', () => {
      const { container } = renderCalendar({
        disabledDates: (date?: Date): boolean => date?.getDate() === 15,
      });

      expect(modifierClasses(cellFor(container, 15))).toEqual([
        'DayPicker-Day--disabled',
      ]);
      expect(modifierClasses(cellFor(container, 16))).toEqual([]);
    });

    it('validates every rendered cell with disabledDates', () => {
      const disabledDates = vi.fn().mockReturnValue(false);
      renderCalendar({ disabledDates });

      const validated = new Set(
        disabledDates.mock.calls.map(([date]) => String(date)),
      );
      expect(validated.size).toBe(ROWS * WEEKDAYS);
    });
  });

  describe('interaction', () => {
    it('selects a day on click and moves the selected modifier', async () => {
      const onValueChange = vi.fn();
      const { container } = renderCalendar({ onValueChange });

      await userEvent.click(buttonFor(container, 15));

      expect(onValueChange).toHaveBeenCalled();
      expect(onValueChange.mock.calls[0][0]?.getDate()).toBe(15);
      expect(modifierClasses(cellFor(container, 15))).toContain(
        'DayPicker-Day--selected',
      );
    });

    it('ignores clicks on a disabled day', async () => {
      const onValueChange = vi.fn();
      const { container } = renderCalendar({
        onValueChange,
        disabledDates: (date?: Date): boolean => date?.getDate() === 15,
      });

      await userEvent.click(buttonFor(container, 15));

      expect(onValueChange).not.toHaveBeenCalled();
      expect(modifierClasses(cellFor(container, 15))).not.toContain(
        'DayPicker-Day--selected',
      );
    });
  });
});
