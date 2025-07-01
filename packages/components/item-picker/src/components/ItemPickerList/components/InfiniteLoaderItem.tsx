import React from 'react';

import { type ItemPickerListTexts } from '../ItemPickerList.types';
import { ErrorItem } from './ErrorItem';
import { LoadingItem } from './LoadingItem';
import { NoMoreItem } from './NoMoreItem';

export type InfiniteLoaderItemProps = {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
  texts: ItemPickerListTexts;
};

export const InfiniteLoaderItem = ({
  hasMore,
  isLoading,
  hasError,
  texts,
}: InfiniteLoaderItemProps) => {
  return (
    <>
      {isLoading && <LoadingItem label={texts.infiniteScrollLoadingMore} />}
      {!isLoading && !hasMore && (
        <NoMoreItem label={texts.infiniteScrollAllLoaded} />
      )}
      {!isLoading && hasError && (
        <ErrorItem label={texts.infiniteScrollLoadingError} />
      )}
    </>
  );
};
