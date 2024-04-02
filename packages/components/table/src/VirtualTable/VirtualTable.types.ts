import { RefObject } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import { InfiniteScrollProps } from '../InfiniteScroll/InfiniteLoaderItem.types';
import { DSTableProps } from '../Table.types';

export type Props<T> = DSTableProps<T> & {
  cellHeight: number;
  infiniteScroll?: InfiniteScrollProps;
  initialWidth: number;
  scroll: {
    x?: number;
    y: number;
  };
  sticky?: DSTableProps<T>['sticky'] & {
    scrollThreshold?: number;
  };
  onListRefChange?: (ref: RefObject<List>) => void;
  onRowClick?: (row: T) => void;
  onItemsRendered?: (props: ListOnItemsRenderedProps) => void;
  onScrollToRecordIndex?: (recordIndex: number, callback?: () => void) => void;
};

export type VirtualTableRef = {
  virtualListRef: RefObject<List>;
  outerListRef: RefObject<HTMLDivElement>;
  horizontalScrollRef: RefObject<HTMLDivElement>;
  scrollToTop: () => void;
  scrollTo: (top: number) => void;
};
