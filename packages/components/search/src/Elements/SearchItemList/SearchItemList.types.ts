import * as React from 'react';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { FilterElement } from '../../Search.types';

export type SearchItemListProps<T extends MenuItemProps | FilterElement> = {
  data: T[] | undefined;
  width: number;
  rowHeight: number;
  visibleRows: number;
  divider?: React.ReactNode;
  onItemClick?: (e: T) => void;
  highlight?: string;
  itemRender: (item: T) => React.ReactElement;
  listProps?: object;
};
