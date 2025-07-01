import {
  type InfiniteScrollProps,
  type InfiniteScrollState,
} from './InfiniteLoaderItem.types';

export const infiniteScrollPropsToState = ({
  hasError,
  hasMore,
  isLoading,
}: InfiniteScrollProps & InfiniteScrollState): InfiniteScrollState => ({
  hasError,
  hasMore,
  isLoading,
});

export default { infiniteScrollPropsToState };
