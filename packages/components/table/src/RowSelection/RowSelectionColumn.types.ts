import { TableProps } from 'rc-table/lib/Table';
import { DSTableProps } from '../Table.types';
import * as React from 'react';

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
