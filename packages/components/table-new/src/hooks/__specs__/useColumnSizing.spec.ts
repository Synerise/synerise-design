import { type MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react';

import { calculateWidths, useColumnSizing } from '../useColumnSizing';

describe('calculateWidths', () => {
  it('should return fixed widths when all columns have width', () => {
    const columns = [{ width: 200 }, { width: 300 }];
    const result = calculateWidths(columns, 1000);
    expect(result).toEqual([200, 300]);
  });

  it('should distribute remaining space to flexible columns', () => {
    const columns = [{ width: 200 }, { minWidth: 100 }];
    const result = calculateWidths(columns, 1000);
    // col-0: 200 (fixed), col-1: 100 + 700 = 800 (flexible gets all remaining)
    expect(result[0]).toBe(200);
    expect(result[1]).toBe(800);
  });

  it('should respect maxWidth constraints', () => {
    const columns = [
      { width: 200 },
      { minWidth: 100, maxWidth: 400 },
      { minWidth: 100 },
    ];
    const result = calculateWidths(columns, 1000);
    // baseSum = 200 + 100 + 100 = 400, remaining = 600, 2 flex cols = 300 each
    // col-1: min(400, 100 + 300) = 400
    // col-2: 100 + 300 = 400
    // interimSum = 200 + 400 + 400 = 1000
    expect(result[0]).toBe(200);
    expect(result[1]).toBe(400);
    expect(result[2]).toBe(400);
  });

  it('should redistribute maxWidth-capped remainder to uncapped columns', () => {
    const columns = [
      { width: 200 },
      { minWidth: 100, maxWidth: 200 },
      { minWidth: 100 },
    ];
    const result = calculateWidths(columns, 1000);
    // baseSum = 400, remaining = 600, 2 flex cols get 300 each
    // col-1: min(200, 100+300) = 200
    // col-2: 100+300 = 400
    // interimSum = 200 + 200 + 400 = 800 < 1000
    // remainder = 200, 1 uncapped col → col-2 += 200 = 600
    expect(result[0]).toBe(200);
    expect(result[1]).toBe(200);
    expect(result[2]).toBe(600);
  });

  it('should not redistribute when baseSum exceeds available space', () => {
    const columns = [{ width: 500 }, { minWidth: 600 }];
    const result = calculateWidths(columns, 800);
    // baseSum = 1100 > 800, no redistribution
    expect(result[0]).toBe(500);
    expect(result[1]).toBe(600);
  });

  it('should handle all flexible columns', () => {
    const columns = [{ minWidth: 100 }, { minWidth: 200 }];
    const result = calculateWidths(columns, 1000);
    // baseSum = 300, remaining = 700, 2 flex cols = 350 each
    // col-0: 100 + 350 = 450, col-1: 200 + 350 = 550
    expect(result[0]).toBe(450);
    expect(result[1]).toBe(550);
  });

  it('should handle empty columns', () => {
    const result = calculateWidths([], 1000);
    expect(result).toEqual([]);
  });
});

describe('useColumnSizing', () => {
  const makeWrapperRef = (clientWidth: number) => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'clientWidth', { configurable: true, value: clientWidth });
    return { current: el } as MutableRefObject<HTMLDivElement | null>;
  };

  it('keeps isColumnSizingReady false when wrapper has zero clientWidth', () => {
    const wrapperRef = makeWrapperRef(0);
    const columnWidths = [{ id: 'col-0' }, { id: 'col-1' }];
    const { result } = renderHook(() =>
      useColumnSizing({ wrapperRef, columnWidths }),
    );
    expect(result.current.isColumnSizingReady).toBe(false);
    expect(result.current.columnSizing).toEqual({});
  });

  it('marks ready immediately when disabled regardless of wrapper width', () => {
    const wrapperRef = makeWrapperRef(0);
    const columnWidths = [{ id: 'col-0' }];
    const { result } = renderHook(() =>
      useColumnSizing({ wrapperRef, columnWidths, enabled: false }),
    );
    expect(result.current.isColumnSizingReady).toBe(true);
  });
});
