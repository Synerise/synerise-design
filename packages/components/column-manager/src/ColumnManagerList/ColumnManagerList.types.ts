import * as React from 'react';
import { Column } from '../ColumnManagerItem/ColumManagerIte.types';
import { GroupSettings } from '../ColumnManager.types';

export type Props = {
  searchQuery: string;
  visibleList: Column[];
  hiddenList: Column[];
  searchResults: Column[];
  setFixed: (id: string, fixed?: string) => void;
  showGroupSettings: (item: Column) => void;
  toggleColumn: (id: string, visible: boolean) => void;
  groupSettings?: GroupSettings;
  updateVisibleList: (newList: Column[]) => void;
  updateHiddenList: (newList: Column[]) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};
