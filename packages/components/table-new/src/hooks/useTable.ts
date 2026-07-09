import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  type PaginationState,
  type Table as ReactTableInstance,
  type RowSelectionState,
  type SortingState,
  type Updater,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { EMPTY_SORT_STATE } from '../Table.const';
import {
  type ColumnsSortState,
  type SharedTableProps,
  type TableProps,
  type VirtualTableProps,
} from '../Table.types';
import { arrayToTrueMap } from '../utils/arrayToTrueMap';
import { compareKeys } from '../utils/compareKeys';
import { getChildrenColumnName } from '../utils/getChildrenColumnName';
import { getPaginationConfig } from '../utils/getPaginationConfig';
import { useColumnSizing } from './useColumnSizing';
import { useRowKey } from './useRowKey';
import { useTableSearch } from './useTableSearch';

type UseTableProps<TData, TValue> = Pick<
  VirtualTableProps<TData, TValue>,
  'infiniteScroll'
> &
  Pick<TableProps<TData, TValue>, 'pagination'> &
  Pick<
    SharedTableProps<TData, TValue>,
    | 'data'
    | 'selectionConfig'
    | 'columns'
    | 'rowKey'
    | 'onSort'
    | 'expandable'
    | 'selectedRowKeys'
    | 'matchesSearchQuery'
    | 'filterData'
    | 'onSearchQueryChange'
  > & {
    wrapperRef: MutableRefObject<HTMLDivElement | null>;
    requireColumnSizing?: boolean;
  };
