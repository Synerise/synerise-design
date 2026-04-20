import type { PaginationProps } from 'antd/lib/pagination';
import {
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';

import type { SearchInputProps } from '@synerise/ds-search';
import type { TooltipProps } from '@synerise/ds-tooltip';
import {
  type Column,
  type ColumnDef,
  type ColumnMeta,
  type Row,
  type RowData,
} from '@tanstack/react-table';
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';

export type HighlightOptions = {
  /** Duration in milliseconds. Default: 600 */
  duration?: number;
};

export type TableRef = {
  /** Temporarily highlight a row by key. Highlight fades out after duration. */
  highlightRow: (rowKey: string, options?: HighlightOptions) => void;
};

/**
 * Standard paginated table component props
 */
export type TableProps<TData, TValue> = SharedTableProps<TData, TValue> &
  PaginatedProps & {
    texts?: Partial<TableTexts>;
    tableRef?: RefObject<TableRef>;
  };

/**
 * Virtual non-paginated table component props
 */
export type VirtualTableProps<TData, TValue> = SharedTableProps<TData, TValue> &
  VirtualProps & {};

export type DSColumnMeta<TData extends RowData, TValue> = ColumnMeta<
  TData,
  TValue
>;

/**
 * Legacy column type matching @synerise/ds-table's VirtualColumnType.
 * Used by legacyColumnConfigAdapter to convert old column configs to TanStack ColumnDef.
 * For new code, prefer ColumnDef from @tanstack/react-table directly.
 */
export type LegacyColumnType<T> = {
  dataIndex?: string | string[];
  key?: string | number;
  title?: ReactNode | ((props: Record<string, unknown>) => ReactNode);
  render?: (value: unknown, record: T, index: number) => ReactNode;
  childRender?: (value: unknown, row: T, index: number) => ReactNode;
  sorter?:
    | boolean
    | ((a: T, b: T) => number)
    | { compare?: (a: T, b: T) => number; multiple?: number | false };
  sortOrder?: 'ascend' | 'descend' | null;
  sortRender?:
    | 'default'
    | 'string'
    | ((sortStateApi: SortStateAPI, column: LegacyColumnType<T>) => ReactNode);
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  id?: string | number;
  fixedFirst?: boolean;
  left?: number;
  right?: number;
  ellipsis?: boolean;
  className?: string;
  getCellTooltipProps?: (row: T) => TooltipProps | false;
};

/**
 * @deprecated Compatibility alias. Use LegacyColumnType with legacyColumnConfigAdapter, or ColumnDef for new code.
 */
export type DSColumnType<TData> = LegacyColumnType<TData>;

/**
 * @deprecated Compatibility alias. Use TableProps or VirtualTableProps for new code.
 */
export type DSTableProps<TData, TValue = unknown> = SharedTableProps<
  TData,
  TValue
>;

export type Expandable<TData> = {
  childrenColumnName?: keyof TData;
  expandedRowKeys?: string[];
};

/**
 * Table props shared virtual & non-virtual
 */
export type SharedTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];

  dataSourceTotalCount?: number;

  expandable?: Expandable<TData>;

  onRowClick?: (row: TData, event: MouseEvent<HTMLTableRowElement>) => void;

  /**
   * Returns tooltip props for a given row, or false to disable tooltip.
   * When provided, the entire row is wrapped in a Tooltip component.
   */
  getRowTooltipProps?: (row: TData) => TooltipProps | false;

  texts?: Partial<TableTexts>;
  /** estimated row height (px) used by virtualizer */
  cellHeight?: number;
  /** optional className for styled-components composition */
  className?: string;

  /**
   * renders in table header next to title and counter when there's any selected rows
   * useful for rendering batch action items
   */
  itemsMenu?: ReactNode;
  /**
   * table title - renders in table header
   */
  title?: ReactNode;
  /**
   * display a skeleton loader in place of the table total count
   * useful in a table with infinite loader - when total items count is a separate async reques
   */
  isCounterLoading?: boolean;
  /**
   * set to true to apply white-space: nowrap to column header cells
   */
  disableColumnNamesLineBreak?: boolean;
  /**
   * Enables built-in search. Table manages query state internally, renders SearchInput,
   * and filters `data` for rendering while keeping full data for selection.
   * Takes precedence over `filterData` if both provided.
   *
   * Should be a stable reference (defined outside component or wrapped in useCallback)
   * since it receives the query as a parameter and doesn't need to close over state.
   *
   * @example
   * ```tsx
   * const matchesSearchQuery = (query: string, row: User) =>
   *   row.name.toLowerCase().includes(query.toLowerCase());
   *
   * <Table data={users} matchesSearchQuery={matchesSearchQuery} />
   * ```
   */
  matchesSearchQuery?: (query: string, row: TData) => boolean;
  /**
   * Override SearchInput props when using built-in search (matchesSearchQuery).
   * Ignored when searchComponent is provided.
   *
   * @example
   * ```tsx
   * <Table
   *   data={data}
   *   columns={columns}
   *   matchesSearchQuery={matchFn}
   *   searchProps={{
   *     placeholder: 'Search by name...',
   *     clearTooltip: 'Clear search',
   *   }}
   * />
   * ```
   */
  searchProps?: Partial<SearchInputProps>;
  /**
   * Called when the internal search query changes. Useful for URL sync or analytics.
   * Only fires when using built-in search (matchesSearchQuery).
   *
   * @example
   * ```tsx
   * <Table
   *   data={data}
   *   columns={columns}
   *   matchesSearchQuery={matchFn}
   *   onSearchQueryChange={(query) => {
   *     updateUrlParam('search', query);
   *   }}
   * />
   * ```
   */
  onSearchQueryChange?: (query: string) => void;
  /**
   * Filters `data` internally for rendering while keeping full data for selection.
   * For use with `searchComponent` where the consumer manages query state.
   * Ignored when `matchesSearchQuery` is provided.
   *
   * @example
   * ```tsx
   * const [query, setQuery] = useState('');
   *
   * <Table
   *   data={users}
   *   filterData={query ? (row) => row.name.includes(query) : undefined}
   *   searchComponent={<CustomSearch value={query} onChange={setQuery} />}
   * />
   * ```
   */
  filterData?: (row: TData) => boolean;
  /**
   * Custom search component rendered in the table header.
   * When provided, takes precedence over built-in SearchInput rendering.
   *
   * Can be used with `filterData` for internal filtering, or alone for
   * external/legacy filtering where the consumer pre-filters `data`.
   *
   * @example
   * ```tsx
   * <Table
   *   data={data}
   *   columns={columns}
   *   searchComponent={
   *     <SearchInput
   *       value={query}
   *       onChange={setQuery}
   *       onClear={() => setQuery('')}
   *       placeholder="Search..."
   *       clearTooltip="Clear"
   *       closeOnClickOutside
   *     />
   *   }
   * />
   * ```
   */
  searchComponent?: ReactNode;
  /**
   * Custom filter component rendered in the table header.
   */
  filterComponent?: ReactNode;
  rowKey?: RowKey<TData>;
  /**
   * render table top border
   */
  headerWithBorderTop?: boolean;
  /**
   * render table with rounded corners and shadow
   */
  cardStyles?: boolean;
  /**
   * set to true to prevent rendering column header row with column names
   */
  hideColumnNames?: boolean;
  headerButton?: ReactNode;
  /**
   * selection configuration - see SelectionConfig type
   */
  selectionConfig?: SelectionConfig<TData>;
  selectedRowKeys?: string[];

  renderSelectionTitle?: (
    // TODO - makes no sense to pass the configuration back
    // would make much more sense to pass info about currently selected items ....
    selection?: SelectionConfig<TData>,
    // filters?: Filter[],
  ) => ReactNode;
  /**
   * set to true to render only the table title, without the counter
   */
  hideTitlePart?: boolean;
  renderCustomCounter?: CustomCounterFn;

  onSort?: OnSortFn;
  //   dataSourceTotalCount?: number;
  isLoading?: boolean;
  /**
   * do not render title bar with search & filter component
   */
  hideTitleBar?: boolean;
  /**
   * custom "Empty data" component
   */
  emptyDataComponent?: ReactNode;
};

