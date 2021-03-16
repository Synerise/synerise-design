import * as React from 'react';
import { DSColumnType } from '../Table.types';
import { SortStateAPI } from './useSortState';
import { TitleWithSort, SortRender, SortButtonsRenderer } from './TitleWithSort';
import * as defaultRenderers from './defaultSortRenderers';

const getSortRenderer = <T extends unknown>(sortRender: SortRender<T> = 'default'): SortButtonsRenderer<T> => {
  if (typeof sortRender === 'function') {
    return sortRender;
  }

  switch (sortRender) {
    case 'string':
      return defaultRenderers.string;
    case 'default':
    default:
      return defaultRenderers.common;
  }
};

export const columnWithSortButtons = (sortStateApi: SortStateAPI) => <T extends unknown>(
  column: DSColumnType<T>
): DSColumnType<T> =>
  column.sorter
    ? {
        ...column,
        sortOrder: column.key ? sortStateApi.getColumnSortOrder(String(column.key)) : null,
        title: (
          <TitleWithSort column={column} sortRender={getSortRenderer<T>(column.sortRender)(sortStateApi, column)} />
        ),
      }
    : column;

export default { columnWithSortButtons };
