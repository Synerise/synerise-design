import {
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type Row,
  type SortingFnOption,
} from '@tanstack/react-table';

import { EXPANDED_ROW_PROPERTY } from '../Table.const';
import { type ColumnsSortState, type LegacyColumnType } from '../Table.types';
import { calculatePixels } from './calculatePixels';

const getSortStateApiAdapter = <A, B>(headerContext: HeaderContext<A, B>) => {
  const sortState = headerContext.table.getState().sorting;
  const legacyColumnSortState: ColumnsSortState = {};
  sortState.forEach((column, index) => {
    legacyColumnSortState[column.id] = {
      sortOrder: column.desc ? 'descend' : 'ascend',
      multiple: sortState.length > 1 ? index : false,
    };
  });
  return {
    columnsSortState: legacyColumnSortState,
    getColumnSortOrder: (key: string) => {
      switch (headerContext.table.getColumn(key)?.getIsSorted()) {
        case 'asc':
          return 'ascend';
        case 'desc':
          return 'descend';
        default:
          return null;
      }
    },
    setColumnSortOrder: (key: string, sort: 'descend' | 'ascend' | null) => {
      const allowMultiple =
        headerContext.table.getColumn(key)?.columnDef.meta?.enableMultiSort;
      headerContext.table
        .getColumn(key)
        ?.toggleSorting(sort === 'descend', allowMultiple);
    },
    updateColumnsData: () => {},
  };
};
const DEFAULT_SORT_FN = 'text';

const getSortingConfig = <DataType>(
  sorter: LegacyColumnType<DataType>['sorter'],
): {
  sortingFn?: SortingFnOption<DataType>;
  enableMultiSort?: boolean;
  enableSorting?: boolean;
  multiSortOrder?: number;
} => {
  if (!sorter) {
    return { enableSorting: false };
  }

  if (sorter === true) {
    return {
      sortingFn: DEFAULT_SORT_FN,
    };
  }
  let sortFn: ((a: DataType, b: DataType) => number) | undefined;
  let enableMultiSort: boolean | undefined;
  let multiSortOrder: number | undefined;
  if (typeof sorter === 'function') {
    sortFn = sorter;
  }
  if (typeof sorter === 'object' && 'compare' in sorter && sorter.compare) {
    sortFn = sorter.compare;
    enableMultiSort = !!sorter.multiple;
    multiSortOrder =
      typeof sorter.multiple === 'number' ? sorter.multiple : undefined;
  }
  return {
    sortingFn: sortFn
      ? (rowA: Row<DataType>, rowB: Row<DataType>, _columnId: string) => {
          return sortFn(rowA.original, rowB.original);
        }
      : DEFAULT_SORT_FN,
    enableMultiSort,
    multiSortOrder,
  };
};

export const legacyColumnConfigAdapter = <DataType, DataValue>(
  columns: Array<LegacyColumnType<DataType>>,
): ColumnDef<DataType, DataValue>[] => {
  return columns.map((column, index) => {
    const customSortRender =
      column.sortRender && typeof column.sortRender !== 'string'
        ? (headerContext: HeaderContext<DataType, DataValue>) => {
            const legacySortStateApi = getSortStateApiAdapter(headerContext);
            return (
              column.sortRender &&
              typeof column.sortRender !== 'string' &&
              column.sortRender(legacySortStateApi, column)
            );
          }
        : undefined;
    const { multiSortOrder, ...sortingConfig } = getSortingConfig(
      column.sorter,
    );
    return {
      accessorKey: `${column.dataIndex}`,
      header: () => {
        return typeof column.title === 'function'
          ? column.title({})
          : column.title;
      },
      cell: (info) => {
        return (
          column.render?.(
            info.getValue(),
            info.row.original,
            info.column.getIndex(),
          ) ?? info.getValue()
        );
      },

      meta: {
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        width: column.width,
        fixed: column.fixed,
        align: column.align,
        sortOrder: column.sortOrder,
        sortRender:
          typeof column.sortRender === 'string'
            ? (column.sortRender as 'string' | 'default')
            : undefined,
        renderCustomSortButton: customSortRender,
        multipleSortingOrder: multiSortOrder,
        getCellTooltipProps: column.getCellTooltipProps,
        dataIndex: column.dataIndex as string | undefined,
        title: typeof column.title === 'string' ? column.title : undefined,
        columnKey: `${
          column.id ??
          column.key ??
          (Array.isArray(column.dataIndex)
            ? column.dataIndex.join('.')
            : column.dataIndex)
        }`,
        childCell: (info: CellContext<DataType, DataValue>) => {
          if (column.childRender) {
            const rowData = {
              ...info.row.original,
              [EXPANDED_ROW_PROPERTY]: true,
              index: info.row.index,
            };
            return column.childRender(
              info.getValue(),
              rowData,
              info.column.getIndex(),
            );
          }
          return (
            column.render?.(
              info.getValue(),
              info.row.original,
              info.column.getIndex(),
            ) ?? info.getValue()
          );
        },
      },
      enablePinning: !!column.fixed,
      ...sortingConfig,
      size: calculatePixels(column.width),
      ...column,
      id: `${column.id || `${column.key ?? column.dataIndex}-${index}`}`,
    };
  });
};
