import type { ReactNode } from 'react';

import type { ItemRollElement, ItemsRollProps } from '../ItemsRoll.types';

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
  noResultsLabel: ReactNode;
  removeTooltipLabel: ReactNode;
  visibleItems: ItemRollElement[];
};
