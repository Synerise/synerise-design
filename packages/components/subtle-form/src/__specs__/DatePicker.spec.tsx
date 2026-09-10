import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import DsDatePicker from '@synerise/ds-date-picker';
import { screen } from '@testing-library/react';

import SubtleForm from '../SubtleForm';

/**
 * `SubtleForm.DatePicker` shows a plain text rendering of the value until the field is activated,
 * at which point it swaps in `ds-date-picker`, whose own input renders the value again. The two
 * must agree — a value that reads `8 Sept 2026` while being edited must not read `08-09-2026` once
 * blurred.
 *
 * They used to disagree for every locale: the inactive view formatted with a hardcoded
 * `dd-MM-yyyy` token pattern while the picker used the shared data-format config. The assertion
 * below compares the two renderings against each other rather than pinning an exact string, so it
 * stays locale-independent and keeps holding if the DS defaults change.
 */

const VALUE = new Date(2026, 8, 8, 13, 17, 0);

const inactiveText = (showTime: boolean): string => {
  const { container, unmount } = renderWithProvider(
    <SubtleForm.DatePicker value={VALUE} onApply={vi.fn()} showTime={showTime} />,
  );
  // The inactive view renders the value as text; the mask placeholder is a sibling node.
  const text = (
    container.querySelector('.ds-subtle-date-picker') as HTMLElement
  ).textContent;
  unmount();

  return (text ?? '').trim();
};

const pickerInputText = (showTime: boolean): string => {
  const { container, unmount } = renderWithProvider(
    <DsDatePicker value={VALUE} onApply={vi.fn()} showTime={showTime} />,
  );
  const value = (container.querySelector('input') as HTMLInputElement).value;
  unmount();

  return value;
};

describe('SubtleForm.DatePicker', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it.each([[false], [true]])(
    'renders the value exactly as ds-date-picker does (showTime=%s)',
    (showTime) => {
      const expected = pickerInputText(showTime);

      expect(expected).not.toBe('');
      expect(inactiveText(showTime)).toContain(expected);
    },
  );

  it('renders the placeholder when there is no value', () => {
    renderWithProvider(
      <SubtleForm.DatePicker placeholder="Pick a date" onApply={vi.fn()} />,
    );

    expect(screen.getByText('Pick a date')).toBeTruthy();
  });
});
