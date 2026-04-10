import React from 'react';

import { type InfiniteLoaderRowTexts } from '../../../../Table.types';
import { Loader } from './LoadingItem.styles';

export const LoadingItem = ({ texts }: { texts: InfiniteLoaderRowTexts }) => {
  return <Loader size="M" label={texts.infiniteScrollLoading} />;
};
