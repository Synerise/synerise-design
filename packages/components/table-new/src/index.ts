export { Table } from './Table';
export { TreeTable } from './components/TreeTable/TreeTable';
export { VirtualTable } from './VirtualTable';

/** @deprecated  */
export * as TableCell from './components/Cell';
export * from './components/Cell';

export * from './Table.types';
export type { TreeTableProps } from './components/TreeTable/TreeTable.types';

export * from './Table.const';

export { legacyColumnConfigAdapter } from './utils/legacyColumnConfigAdapter';

export {
  type ColumnDef,
  type Row,
  type CellContext,
  type HeaderContext,
} from '@tanstack/react-table';
