import React from 'react';

import InlineAlert from '@synerise/ds-inline-alert';

import { useTableLocaleContext } from '../utils/locale';

export const NoMoreItem = () => {
  const tableLocale = useTableLocaleContext();
  return (
    <InlineAlert type="info" message={tableLocale.infiniteScrollNoMoreData} />
  );
};
