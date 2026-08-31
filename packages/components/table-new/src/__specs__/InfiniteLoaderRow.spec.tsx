import React, { type ReactNode } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { act } from '@testing-library/react';

import { InfiniteLoaderRow } from '../components/TableBody/TableRow/InfiniteLoaderRow/InfiniteLoaderRow';
import { TableContext } from '../contexts/TableContext';
import { type InfiniteLoaderRowTexts } from '../Table.types';

const TEXTS: InfiniteLoaderRowTexts = {
  infiniteScrollLoading: 'Loading',
  infiniteScrollError: 'Error',
  infiniteScrollRetry: 'Retry',
  infiniteScrollNoMoreData: 'No more data',
};

// `isScrolling` is a plain mutable property on the real virtualiser, so the fake mirrors that: the
// spec flips it between the effect running and the scheduled callback firing.
const makeVirtualizer = (isScrolling = false) => ({ isScrolling });

const renderLoaderRow = ({
  loadMore,
  virtualizer,
  isLoading = false,
  hasMore = true,
  hasError = false,
}: {
  loadMore: () => void;
  virtualizer: { isScrolling: boolean };
  isLoading?: boolean;
  hasMore?: boolean;
  hasError?: boolean;
}) => {
  const contextValue = {
    table: { getTotalSize: () => 800 },
    rowVirtualizer: virtualizer,
    getScrollContainer: () => null,
  } as unknown as React.ContextType<typeof TableContext>;

  const wrap = (children: ReactNode) => (
    <TableContext.Provider value={contextValue}>
      <table>
        <tbody>{children}</tbody>
      </table>
    </TableContext.Provider>
  );

  return renderWithProvider(
    wrap(
      <InfiniteLoaderRow
        position="BOTTOM"
        texts={TEXTS}
        loadMore={loadMore}
        infiniteLoaderItemProps={{ hasMore, hasError, isLoading }}
      />,
    ),
  );
};

describe('InfiniteLoaderRow — auto load', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('auto-loads the next page when the list is not scrolling', () => {
    const loadMore = vi.fn();

    renderLoaderRow({ loadMore, virtualizer: makeVirtualizer(false) });
    act(() => {
      vi.runAllTimers();
    });

    // A viewport too tall to overflow never emits a scroll event, so this is the only path that
    // can fill it.
    expect(loadMore).toHaveBeenCalledTimes(1);
  });

  it('does not auto-load when a scroll starts after the callback was scheduled', () => {
    const loadMore = vi.fn();
    const virtualizer = makeVirtualizer(false);

    renderLoaderRow({ loadMore, virtualizer });
    // The fling begins in the gap between the effect and its deferred callback — exactly the window
    // in which the scroll handler is already requesting this page.
    virtualizer.isScrolling = true;
    act(() => {
      vi.runAllTimers();
    });

    expect(loadMore).not.toHaveBeenCalled();
  });

  it('does not auto-load while the list is already scrolling', () => {
    const loadMore = vi.fn();

    renderLoaderRow({ loadMore, virtualizer: makeVirtualizer(true) });
    act(() => {
      vi.runAllTimers();
    });

    expect(loadMore).not.toHaveBeenCalled();
  });

  it('resumes auto-loading once the scroll has settled', () => {
    const virtualizer = makeVirtualizer(true);

    const blocked = vi.fn();
    const { unmount } = renderLoaderRow({ loadMore: blocked, virtualizer });
    act(() => {
      vi.runAllTimers();
    });
    expect(blocked).not.toHaveBeenCalled();
    unmount();

    // The virtualiser resets `isScrolling` 150ms after the last scroll event, and the next page
    // landing re-runs the effect with a fresh `loadMore`.
    virtualizer.isScrolling = false;
    const resumed = vi.fn();
    renderLoaderRow({ loadMore: resumed, virtualizer });
    act(() => {
      vi.runAllTimers();
    });

    expect(resumed).toHaveBeenCalledTimes(1);
  });

  it('does not auto-load while a page request is already in flight', () => {
    const loadMore = vi.fn();

    renderLoaderRow({
      loadMore,
      virtualizer: makeVirtualizer(false),
      isLoading: true,
    });
    act(() => {
      vi.runAllTimers();
    });

    expect(loadMore).not.toHaveBeenCalled();
  });

  it('does not auto-load when there is nothing left to fetch', () => {
    const loadMore = vi.fn();

    renderLoaderRow({
      loadMore,
      virtualizer: makeVirtualizer(false),
      hasMore: false,
    });
    act(() => {
      vi.runAllTimers();
    });

    expect(loadMore).not.toHaveBeenCalled();
  });

  it('does not auto-load after an error — the retry button owns that path', () => {
    const loadMore = vi.fn();

    renderLoaderRow({
      loadMore,
      virtualizer: makeVirtualizer(false),
      hasError: true,
    });
    act(() => {
      vi.runAllTimers();
    });

    expect(loadMore).not.toHaveBeenCalled();
  });
});
