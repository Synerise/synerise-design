import React from 'react';

import { render } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { SIZER_STYLE, useAutosizeWidth } from './useAutosizeWidth';
import type { UseAutosizeWidthParams } from './useAutosizeWidth.types';

// jsdom reports scrollWidth as 0, so stub it proportional to the rendered text
// (10px per character) to exercise the width-decision logic deterministically.
const CHAR_WIDTH = 10;
let scrollWidthSpy: PropertyDescriptor | undefined;

beforeAll(() => {
  scrollWidthSpy = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'scrollWidth',
  );
  Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return (this.textContent?.length ?? 0) * CHAR_WIDTH;
    },
  });
});

afterAll(() => {
  if (scrollWidthSpy) {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', scrollWidthSpy);
  }
});

let renderCount = 0;

const Host = (props: UseAutosizeWidthParams) => {
  renderCount += 1;
  const { sizerRef, containerRef } = useAutosizeWidth(props);
  return (
    <div ref={containerRef} data-testid="container">
      <input readOnly value={props.value ?? ''} />
      <span ref={sizerRef} style={SIZER_STYLE} aria-hidden data-testid="sizer" />
    </div>
  );
};

const widthOf = (container: HTMLElement) => container.style.width;

describe('useAutosizeWidth', () => {
  it('sets the wrapper width to the measured content width', () => {
    const { getByTestId } = render(<Host value="abc" />);
    // 3 chars * 10px
    expect(widthOf(getByTestId('container'))).toBe('30px');
  });

  it('applies extraWidth on top of the content width', () => {
    const { getByTestId } = render(<Host value="abc" extraWidth={16} />);
    expect(widthOf(getByTestId('container'))).toBe('46px');
  });

  it('floors the width at minWidth', () => {
    const { getByTestId } = render(<Host value="a" minWidth={100} />);
    expect(widthOf(getByTestId('container'))).toBe('100px');
  });

  it('falls back to the placeholder width when there is no value', () => {
    const { getByTestId } = render(<Host value="" placeholder="hello" />);
    // 'hello' = 5 chars * 10px
    expect(widthOf(getByTestId('container'))).toBe('50px');
  });

  it('uses the placeholder width as a minimum when placeholderIsMinWidth', () => {
    const { getByTestId } = render(
      <Host value="a" placeholder="longer" placeholderIsMinWidth />,
    );
    // content 'a' = 10px < placeholder 'longer' = 60px
    expect(widthOf(getByTestId('container'))).toBe('60px');
  });

  it('grows as the value gets longer', () => {
    const { getByTestId, rerender } = render(<Host value="a" />);
    expect(widthOf(getByTestId('container'))).toBe('10px');
    rerender(<Host value="abcdef" />);
    expect(widthOf(getByTestId('container'))).toBe('60px');
  });

  it('does not trigger extra re-renders while typing (no measurement storm)', () => {
    renderCount = 0;
    const { rerender } = render(<Host value="" />);
    renderCount = 0; // ignore the initial mount render
    rerender(<Host value="a" />);
    rerender(<Host value="ab" />);
    rerender(<Host value="abc" />);
    // One render per value change, never doubled by an internal setState.
    expect(renderCount).toBe(3);
  });
});
