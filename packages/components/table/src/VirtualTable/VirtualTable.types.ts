import type { RefObject } from 'react';
import type {
  FixedSizeList as List,
  ListOnItemsRenderedProps,
} from 'react-window';

import type { InfiniteScrollProps } from '../InfiniteScroll/InfiniteLoaderItem.types';
import type { DSColumnType, DSTableProps } from '../Table.types';

export type VirtualColumnType<T> = DSColumnType<T> & {
  fixedFirst?: boolean;
  id?: string | number;
  minWidth?: number | string;
  maxWidth?: number | string;
  left?: number;
  right?: number;
};

export type VirtualTableProps<T> = DSTableProps<T> & {
  cellHeight: number;
  infiniteScroll?: InfiniteScrollProps;
  initialWidth: number;
  scroll: {
    x?: number;
    y: number;
  };
  sticky?: DSTableProps<T>['sticky'] & {
    scrollThreshold?: number;
    offsetHeader?: number;
    getContainer: () => HTMLDivElement;
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

// @deprecated - use VirtualTableProps instead
export type Props<T> = VirtualTableProps<T>;
