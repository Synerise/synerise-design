import * as React from 'react';

export type SearchItemListProps<T> = {
  data: T[] | undefined;
  width: number;
  rowHeight: number;
  visibleRows: number;
  onItemClick?: (e: T) => void;
  highlight?: string;
  itemRender: (item: T) => React.ReactElement;
  listProps?: object;
};
