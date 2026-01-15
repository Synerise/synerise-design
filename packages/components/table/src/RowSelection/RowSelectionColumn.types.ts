import { type TableProps } from 'rc-table/lib/Table';
import type { Key } from 'react';

import { type DSTableProps, type RowSelection } from '../Table.types';

export type RowSelectionProps<T> = {
  rowKey: TableProps<T>['rowKey'];
  independentSelectionExpandedRows?: boolean;
  isGlobalAllSelected?: boolean;
  selectedRowKeys: Key[];
  selectedRecords: T[];
  limit?: number;
  record: T;
  tableLocale: DSTableProps<T>['locale'];
  onChange: RowSelection<T>['onChange'];
  getSelectionTooltipProps?: RowSelection<T>['getSelectionTooltipProps'];
  checkRowSelectionStatus?: RowSelection<T>['checkRowSelectionStatus'];
  childrenColumnName: keyof T;
};
