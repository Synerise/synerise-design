import { type ColumnType } from 'antd/lib/table';
import type React from 'react';

import { type DSColumnType, type DSTableProps } from '../../Table.types';

export interface RowStar<T> {
  className?: string;
  starredRowKeys: string[];
  renderCell?: ColumnType<T>['render'];
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: (
    starredRowKeys: string[],
    starredKey: string,
    isStarred: boolean,
  ) => void;
  disableForExpandedRows?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecordType = any;

export interface UseStarredApi {
  getStarredKeys: () => string[];
  isStarred: (key: string) => boolean;
  toggleStarred: (key: string) => string[];
  getRowStarColumn: (
    dsTableProps: CreateRowStarColumnProps,
  ) => DSColumnType<AnyRecordType>;
}

export type CreateRowStarColumnProps = DSTableProps<AnyRecordType> & {
  getRowKey: (row: AnyRecordType) => React.ReactText | undefined;
};
