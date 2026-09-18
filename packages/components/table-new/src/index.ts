export type {
  CellContext,
  ColumnDef,
  HeaderContext,
  Row,
} from '@tanstack/react-table';

/** @deprecated  */
export * as TableCell from './components/Cell';
export * from './components/Cell';
export { TreeTable } from './components/TreeTable/TreeTable';
export type { TreeTableProps } from './components/TreeTable/TreeTable.types';
export { Table } from './Table';
export * from './Table.const';
export * from './Table.types';
export { legacyColumnConfigAdapter } from './utils/legacyColumnConfigAdapter';
export { VirtualTable } from './VirtualTable';
