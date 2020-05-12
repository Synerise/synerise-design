import { ItemFilterProps } from '@synerise/ds-item-filter/dist/ItemFilter';
import * as React from 'react';
import { IntlFormatters } from 'react-intl';
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
  | 'switchOn'
  | 'switchOff'
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
  savedViewsVisible?: boolean;
  hideSavedViews?: () => void;
  intl: IntlFormatters;
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
