import * as React from 'react';
import { groupBy } from 'lodash';
import { DSColumnType } from '../Table.types';

export type ColumnSortOrder = 'descend' | 'ascend' | null;

interface ColumnsSortState {
  [key: string]: {
    sortOrder: ColumnSortOrder;
    multiple: number | false;
  };
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
    const columnsKeys = columns.map((c, i) => {
      if (c.sorter && !c.key) {
        // eslint-disable-next-line no-console
        console.warn(
          `DefaultTable: column ${
            typeof c.title === 'string' ? c.title : i + 1
          } has no "key" prop set which is required to use sorter`
        );
      }

      return c.key;
    });
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
    (state, column) =>
      typeof column.sorter === 'object'
        ? {
            ...state,
            [String(column.key)]: {
              sortOrder: toSortOrder(column.defaultSortOrder),
              multiple: column.sorter.multiple,
            },
          }
        : {
            ...state,
            [String(column.key)]: {
              sortOrder: toSortOrder(column.defaultSortOrder),
              multiple: false,
            },
          },
    {}
  );
};

type ColumnSortAction = {
  type: 'setSingleOrder' | 'setMultipleOrder';
  payload: {
    key: string;
    sortOrder: ColumnSortOrder;
  };
};

const setSingleOrder: React.Reducer<ColumnsSortState, ColumnSortAction> = (state, action) => {
  const { payload } = action;
  const clearedSortState = Object.entries(state).reduce<ColumnsSortState>(
    (newState, [currKey, currValue]) => ({
      ...newState,
      [currKey]: {
        ...currValue,
        sortOrder: null,
      },
    }),
    {}
  );

  return {
    ...clearedSortState,
    [payload.key]: {
      ...state[payload.key],
      sortOrder: payload.sortOrder,
    },
  };
};

const setMultipleOrder: React.Reducer<ColumnsSortState, ColumnSortAction> = (state, action) => {
  const { payload } = action;
  const clearedSortState = Object.entries(state).reduce<ColumnsSortState>(
    (newState, [currKey, currValue]) =>
      currValue.multiple === false
        ? {
            ...newState,
            [currKey]: {
              ...currValue,
              sortOrder: null,
            },
          }
        : {
            ...newState,
            [currKey]: state[currKey],
          },
    {}
  );

  return {
    ...clearedSortState,
    [payload.key]: {
      ...state[payload.key],
      sortOrder: payload.sortOrder,
    },
  };
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

  const getColumnSortOrder: SortStateAPI['getColumnSortOrder'] = key => columnsSortState[key]?.sortOrder;

  const setColumnSortOrder: SortStateAPI['setColumnSortOrder'] = (key, sortOrder) => {
    if (columnsSortState[key]?.sortOrder !== sortOrder && columnsSortState[key]?.multiple === false) {
      dispatch({
        type: 'setSingleOrder',
        payload: {
          key,
          sortOrder,
        },
      });
    }

    if (columnsSortState[key]?.sortOrder !== sortOrder && columnsSortState[key]?.multiple) {
      dispatch({
        type: 'setMultipleOrder',
        payload: {
          key,
          sortOrder,
        },
      });
    }
  };

  return {
    columnsSortState,
    getColumnSortOrder,
    setColumnSortOrder,
  };
};

export default useSortState;
