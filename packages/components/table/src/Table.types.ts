import type { Key, ReactNode, Ref } from 'react';
import type { ColumnType, TableProps } from 'antd/lib/table';
import type { TableLocale, TableRowSelection } from 'antd/lib/table/interface';
import type { LiteralStringUnion } from '@synerise/ds-utils';

import type DSTable from './Table';
import type { GroupType } from './GroupTable/GroupTable.types';
import type { RowStar } from './hooks/useRowStar';
import type { SortRender } from './ColumnSortMenu/TitleWithSort';
import type { ColumnSortOrder, ColumnsSortState } from './ColumnSortMenu/useSortState';

export type AntTableProps<T> = Omit<
  TableProps<T>,
  'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search' | 'locale' | 'columns' | 'loading'
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
  selectedRowKeys: Key[];
  selections?: SelectionItem[];
  onChange: (selectedRowKeys: Key[], selectedRows: T[]) => void;
  limit?: number;
  independentSelectionExpandedRows?: boolean;
  checkRowSelectionStatus?: (record: T) => { disabled?: boolean; unavailable?: boolean };
};

export type Filter = {
  tooltips: {
    default: string;
    clear: string;
    define: string;
    list: string;
  };
  openedLabel: string;
  key: string;
  icon: ReactNode;
  showList: () => void;
  show: () => void;
  handleClear: () => void;
  selected?: {
    name: string;
  };
  disabled?: boolean;
};

export type RowType<T> = {
  key?: Key;
  children?: T[];
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
  selectVisible?: string;
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
  unselectAll?: string;
};

export type DSColumnType<T> = Omit<ColumnType<T>, 'fixed'> & {
  fixed?: 'left' | 'right';
  sortRender?: SortRender<T>;
  childRender?: (value: unknown, row: T, index: number) => ReactNode;
};

export type ScrollProxyType = {
  scrollLeft: number;
};
export type CustomizeScrollBodyInfo = {
  scrollbarSize: number;
  ref: Ref<ScrollProxyType>;
  onScroll: (info: { currentTarget?: HTMLElement; scrollLeft?: number }) => void;
};

type AntTableComponentsType<T> = AntTableProps<T>['components'];

type DSTableComponentsType<T> = AntTableComponentsType<T> & {
  // This type has been copied from Ant and extended because it's not accessible directly
  body?: (data: T[], info: CustomizeScrollBodyInfo, defaultTableProps?: DSTableProps<T>) => ReactNode;
};

export type SingleColumnSort = { columnKey: string; order: ColumnSortOrder };
export type OnSortFn = (singleColumnSort: SingleColumnSort, sortState: ColumnsSortState) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DSTableProps<T extends any & GroupType<T>> = AntTableProps<T> & {
  title?: ReactNode | (() => ReactNode);
  hideTitleBar?: boolean;
  loading?: boolean;
  headerWithBorderTop?: boolean;
  itemsMenu?: string | ReactNode;
  search?: string;
  cellSize?: LiteralStringUnion<'medium' | 'small'>;
  roundedHeader?: boolean;
  selection?: RowSelection<T>;
  rowStar?: RowStar<T>;
  filters?: Filter[];
  searchComponent?: ReactNode;
  filterComponent?: ReactNode;
  emptyDataComponent?: ReactNode;
  headerButton?: ReactNode;
  grouped?: boolean;
  hideGroupExpander?: boolean;
  initialGroupsCollapsed?: boolean;
  hideColumnNames?: boolean;
  columns?: DSColumnType<T>[];
  locale?: Locale;
  components?: AntTableComponentsType<T> | DSTableComponentsType<T>;
  renderSelectionTitle?: (selection?: RowSelection<T>, filters?: Filter[]) => ReactNode;
  hideTitlePart?: boolean;
  disableColumnNamesLineBreak?: boolean;
  onSort?: OnSortFn;
  dataSourceFull?: T[];
  dataSourceTotalCount?: number;
  isCounterLoading?: boolean;
  skeletonProps?: {
    maxHeight?: number;
    headerHeight?: number;
    subheaderHeight?: number;
    cellHeight?: number;
  };
};
