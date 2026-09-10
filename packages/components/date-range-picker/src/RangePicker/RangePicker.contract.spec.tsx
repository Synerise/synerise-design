import React from 'react';

import { renderWithProvider, sleep } from '@synerise/ds-core';
import userEvent from '@testing-library/user-event';

import { type DateRange } from '../date.types';
import RawDateRangePicker from '../RawDateRangePicker';

/**
 * Characterisation tests for the dual-month absolute calendar.
 *
 * `RangePicker` drives `react-day-picker` through a modifier object rather than the library's own
 * selection state, so every range highlight, hover preview and outside-day is a `DayPicker-Day--*`
 * class produced by `getModifiers()`. These tests pin that mapping end to end — from props, through
 * `getModifiers`, to the class actually present on the cell — so the react-day-picker 7 -> 10
 * upgrade cannot silently drop a modifier.
 */

const asRange = (from: Date | null, to: Date | null): DateRange =>
  ({ type: 'ABSOLUTE', from, to }) as unknown as DateRange;

const OCTOBER_2018 = asRange(
  new Date('2018-10-03T00:00:00'),
  new Date('2018-10-09T23:59:59'),
);

const renderRangePicker = (
  props: Partial<React.ComponentProps<typeof RawDateRangePicker>> = {},
) =>
  renderWithProvider(
    <RawDateRangePicker
      onApply={vi.fn()}
      value={OCTOBER_2018}
      showFilter={false}
      {...props}
    />,
  );

const calendars = (container: HTMLElement): HTMLElement[] =>
  Array.from(container.querySelectorAll<HTMLElement>('.DayPicker'));

const modifierClasses = (cell: Element): string[] =>
  Array.from(cell.classList)
    .filter((name) => name.startsWith('DayPicker-Day--'))
    .sort();

/** Day cells of one calendar that belong to the displayed month, keyed by day of month. */
const inMonthCells = (calendar: HTMLElement): Map<number, HTMLElement> => {
  const cells = new Map<number, HTMLElement>();
  calendar
    .querySelectorAll<HTMLElement>('.DayPicker-Day:not(.DayPicker-Day--outside)')
    .forEach((cell) => {
      const day = cell.querySelector('[data-attr]')?.getAttribute('data-attr');
      if (day) {
        cells.set(Number(day), cell);
      }
    });
  return cells;
};

const cellFor = (calendar: HTMLElement, day: number): HTMLElement => {
  const cell = inMonthCells(calendar).get(day);
  if (!cell) {
    throw new Error(`No in-month day cell for ${day}`);
  }
  return cell;
};

/** The interactive element inside a day cell — a `<button>` since react-day-picker v10. */
const buttonFor = (calendar: HTMLElement, day: number): HTMLElement => {
  const button = cellFor(calendar, day).querySelector<HTMLElement>(
    '.DayPicker-Day-Button',
  );
  if (!button) {
    throw new Error(`Day cell ${day} has no button`);
  }
  return button;
};

/** Day-of-month -> modifier classes, for every cell carrying at least one modifier. */
const modifierMap = (calendar: HTMLElement): Record<number, string[]> =>
  Object.fromEntries(
    Array.from(inMonthCells(calendar).entries())
      .map(([day, cell]) => [day, modifierClasses(cell)] as const)
      .filter(([, classes]) => classes.length > 0),
  );

