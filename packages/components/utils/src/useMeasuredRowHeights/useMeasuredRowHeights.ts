import {
  type Key,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

/**
 * Upper bound on remembered row measurements. Heights are cached per row key (not per
 * index) so filtering a list down and back keeps them usable — which means a list fed by
 * remote search accumulates an entry for every row it has ever shown. Past this many, the
 * cache is pruned to the rows currently in the list.
 */
export const DEFAULT_MAX_MEASURED_ROWS = 1000;

/**
 * The slice of `react-window`'s `VariableSizeList` this hook drives. Typed structurally so
 * `@synerise/ds-utils` does not have to depend on `react-window`.
 */
export type VariableSizeListLike = {
  resetAfterIndex: (index: number, shouldForceUpdate?: boolean) => void;
};

export type UseMeasuredRowHeightsOptions<
  RowKey extends Key = Key,
  List extends VariableSizeListLike = VariableSizeListLike,
> = {
  /** Row identity per index. Measurements are keyed by this, so they survive filtering. */
  keys: readonly RowKey[];
  /**
   * An existing list ref to drive instead of the hook's own. Pass one when something above
   * this call already needs the ref — `keys` usually depends on state declared late in a
   * component, and a `const { listRef } = useMeasuredRowHeights(...)` below that point is
   * out of reach for everything above it.
   */
  listRef?: RefObject<List>;
  /** Height to use for a row that has not reported one yet. Memoise it. */
  estimate: (index: number) => number;
  /**
   * A value that changes when the *meaning* of `estimate` changes (e.g. a `rowHeight`
   * prop). Every cached measurement was taken against the old estimate, so a change here
   * clears them all. Leave it out when only the row set changes — pruning on every
   * keystroke would throw away exactly the measurements a narrowing search is about to
   * need again.
   */
  estimateVersion?: unknown;
  maxCachedRows?: number;
};

export type UseMeasuredRowHeightsResult<
  List extends VariableSizeListLike = VariableSizeListLike,
> = {
  /** Attach to the `VariableSizeList` so measurements can invalidate its offset memo. */
  listRef: RefObject<List>;
  /** Pass as the list's `itemSize`. */
  getItemSize: (index: number) => number;
  /** Report a row's real height. Pair with `useMeasuredRow` on the row itself. */
  measureRow: (index: number, height: number) => void;
  /**
   * Bumped once per settled batch of measurements. Include it in the deps of anything
   * derived from `getItemSize` outside the list — a total content height, say — which
   * would otherwise keep showing the estimate: `resetAfterIndex` re-renders the list, not
   * its parent.
   */
  measurementVersion: number;
};

/**
 * Lets a `VariableSizeList` honour content-driven row heights instead of a constant map:
 * rows report what they actually measure, and the list re-lays out around them.
 *
 * Two traps this encapsulates, both of them expensive to rediscover:
 * - react-window memoises row offsets, so a measured height only takes effect once the
 *   list is told to drop that memo via `resetAfterIndex`.
 * - a row's own layout effect cannot reach `listRef` on the mount commit — rows are
 *   descendants of the list, so their effects run before its ref is attached, and that
 *   first `resetAfterIndex` is silently lost. Nothing guarantees another render will come
 *   along to pick the cache up, so the flush effect below does it explicitly.
 */
export const useMeasuredRowHeights = <
  RowKey extends Key = Key,
  // Generic over the concrete list so the returned ref stays assignable to
  // `VariableSizeList`'s own `ref` prop, which is invariant in its element type.
  List extends VariableSizeListLike = VariableSizeListLike,
>({
  keys,
  estimate,
  estimateVersion,
  listRef: externalListRef,
  maxCachedRows = DEFAULT_MAX_MEASURED_ROWS,
}: UseMeasuredRowHeightsOptions<
  RowKey,
  List
>): UseMeasuredRowHeightsResult<List> => {
  const ownListRef = useRef<List>(null);
  const listRef = externalListRef ?? ownListRef;
  const sizeCacheRef = useRef(new Map<RowKey, number>());
  /** Lowest index measured since the last flush, or null when nothing is pending. */
  const pendingResetIndexRef = useRef<number | null>(null);
  const [measurementVersion, setMeasurementVersion] = useState(0);

  const getItemSize = useCallback(
    (index: number): number => {
      const key = keys[index];
      if (key === undefined) {
        return estimate(index);
      }
      return sizeCacheRef.current.get(key) ?? estimate(index);
    },
    [keys, estimate],
  );

  const measureRow = useCallback(
    (index: number, height: number): void => {
      const key = keys[index];
      // A zero height means "not laid out" (jsdom, display: none) — keep the estimate.
      if (key === undefined || !height) {
        return;
      }
      if (sizeCacheRef.current.get(key) === height) {
        return;
      }
      sizeCacheRef.current.set(key, height);
      // Queue before invalidating: on the mount commit `listRef` is still null, and the
      // flush effect is what actually applies this measurement.
      pendingResetIndexRef.current = Math.min(
        pendingResetIndexRef.current ?? index,
        index,
      );
      listRef.current?.resetAfterIndex(index);
    },
    [keys],
  );

  /**
   * Applies whatever the rows measured on this commit. Runs on every commit and, being the
   * parent's effect, after every row's — so `listRef` is attached by now even on mount.
   *
   * It terminates: the forced reset re-renders the list, the rows re-measure the same
   * heights, `measureRow` returns early on an unchanged height, and nothing is left pending.
   */
  useLayoutEffect(() => {
    const pending = pendingResetIndexRef.current;
    if (pending === null) {
      return;
    }
    pendingResetIndexRef.current = null;
    listRef.current?.resetAfterIndex(pending);
    setMeasurementVersion((version) => version + 1);
  });

  /**
   * Forced, and in a layout effect: react-window memoises row offsets, and the render that
   * brought the new estimate in has already laid out against the old memo. A passive
   * `resetAfterIndex(0, false)` drops that memo without asking for another render, so the
   * stale layout stays on screen until something else happens to re-render the list.
   *
   * Skipped on mount, where the cache already holds the first window's own measurements
   * and clearing would throw them away.
   */
  const isFirstEstimateRef = useRef(true);
  useLayoutEffect(() => {
    if (isFirstEstimateRef.current) {
      isFirstEstimateRef.current = false;
      return;
    }
    sizeCacheRef.current.clear();
    listRef.current?.resetAfterIndex(0);
  }, [estimateVersion]);

  // A different row set means different offsets (cached heights still apply, which is why
  // the cache is keyed by row). Cap the cache here rather than evicting per change.
  useEffect(() => {
    const cache = sizeCacheRef.current;
    if (cache.size > maxCachedRows) {
      const live = new Set(keys);
      cache.forEach((_height, key) => {
        if (!live.has(key)) {
          cache.delete(key);
        }
      });
    }
    // Not forced: the rows re-render with the new row set anyway, and each one that
    // measures a different height invalidates from its own index.
    listRef.current?.resetAfterIndex(0, false);
  }, [keys, maxCachedRows]);

  return { listRef, getItemSize, measureRow, measurementVersion };
};

/**
 * The row half of {@link useMeasuredRowHeights}: returns a ref to put on the row's outer
 * element, and reports its height on every commit and whenever it later changes.
 *
 * The `ResizeObserver` is what covers content that settles after the first paint — an
 * image, a font swap, a narrower container wrapping a label. Without it such a row never
 * re-renders, so it would keep its stale height and overlap its neighbour.
 */
export const useMeasuredRow = <Element extends HTMLElement = HTMLDivElement>(
  index: number,
  measureRow: (index: number, height: number) => void,
): RefObject<Element> => {
  const rowRef = useRef<Element>(null);

  useLayoutEffect(() => {
    measureRow(index, rowRef.current?.offsetHeight ?? 0);
  });

  useLayoutEffect(() => {
    const node = rowRef.current;
    if (!node || typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(() =>
      measureRow(index, node.offsetHeight),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [index, measureRow]);

  return rowRef;
};
