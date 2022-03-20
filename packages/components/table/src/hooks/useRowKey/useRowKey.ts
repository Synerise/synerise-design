import * as React from 'react';

// eslint-disable-next-line import/prefer-default-export,@typescript-eslint/explicit-function-return-type
export const useRowKey = (rowKey: string | Function | undefined) => {
  const getRowKey = React.useCallback(
    (row: any): string | number | undefined => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return row.key || undefined;
    },
    [rowKey]
  );

  return { getRowKey };
};
