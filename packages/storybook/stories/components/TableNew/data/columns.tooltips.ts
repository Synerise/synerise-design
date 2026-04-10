import { type ColumnDef } from '@synerise/ds-table-new';

import { type DATA_SOURCE } from './tableData';

export type DataSourceItem = (typeof DATA_SOURCE)[number];

export const TOOLTIP_COLUMNS: ColumnDef<DataSourceItem, unknown>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 250,
    meta: {
      getCellTooltipProps: (row: DataSourceItem) =>
        row.unavailable ? { title: `${row.name} is unavailable` } : false,
    },
  },
  {
    accessorKey: 'city',
    header: 'City',
    size: 200,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    size: 300,
    meta: {
      getCellTooltipProps: () => ({ title: 'Address tooltip' }),
    },
  },
  {
    accessorKey: 'transactionType',
    header: 'Type',
    size: 150,
  },
];
