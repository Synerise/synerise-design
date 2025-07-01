import { type ColumnTitleProps } from 'antd/lib/table/interface';
import React from 'react';

import { type DSColumnType, type OnSortFn } from '../Table.types';
import { CommonRenderer, StringRenderer } from './SortRenderer';
import {
  type SortButtonsRenderer,
  type SortRender,
  TitleWithSort,
} from './TitleWithSort';
import { type SortStateAPI } from './useSortState';

const getSortRenderer = <T,>(
  sortRender: SortRender<T> = 'default',
  onSort?: OnSortFn,
): SortButtonsRenderer<T> => {
  if (typeof sortRender === 'function') {
    return sortRender;
  }

  switch (sortRender) {
    case 'string':
      return (sortStateApi, column): React.ReactElement => (
        <StringRenderer<T>
          sortStateApi={sortStateApi}
          column={column}
          onSort={onSort}
        />
      );
    case 'default':
    default:
      return (sortStateApi, column): React.ReactElement => (
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
          title: (titleProps: ColumnTitleProps<T>): React.ReactElement => (
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
