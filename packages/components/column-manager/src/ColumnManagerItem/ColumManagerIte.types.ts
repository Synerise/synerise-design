import * as React from 'react';

export type Column = {
  id: string;
  name: string;
  visible: boolean;
  type: string | 'text' | 'number' | 'date' | 'boolean' | 'list';
  fixed?: string | 'left' | 'right';
};

export type ColumnProps = {
  setFixed: (id: string, fixed?: string) => void;
  draggable?: boolean;
  switchAction: (id: string, visible: boolean) => void;
  searchQuery?: string;
  texts: {
    [k: string]: string | React.ReactNode;
  };
  theme: {
    [k: string]: string;
  };
};
