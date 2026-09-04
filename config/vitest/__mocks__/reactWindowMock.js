import React from 'react';
import { vi } from 'vitest';

/**
 * Test double for `react-window`.
 *
 * jsdom has no layout, so the real library would measure a 0px viewport and render
 * nothing. This stands in for it by doing the windowing arithmetic from the props
 * alone (`height` + `itemSize` + `overscanCount`), which is exactly the input a
 * virtualised list controls — so a spec can assert that only the visible window is
 * mounted, and drive the window with the imperative `scrollTo` / `scrollToItem`.
 *
 * When `height` or `itemSize` cannot be read as numbers there is nothing to window
 * against, so every item is rendered (the behaviour this mock had throughout).
 *
 * `resetAfterIndex` is modelled rather than stubbed out. The real library caches
 * item offsets up to `lastMeasuredIndex` and only recomputes past the index handed
 * to `resetAfterIndex`, so a list that measures its own rows is *required* to call
 * it — a double that recomputed every render would silently pass code that never
 * invalidates and then lays rows out at the estimate in a real browser.
 */

const sizeAt = (itemSize, index) =>
  typeof itemSize === 'function' ? itemSize(index) : itemSize;

/**
 * Running offsets of every item, plus the total content size — memoised the way
 * the real library memoises them, so anything at or below `lastMeasuredIndex`
 * keeps the size it was last measured at until `resetAfterIndex` drops it.
 */
const measure = (meta, itemCount, itemSize) => {
  for (let index = meta.lastMeasuredIndex + 1; index < itemCount; index += 1) {
    const size = Number(sizeAt(itemSize, index));
    meta.offsets[index] =
      index === 0 ? 0 : meta.offsets[index - 1] + meta.sizes[index - 1];
    meta.sizes[index] = Number.isFinite(size) ? size : 0;
    meta.lastMeasuredIndex = index;
  }
  meta.offsets.length = itemCount;
  meta.sizes.length = itemCount;
  meta.lastMeasuredIndex = Math.min(meta.lastMeasuredIndex, itemCount - 1);
  const total = itemCount
    ? meta.offsets[itemCount - 1] + meta.sizes[itemCount - 1]
    : 0;
  return { offsets: meta.offsets, sizes: meta.sizes, total };
};

const visibleRange = (offsets, sizes, scrollOffset, height, overscanCount) => {
  const itemCount = offsets.length;
  let start = 0;
  while (start < itemCount - 1 && offsets[start] + sizes[start] <= scrollOffset) {
    start += 1;
  }
  let stop = start;
  while (stop < itemCount - 1 && offsets[stop + 1] < scrollOffset + height) {
    stop += 1;
  }
  return [
    Math.max(0, start - overscanCount),
    Math.min(itemCount - 1, stop + overscanCount),
  ];
};

const createList = (displayName) => {
  const List = React.forwardRef(
    (
      {
        children: Row,
        className,
        height,
        initialScrollOffset,
        innerElementType,
        itemCount = 0,
        itemData,
        itemKey,
        itemSize,
        onScroll,
        outerElementType,
        overscanCount = 2,
        style,
        width,
      },
      ref,
    ) => {
      const [scrollOffset, setScrollOffset] = React.useState(
        initialScrollOffset || 0,
      );
      const [, forceUpdate] = React.useReducer((count) => count + 1, 0);
      const metaRef = React.useRef(null);
      if (metaRef.current === null) {
        metaRef.current = { lastMeasuredIndex: -1, offsets: [], sizes: [] };
      }
      const { offsets, sizes, total } = measure(
        metaRef.current,
        itemCount,
        itemSize,
      );
      const windowHeight = Number(height);
      const canWindow =
        Number.isFinite(windowHeight) &&
        windowHeight > 0 &&
        itemCount > 0 &&
        Number.isFinite(Number(sizeAt(itemSize, 0)));

      // Empty deps on purpose. The real lists are class components, so React
      // attaches their ref once and leaves it alone; recreating the handle would
      // null `ref.current` during every commit's mutation phase — exactly while a
      // measuring row's layout effect is trying to call back into the list.
      React.useImperativeHandle(
        ref,
        () => ({
          scrollTo: vi.fn((offset) => setScrollOffset(Math.max(0, offset || 0))),
          scrollToItem: vi.fn((index) =>
            setScrollOffset(metaRef.current.offsets[index] ?? 0),
          ),
          // Mirrors the real signature: the index is dropped from the memo either
          // way, and only `shouldForceUpdate` decides whether to re-render now.
          resetAfterIndex: vi.fn((index, shouldForceUpdate = true) => {
            metaRef.current.lastMeasuredIndex = Math.min(
              metaRef.current.lastMeasuredIndex,
              index - 1,
            );
            if (shouldForceUpdate !== false) {
              forceUpdate();
            }
          }),
        }),
        [],
      );

      const [start, stop] = canWindow
        ? visibleRange(offsets, sizes, scrollOffset, windowHeight, overscanCount)
        : [0, itemCount - 1];

      const rows = [];
      for (let index = start; index <= stop; index += 1) {
        rows.push(
          React.createElement(Row, {
            key: itemKey ? itemKey(index, itemData) : index,
            index,
            data: itemData,
            style: canWindow
              ? {
                  position: 'absolute',
                  left: 0,
                  width: '100%',
                  top: offsets[index],
                  height: sizes[index],
                }
              : {},
          }),
        );
      }

      const Outer = outerElementType || 'div';
      const Inner = innerElementType || 'div';

      return React.createElement(
        Outer,
        {
          className,
          onScroll,
          style: { ...style, height, width, position: 'relative' },
        },
        React.createElement(
          Inner,
          { style: canWindow ? { height: total, width: '100%' } : undefined },
          rows,
        ),
      );
    },
  );
  List.displayName = displayName;
  return List;
};

export const FixedSizeList = createList('FixedSizeList');
export const VariableSizeList = createList('VariableSizeList');

export const FixedSizeGrid = ({ children }) => children;
export const VariableSizeGrid = ({ children }) => children;
