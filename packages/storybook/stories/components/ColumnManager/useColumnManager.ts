import { useState } from 'react';

import { COLUMNS_VIRTUALISED } from './ColumnManager.data';

export const useColumnManager = (visible?: boolean) => {
  const [columns, setColumns] = useState(COLUMNS_VIRTUALISED);
  const [columnManagerVisible, setColumnManagerVisible] = useState(!!visible);

  return {
    columns,
    setColumns,
    columnManagerVisible,
    setColumnManagerVisible
  };
};