describe('RangePicker DOM contract', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  describe('dual calendar layout', () => {
    it('renders two independent single-month calendars', () => {
      const { container } = renderRangePicker();

      expect(calendars(container)).toHaveLength(2);
      calendars(container).forEach((calendar) => {
        expect(calendar.querySelectorAll('.DayPicker-Day')).toHaveLength(42);
        expect(calendar.querySelectorAll('.DayPicker-Week')).toHaveLength(6);
      });
    });

    it('shows consecutive months on the two sides', () => {
      const { container } = renderRangePicker({
        value: asRange(
          new Date('2018-10-03T00:00:00'),
          new Date('2018-11-09T23:59:59'),
        ),
      });

      const [left, right] = calendars(container);
      expect(inMonthCells(left).size).toBe(31);
      expect(inMonthCells(right).size).toBe(30);
    });

    // The two side wrappers are the scope E2E suites hang their day and navigation selectors off,
    // so the testids are part of the contract rather than an implementation detail.
    it('scopes each side under its own data-testid', () => {
      const { container } = renderRangePicker({
        value: asRange(
          new Date('2018-10-03T00:00:00'),
          new Date('2018-11-09T23:59:59'),
        ),
      });

      const left = container.querySelector<HTMLElement>(
        '[data-testid="date-range-picker-side-left"]',
      );
      const right = container.querySelector<HTMLElement>(
        '[data-testid="date-range-picker-side-right"]',
      );

      expect(left).toBeTruthy();
      expect(right).toBeTruthy();
      expect(inMonthCells(left as HTMLElement).size).toBe(31);
      expect(inMonthCells(right as HTMLElement).size).toBe(30);
      expect(
        left?.querySelector('[data-testid="datapicker-nav-title-monthpicker-link"]'),
      ).toBeTruthy();
    });

    it('tags each calendar with the range type as a styling hook', () => {
      const { container } = renderRangePicker();

      calendars(container).forEach((calendar) => {
        expect(calendar.classList.contains('absolute')).toBe(true);
      });
    });
  });

  describe('selected range modifiers', () => {
    it('marks the first, last and inner days of the range', () => {
      const { container } = renderRangePicker();
      const [left] = calendars(container);

      expect(modifierMap(left)).toEqual({
        3: ['DayPicker-Day--selected', 'DayPicker-Day--start'],
        4: ['DayPicker-Day--selected'],
        5: ['DayPicker-Day--selected'],
        6: ['DayPicker-Day--selected'],
        7: ['DayPicker-Day--selected'],
        8: ['DayPicker-Day--selected'],
        9: ['DayPicker-Day--end', 'DayPicker-Day--selected'],
      });
    });

    it('marks a single-day range as both start and end', () => {
      const { container } = renderRangePicker({
        value: asRange(
          new Date('2018-10-03T00:00:00'),
          new Date('2018-10-03T23:59:59'),
        ),
      });

      expect(modifierClasses(cellFor(calendars(container)[0], 3))).toEqual([
        'DayPicker-Day--end',
        'DayPicker-Day--selected',
        'DayPicker-Day--start',
      ]);
    });
  });

  describe('outside days', () => {
    /**
     * `RangePicker` misspells the prop as `showOutsideDay`, so react-day-picker v7 falls back to
     * its default. Outside days are nonetheless filled in, because the custom `renderDay` always
     * renders the number. The upgrade must keep that visible — in v10 `showOutsideDays` genuinely
     * gates the content, so the prop has to be passed explicitly to preserve this.
     */
    it('renders neighbouring-month days with their number and an outside modifier', () => {
      const { container } = renderRangePicker();
      const outside = calendars(container)[0].querySelectorAll(
        '.DayPicker-Day--outside',
      );

      expect(outside.length).toBeGreaterThan(0);
      outside.forEach((cell) => {
        expect(cell.querySelector('[data-attr]')?.textContent).toBeTruthy();
      });
    });
  });

  describe('hover preview while picking a range', () => {
    it('previews the pending range between the anchor and the hovered day', async () => {
      const { container } = renderRangePicker({ value: asRange(null, null) });
      const [left] = calendars(container);

      await userEvent.click(buttonFor(left, 10));
      await sleep(50);
      await userEvent.hover(buttonFor(left, 15));
      await sleep(50);

      // `--focused` is new in v10, which tracks focus as a modifier where v7 only moved
      // `tabindex`. It is unstyled, but it is a real class on the clicked day, so it is pinned
      // here rather than filtered out.
      expect(modifierClasses(cellFor(left, 10))).toEqual([
        'DayPicker-Day--entered',
        'DayPicker-Day--entered-start',
        'DayPicker-Day--focused',
        'DayPicker-Day--initial-entered',
        'DayPicker-Day--start',
      ]);
      [11, 12, 13, 14].forEach((day) => {
        expect(modifierClasses(cellFor(left, day))).toEqual([
          'DayPicker-Day--entered',
        ]);
      });
      expect(modifierClasses(cellFor(left, 15))).toEqual([
        'DayPicker-Day--entered',
        'DayPicker-Day--entered-end',
      ]);
    });

    it('previews backwards when hovering before the anchor', async () => {
      const { container } = renderRangePicker({ value: asRange(null, null) });
      const [left] = calendars(container);

      await userEvent.click(buttonFor(left, 15));
      await sleep(50);
      await userEvent.hover(buttonFor(left, 10));
      await sleep(50);

      expect(modifierClasses(cellFor(left, 10))).toContain(
        'DayPicker-Day--entered-start',
      );
      expect(modifierClasses(cellFor(left, 15))).toContain(
        'DayPicker-Day--entered-end',
      );
      [11, 12, 13, 14].forEach((day) => {
        expect(modifierClasses(cellFor(left, day))).toEqual([
          'DayPicker-Day--entered',
        ]);
      });
    });
  });

  describe('disabled days', () => {
    it('marks days rejected by disabledDate and keeps them out of the range', async () => {
      const { container } = renderRangePicker({
        value: asRange(null, null),
        disabledDate: (date?: Date): boolean => date?.getDate() === 12,
      });
      const [left] = calendars(container);

      expect(modifierClasses(cellFor(left, 12))).toContain(
        'DayPicker-Day--disabled',
      );

      await userEvent.click(buttonFor(left, 12));
      await sleep(50);

      expect(modifierClasses(cellFor(left, 12))).not.toContain(
        'DayPicker-Day--start',
      );
    });
  });
});
