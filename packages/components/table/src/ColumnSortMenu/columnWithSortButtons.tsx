import React from 'react';
import { ColumnTitleProps } from 'antd/lib/table/interface';
import { DSColumnType, OnSortFn } from '../Table.types';
import { SortStateAPI } from './useSortState';
import { TitleWithSort, SortRender, SortButtonsRenderer } from './TitleWithSort';
import { CommonRenderer, StringRenderer } from './SortRenderer';

const getSortRenderer = <T extends unknown>(
  sortRender: SortRender<T> = 'default',
  onSort?: OnSortFn
): SortButtonsRenderer<T> => {
  if (typeof sortRender === 'function') {
    return sortRender;
  }

  switch (sortRender) {
    case 'string':
      return (sortStateApi, column): React.ReactElement => (
        <StringRenderer<T> sortStateApi={sortStateApi} column={column} onSort={onSort} />
      );
    case 'default':
    default:
      return (sortStateApi, column): React.ReactElement => (
        <CommonRenderer<T> sortStateApi={sortStateApi} column={column} onSort={onSort} />
      );
  }
};

export const columnWithSortButtons =
  (sortStateApi: SortStateAPI, onSort?: OnSortFn) =>
  <T extends unknown>(column: DSColumnType<T>): DSColumnType<T> => {
    const sortRenderer = getSortRenderer<T>(column.sortRender, onSort);

    return column.sorter
      ? {
          ...column,
          sortOrder: column.key ? sortStateApi.getColumnSortOrder(String(column.key)) : null,
          title: (titleProps: ColumnTitleProps<T>): React.ReactElement => (
            <TitleWithSort column={column} sortRender={sortRenderer(sortStateApi, column)} titleProps={titleProps} />
          ),
        }
      : column;
  };

export default { columnWithSortButtons };
