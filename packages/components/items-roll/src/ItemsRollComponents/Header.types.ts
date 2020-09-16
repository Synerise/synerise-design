import * as React from 'react';
import { ItemsRollProps, Texts } from '../ItemsRoll.types';

export type HeaderProps = Pick<
  ItemsRollProps,
  | 'actions'
  | 'changeSelectionIcon'
  | 'onChangeSelection'
  | 'onSearch'
  | 'onSearchClear'
  | 'searchValue'
  | 'searchPlaceholder'
  > & {
  allTexts: { [k in Texts]: string | React.ReactNode };
  itemsCount: number;
};