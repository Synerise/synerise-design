import { INFINITE_LOADER_ITEM_HEIGHT } from '../Table.const';
import { type InfiniteScrollProps } from '../Table.types';

export const getInfiniteScrollPadding = (
  infiniteScroll?: InfiniteScrollProps,
): number => {
  if (!infiniteScroll) {
    return 0;
  }
  if (infiniteScroll.prevPage?.hasMore) {
    return 2 * INFINITE_LOADER_ITEM_HEIGHT;
  }
  return INFINITE_LOADER_ITEM_HEIGHT;
};
