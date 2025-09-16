import { type ColumnTitleProps } from 'antd/lib/table/interface';
import React from 'react';

import {
  type DSColumnType,
  type OnSortFn,
  type SortButtonsRenderer,
  type SortRender,
  type SortStateAPI,
} from '../Table.types';
import { CommonRenderer, StringRenderer } from './SortRenderer';
import { TitleWithSort } from './TitleWithSort';
import './useSortState';

const getSortRenderer = <T,>(
  sortRender: SortRender<T> = 'default',
  onSort?: OnSortFn,
): SortButtonsRenderer<T> => {
  if (typeof sortRender === 'function') {
    return sortRender;
  }

  switch (sortRender) {
    case 'string':
      return (sortStateApi, column) => (
        <StringRenderer<T>
          sortStateApi={sortStateApi}
          column={column}
          onSort={onSort}
        />
      );
    case 'default':
    default:
      return (sortStateApi, column) => (
        <CommonRenderer<T>
          sortStateApi={sortStateApi}
          column={column}
          onSort={onSort}
        />
      );
  }
};

export const columnWithSortButtons =
  (sortStateApi: SortStateAPI, onSort?: OnSortFn) =>
  <T,>(column: DSColumnType<T>): DSColumnType<T> => {
    const sortRenderer = getSortRenderer<T>(column.sortRender, onSort);

    return column.sorter
      ? {
          ...column,
          sortOrder: column.key
            ? sortStateApi.getColumnSortOrder(String(column.key))
            : null,
          title: (titleProps: ColumnTitleProps<T>) => (
            <TitleWithSort
              column={column}
              sortRender={sortRenderer(sortStateApi, column)}
              titleProps={titleProps}
            />
          ),
        }
      : column;
  };

export default { columnWithSortButtons };
