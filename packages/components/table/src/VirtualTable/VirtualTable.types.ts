import { RefObject } from 'react';
import { FixedSizeList as List } from 'react-window';
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
  onListRefChange?: (ref: RefObject<List>) => void;
  onRowClick?: (row: T) => void;
}
