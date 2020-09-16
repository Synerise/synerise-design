import { DSTableProps } from '../Table.types';

export interface Props<T> extends DSTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  scroll: {
    x?: number;
    y: number;
  };
  onRowClick?: (row: T) => void;
  cellHeight: number;
  initialWidth: number;
}
