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
  requireColumnSizing = true,
}: UseTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // manage your own row selection state
  const [sorting, setSorting] = useState<SortingState>([]);

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

  // Keep a ref to latest data without causing dependency updates
  const dataRef = useRef(data);
  useLayoutEffect(() => {
    dataRef.current = data;
  }, [data]);

  const { getRowKey } = useRowKey(rowKey);

  const memoizedGetRowKey = useCallback(
    (row: TData, index: number) => getRowKey(row, index),
    [getRowKey],
  );
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
              sortState[column.id] = {
                sortOrder: column.desc ? 'descend' : 'ascend',
                multiple: index,
              };
            });

            onSort(
              {
                columnKey: singleColumnSort.id,
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
    [onSort],
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
    enabled: requireColumnSizing || hasAnyColumnWidth,
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

  const getSubRows = useCallback(
    (row: TData) => {
      return (row as Record<string, unknown>)[
        childrenColumnName as string
      ] as TData[];
    },
    [childrenColumnName],
  );

  const expandedKeys = expandable?.expandedRowKeys
    ? arrayToTrueMap(expandable?.expandedRowKeys)
    : undefined;

  const table = useReactTable({
    getRowId: memoizedGetRowKey,
    data,
    columns,
    getSubRows: childrenColumnName ? getSubRows : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: expandable ? getExpandedRowModel() : undefined,
    getGroupedRowModel: getGroupedRowModel(),

    onRowSelectionChange: handleSelectionChange,
    onExpandedChange: () => {},
    onSortingChange: handleSortingChange,

    enableRowSelection: (row) => {
      const { unavailable, disabled } =
        selectionConfig?.checkRowSelectionStatus?.(row.original) || {};
      return !!selectionConfig && !unavailable && !disabled;
    },

    manualExpanding: !!expandable?.expandedRowKeys,

    initialState: {
      columnPinning: {
        right: rightPinnedColumns,
        left: leftPinnedColumns,
      },
      ...paginationInitialState,
      expanded: expandedKeys,
    },
    state: {
      columnPinning: {
        right: rightPinnedColumns,
        left: leftPinnedColumns,
      },
      sorting,
      rowSelection,
      expanded: expandedKeys,
    },
  });

  return {
    table,
    paginationProps,
    hasPagination,
    columnSizing,
    isColumnSizingReady,
  };
};
