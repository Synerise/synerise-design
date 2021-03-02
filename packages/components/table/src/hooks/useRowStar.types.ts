import { ColumnType } from 'antd/lib/table';
import { DSTableProps, DSColumnType } from '../Table.types';

export interface RowStar<T> {
  className?: string;
  starredRowKeys: string[];
  renderCell?: ColumnType<T>['render'];
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: (starredRowKeys: string[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecordType = any;

export interface UseStarredApi {
  getStarredKeys: () => string[];
  isStarred: (key: string) => boolean;
  toggleStarred: (key: string) => string[];
  getRowStarColumn: (dsTableProps: DSTableProps<AnyRecordType>) => DSColumnType<AnyRecordType>;
}