export type GlobalSelectionProps = {
  /**
   * @callback globalSelectionOnChange - fired when user selects "global all"
   * leave undefined if you do not want global selection option enabled
   * global selection means "across all pages", including items that haven't been loaded yet"
   */
  globalSelectionOnChange?: (selected: boolean) => void;
  /**
   * @prop - current global selection state
   * global selection means "across all pages", including items that haven't been loaded yet
   */
  globalSelected?: boolean;
};

/**
 * Internal BaseTable props
 */
export type BaseTableProps<TData, TValue> = Omit<
  SharedTableProps<TData, TValue>,
  'data' | 'columns' | 'texts' | 'selectionConfig'
> & {
  texts: TableTexts;
  columnSizing: Record<string, number>;
  isColumnSizingReady: boolean;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  handleSearchClear?: () => void;
  hasBuiltInSearch?: boolean;
} & VirtualProps &
  PaginatedProps;

export type ScrollDirection = 'forward' | 'backward' | null;

export type TableInternalProps = {
  paginationProps?: TablePaginationProps;
  hasPagination?: boolean;
  withScroll?: boolean;
  withBodyScroll?: boolean;
  maxHeight?: number;
  tableOuterRef?: MutableRefObject<HTMLDivElement | null>;
  tableBodyScrollRef?: MutableRefObject<HTMLDivElement | null>;
};

