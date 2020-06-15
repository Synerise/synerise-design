import * as React from 'react';

export type ColumnType = string | 'text' | 'number' | 'date' | 'boolean' | 'list';

export type Column = {
  id: string;
  key: React.ReactText;
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
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
};
