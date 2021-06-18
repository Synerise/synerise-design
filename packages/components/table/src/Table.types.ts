import { ColumnType, TableProps } from 'antd/lib/table';
import * as React from 'react';
import { TableLocale, TableRowSelection } from 'antd/lib/table/interface';
import DSTable from './Table';
import { GroupType } from './GroupTable/GroupTable.types';
import { RowStar } from './hooks/useRowStar.types';
import { SortRender } from './ColumnSortMenu/TitleWithSort';

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
  limit?: number;
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

export type RowType<T> = {
  children: T[];
};

export type Locale = TableLocale & {
  selected?: string;
  emptyText?: string;
  selectionLimitWarning?: string;
  pagination?: {
    items?: string;
    groups?: string;
  };
  selectRowTooltip?: string;
  selectAllTooltip?: string;
  starRowTooltip?: string;
  selectionOptionsTooltip?: string;
  columnSortAz?: string;
  columnSortZa?: string;
  columnSortAscend?: string;
  columnSortDescend?: string;
  columnSortClear?: string;
  infiniteScrollError?: string;
  infiniteScrollRetry?: string;
  infiniteScrollNoMoreData?: string;
  infiniteScrollLoading?: string;
  infiniteScrollBackToTop?: string;
};

export type DSColumnType<T> = Omit<ColumnType<T>, 'fixed'> & {
  fixed?: 'left' | 'right' | string;
  sortRender?: SortRender<T>;
};

type AntTableComponentsType<T> = AntTableProps<T>['components'];

type DSTableComponentsType<T> = AntTableComponentsType<T> & {
  // This type has been copied from Ant and extended because it's not accessible directly
  body?: (
    data: T[],
    info: {
      scrollbarSize: number;
      ref: React.Ref<{
        scrollLeft: number;
      }>;
      onScroll: (info: { currentTarget?: HTMLElement; scrollLeft?: number }) => void;
    },
    defaultTableProps?: DSTableProps<T>
  ) => React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DSTableProps<T extends any & GroupType<T>> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  hideTitleBar?: boolean;
  headerWithBorderTop?: boolean;
  itemsMenu?: string | React.ReactNode;
  search?: string;
  cellSize?: string | 'medium' | 'small';
  roundedHeader?: boolean;
  selection?: RowSelection<T>;
  rowStar?: RowStar<T>;
  filters?: Filter[];
  searchComponent?: React.ReactNode;
  filterComponent?: React.ReactNode;
  headerButton?: React.ReactNode;
  grouped?: boolean;
  hideGroupExpander?: boolean;
  initialGroupsCollapsed?: boolean;
  hideColumnNames?: boolean;
  columns?: DSColumnType<T>[];
  locale?: Locale;
  components?: AntTableComponentsType<T> | DSTableComponentsType<T>;
  renderSelectionTitle?: (selection?: RowSelection<T>, filters?: Filter[]) => React.ReactNode;
  hideTitlePart?: boolean;
  customPagination?: React.ReactNode;
}
