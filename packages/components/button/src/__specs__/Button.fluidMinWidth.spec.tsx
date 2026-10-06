import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import Button from '../index';
import { ButtonLabel } from '../Button.styles';

// `fluidMinWidth` is typed `string | number`, so it must accept a CSS length as readily as a px
// number — interpolating a string as `${value}px` yields an invalid declaration the browser drops,
// which silently removes the floor while `max-width: none` still applies.
const labelOf = (container: HTMLElement): Element => {
  const label = container.querySelector(`.${ButtonLabel.styledComponentId}`);
  if (!label) throw new Error('ButtonLabel not found');
  return label;
};

describe('Button fluidMinWidth', () => {
  it('leaves the label at its base floor when the prop is omitted', () => {
    const { container } = renderWithProvider(<Button>Revenue</Button>);
    const style = window.getComputedStyle(labelOf(container));

    // ButtonLabel's own `min-width: 0`; fluidMinWidth is what raises that floor.
    expect(style.minWidth).toBe('0');
    expect(style.maxWidth).not.toBe('none');
  });

  it('treats a number as px', () => {
    const { container } = renderWithProvider(
      <Button fluidMinWidth={48}>Revenue</Button>,
    );
    const style = window.getComputedStyle(labelOf(container));

    expect(style.minWidth).toBe('48px');
    expect(style.maxWidth).toBe('none');
  });

  it.each(['120px', '7rem', '10%'])(
    'passes the CSS length %s through unchanged',
    (fluidMinWidth) => {
      const { container } = renderWithProvider(
        <Button fluidMinWidth={fluidMinWidth}>Revenue</Button>,
      );
      const style = window.getComputedStyle(labelOf(container));

      expect(style.minWidth).toBe(fluidMinWidth);
      expect(style.maxWidth).toBe('none');
    },
  );

  it('does not leak the prop onto the DOM button', () => {
    const { getByRole } = renderWithProvider(
      <Button fluidMinWidth={48}>Revenue</Button>,
    );
    expect(getByRole('button').hasAttribute('fluidMinWidth')).toBe(false);
  });
});
