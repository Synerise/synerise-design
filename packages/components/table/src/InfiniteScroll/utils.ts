import { InfiniteScrollProps, InfiniteScrollState } from './InfiniteLoaderItem.types';

export const infiniteScrollPropsToState = ({
  hasError,
  hasMore,
  isLoading,
}: InfiniteScrollProps): InfiniteScrollState => ({
  hasError,
  hasMore,
  isLoading,
});

export default { infiniteScrollPropsToState };
