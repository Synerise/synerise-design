import { renderHook } from '@testing-library/react';

import { useMeasuredRowHeights } from '../useMeasuredRowHeights';

/** Stands in for react-window's `VariableSizeList`. */
const createList = () => ({ resetAfterIndex: vi.fn() });

const setup = (
  keys: string[] = ['a', 'b', 'c'],
  estimate: (index: number) => number = () => 32,
  estimateVersion?: unknown,
) => {
  const list = createList();
  const rendered = renderHook(
    (props: { keys: string[]; estimateVersion?: unknown }) =>
      useMeasuredRowHeights<string, ReturnType<typeof createList>>({
        keys: props.keys,
        estimate,
        estimateVersion: props.estimateVersion,
      }),
    { initialProps: { keys, estimateVersion } },
  );
  // The list attaches its own ref in the real tree; do it by hand here.
  rendered.result.current.listRef.current = list;
  return { ...rendered, list };
};

describe('useMeasuredRowHeights', () => {
  describe('mount-commit flush', () => {
    it('should apply a measurement taken before the list ref was attached', () => {
      // Rows are descendants of the list, so on mount their layout effects run before the
      // list's ref is set and `resetAfterIndex` is lost. Nothing else guarantees another
      // render, so the hook's own flush effect has to apply it.
      const list = createList();
      const { result, rerender } = renderHook(
        (props: { keys: string[] }) =>
          useMeasuredRowHeights<string, ReturnType<typeof createList>>({
            keys: props.keys,
            estimate: () => 32,
          }),
        { initialProps: { keys: ['a', 'b'] } },
      );

      // Measure while the ref is still empty, exactly as a row would on mount.
      result.current.measureRow(0, 84);
      expect(list.resetAfterIndex).not.toHaveBeenCalled();

      result.current.listRef.current = list;
      rerender({ keys: ['a', 'b'] });
      expect(list.resetAfterIndex).toHaveBeenCalledWith(0);
      expect(result.current.getItemSize(0)).toBe(84);
    });

    it('should flush from the lowest pending index', () => {
      const list = createList();
      const { result, rerender } = renderHook(
        (props: { keys: string[] }) =>
          useMeasuredRowHeights<string, ReturnType<typeof createList>>({
            keys: props.keys,
            estimate: () => 32,
          }),
        { initialProps: { keys: ['a', 'b', 'c'] } },
      );
      result.current.measureRow(2, 84);
      result.current.measureRow(1, 66);
      result.current.listRef.current = list;
      rerender({ keys: ['a', 'b', 'c'] });
      expect(list.resetAfterIndex).toHaveBeenCalledWith(1);
    });

    it('should bump measurementVersion once per flushed batch, then settle', () => {
      const { result, rerender } = renderHook(
        (props: { keys: string[] }) =>
          useMeasuredRowHeights<string, ReturnType<typeof createList>>({
            keys: props.keys,
            estimate: () => 32,
          }),
        { initialProps: { keys: ['a', 'b'] } },
      );
      const before = result.current.measurementVersion;
      result.current.measureRow(0, 84);
      result.current.measureRow(1, 66);
      rerender({ keys: ['a', 'b'] });
      expect(result.current.measurementVersion).toBe(before + 1);

      // Re-reporting the same heights must not bump again, or the flush would never settle.
      const settled = result.current.measurementVersion;
      result.current.measureRow(0, 84);
      rerender({ keys: ['a', 'b'] });
      expect(result.current.measurementVersion).toBe(settled);
    });
  });

  it('should fall back to the estimate for an unmeasured row', () => {
    const { result } = setup(['a', 'b'], (index) => (index === 0 ? 32 : 50));
    expect(result.current.getItemSize(0)).toBe(32);
    expect(result.current.getItemSize(1)).toBe(50);
  });

  it('should return a measured height once reported', () => {
    const { result } = setup();
    result.current.measureRow(1, 84);
    expect(result.current.getItemSize(1)).toBe(84);
    expect(result.current.getItemSize(0)).toBe(32);
  });

  it("should invalidate the list's offset memo from the measured index", () => {
    const { result, list } = setup();
    result.current.measureRow(2, 120);
    expect(list.resetAfterIndex).toHaveBeenCalledWith(2);
  });

  it('should ignore a zero height, which means "not laid out"', () => {
    const { result, list } = setup();
    list.resetAfterIndex.mockClear();
    result.current.measureRow(0, 0);
    expect(result.current.getItemSize(0)).toBe(32);
    expect(list.resetAfterIndex).not.toHaveBeenCalled();
  });

  it('should not re-invalidate when a row reports an unchanged height', () => {
    const { result, list } = setup();
    result.current.measureRow(0, 84);
    list.resetAfterIndex.mockClear();
    result.current.measureRow(0, 84);
    expect(list.resetAfterIndex).not.toHaveBeenCalled();
  });

  it('should ignore a measurement for an index with no row', () => {
    const { result, list } = setup(['a']);
    list.resetAfterIndex.mockClear();
    result.current.measureRow(9, 84);
    expect(list.resetAfterIndex).not.toHaveBeenCalled();
  });

  it('should keep measurements across a row-set change, since they are keyed', () => {
    const { result, rerender } = setup(['a', 'b', 'c']);
    result.current.measureRow(2, 84);
    // 'c' filtered down to index 0 — the height must follow it.
    rerender({ keys: ['c'] });
    expect(result.current.getItemSize(0)).toBe(84);
  });

  it('should drop every measurement when the estimate changes meaning', () => {
    const { result, rerender } = setup(['a', 'b'], () => 32, 32);
    result.current.measureRow(0, 84);
    expect(result.current.getItemSize(0)).toBe(84);
    rerender({ keys: ['a', 'b'], estimateVersion: 50 });
    expect(result.current.getItemSize(0)).toBe(32);
  });

  it('should force a reset when the estimate changes, so stale layout cannot linger', () => {
    const { result, list, rerender } = setup(['a'], () => 32, 32);
    list.resetAfterIndex.mockClear();
    rerender({ keys: ['a'], estimateVersion: 50 });
    expect(list.resetAfterIndex).toHaveBeenCalledWith(0);
  });

  it('should not clear the cache on mount', () => {
    const { result } = setup(['a'], () => 32, 32);
    result.current.measureRow(0, 84);
    expect(result.current.getItemSize(0)).toBe(84);
  });
});
