import React from 'react';

import { useTableLocaleContext } from '../utils/locale';
import { Loader } from './InfiniteLoaderItem.styles';

export const LoadingItem = () => {
  const tableLocale = useTableLocaleContext();
  return <Loader size="M" label={tableLocale.infiniteScrollLoading} />;
};
