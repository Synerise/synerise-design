import type { ColumnType, TableProps } from 'antd/lib/table';
import type {
  ColumnTitleProps,
  TableLocale,
  TableRowSelection,
} from 'antd/lib/table/interface';
import type {
  SELECTION_ALL,
  SELECTION_INVERT,
} from 'constants/Table.constants';
import type { Key, ReactNode, Ref } from 'react';

import type { LiteralStringUnion } from '@synerise/ds-utils';

import type { GroupType } from './GroupTable/GroupTable.types';

export type RowStar<T> = {
  className?: string;
  starredRowKeys: string[];
  renderCell?: ColumnType<T>['render'];
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: (
    starredRowKeys: string[],
    starredKey: string,
    isStarred: boolean,
  ) => void;
  disableForExpandedRows?: boolean;
};

export type AntTableProps<T> = Omit<
  TableProps<T>,
  | 'title'
  | 'subTitle'
  | 'onSearch'
  | 'itemsMenu'
  | 'search'
  | 'locale'
  | 'columns'
  | 'loading'
>;

export type Selection = {
  key: string;
  label: string;
  onClick: () => void;
};

export type SelectionItem =
  | typeof SELECTION_ALL
  | typeof SELECTION_INVERT
  | Selection
  | null
  | undefined;

export type RowSelection<T> = Omit<TableRowSelection<T>, 'selections'> & {
  fixed?: boolean;
  selectedRowKeys: Key[];
  selections?: SelectionItem[];
  /**
   * @param globalSelection
   * @description for paginated tables or tables with infinite loader - allows setting all items (even ones not loaded yet) as selected.
   * This will NOT provide ketys of selected rows (as those are unknown), only a boolean flag that can be used for batch actions on the entire set
   * Adding this prop will render additional items in the selection dropdown, in the table header.
   * Labels for this prop should be provided via `locale` prop
   */
  globalSelection?: {
    isSelected: boolean;
    onChange: (selected: boolean) => void;
  };
  onChange: (selectedRowKeys: Key[], selectedRows: T[]) => void;
  limit?: number;
  independentSelectionExpandedRows?: boolean;
  checkRowSelectionStatus?: (record: T) => {
    disabled?: boolean;
    unavailable?: boolean;
  };
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
  selectGlobalAll?: string;
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
  unselectGlobalAll?: string;
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
  onScroll: (info: {
    currentTarget?: HTMLElement;
    scrollLeft?: number;
  }) => void;
};

type AntTableComponentsType<T> = AntTableProps<T>['components'];

type DSTableComponentsType<T> = AntTableComponentsType<T> & {
  // This type has been copied from Ant and extended because it's not accessible directly
  body?: (
    data: T[],
    info: CustomizeScrollBodyInfo,
    defaultTableProps?: DSTableProps<T>,
  ) => ReactNode;
};

export type SingleColumnSort = { columnKey: string; order: ColumnSortOrder };
export type OnSortFn = (
  singleColumnSort: SingleColumnSort,
  sortState: ColumnsSortState,
) => void;

export type CustomCounterArgs = {
  count: number;
  content: ReactNode;
};
export type CustomCounterFn = (props: CustomCounterArgs) => ReactNode;

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
  renderSelectionTitle?: (
    selection?: RowSelection<T>,
    filters?: Filter[],
  ) => ReactNode;
  hideTitlePart?: boolean;
  disableColumnNamesLineBreak?: boolean;
  onSort?: OnSortFn;
  dataSourceFull?: T[];
  dataSourceTotalCount?: number;
  isCounterLoading?: boolean;
  renderCustomCounter?: CustomCounterFn;
  skeletonProps?: {
    maxHeight?: number;
    headerHeight?: number;
    subheaderHeight?: number;
    cellHeight?: number;
  };
};

export type ColumnSortOrder = 'descend' | 'ascend' | null;

export interface ColumnsSortState {
  [key: string]: {
    sortOrder: ColumnSortOrder;
    multiple: number | false;
  };
}

export interface SortStateAPI {
  columnsSortState: ColumnsSortState;
  getColumnSortOrder: (key: string) => ColumnSortOrder;
  setColumnSortOrder: (key: string, sort: ColumnSortOrder) => void;
  updateColumnsData: (columns: ColumnsSortState) => void;
}

export type SortButtonsRenderer<T> = (
  sortStateApi: SortStateAPI,
  column: DSColumnType<T>,
) => React.ReactElement;

export type SortRender<T> = 'default' | 'string' | SortButtonsRenderer<T>;

export interface TitleWithSortOwnProps<T> {
  column: DSColumnType<T>;
  sortRender: React.ReactElement;
  titleProps: ColumnTitleProps<T>;
}

export type TitleWithSortProps<T> = TitleWithSortOwnProps<T> &
  React.ComponentPropsWithoutRef<'span'>;