export type TableDimensions = {
  titleHeight: number;
  headerHeight: number;
  parentTopOffset: number;
};
export type VirtualTableRef = {
  // virtualizerInstance: Virtualizer<HTMLDivElement, Element>;
  getDimensions: () => TableDimensions;
  // virtualListRef: RefObject<List>;
  // outerListRef: RefObject<HTMLDivElement>;
  // horizontalScrollRef: RefObject<HTMLDivElement>;
  scrollToTop: () => void;
  scrollTo: (top: number) => void;
  scrollToIndex: (
    index: number,
    options?: Parameters<
      Virtualizer<HTMLDivElement, Element>['scrollToIndex']
    >[1],
  ) => void;
  /** Temporarily highlight a row by key. Highlight fades out after duration. */
  highlightRow: (rowKey: string, options?: HighlightOptions) => void;
};

type VirtualProps = {
  /** max-height (px) for the built-in scroll container. Ignored when scrollElementRef is provided. Defaults to 800. */
  maxHeight?: number;
  tableRef?: RefObject<VirtualTableRef>;
  /**
   * uses body virtualisation
   * disables sorting - relies on data being provided pre-sorted
   */
  infiniteScroll?: InfiniteScrollProps;
  stickyHeader?: boolean;
  onItemsRendered?: (props: OnItemsRenderedProps) => void;

  scrollElementRef?: MutableRefObject<HTMLDivElement | null>;

  onScrollToRecordIndex?: (recordIndex: number, callback?: () => void) => void;
  /**
   * render a sticky back-to-top button once the top of the table is scrolled out of view.
   * Available with or without `infiniteScroll`.
   */
  showBackToTopButton?: boolean;
  /**
   * Called when the back-to-top button is clicked.
   * Defaults to scrolling the virtual table to the top when omitted.
   */
  onBackToTop?: () => void;
};

export type OnItemsRenderedProps = {
  // overscanStartIndex: number;
  // overscanStopIndex: number;
  visibleStartIndex: number; // only one actually in use
  // visibleStopIndex: number;
};

type PaginatedProps = {
  /**
   * for tables with infiniteScroll pagination is false
   * for static default pageSize is 10 and can be overwritten with this config
   */
  pagination?: boolean | TablePaginationConfig;
};

export type TablePaginationProps = Omit<TablePaginationConfig, 'pageSize'>;

export type TablePaginationConfig = PaginationProps & {
  pageSize: number;
};

export type LoaderItemPosition = 'TOP' | 'BOTTOM';

