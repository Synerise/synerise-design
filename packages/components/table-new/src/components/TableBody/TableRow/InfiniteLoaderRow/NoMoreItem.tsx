import React from 'react';

import InlineAlert from '@synerise/ds-inline-alert';

import { type InfiniteLoaderRowTexts } from '../../../../Table.types';

export const NoMoreItem = ({ texts }: { texts: InfiniteLoaderRowTexts }) => {
  return <InlineAlert type="info" message={texts.infiniteScrollNoMoreData} />;
};
