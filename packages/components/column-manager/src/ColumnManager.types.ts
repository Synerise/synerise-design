import type { ReactNode } from 'react';

export type Column = {
  id: string;
  name: string;
  visible: boolean;
  readOnly?: boolean;
  type?: ColumnIconType;
};

export type ColumnIconType =
  | string
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'list';

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
