import type { ReactNode } from 'react';

import type { ItemRollElement, ItemsRollProps } from '../ItemsRoll.types';

export type ListProps = Pick<
  ItemsRollProps,
  'groups' | 'onItemClick' | 'onItemRemove' | 'searchValue'
> & {
  noResultsLabel: ReactNode;
  removeTooltipLabel: ReactNode;
  visibleItems: ItemRollElement[];
};
