export interface InfiniteScrollProps {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
  // TODO: add custom renderer
  // render?: (loaderItemProps: Omit<LoaderItemProps, 'render'>) => React.ReactElement;
  onRetryButtonClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onScrollEndReach: () => void;
}

export const infiniteLoaderItemHeight = 64;
