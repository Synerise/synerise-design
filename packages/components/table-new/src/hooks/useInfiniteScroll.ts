import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { type Virtualizer } from '@tanstack/react-virtual';

import {
  INFINITE_SCROLL_PADDING_START,
  INFINITE_SCROLL_TRIGGER_THRESHOLD,
} from '../Table.const';
import {
  type InfiniteScrollProps,
  type OnItemsRenderedProps,
  type ScrollDirection,
  type StickyData,
} from '../Table.types';

type UseInfiniteScrollProps = {
  infiniteScroll?: InfiniteScrollProps;
  onItemsRendered?: (props: OnItemsRenderedProps) => void;
  setStickyData?: Dispatch<SetStateAction<StickyData>>;
};

export const useInfiniteScroll = ({
  infiniteScroll,
  onItemsRendered,
  setStickyData,
}: UseInfiniteScrollProps) => {
  const [scrollDirection, setScrollDirection] = useState<
    'backward' | 'forward' | null
  >(null);
  const [isCurrentlyScrolling, setIsCurrentlyScrolling] = useState(false);
  // The virtualiser notifies for reasons other than a scroll — notably when the row count grows,
  // which it reports synchronously from inside getVirtualItems() during render, carrying whatever
  // `isScrolling` happened to be true at the time. Those notifications repeat the previous scroll
  // offset, so remembering the offset we last acted on tells a real scroll apart from a re-notify.
  const lastTriggerOffsetRef = useRef<number | null>(null);

  const handleInfiniteScroll = useCallback(
    (containerRefElement?: HTMLDivElement | null, dir?: ScrollDirection) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight <
            INFINITE_SCROLL_TRIGGER_THRESHOLD &&
          infiniteScroll?.nextPage?.hasMore &&
          !infiniteScroll?.nextPage?.isLoading &&
          dir === 'forward'
        ) {
          infiniteScroll?.onScrollEndReach?.();
        } else if (
          scrollTop < INFINITE_SCROLL_TRIGGER_THRESHOLD &&
          infiniteScroll?.prevPage?.hasMore &&
          !infiniteScroll?.prevPage?.isLoading &&
          dir === 'backward'
        ) {
          infiniteScroll?.onScrollTopReach?.();
        }
      }
    },
    [infiniteScroll],
  );

  const handleScrollDirection = useCallback(
    (
      virtualiser: Virtualizer<HTMLDivElement, Element>,
      isScrolling: boolean,
    ) => {
      const itemAtOffset = virtualiser.getVirtualItemForOffset(
        (virtualiser.scrollOffset || 0) - INFINITE_SCROLL_PADDING_START,
      );
      const firstVisibleItem =
        itemAtOffset?.size === 0
          ? virtualiser
              .getVirtualItems()
              .find((v) => v.index > itemAtOffset.index && v.size > 0)
          : itemAtOffset;
      if (firstVisibleItem !== undefined) {
        onItemsRendered?.({ visibleStartIndex: firstVisibleItem.index });
      }
      setIsCurrentlyScrolling(isScrolling);
      if (infiniteScroll && isScrolling) {
        const offset = virtualiser.scrollOffset ?? 0;
        // Only a notification that actually moved the scroll can reach a new page boundary; one that
        // repeats an offset we already acted on would request the page still in flight, because the
        // guards it passes through are React state that has not committed yet.
        if (offset !== lastTriggerOffsetRef.current) {
          lastTriggerOffsetRef.current = offset;
          handleInfiniteScroll(
            virtualiser.scrollElement,
            virtualiser.scrollDirection,
          );
        }
      }
      if (virtualiser.scrollDirection) {
        setScrollDirection(virtualiser.scrollDirection);
      }
      if (!virtualiser.scrollOffset) {
        setScrollDirection(null);
      }
    },
    [handleInfiniteScroll, infiniteScroll, onItemsRendered],
  );

  useEffect(() => {
    if (isCurrentlyScrolling && scrollDirection === 'forward') {
      setStickyData?.((prev) => ({
        ...prev,
        isRevealed: false,
      }));
    }
  }, [isCurrentlyScrolling, scrollDirection, setStickyData]);

  return { scrollDirection, handleScrollDirection };
};