export type InfiniteScrollState = {
  hasError: boolean;
  hasMore: boolean;
  isLoading: boolean;
};

export type InfiniteScrollProps = InfiniteScrollState & {
  maxScroll?: number;
  nextPage?: InfiniteScrollState;
  prevPage?: InfiniteScrollState;
  render?: (state: InfiniteScrollState) => ReactElement;
  onRetryButtonClick?: (position: LoaderItemPosition | undefined) => void;
  onScrollEndReach?: () => void;
  onScrollTopReach?: () => void;
};

export type LoaderItemProps = {
  infiniteScroll: InfiniteScrollProps & InfiniteScrollState;
  position?: LoaderItemPosition;
};

export type Selection = {
  key: string;
  label: string;
  onClick: () => void;
};
export type ColumnSortOrder = 'descend' | 'ascend' | null;
export type SingleColumnSort = { columnKey: string; order: ColumnSortOrder };
export type OnSortFn = (
  singleColumnSort: SingleColumnSort,
  sortState: ColumnsSortState,
) => void;

export type ColumnsSortState = {
  [key: string]: {
    sortOrder: ColumnSortOrder;
    multiple: number | false;
  };
};

export type SortStateAPI = {
  columnsSortState: ColumnsSortState;
  getColumnSortOrder: (key: string) => ColumnSortOrder;
  setColumnSortOrder: (key: string, sort: ColumnSortOrder) => void;
  updateColumnsData: (columns: ColumnsSortState) => void;
};

export type SelectionAll = 'SELECTION_ALL';
export type SelectionInvert = 'SELECTION_INVERT';

export type SelectionItem =
  | SelectionAll
  | SelectionInvert
  | Selection
  | null
  | undefined;

export type SelectionConfig<TData> = {
  onChange: (selectedRowKeys: string[], selectedRows: TData[]) => void;
  limit?: number;
  independentSelectionExpandedRows?: boolean;
  checkRowSelectionStatus?: (record: TData) => {
    disabled?: boolean;
    unavailable?: boolean;
  };
  /**
   * Returns tooltip props for a given row's selection checkbox, or false to use the default tooltip.
   * When provided, the returned props are merged with the default selectRowTooltip.
   */
  getSelectionTooltipProps?: (record: TData) => TooltipProps | false;
  hideSelectAll?: boolean;
  fixed?: boolean;
  selections?: SelectionItem[];
} & GlobalSelectionProps;

export type RowSelection = {
  selectedRowKeys: string[];
  /**
   * @param globalSelection
   * @description for paginated tables or tables with infinite loader - allows setting all items (even ones not loaded yet) as selected.
   * This will NOT provide ketys of selected rows (as those are unknown), only a boolean flag that can be used for batch actions on the entire set
   * Adding this prop will render additional items in the selection dropdown, in the table header.
   * Labels for this prop should be provided via `locale` prop
   */
};

export type RowKey<TData> = ((row: TData) => string) | keyof TData;

export type TableTexts = TableHeaderTexts &
  TableBodyTexts &
  TableColumnSorterTexts &
  TableRowSelectionTexts & {
    infiniteScrollBackToTop: ReactNode;
  };

export type TableColumnSorterTexts = {
  columnSortAscend: ReactNode;
  columnSortDescend: ReactNode;
  columnSortZa: ReactNode;
  columnSortAz: ReactNode;
  columnSortClear: ReactNode;
};
export type TableHeaderTexts = TableSelectionTexts & TableLimitTexts & {};
export type TableLimitTexts = {
  totalItems: ReactNode;
  selected: ReactNode;
  selectionLimitWarning: ReactNode;
};

export type TableBodyTexts = TableEmptyBodyTexts & InfiniteLoaderRowTexts & {};
export type TableEmptyBodyTexts = {
  emptyText: ReactNode;
};

export type InfiniteLoaderRowTexts = {
  infiniteScrollLoading: ReactNode;
  infiniteScrollError: ReactNode;
  infiniteScrollRetry: ReactNode;
  infiniteScrollNoMoreData: ReactNode;
};

