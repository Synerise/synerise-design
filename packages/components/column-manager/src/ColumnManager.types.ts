import { ItemFilterProps } from '@synerise/ds-item-filter/dist/ItemFilter';
import * as React from 'react';
import { Column } from './ColumnManagerItem/ColumManagerIte.types';

export type Texts =
  | 'title'
  | 'searchPlaceholder'
  | 'searchClearTooltip'
  | 'noResults'
  | 'searchResults'
  | 'visible'
  | 'hidden'
  | 'saveView'
  | 'cancel'
  | 'apply'
  | 'fixedLeft'
  | 'fixedRight'
  | 'clear'
  | 'viewName'
  | 'viewDescription'
  | 'viewNamePlaceholder'
  | 'viewDescriptionPlaceholder'
  | 'mustNotBeEmpty';

export type ColumnManagerProps = {
  hide: () => void;
  visible: boolean;
  onSave: (savedView: SavedView) => void;
  onApply: (columns: Column[]) => void;
  columns: Column[];
  texts?: {
    [k in Texts]: string | React.ReactNode;
  };
  itemFilterConfig?: Omit<ItemFilterProps, 'visible' | 'hide' | 'theme'>;
};

export type SavedView = {
  meta: ViewMeta;
  columns: Column[];
};

export type ViewMeta = {
  name: string;
  description: string;
};

export type State = {
  searchQuery: string;
  visibleList: Column[];
  hiddenList: Column[];
  itemFilterVisible: boolean;
  selectedFilterId: string | undefined;
};
