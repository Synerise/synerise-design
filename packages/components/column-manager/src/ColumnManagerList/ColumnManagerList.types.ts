import * as React from 'react';
import { Column } from '../ColumnManagerItem/ColumManagerIte.types';

export type Props = {
  searchQuery: string;
  visibleList: Column[];
  hiddenList: Column[];
  searchResults: Column[];
  setFixed: (id: string, fixed?: string) => void;
  toggleColumn: (id: string, visible: boolean) => void;
  updateVisibleList: (newList: Column[]) => void;
  updateHiddenList: (newList: Column[]) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};
