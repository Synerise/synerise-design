import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';

import { Value } from '../FactorValue/Parameter/Parameter.style';

// `fluidMinWidth` is typed `string | number` on the public FactorsProps, so the parameter label
// must accept a CSS length as readily as a px number. Interpolating a string as `${value}px`
// produced `120pxpx`, which the browser drops — leaving the label with `max-width: none` and no
// floor at all.
describe('Parameter <Value> fluidMinWidth', () => {
  it('caps at 110px and sets no min-width when fluidMinWidth is omitted', () => {
    const { getByText } = renderWithProvider(<Value>Revenue</Value>);
    const style = window.getComputedStyle(getByText('Revenue'));

    expect(style.maxWidth).toBe('110px');
    expect(style.minWidth).toBe('');
  });

  it('treats a number as px and lifts the max-width cap', () => {
    const { getByText } = renderWithProvider(
      <Value $fluidMinWidth={48}>Revenue</Value>,
    );
    const style = window.getComputedStyle(getByText('Revenue'));

    expect(style.maxWidth).toBe('none');
    expect(style.minWidth).toBe('48px');
  });

  it.each(['120px', '7rem', '10%'])(
    'passes the CSS length %s through unchanged',
    (fluidMinWidth) => {
      const { getByText } = renderWithProvider(
        <Value $fluidMinWidth={fluidMinWidth}>Revenue</Value>,
      );
      const style = window.getComputedStyle(getByText('Revenue'));

      expect(style.maxWidth).toBe('none');
      expect(style.minWidth).toBe(fluidMinWidth);
    },
  );
});
