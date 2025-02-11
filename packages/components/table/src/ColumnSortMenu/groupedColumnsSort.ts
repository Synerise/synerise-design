import { CompareFn } from 'antd/lib/table/interface';
import { GroupType } from '../GroupTable/GroupTable.types';
import { DSColumnType } from '../Table.types';
import { ColumnSortOrder, SortStateAPI } from './useSortState';

export const getColumnsWithActiveSorting = <T extends GroupType<T>>(
  sortStateApi: SortStateAPI,
  columns?: DSColumnType<T>[]
): DSColumnType<T>[] =>
  !columns
    ? []
    : columns.filter(({ key, sorter }) => {
        if (sortStateApi.getColumnSortOrder(String(key)) && typeof sorter === 'function') {
          return true;
        }

        return false;
      });

export const sortRows = <T>(sortOrder: ColumnSortOrder, compareFn: CompareFn<T>, rows: T[]): T[] => {
  if (sortOrder === 'ascend') {
    return [...rows].sort(compareFn);
  }

  if (sortOrder === 'descend') {
    return [...rows].sort(compareFn).reverse();
  }

  return rows;
};

export const sortDataSourceRows = <T extends GroupType<T>>(
  sortStateApi: SortStateAPI,
  sortingColumns?: DSColumnType<T>[],
  dataSource?: readonly T[]
): readonly T[] => {
  if (!dataSource) {
    return [];
  }

  if (!sortingColumns?.length) {
    return dataSource;
  }

  return dataSource?.map((dataItem: T): T => {
    const sortedRows = sortingColumns.reduce<T[]>(
      (currRows, { sorter, key }): T[] => {
        const sortOrder = sortStateApi.getColumnSortOrder(String(key));

        if (!sortOrder || typeof sorter !== 'function') {
          return currRows;
        }

        return sortRows(sortOrder, sorter, currRows);
      },
      [...dataItem.rows]
    );

    return {
      ...dataItem,
      rows: sortedRows,
    };
  });
};
