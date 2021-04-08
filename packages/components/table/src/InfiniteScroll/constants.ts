export interface InfiniteScrollState {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
}

export interface InfiniteScrollProps extends InfiniteScrollState {
  render?: (state: InfiniteScrollState) => React.ReactElement;
  onRetryButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onScrollEndReach: () => void;
}

export const infiniteLoaderItemHeight = 64;
