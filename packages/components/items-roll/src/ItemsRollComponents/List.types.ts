import * as React from 'react';
import { ItemRollElement, ItemsRollProps } from '../ItemsRoll.types';

export type ListProps = Pick<
  ItemsRollProps,
  | 'groups'
  | 'items'
  | 'onItemClick'
  | 'onItemRemove'
  | 'searchValue'
  | 'useVirtualizedList'
  | 'virtualizedRowHeight'
  | 'virtualizedRowWidth'
  > & {
  noResultsLabel: string | React.ReactNode;
  removeTooltipLabel: string | React.ReactNode;
  visibleItems: ItemRollElement[];
};
