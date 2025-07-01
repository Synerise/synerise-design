import type { ReactNode } from 'react';

import type { ItemsRollProps, Texts } from '../ItemsRoll.types';

export type HeaderProps = Pick<
  ItemsRollProps,
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
