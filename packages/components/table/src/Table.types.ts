import { TableProps } from 'antd/lib/table';
import * as React from 'react';

export type AntTableProps<T> = Omit<TableProps<T>, 'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search'>;

export type Selection = {
  key: string;
  label: string;
  onClick: () => void;
};

export type SelectionItem = 'SELECTION_ALL' | 'SELECTION_VISIBLE' | 'SELECTION_INVERT';

export interface RowSelection<T> {
  fixed?: boolean;
  selectedRowKeys: React.ReactText[];
  selections?: [SelectionItem, Selection];
  onChange: (selectedRowKeys: React.ReactText[], selectedRows: T[]) => void;
  setRowSelection: (keys: React.ReactText[]) => void;
}

export interface Filter {
  tooltips: {
    default: string;
    clear: string;
    define: string;
    list: string;
  };
  key: string;
  icon: React.ReactNode;
  showList: () => void;
  show: () => void;
  handleClear: () => void;
  selected?: {
    name: string;
  };
}

export interface DSTableProps<T extends { key: React.ReactText }> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
  cellSize?: string | 'medium' | 'small';
  roundedHeader?: boolean;
  selection?: RowSelection<T>;
  filters?: Filter[];
}
