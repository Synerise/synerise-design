import { ReactElement, MouseEvent as ReactMouseEvent } from 'react';

export type InfiniteScrollState = {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
};

export type InfiniteScrollProps = InfiniteScrollState & {
  maxScroll?: number;
  showBackToTopButton?: boolean;
  render?: (state: InfiniteScrollState) => ReactElement;
  onRetryButtonClick?: (event: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
  onScrollEndReach: () => void;
  onScrollTopReach?: () => void;
};

export type LoaderItemProps = {
  infiniteScroll: InfiniteScrollProps;
};
