import React from 'react';

import { TableLocaleContext } from '../utils/locale';
import { Loader } from './InfiniteLoaderItem.styles';

export const LoadingItem = () => (
  <TableLocaleContext.Consumer>
    {tableLocale => <Loader size="M" label={tableLocale.infiniteScrollLoading} />}
  </TableLocaleContext.Consumer>
);
