import * as React from 'react';
import { TableProps } from 'rc-table/lib/Table';
import { DSTableProps } from '../Table.types';

export type RowSelectionProps<T> = {
  rowKey: TableProps<T>['rowKey'];
  independentSelectionExpandedRows?: boolean;
  selectedRowKeys: React.ReactText[];
  selectedRecords: T[];
  limit?: number;
  record: T;
  tableLocale: DSTableProps<T>['locale'];
  onChange: (selectedRowKeys: React.ReactText[], selectedRecords: T[]) => void;
};
