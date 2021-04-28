import { InfiniteScrollProps, InfiniteScrollState } from './constants';

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
