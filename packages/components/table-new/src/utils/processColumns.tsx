import React from 'react';

import { type ColumnDef } from '@tanstack/react-table';

import { SELECTION_COLUMN_ID } from '../Table.const';
import { type TableTexts } from '../Table.types';
import { TableRowSelection } from '../components/TableBody/TableRowSelection/TableRowSelection';

export const processColumns = <TData extends object, TValue>(
  columns: ColumnDef<TData, TValue>[],
  selection: boolean,
  texts: TableTexts,
): ColumnDef<TData, TValue>[] => {
  const selectionColumn: ColumnDef<TData, TValue> = {
    id: SELECTION_COLUMN_ID,
    size: 64,
    minSize: 64,
    maxSize: 64,
    meta: {
      style: { paddingRight: '8px' },
    },
    header: '',
    cell: ({ row }) => <TableRowSelection row={row} texts={texts} />,
  };

  return selection ? [selectionColumn, ...columns] : columns;
};
