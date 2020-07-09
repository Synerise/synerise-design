import { ColumnType, TableProps } from 'antd/lib/table';
import * as React from 'react';
import { TableLocale, TableRowSelection } from 'antd/lib/table/interface';
import DSTable from './Table';
import { GroupType } from './GroupTable/GroupTable';

export type AntTableProps<T> = Omit<
  TableProps<T>,
  'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search' | 'locale' | 'columns'
>;

export type Selection = {
  key: string;
  label: string;
  onClick: () => void;
};

export type SelectionItem =
  | typeof DSTable.SELECTION_ALL
  | typeof DSTable.SELECTION_INVERT
  | Selection
  | null
  | undefined;

export type RowSelection<T> = Omit<TableRowSelection<T>, 'selections'> & {
  fixed?: boolean;
  selectedRowKeys: React.ReactText[];
  selections?: SelectionItem[];
  onChange: (selectedRowKeys: React.ReactText[], selectedRows: T[]) => void;
};

export interface Filter {
  tooltips: {
    default: string;
    clear: string;
    define: string;
    list: string;
  };
  openedLabel: string;
  key: string;
  icon: React.ReactNode;
  showList: () => void;
  show: () => void;
  handleClear: () => void;
  selected?: {
    name: string;
  };
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DSTableProps<T extends any & GroupType<T>> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  hideTitleBar?: boolean;
  headerWithBorderTop?: boolean;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
  cellSize?: string | 'medium' | 'small';
  roundedHeader?: boolean;
  selection?: RowSelection<T>;
  filters?: Filter[];
  searchComponent?: React.ReactNode;
  filterComponent?: React.ReactNode;
  headerButton?: React.ReactNode;
  grouped?: boolean;
  hideGroupExpander?: boolean;
  initialGroupsCollapsed?: boolean;
  hideColumnNames?: boolean;
  columns?: (Omit<ColumnType<T>, 'fixed'> & {
    fixed?: 'left' | 'right' | string;
  })[];
  locale?: TableLocale & {
    pagination?: {
      items?: string;
      groups?: string;
    };
  };
}