export const useTable = <TData, TValue>({
  data,
  selectionConfig,
  columns,
  rowKey,
  wrapperRef,
  infiniteScroll,
  pagination,
  onSort,
  expandable,
  selectedRowKeys,
  matchesSearchQuery,
  filterData,
  onSearchQueryChange,
  requireColumnSizing = true,
}: UseTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // manage your own row selection state
  const [sorting, setSorting] = useState<SortingState>([]);

  // Late-bound handle to the TanStack instance: the pagination-change handler (defined before the
  // table exists) reaches the instance through this ref to drive internal state in client mode.
  const tableInstanceRef = useRef<ReactTableInstance<TData> | null>(null);

  const childrenColumnName = getChildrenColumnName(
    expandable?.childrenColumnName,
  );

  useEffect(() => {
    const localSelectionKeys = Object.keys(rowSelection);

    if (selectedRowKeys && !compareKeys(selectedRowKeys, localSelectionKeys)) {
      setRowSelection(arrayToTrueMap(selectedRowKeys));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowKeys]);

  // Keep a ref to full (unfiltered) data for selection onChange
  const dataRef = useRef(data);
  useLayoutEffect(() => {
    dataRef.current = data;
  }, [data]);

  const {
    displayData,
    searchQuery,
    setSearchQuery,
    handleClear: handleSearchClear,
    hasBuiltInSearch,
    hasNoSearchResults,
  } = useTableSearch({
    data,
    matchesSearchQuery,
    filterData,
    onSearchQueryChange,
  });

  const { getRowKey } = useRowKey(rowKey);

  const memoizedGetRowKey = useCallback(
    (row: TData, index: number) => getRowKey(row, index),
    [getRowKey],
  );
  const columnKeyById = useMemo(() => {
    const map = new Map<string, string>();
    columns.forEach((column) => {
      if (column.id) {
        map.set(column.id, column.meta?.columnKey ?? column.id);
      }
    });
    return map;
  }, [columns]);

  const handleSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      setSorting((oldSorting) => {
        const newSorting =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(oldSorting)
            : updaterOrValue;

        if (onSort) {
          if (newSorting.length) {
            const singleColumnSort = newSorting[0];
            const sortState: ColumnsSortState = {};

            newSorting.forEach((column, index) => {
              const key = columnKeyById.get(column.id) ?? column.id;
              sortState[key] = {
                sortOrder: column.desc ? 'descend' : 'ascend',
                multiple: index,
              };
            });

            onSort(
              {
                columnKey:
                  columnKeyById.get(singleColumnSort.id) ?? singleColumnSort.id,
                order: singleColumnSort.desc ? 'descend' : 'ascend',
              },
              sortState,
            );
          } else {
            onSort(...EMPTY_SORT_STATE);
          }
        }

        return newSorting;
      });
    },
    [onSort, columnKeyById],
  );

  const handleSelectionChange = useCallback(
    (updaterOrValue: Updater<RowSelectionState>) => {
      setRowSelection((oldSelection) => {
        const newSelection =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(oldSelection)
            : updaterOrValue;

        if (selectionConfig?.onChange) {
          const ids = Object.keys(newSelection);
          const items = dataRef.current.filter((item, index) =>
            ids.includes(memoizedGetRowKey(item, index)),
          );
          selectionConfig?.onChange(ids, items);
        }

        return newSelection;
      });
    },
    [selectionConfig, memoizedGetRowKey],
  );

  const columnWidths = useMemo(
    () =>
      columns.map((column) => ({
        id: column.id!,
        minWidth:
          column.minSize ??
          (column.meta?.minWidth
            ? parseInt(`${column.meta?.minWidth}`)
            : undefined),
        width:
          column.size ??
          (column.meta?.width ? parseInt(`${column.meta?.width}`) : undefined),
        maxWidth:
          column.maxSize ??
          (column.meta?.maxWidth
            ? parseInt(`${column.meta?.maxWidth}`)
            : undefined),
      })),
    [columns],
  );

  const hasAnyColumnWidth = columnWidths.some(
    (col) =>
      col.width !== undefined ||
      col.minWidth !== undefined ||
      col.maxWidth !== undefined,
  );

  const { columnSizing, isColumnSizingReady } = useColumnSizing({
    columnWidths,
    wrapperRef,
    enabled:
      columnWidths.length > 0 && (requireColumnSizing || hasAnyColumnWidth),
  });

  const { rightPinnedColumns, leftPinnedColumns } = useMemo(() => {
    const right: string[] = [];
    const left: string[] = [];
    columns.forEach((column) => {
      if (column.meta?.fixed === 'right') {
        right.push(column.id!);
      }
      if (column.meta?.fixed === 'left') {
        left.push(column.id!);
      }
    });
    return {
      rightPinnedColumns: right,
      leftPinnedColumns: left,
    };
  }, [columns]);

  const hasPagination = !infiniteScroll && pagination !== false;
  const { initialState: paginationInitialState, ...paginationProps } =
    getPaginationConfig(!infiniteScroll && pagination);

  // Server-side (manual) pagination — inferred, no extra prop. A consumer doing server-side paging
  // declares a `total` and an `onChange` handler (to refetch); we then page against the server
  // `total` (rowCount) and forward page/size changes instead of slicing local rows. `onChange` is a
  // STABLE signal: relying on `total > data.length` alone wrongly flipped to client mode whenever a
  // page happened to hold every row (e.g. pageSize >= total, or a filter narrowing the result),
  // which reset the page-size control and silently dropped server paging. We keep the
  // `total > data.length` branch too, so a consumer that declares only a server `total` (no handler)
  // still pages manually. Client-side use (full data, no `total`/`onChange`) keeps local slicing.
  const manualPaginationConfig =
    hasPagination &&
    typeof pagination === 'object' &&
    pagination.total !== undefined &&
    (pagination.total > data.length || pagination.onChange !== undefined)
      ? pagination
      : undefined;
  const isManualPagination = !!manualPaginationConfig;

  // Row count the consumer declared via `pagination.total` (server total), if any. Used as the
  // header-counter source below; a consumer `dataSourceTotalCount` prop still supersedes it.
  const paginationTotal =
    typeof pagination === 'object' ? pagination.total : undefined;

  // Manual (server-side) pagination keeps a LOCAL, responsive copy of the page state. Fully
  // controlling it from the consumer made the size-changer revert/freeze on rapid consecutive
  // changes: the consumer's `pageSize` only updates after an async refetch, and the underlying
  // pagination can fire size + a clamping page change in one tick — the second forward then
  // carried the stale size. The local copy updates synchronously (the ref keeps it correct across
  // both calls in a tick), forwards to the consumer, and re-syncs when the consumer drives it.
  const consumerPageIndex = (manualPaginationConfig?.current ?? 1) - 1;
  const consumerPageSize = manualPaginationConfig?.pageSize ?? 10;
  const [manualPagination, setManualPagination] = useState<PaginationState>({
    pageIndex: consumerPageIndex,
    pageSize: consumerPageSize,
  });
  const manualPaginationRef = useRef(manualPagination);
  manualPaginationRef.current = manualPagination;

  // Current mode/config read at call time by the stable handler below (avoids re-wiring TanStack's
  // onPaginationChange every render, which would otherwise be merged-forward and go stale).
  const manualPaginationConfigRef = useRef(manualPaginationConfig);
  manualPaginationConfigRef.current = manualPaginationConfig;

  useEffect(() => {
    if (!isManualPagination) {
      return;
    }
    setManualPagination({
      pageIndex: consumerPageIndex,
      pageSize: consumerPageSize,
    });
  }, [consumerPageIndex, consumerPageSize, isManualPagination]);

  // One handler for BOTH modes, wired to TanStack unconditionally (see options below) and stable.
  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      const config = manualPaginationConfigRef.current;
      if (config) {
        // Manual (server) mode: drive the responsive local copy and forward to the consumer.
        const prev = manualPaginationRef.current;
        const next = typeof updater === 'function' ? updater(prev) : updater;
        // Update the responsive copy synchronously so a follow-up change in the same tick (size +
        // page can fire together) computes from the new value rather than reverting to the old size.
        manualPaginationRef.current = next;
        setManualPagination(next);
        if (next.pageSize !== prev.pageSize) {
          config.onShowSizeChange?.(next.pageIndex + 1, next.pageSize);
        }
        config.onChange?.(next.pageIndex + 1, next.pageSize);
        return;
      }
      // Client mode: mirror TanStack's default state-updater so its internal slicing still advances.
      // We provide it explicitly (rather than letting the default run) because options are merged
      // forward — once manual mode set onPaginationChange, omitting it would keep our handler wired.
      tableInstanceRef.current?.setState((old) => ({
        ...old,
        pagination:
          typeof updater === 'function' ? updater(old.pagination) : updater,
      }));
    },
    [],
  );

  const getSubRows = useCallback(
    (row: TData) => {
      return (row as Record<string, unknown>)[
        childrenColumnName as string
      ] as TData[];
    },
    [childrenColumnName],
  );

  const isExpansionControlled = !!expandable?.expandedRowKeys;
  const expandedKeys = expandable?.expandedRowKeys
    ? arrayToTrueMap(expandable?.expandedRowKeys)
    : undefined;

  const table = useReactTable({
    // Override TanStack's built-in sizing defaults (size: 150, minSize: 20,
    // maxSize: Number.MAX_SAFE_INTEGER) so column.columnDef.size/minSize/maxSize
    // stay undefined when the consumer did not set them. BaseTable's
    // unified-mode <colgroup> uses these to detect user-set widths;
    // column.getSize() still falls back to TanStack's internal defaults.
    defaultColumn: {
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
    getRowId: memoizedGetRowKey,
    data: displayData,
    columns,
    getSubRows: childrenColumnName ? getSubRows : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
    getGroupedRowModel: getGroupedRowModel(),

    // Pagination mode is inferred per render and CAN flip (e.g. a filter narrows the result to a
    // single page, or to zero rows). These keys MUST be passed on every render, never conditionally
    // spread: TanStack merges options forward (setOptions does `{...prev, ...next}`), so omitting a
    // key in client mode retains the stale manual-mode value — keeping `rowCount` at the old server
    // total and `manualPagination` on. That stale rowCount then drives both `table.getRowCount()`
    // (the pagination control's total) and BaseTable's `hasResults` gate, so the footer shows a
    // phantom page count over a now-empty or single-page result. `onPaginationChange` is a single
    // stable handler that branches on the live mode internally.
    manualPagination: isManualPagination,
    rowCount: manualPaginationConfig ? manualPaginationConfig.total : undefined,
    onPaginationChange: handlePaginationChange,

    onRowSelectionChange: handleSelectionChange,
    // Swallow TanStack's expansion writes only when the consumer is the source
    // of truth (controlled via `expandable.expandedRowKeys`). For uncontrolled
    // use (e.g. `expandable.expandRowByClick` without `expandedRowKeys`) we
    // omit this so `row.toggleExpanded()` can update the internal state.
    ...(isExpansionControlled ? { onExpandedChange: () => {} } : {}),
    onSortingChange: handleSortingChange,

    enableRowSelection: (row) => {
      const { unavailable, disabled } =
        selectionConfig?.checkRowSelectionStatus?.(row.original) || {};
      return !!selectionConfig && !unavailable && !disabled;
    },

    manualExpanding: isExpansionControlled,

    initialState: {
      columnPinning: {
        right: rightPinnedColumns,
        left: leftPinnedColumns,
      },
      ...paginationInitialState,
      ...(isExpansionControlled ? { expanded: expandedKeys } : {}),
    },
    state: {
      columnPinning: {
        right: rightPinnedColumns,
        left: leftPinnedColumns,
      },
      sorting,
      rowSelection,
      // Only project expanded into TanStack state when controlled — otherwise
      // TanStack keeps and manages its own internal state.
      ...(isExpansionControlled ? { expanded: expandedKeys } : {}),
      // Server-side paging: driven by the local responsive copy (seeded from / synced to the
      // consumer's current/pageSize), so the controls react immediately to user interaction.
      ...(isManualPagination ? { pagination: manualPagination } : {}),
    },
  });

  // Expose the instance to the (earlier-defined) pagination handler so it can drive internal
  // client-mode state. Assigned during render — the handler only dereferences it on user events.
  tableInstanceRef.current = table;

  // Reset to the first page whenever the built-in search query changes — filtering can otherwise
  // leave the user stranded on a now-out-of-range (empty) page. The ref-compare skips the initial
  // mount, so a table that opens on a specific page (e.g. server-side `current`) is not yanked back.
  const previousSearchQuery = useRef(searchQuery);
  useEffect(() => {
    if (previousSearchQuery.current === searchQuery) {
      return;
    }
    previousSearchQuery.current = searchQuery;
    table.setPageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Whether an internal (client-side) search/filter is currently narrowing the rows: built-in
  // `matchesSearchQuery` with an active query, or a `filterData` predicate. External/server search
  // (pre-filtered `data`, no predicate) is excluded — there `displayData === data`.
  const isInternallyFiltered =
    (!!matchesSearchQuery && !!searchQuery) || !!filterData;

  return {
    table,
    paginationProps,
    hasPagination,
    columnSizing,
    isColumnSizingReady,
    searchQuery,
    setSearchQuery,
    handleSearchClear,
    hasBuiltInSearch,
    hasNoSearchResults,
    // Header-counter source: when an internal search/filter is narrowing the rows, the filtered
    // count (so the counter shows what's actually matched — e.g. 0 for a no-match query — not the
    // full dataSource). Otherwise prefer the declared server total, falling back to the rows we
    // hold. (A consumer `dataSourceTotalCount` prop still wins — it is spread over this in Table.tsx.)
    totalDataCount: isInternallyFiltered
      ? displayData.length
      : (paginationTotal ?? data.length),
  };
};
