import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';

import Button from '../index';

// `mode="single-icon"` is a *square* button: the width has to track `size` the same way the height
// already does (via `ant-btn-lg` / `ant-btn-sm`), and `block` has to stretch it like every other
// mode. Both were silently dead for years because the single-icon `width` rule carried a
// `:not(.ds-expander)` that outranked the rules meant to override it.
//
// Caveat worth knowing before trusting a green run here: jsdom does not weigh `:not()` in its
// cascade, so the `size="large"` case below passed even with the bug present. The real-browser
// guard is `RendersSingleIconSizes` in the storybook `Components/Button/Tests` file, which measures
// the rendered boxes. These assertions still hold the contract for `small` and `block`, which did
// go red, and they document the intent for all of it.
const styleOf = (getByRole: (role: string) => HTMLElement): CSSStyleDeclaration =>
  window.getComputedStyle(getByRole('button'));

describe('Button mode="single-icon" sizing', () => {
  it('is 32px square by default', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="single-icon">icon</Button>,
    );
    const style = styleOf(getByRole);

    // Consumers hardcode this default — avatar-group's ACTIONS_COLUMN_WIDTH budgets exactly 32px
    // inside a `table-layout: fixed` cell — so it must not drift.
    expect(style.width).toBe('32px');
    expect(style.height).toBe('32px');
  });

  it('is 28px square at size="small"', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="single-icon" size="small">
        icon
      </Button>,
    );
    const style = styleOf(getByRole);

    expect(style.width).toBe('28px');
    expect(style.height).toBe('28px');
  });

  it('is 48px square at size="large"', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="single-icon" size="large">
        icon
      </Button>,
    );
    const style = styleOf(getByRole);

    expect(style.width).toBe('48px');
    expect(style.height).toBe('48px');
  });

  it('stretches to full width with block', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="single-icon" block>
        icon
      </Button>,
    );

    expect(styleOf(getByRole).width).toBe('100%');
  });

  it('lets block win over size', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="single-icon" block size="large">
        icon
      </Button>,
    );
    const style = styleOf(getByRole);

    // Full width, but still the large height — `block` governs one axis only.
    expect(style.width).toBe('100%');
    expect(style.height).toBe('48px');
  });

  it('leaves block on other modes untouched', () => {
    const { getByRole } = renderWithProvider(
      <Button mode="icon-label" block>
        Label
      </Button>,
    );

    expect(styleOf(getByRole).width).toBe('100%');
  });
});
