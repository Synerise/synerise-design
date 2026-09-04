import { renderHook, act } from '@testing-library/react';

import {
  INFINITE_SCROLL_TRIGGER_THRESHOLD,
} from '../../Table.const';
import { useInfiniteScroll } from '../useInfiniteScroll';

describe('useInfiniteScroll', () => {
  const createMockContainer = (
    overrides: Partial<{
      scrollHeight: number;
      scrollTop: number;
      clientHeight: number;
    }> = {},
  ): HTMLDivElement =>
    ({
      scrollHeight: 2000,
      scrollTop: 0,
      clientHeight: 500,
      ...overrides,
    }) as unknown as HTMLDivElement;

  describe('handleInfiniteScroll (via handleScrollDirection)', () => {
    it('should return scrollDirection as null initially', () => {
      const { result } = renderHook(() =>
        useInfiniteScroll({ infiniteScroll: undefined }),
      );

      expect(result.current.scrollDirection).toBeNull();
    });

    it('should call onScrollEndReach when scrolled near bottom and direction is forward', () => {
      const onScrollEndReach = vi.fn();

      const { result } = renderHook(() =>
        useInfiniteScroll({
          infiniteScroll: {
            hasMore: true,
            hasError: false,
            isLoading: false,
            nextPage: { hasMore: true, hasError: false, isLoading: false },
            onScrollEndReach,
          },
        }),
      );

      // Simulate scroll event via handleScrollDirection
      const mockVirtualizer = {
        scrollElement: createMockContainer({
          scrollHeight: 2000,
          scrollTop: 1400, // near bottom: 2000 - 1400 - 500 = 100 < THRESHOLD
          clientHeight: 500,
        }),
        scrollDirection: 'forward' as const,
        scrollOffset: 1400,
        getVirtualItemForOffset: () => ({ index: 0, size: 73 }),
        getVirtualItems: () => [{ index: 0, size: 73 }],
      };

      act(() => {
        result.current.handleScrollDirection(mockVirtualizer as any, true);
      });

      expect(onScrollEndReach).toHaveBeenCalled();
    });

    it('should NOT call onScrollEndReach when nextPage.isLoading is true', () => {
      const onScrollEndReach = vi.fn();

      const { result } = renderHook(() =>
        useInfiniteScroll({
          infiniteScroll: {
            hasMore: true,
            hasError: false,
            isLoading: false,
            nextPage: { hasMore: true, hasError: false, isLoading: true },
            onScrollEndReach,
          },
        }),
      );

      const mockVirtualizer = {
        scrollElement: createMockContainer({
          scrollHeight: 2000,
          scrollTop: 1400,
          clientHeight: 500,
        }),
        scrollDirection: 'forward' as const,
        scrollOffset: 1400,
        getVirtualItemForOffset: () => ({ index: 0, size: 73 }),
        getVirtualItems: () => [{ index: 0, size: 73 }],
      };

      act(() => {
        result.current.handleScrollDirection(mockVirtualizer as any, true);
      });

      expect(onScrollEndReach).not.toHaveBeenCalled();
    });

    it('should call onScrollTopReach when scrolled near top and direction is backward', () => {
      const onScrollTopReach = vi.fn();

      const { result } = renderHook(() =>
        useInfiniteScroll({
          infiniteScroll: {
            hasMore: true,
            hasError: false,
            isLoading: false,
            prevPage: { hasMore: true, hasError: false, isLoading: false },
            onScrollTopReach,
          },
        }),
      );

      const mockVirtualizer = {
        scrollElement: createMockContainer({
          scrollHeight: 2000,
          scrollTop: 100, // near top: 100 < THRESHOLD
          clientHeight: 500,
        }),
        scrollDirection: 'backward' as const,
        scrollOffset: 100,
        getVirtualItemForOffset: () => ({ index: 0, size: 73 }),
        getVirtualItems: () => [{ index: 0, size: 73 }],
      };

      act(() => {
        result.current.handleScrollDirection(mockVirtualizer as any, true);
      });

      expect(onScrollTopReach).toHaveBeenCalled();
    });

    it('should NOT call onScrollTopReach when prevPage.hasMore is false', () => {
      const onScrollTopReach = vi.fn();

      const { result } = renderHook(() =>
        useInfiniteScroll({
          infiniteScroll: {
            hasMore: true,
            hasError: false,
            isLoading: false,
            prevPage: { hasMore: false, hasError: false, isLoading: false },
            onScrollTopReach,
          },
        }),
      );

      const mockVirtualizer = {
        scrollElement: createMockContainer({
          scrollHeight: 2000,
          scrollTop: 100,
          clientHeight: 500,
        }),
        scrollDirection: 'backward' as const,
        scrollOffset: 100,
        getVirtualItemForOffset: () => ({ index: 0, size: 73 }),
        getVirtualItems: () => [{ index: 0, size: 73 }],
      };

      act(() => {
        result.current.handleScrollDirection(mockVirtualizer as any, true);
      });

      expect(onScrollTopReach).not.toHaveBeenCalled();
    });

    // The virtualiser reports through a single `onChange`, which it also fires synchronously from
    // inside getVirtualItems() during render when the row count grows — carrying whatever
    // `isScrolling` was true at the time. Those notifications repeat the previous scroll offset,
    // and every guard downstream is React state that has not committed yet, so without the
    // offset check they request the page that is already in flight.
    describe('repeat notifications that did not move the scroll', () => {
      const nearBottomVirtualizer = (scrollOffset: number) =>
        ({
          scrollElement: createMockContainer({
            scrollHeight: 2000,
            scrollTop: 1400,
            clientHeight: 500,
          }),
          scrollDirection: 'forward' as const,
          scrollOffset,
          getVirtualItemForOffset: () => ({ index: 3, size: 73 }),
          getVirtualItems: () => [{ index: 3, size: 73 }],
        }) as unknown as Parameters<
          ReturnType<typeof useInfiniteScroll>['handleScrollDirection']
        >[0];

      const renderWithEndReach = (onScrollEndReach: () => void) =>
        renderHook(() =>
          useInfiniteScroll({
            infiniteScroll: {
              hasMore: true,
              hasError: false,
              isLoading: false,
              nextPage: { hasMore: true, hasError: false, isLoading: false },
              onScrollEndReach,
            },
          }),
        );

      it('should NOT call onScrollEndReach again for the same scroll offset', () => {
        const onScrollEndReach = vi.fn();
        const { result } = renderWithEndReach(onScrollEndReach);

        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1400), true);
        });
        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1400), true);
        });

        expect(onScrollEndReach).toHaveBeenCalledTimes(1);
      });

      it('should call onScrollEndReach again once the scroll offset moves', () => {
        const onScrollEndReach = vi.fn();
        const { result } = renderWithEndReach(onScrollEndReach);

        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1400), true);
        });
        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1460), true);
        });

        expect(onScrollEndReach).toHaveBeenCalledTimes(2);
      });

      it('should still report the first visible row for a repeat notification', () => {
        const onItemsRendered = vi.fn();
        const { result } = renderHook(() =>
          useInfiniteScroll({
            infiniteScroll: {
              hasMore: true,
              hasError: false,
              isLoading: false,
              nextPage: { hasMore: true, hasError: false, isLoading: false },
              onScrollEndReach: vi.fn(),
            },
            onItemsRendered,
          }),
        );

        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1400), true);
        });
        act(() => {
          result.current.handleScrollDirection(nearBottomVirtualizer(1400), true);
        });

        // Only the page request is suppressed — scroll-position reporting must keep working, or
        // back-navigation loses its anchor row.
        expect(onItemsRendered).toHaveBeenCalledTimes(2);
        expect(onItemsRendered).toHaveBeenLastCalledWith({ visibleStartIndex: 3 });
      });
    });

    it('should set scrollDirection to null when scrollOffset is 0', () => {
      const { result } = renderHook(() =>
        useInfiniteScroll({
          infiniteScroll: {
            hasMore: true,
            hasError: false,
            isLoading: false,
          },
        }),
      );

      const mockVirtualizer = {
        scrollElement: createMockContainer(),
        scrollDirection: null,
        scrollOffset: 0,
        getVirtualItemForOffset: () => ({ index: 0, size: 73 }),
        getVirtualItems: () => [{ index: 0, size: 73 }],
      };

      act(() => {
        result.current.handleScrollDirection(mockVirtualizer as any, false);
      });

      expect(result.current.scrollDirection).toBeNull();
    });
  });
});
