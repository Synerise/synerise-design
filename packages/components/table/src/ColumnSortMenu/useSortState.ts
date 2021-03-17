import * as React from 'react';
import { groupBy } from 'lodash';
import { DSColumnType } from '../Table.types';

export type ColumnSortOrder = 'descend' | 'ascend' | null;

interface ColumnsSortState {
  [key: string]: ColumnSortOrder;
}

export interface SortStateAPI {
  columnsSortState: ColumnsSortState;
  getColumnSortOrder: (key: string) => ColumnSortOrder;
  setColumnSortOrder: (key: string, sort: ColumnSortOrder) => void;
}

export const toSortOrder = (value: string | null | undefined): ColumnSortOrder => {
  if (value === 'descend' || value === 'ascend') {
    return value;
  }

  return null;
};

export const columnsToSortState = <T extends unknown>(columns: DSColumnType<T>[] = []): ColumnsSortState => {
  if (process.env.NODE_ENV === 'development') {
    const columnsKeys = columns.map(c => c.key);
    const uniqueColumnKeys = Array.from(new Set(columnsKeys));

    if (columnsKeys.length !== uniqueColumnKeys.length) {
      // eslint-disable-next-line no-console
      console.warn(
        'DefaultTable: column keys are not unique what may affect sorting. Columns grouped by key:',
        groupBy(columns, 'key')
      );
    }
  }

  return columns.reduce<ColumnsSortState>(
    (state, column) => ({
      ...state,
      [String(column.key)]: toSortOrder(column.defaultSortOrder),
    }),
    {}
  );
};

interface ColumnSortAction {
  type: string;
  payload: {
    key: string;
    sortOrder: ColumnSortOrder;
  };
}

const setSingleOrder: React.Reducer<ColumnsSortState, ColumnSortAction> = (state, action) => {
  const { payload } = action;
  const clearedSortState = Object.keys(state).reduce<ColumnsSortState>(
    (newState, currKey) => ({ ...newState, [currKey]: null }),
    {}
  );

  return {
    ...clearedSortState,
    [payload.key]: payload.sortOrder,
  };
};

// const setMultipleOrder: React.Reducer<ColumnsSortState, ColumnSortAction> = (state, action) => {
const setMultipleOrder: React.Reducer<ColumnsSortState, ColumnSortAction> = state => {
  // TODO: implement sorting with "multiple" column prop
  return state;
};

const sortReducer: React.Reducer<ColumnsSortState, ColumnSortAction> = (state, action) => {
  const { type } = action;

  switch (type) {
    case 'setSingleOrder':
      return setSingleOrder(state, action);
    case 'setMultipleOrder':
      return setMultipleOrder(state, action);
    default:
      return state;
  }
};

export const useSortState = (initialState: ColumnsSortState = {}): SortStateAPI => {
  const [columnsSortState, dispatch] = React.useReducer(sortReducer, initialState);

  const getColumnSortOrder: SortStateAPI['getColumnSortOrder'] = key => columnsSortState[key];

  const setColumnSortOrder: SortStateAPI['setColumnSortOrder'] = (key, sortOrder) => {
    dispatch({
      type: 'setSingleOrder',
      payload: {
        key,
        sortOrder,
      },
    });
  };

  return {
    columnsSortState,
    getColumnSortOrder,
    setColumnSortOrder,
  };
};

export default useSortState;
