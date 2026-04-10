import { createContext, useContext } from 'react';

import { type RowData } from '@tanstack/react-table';

import { type SelectionConfig } from '../Table.types';

export const SelectionContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SelectionConfig<any> | undefined
>(undefined);

export const useSelectionContext = <TData extends RowData>() => {
  const ctx = useContext(SelectionContext);
  return ctx ? (ctx as SelectionConfig<TData>) : undefined;
};
