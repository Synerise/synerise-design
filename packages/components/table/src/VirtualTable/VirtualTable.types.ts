import { InfiniteScrollProps } from '../InfiniteScroll/constants';
import { DSTableProps } from '../Table.types';

export interface Props<T> extends DSTableProps<T> {
  cellHeight: number;
  infiniteScroll?: InfiniteScrollProps;
  initialWidth: number;
  scroll: {
    x?: number;
    y: number;
  };
  onRowClick?: (row: T) => void;
}
