import { type CompareFn } from 'antd/lib/table/interface';

import { type VirtualColumnType as LegacyColumnType } from '@synerise/ds-table';
import {
  type ColumnSortOrder,
  type ColumnsSortState,
} from '@synerise/ds-table/dist/Table.types';
import {
  type CellContext,
  type ColumnDef,
  type HeaderContext,
  type Row,
  type SortingFnOption,
} from '@tanstack/react-table';

import { EXPANDED_ROW_PROPERTY } from '../Table.const';
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
    // get sort order for column by key
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
    setColumnSortOrder: (key: string, sort: ColumnSortOrder) => {
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
  let sortFn: CompareFn<DataType> | undefined;
  let enableMultiSort: boolean | undefined;
  let multiSortOrder: number | undefined;
  if (typeof sorter === 'function') {
    sortFn = sorter;
  }
  if ('compare' in sorter && sorter.compare) {
    sortFn = sorter.compare;
    enableMultiSort = !!sorter.multiple;
    multiSortOrder = sorter.multiple;
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
          ) || info.getValue()
        );
      },

      meta: {
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        width: column.width,
        fixed: column.fixed,
        sortOrder: column.sortOrder,
        sortRender:
          typeof column.sortRender === 'string' ? column.sortRender : undefined,
        renderCustomSortButton: customSortRender,
        multipleSortingOrder: multiSortOrder,
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
            ) || info.getValue()
          );
        },
      },
      enablePinning: !!column.fixed,
      ...sortingConfig,
      size: calculatePixels(column.width),
      ...column,
      id: `${column.id || column.key || `${column.dataIndex}-${index}`}`,
    };
  });
};
