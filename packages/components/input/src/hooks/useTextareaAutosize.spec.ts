import { describe, expect, it } from 'vitest';

import { computeTextareaHeight } from './useTextareaAutosize';

// content-box unless noted; minHeightPx/maxHeightPx are box px (e.g. rows * rowHeight).
describe('computeTextareaHeight', () => {
  it('uses the natural content height when within bounds (content-box)', () => {
    const result = computeTextareaHeight({
      scrollHeight: 60,
      verticalPadding: 0,
      verticalBorder: 0,
      isBorderBox: false,
      minHeightPx: 40,
      maxHeightPx: 120,
    });
    expect(result).toEqual({ contentHeight: 60, viewportHeight: 60 });
  });

  it('floors the textarea and viewport at minHeightPx', () => {
    const result = computeTextareaHeight({
      scrollHeight: 20,
      verticalPadding: 0,
      verticalBorder: 0,
      isBorderBox: false,
      minHeightPx: 60,
      maxHeightPx: 120,
    });
    expect(result).toEqual({ contentHeight: 60, viewportHeight: 60 });
  });

  it('caps the viewport at maxHeightPx while the textarea keeps its full height', () => {
    const result = computeTextareaHeight({
      scrollHeight: 200,
      verticalPadding: 0,
      verticalBorder: 0,
      isBorderBox: false,
      minHeightPx: 40,
      maxHeightPx: 120,
    });
    // Content overflows the cap: textarea grows to 200, viewport clamps to 120
    // so the ds-Scrollbar scrolls the overflow.
    expect(result).toEqual({ contentHeight: 200, viewportHeight: 120 });
  });

  it('accounts for border in border-box mode', () => {
    const result = computeTextareaHeight({
      scrollHeight: 64, // content 60 + padding 4
      verticalPadding: 4,
      verticalBorder: 2,
      isBorderBox: true,
      minHeightPx: 40,
      maxHeightPx: 120,
    });
    // border-box natural height = scrollHeight + border = 64 + 2 = 66
    expect(result).toEqual({ contentHeight: 66, viewportHeight: 66 });
  });

  it('subtracts padding for content-box natural height', () => {
    const result = computeTextareaHeight({
      scrollHeight: 68, // content 60 + padding 8
      verticalPadding: 8,
      verticalBorder: 0,
      isBorderBox: false,
      minHeightPx: 20,
      maxHeightPx: 200,
    });
    // content-box natural height = scrollHeight - padding = 60
    expect(result).toEqual({ contentHeight: 60, viewportHeight: 60 });
  });

  it('leaves both heights unbounded when no min/max given (autoSize: true)', () => {
    const result = computeTextareaHeight({
      scrollHeight: 150,
      verticalPadding: 0,
      verticalBorder: 0,
      isBorderBox: false,
    });
    expect(result).toEqual({ contentHeight: 150, viewportHeight: 150 });
  });
});
