import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any & {
  key?: string;
};

export const useRowKey = (
  rowKey: string | Function | undefined,
): { getRowKey: (row: Row) => string | number | undefined } => {
  const getRowKey = React.useCallback(
    (row: Row): string | number | undefined => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      if (typeof rowKey === 'string') {
        return row[rowKey];
      }
      return row.key || undefined;
    },
    [rowKey],
  );

  return { getRowKey };
};
