import type { RowData } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

import type { SelectionConfig } from '../Table.types';

export const SelectionContext = createContext<
  // biome-ignore lint/suspicious/noExplicitAny: upstream type is not expressible here
  SelectionConfig<any> | undefined
>(undefined);

export const useSelectionContext = <TData extends RowData>() => {
  const ctx = useContext(SelectionContext);
  return ctx ? (ctx as SelectionConfig<TData>) : undefined;
};
