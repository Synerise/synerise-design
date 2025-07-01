import { type ReactElement } from 'react';

export type LoaderItemPosition = 'TOP' | 'BOTTOM';

export type InfiniteScrollState = {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
};

export type InfiniteScrollProps = InfiniteScrollState & {
  maxScroll?: number;
  showBackToTopButton?: boolean;
  nextPage?: InfiniteScrollState;
  prevPage?: InfiniteScrollState;
  render?: (state: InfiniteScrollState) => ReactElement;
  onRetryButtonClick?: (position: LoaderItemPosition | undefined) => void;
  onScrollEndReach?: () => void;
  onScrollTopReach?: () => void;
  onBackToTop?: () => void;
};

export type LoaderItemProps = {
  infiniteScroll: InfiniteScrollProps & InfiniteScrollState;
  position?: LoaderItemPosition;
};
