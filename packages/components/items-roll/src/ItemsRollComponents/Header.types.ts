import type { ReactNode } from 'react';

import { type ListItemProps } from '@synerise/ds-list-item';
import { type MenuItemProps } from '@synerise/ds-menu';

import type { ItemsRollProps, Texts } from '../ItemsRoll.types';

export type HeaderProps<
  ActionItemType extends ListItemProps | MenuItemProps = ListItemProps,
> = Pick<
  ItemsRollProps<ActionItemType>,
  | 'actions'
  | 'changeSelectionIcon'
  | 'changeSelectionDropdownProps'
  | 'onChangeSelection'
  | 'onSearch'
  | 'onSearchClear'
  | 'searchValue'
  | 'searchPlaceholder'
  | 'hideSearch'
  | 'customSidebarActions'
> & {
  allTexts: { [k in Texts]: ReactNode };
  itemsCount: ReactNode;
};
