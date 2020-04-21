import * as React from 'react';
import { FilterElement } from '../../Search.types';

export type SearchItemListProps = {
  data: FilterElement[] | undefined;
  width: number;
  rowHeight: number;
  visibleRows: number;
  divider?: React.ReactNode;
  onItemClick?: (e: FilterElement) => void;
  highlight?: string;
  itemRender: (item: FilterElement) => React.ReactElement;
};