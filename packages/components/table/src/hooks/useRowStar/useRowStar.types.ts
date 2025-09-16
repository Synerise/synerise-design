import type React from 'react';

import { type DSColumnType, type DSTableProps } from '../../Table.types';

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
