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
