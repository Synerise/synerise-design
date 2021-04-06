import { ScrollBarProps } from 'react-perfect-scrollbar';
import { DSTableProps } from '../Table.types';

export interface Props<T> extends DSTableProps<T> {
  cellHeight: number;
  initialWidth: number;
  scroll: {
    x?: number;
    y: number;
  };
  onRowClick?: (row: T) => void;
  onScrollReachEnd?: ScrollBarProps['onYReachEnd'];
}
