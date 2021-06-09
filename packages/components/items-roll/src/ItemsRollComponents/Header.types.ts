import * as React from 'react';
import { ItemsRollProps, Texts } from '../ItemsRoll.types';

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
  allTexts: { [k in Texts]: string | React.ReactNode };
  itemsCount: number;
};
