import type { ColumnsType } from 'antd/lib/table';

export type GroupByType = 'value' | 'ranges' | 'interval' | string | undefined;

export type SortOrderType = 'ascend' | 'descend' | boolean;

export type GroupColumnsType<T> = ColumnsType<T> & {
  sortOrder: SortOrderType;
  key: string | number;
  render: Function;
  dataIndex: string | number;
};

export type GroupType<T> = {
  column: string;
  value: string | number | boolean | object;
  key: string | number;
  rows: T[];
  groupType: GroupByType;
};

export const GROUP_BY: { [key: string]: string } = {
  value: 'value',
  ranges: 'ranges',
  interval: 'interval',
  disabled: 'disabled',
};
