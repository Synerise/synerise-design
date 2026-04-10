import { useCallback } from 'react';

import type { Row, RowData } from '@tanstack/react-table';

const parentIndex = <TData>(row: Row<TData>): string => {
  const parent = row.getParentRow();
  return `.${row.index}${parent ? parentIndex(parent) : ''}`;
};

const generateIdFromIndex = <TData>(index: number, parent?: Row<TData>) => {
  return `${index}${parent ? parentIndex(parent) : ''}`;
};

export const useRowKey = <TData extends RowData>(
  rowKey: keyof TData | ((row: TData) => string) | undefined,
): {
  getRowKey: (row: TData, index: number, parent?: Row<TData>) => string;
} => {
  const getRowKey = useCallback(
    (row: TData, index: number, parent?: Row<TData>): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      if (typeof rowKey === 'string') {
        return String(row[rowKey]);
      }
      const record = row as Record<string, unknown>;
      const fallback = record.key || record.id;
      return fallback ? String(fallback) : generateIdFromIndex(index, parent);
    },
    [rowKey],
  );

  return { getRowKey };
};
