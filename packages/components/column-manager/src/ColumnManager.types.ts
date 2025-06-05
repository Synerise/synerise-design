import type { ReactNode } from 'react';
import type { Column } from './ColumnManagerItem/ColumManagerItem.types';

type TextsString = 'searchPlaceholder';
type TextsReactNode =
  | 'title'
  | 'searchClearTooltip'
  | 'noResults'
  | 'cancel'
  | 'apply'
  | 'clear'
  | 'switchOn'
  | 'switchOff';

export type ColumnManagerTexts = {
  [k in TextsReactNode]: ReactNode;
} & {
  [k in TextsString]: string;
};

export type ColumnManagerProps<ColumnType extends Column> = {
  hide: () => void;
  visible: boolean;
  onApply: (columns: ColumnType[]) => void;
  columns: ColumnType[];
  texts?: Partial<ColumnManagerTexts>;
  draggable?: boolean;
};
