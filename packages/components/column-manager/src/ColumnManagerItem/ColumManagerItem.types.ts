import type { ReactText, ReactNode } from 'react';
import type { ThemePropsVars } from '@synerise/ds-core';

export type ColumnType = string | 'text' | 'number' | 'date' | 'boolean' | 'list';

export type Column = {
  id: string;
  key: ReactText;
  name: string;
  visible: boolean;
  type: ColumnType;
  fixed?: string | 'left' | 'right';
  group?: boolean;
};

export type ColumnProps = {
  setFixed: (id: string, fixed?: string) => void;
  showGroupSettings: (item: Column) => void;
  draggable?: boolean;
  switchAction: (id: string, visible: boolean) => void;
  searchQuery?: string;
  item: Column;
  texts: {
    [k: string]: ReactNode;
  };
  theme: ThemePropsVars;
};
