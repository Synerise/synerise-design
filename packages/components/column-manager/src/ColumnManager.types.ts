import { ItemFilterProps } from '@synerise/ds-item-filter/dist/ItemFilter';
import * as React from 'react';
import { IntlFormatters } from 'react-intl';
import { Column } from './ColumnManagerItem/ColumManagerItem.types';
import { Range, GroupSettingsTexts } from './ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';

export type Texts =
  | GroupSettingsTexts
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
  | 'group'
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
  onApply: (columns: Column[], groupSettings: GroupSettings | undefined) => void;
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

export type GroupType = 'value' | 'ranges' | 'interval' | undefined;

export type GroupSettings = {
  column?: Column;
  settings: {
    type: GroupType;
    ranges: Range[] | false;
    interval: number | false;
  };
};

export type State = {
  searchQuery: string;
  visibleList: Column[];
  hiddenList: Column[];
  itemFilterVisible: boolean;
  selectedFilterId: string | undefined;
  activeColumn: Column | undefined;
  groupSettings: GroupSettings | undefined;
};
