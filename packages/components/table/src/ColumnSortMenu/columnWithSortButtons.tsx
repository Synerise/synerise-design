import * as React from 'react';
import { DSColumnType } from '../Table.types';
import { SortStateAPI } from './useSortState';
import { TitleWithSort, SortRender, SortButtonsRenderer } from './TitleWithSort';
import { CommonRenderer, StringRenderer } from './SortRenderer';

const getSortRenderer = <T extends unknown>(sortRender: SortRender<T> = 'default'): SortButtonsRenderer<T> => {
  if (typeof sortRender === 'function') {
    return sortRender;
  }

  switch (sortRender) {
    case 'string':
      return (sortStateApi, column): React.ReactElement => (
        <StringRenderer<T> sortStateApi={sortStateApi} column={column} />
      );
    case 'default':
    default:
      return (sortStateApi, column): React.ReactElement => (
        <CommonRenderer<T> sortStateApi={sortStateApi} column={column} />
      );
  }
};

export const columnWithSortButtons = (sortStateApi: SortStateAPI) => <T extends unknown>(
  column: DSColumnType<T>
): DSColumnType<T> => {
  const sortRenderer = getSortRenderer<T>(column.sortRender);

  return column.sorter
    ? {
        ...column,
        sortOrder: column.key ? sortStateApi.getColumnSortOrder(String(column.key)) : null,
        title: <TitleWithSort column={column} sortRender={sortRenderer(sortStateApi, column)} />,
      }
    : column;
};

export default { columnWithSortButtons };
