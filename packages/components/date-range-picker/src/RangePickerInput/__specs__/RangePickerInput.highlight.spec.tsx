import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen } from '@testing-library/react';

import { ABSOLUTE } from '../../constants';
import RangePickerInput from '../RangePickerInput';
import type { RangePickerInputProps } from '../RangePickerInput.types';

const HIGHLIGHT = 'var(--ds-form-field-text-active)';
const PLACEHOLDER = 'var(--ds-form-field-text-placeholder)';

const texts = {
  startDatePlaceholder: 'Start date',
  endDatePlaceholder: 'End date',
} as never;

const START = new Date(2024, 0, 10);

const colorOf = (text: string): string =>
  window.getComputedStyle(screen.getByText(text)).color;

const renderInput = (props: Partial<RangePickerInputProps>) =>
  renderWithProvider(<RangePickerInput texts={texts} {...props} />);

describe('RangePickerInput highlight', () => {
  it('highlights the start placeholder while open with no value', () => {
    renderInput({ highlight: true, active: true });

    expect(colorOf('Start date')).toBe(HIGHLIGHT);
    expect(colorOf('End date')).toBe(PLACEHOLDER);
  });

  it('highlights the end placeholder once only the start date is set', () => {
    renderInput({
      highlight: true,
      active: true,
      value: { type: ABSOLUTE, from: START, to: undefined } as never,
    });

    expect(colorOf('End date')).toBe(HIGHLIGHT);
  });

  it.each<[string, Partial<RangePickerInputProps>]>([
    ['highlight is not set', { active: true }],
    ['the picker is closed', { highlight: true, active: false }],
    ['the picker is disabled', { highlight: true, active: true, disabled: true }],
  ])('keeps placeholders unhighlighted when %s', (_, props) => {
    renderInput(props);

    expect(colorOf('Start date')).not.toBe(HIGHLIGHT);
    expect(colorOf('End date')).not.toBe(HIGHLIGHT);
  });
});