export type TableRowSelectionTexts = {
  selectRowTooltip: ReactNode;
};
export type TableSelectionTexts = {
  unselectGlobalAll: ReactNode;
  selectGlobalAll: ReactNode;
  selectAll: ReactNode;
  selectAllTooltip: ReactNode;
  unselectAll: ReactNode;
  selectInvert: ReactNode;
  selectionOptionsTooltip: ReactNode;
};

export type CustomCounterArgs = {
  count: number;
  content: ReactNode;
};
export type CustomCounterFn = (props: CustomCounterArgs) => ReactNode;

export type TableBodyProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue>,
  | 'infiniteScroll'
  | 'cellHeight'
  | 'emptyDataComponent'
  | 'onRowClick'
  | 'getRowTooltipProps'
> & {
  texts: TableBodyTexts;
  withBodyScroll?: boolean;
  tableBodyScrollRef?: React.MutableRefObject<HTMLElement | null>;
  maxHeight?: number;
};

export type TableEmptyBodyProps<TData, TValue> = Pick<
  TableBodyProps<TData, TValue>,
  'emptyDataComponent'
> & {
  texts: TableEmptyBodyTexts;
};

export type TableCounterProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue>,
  'renderCustomCounter' | 'isCounterLoading'
> & {
  texts: TableHeaderTexts;
  selectedItemsCount?: number;
  tableTotal: number;
};

export type TableHeaderProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue>,
  | 'itemsMenu'
  | 'title'
  | 'isCounterLoading'
  | 'searchComponent'
  | 'filterComponent'
  | 'rowKey'
  | 'headerButton'
  | 'renderCustomCounter'
  | 'renderSelectionTitle'
  | 'dataSourceTotalCount'
  | 'hideTitlePart'
  | 'isLoading'
  | 'searchQuery'
  | 'setSearchQuery'
  | 'handleSearchClear'
  | 'hasBuiltInSearch'
  | 'searchProps'
> & {
  selectedRows?: number;

  selectionConfig?: SelectionConfig<TData>;
  //   dataSource?: readonly TData[];
  //   dataSourceFull?: readonly TData[];

  texts: TableHeaderTexts;
  //   locale: Locale;
} & Partial<Pick<Expandable<TData>, 'childrenColumnName'>>;

// TBD
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

export type TableSelectionProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue>,
  'rowKey'
> & {
  //   dataSource: readonly TData[];
  //   dataSourceFull?: TData[];
  texts: TableSelectionTexts;
  hasSelectionLimit?: boolean;
} & Partial<Pick<Expandable<TData>, 'childrenColumnName'>>;

export type TableColumnsProps = {
  texts: TableColumnSorterTexts;
  disableColumnNamesLineBreak?: boolean;
};

export type TableColumnSorterProps<TData, TValue> = {
  column: Column<TData, TValue>;
  // sortOrder: false | SortDirection;
  // type: 'string' | 'number' | 'generic';
  // enabled?: boolean;
  texts: TableColumnSorterTexts;
};

export type StickyData = {
  containerPaddingTop: number;
  titleBarHeight: number;
  columnHeadersHeight: number;
  isRevealed: boolean;
};

export type TableHeaderSelectionProps = {
  texts: TableHeaderTexts;
  rowCount?: number;
};
export type TableRowSelectionProps<TData> = {
  row: Row<TData>;
  texts: TableRowSelectionTexts;
};

export type TableRowProps<TData> = {
  row: Row<TData>;
  isSelected?: boolean;
  isExpanded?: boolean;
  isParentExpanded?: boolean;
} & Pick<SharedTableProps<TData, unknown>, 'onRowClick' | 'getRowTooltipProps'>;

export type TableRowVirtualProps<TData> = TableRowProps<TData> & {
  cellHeight: number;
  virtual: VirtualItem;
  isLast?: boolean;
  rowIndex: number;
  texts: InfiniteLoaderRowTexts;
  infiniteScroll?: InfiniteScrollProps;
};
