import React from 'react';
import Alert from '@synerise/ds-alert';

import { TableLocaleContext } from '../utils/locale';

export const NoMoreItem = () => (
  <TableLocaleContext.Consumer>
    {tableLocale => <Alert.InlineAlert type="info" message={tableLocale.infiniteScrollNoMoreData} />}
  </TableLocaleContext.Consumer>
);
