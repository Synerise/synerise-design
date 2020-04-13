import * as React from 'react';
import { Column } from '../ColumnManagerItem/ColumManagerIte.types';

export type Props = {
  searchResults: Column[];
  searchQuery: string;
  setFixed: (id: string, fixed?: string) => void;
  switchAction: (id: string, visible: boolean) => void;
  texts: {
    [k: string]: string | React.ReactNode;
  };
};
