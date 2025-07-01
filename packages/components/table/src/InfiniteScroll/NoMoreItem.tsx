import React from 'react';

import Alert from '@synerise/ds-alert';

import { useTableLocaleContext } from '../utils/locale';

export const NoMoreItem = () => {
  const tableLocale = useTableLocaleContext();
  return (
    <Alert.InlineAlert
      type="info"
      message={tableLocale.infiniteScrollNoMoreData}
    />
  );
};
