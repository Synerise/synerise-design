import React, { useEffect } from 'react';

import { ErrorItem } from './ErrorItem';
import { type LoaderItemProps } from './InfiniteLoaderItem.types';
import { LoadingItem } from './LoadingItem';
import { NoMoreItem } from './NoMoreItem';
import { infiniteScrollPropsToState } from './utils';

const InfiniteLoaderItem = ({ infiniteScroll, position }: LoaderItemProps) => {
  const {
    hasMore,
    isLoading,
    onScrollEndReach,
    hasError,
    onRetryButtonClick,
    render,
  } = infiniteScroll;

  const handleRetryClick = onRetryButtonClick
    ? () => {
        onRetryButtonClick(position);
      }
    : undefined;

  // @ts-expect-error TS7030: Not all code paths return a value

  useEffect(() => {
    if (!isLoading && hasMore) {
      if (
        (!position || position === 'BOTTOM') &&
        typeof onScrollEndReach === 'function'
      ) {
        const timeout = setTimeout(onScrollEndReach, 0);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [hasMore, isLoading, onScrollEndReach, position]);

  if (typeof render === 'function') {
    return render(infiniteScrollPropsToState(infiniteScroll));
  }

  return (
    <>
      {isLoading && <LoadingItem />}
      {!isLoading && !hasMore && <NoMoreItem />}
      {!isLoading && hasError && <ErrorItem onRetryClick={handleRetryClick} />}
    </>
  );
};

export default InfiniteLoaderItem;
