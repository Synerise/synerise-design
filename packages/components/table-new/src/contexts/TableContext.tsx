import { createContext, useContext } from 'react';

import { type useReactTable } from '@tanstack/react-table';
import { type Virtualizer } from '@tanstack/react-virtual';

type TableInstance<TData extends object> = ReturnType<
  typeof useReactTable<TData>
>;

type TableContextType<TData extends object> = {
  table: TableInstance<TData>;
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>;
  getScrollContainer: () => HTMLElement | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableContext = createContext<TableContextType<any> | null>(null);

export const useTableContext = <TData extends object>() => {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error('useTableContext must be used inside <TableProvider>');
  }
  return ctx as TableContextType<TData>;
};
