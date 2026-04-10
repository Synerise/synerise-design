import { type Column, type SortDirection } from '@tanstack/react-table';

import { type ColumnSortOrder } from '../Table.types';

export const isSorted = <TData>(column: Column<TData>) => {
  return Boolean(column.columnDef.meta?.sortOrder ?? column.getIsSorted());
};

const SORT_ORDER: Record<Exclude<ColumnSortOrder, null>, SortDirection> = {
  ascend: 'asc',
  descend: 'desc',
};

export const getSortOrder = <TData>(column: Column<TData>) => {
  return column.columnDef.meta?.sortOrder
    ? SORT_ORDER[column.columnDef.meta?.sortOrder]
    : column.getIsSorted();
};
