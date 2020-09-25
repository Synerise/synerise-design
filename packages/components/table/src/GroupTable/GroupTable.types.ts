import { ColumnsType } from 'antd/lib/table';
import * as React from 'react';
import { GroupType as GroupByType } from '@synerise/ds-column-manager/dist/ColumnManager.types';

export type SortOrderType = 'ascend' | 'descend' | boolean;

export type GroupColumnsType<T> = ColumnsType<T> & {
  sortOrder: SortOrderType;
  key: React.ReactText;
  render: Function;
  dataIndex: React.ReactText;
};

export type GroupType<T> = {
  column: string;
  value: React.ReactText | boolean | object;
  key: React.ReactText;
  rows: T[];
  groupType: GroupByType;
};
