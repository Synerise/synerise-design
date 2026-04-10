export { Table } from './Table';
export { VirtualTable } from './VirtualTable';

/** @deprecated  */
export * as TableCell from './components/Cell';
export * from './components/Cell';

export * from './Table.types';

export * from './Table.const';

export { legacyColumnConfigAdapter } from './utils/legacyColumnConfigAdapter';

export {
  type ColumnDef,
  type Row,
  type CellContext,
  type HeaderContext,
} from '@tanstack/react-table';
