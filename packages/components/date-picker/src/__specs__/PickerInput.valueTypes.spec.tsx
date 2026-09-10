import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import DatePicker from '../DatePicker';

/**
 * `value` is typed `Date | string`, and an ISO string is the form the picker itself emits — so both
 * arrive in practice, the string usually from a value hydrated out of an API and the `Date` from a
 * value the user just picked.
 *
 * These assert the two are indistinguishable in the input, rather than pinning an exact rendering.
 * That keeps them locale-independent, and it is the property that was actually broken:
 * `PickerInput.getText` used to branch on the type and send only the `Date` down `formatValue`,
 * leaving strings on a hardcoded token pattern. Under `en-GB` that showed as
 * `8 Sept 2026, 13:17` versus `Sep 8, 2026, 13:17` — the same instant, day and month swapped.
 */

const inputValue = (container: HTMLElement): string =>
  (container.querySelector('input') as HTMLInputElement).value;

const renderWith = (value: Date | string, showTime: boolean): string => {
  const { container, unmount } = renderWithProvider(
    <DatePicker value={value} showTime={showTime} onApply={vi.fn()} />,
  );
  const text = inputValue(container);
  unmount();

  return text;
};

describe('DatePicker value types', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it.each([
    // [label, local wall clock, the naive ISO string denoting the same wall clock]
    ['a date and time', new Date(2026, 8, 8, 13, 17, 0), '2026-09-08T13:17:00'],
    ['midnight', new Date(2026, 0, 1, 0, 0, 0), '2026-01-01T00:00:00'],
    ['a single-digit day', new Date(2026, 8, 3, 9, 5, 0), '2026-09-03T09:05:00'],
  ])(
    'renders %s the same whether value is a Date or an ISO string, with time',
    (_label, asDate, asString) => {
      expect(renderWith(asString, true)).toBe(renderWith(asDate, true));
    },
  );

  it('renders a date the same whether value is a Date or an ISO string, without time', () => {
    expect(renderWith('2026-09-08T13:17:00', false)).toBe(
      renderWith(new Date(2026, 8, 8, 13, 17, 0), false),
    );
  });

  it('renders an empty input for no value', () => {
    const { container } = renderWithProvider(
      <DatePicker showTime onApply={vi.fn()} />,
    );

    expect(inputValue(container)).toBe('');
  });
});
