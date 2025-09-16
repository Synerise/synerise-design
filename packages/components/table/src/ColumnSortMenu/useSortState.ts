import { groupBy, merge } from 'lodash';
import React from 'react';

import {
  type ColumnSortOrder,
  type ColumnsSortState,
  type DSColumnType,
  type OnSortFn,
  type SortStateAPI,
} from '../Table.types';

export const toSortOrder = (
  value: string | null | undefined,
): ColumnSortOrder => {
  if (value === 'descend' || value === 'ascend') {
    return value;
  }

  return null;
};

export const columnsToSortState = <T>(
  columns: DSColumnType<T>[] = [],
): ColumnsSortState => {
  if (process.env.NODE_ENV === 'development') {
    const columnsKeys = columns.map((c, i) => {
      if (c.sorter && !c.key) {
        // eslint-disable-next-line no-console
        console.warn(
          `DefaultTable: column ${
            typeof c.title === 'string' ? c.title : i + 1
          } has no "key" prop set which is required to use sorter`,
        );
      }

      return c.key;
    });
    const uniqueColumnKeys = Array.from(new Set(columnsKeys));

    if (columnsKeys.length !== uniqueColumnKeys.length) {
      // eslint-disable-next-line no-console
      console.warn(
        'DefaultTable: column keys are not unique what may affect sorting. Columns grouped by key:',
        groupBy(columns, 'key'),
      );
    }
  }

  return columns.reduce<ColumnsSortState>(
    (state, column) =>
      typeof column.sorter === 'object'
        ? {
            ...state,
            [String(column.key)]: {
              sortOrder:
                toSortOrder(column.sortOrder) ||
                toSortOrder(column.defaultSortOrder),
              multiple: column.sorter.multiple || false,
            },
          }
        : {
            ...state,
            [String(column.key)]: {
              sortOrder:
                toSortOrder(column.sortOrder) ||
                toSortOrder(column.defaultSortOrder),
              multiple: false,
            },
          },
    {},
  );
};

type SetOrderAction = {
  type: 'setSingleOrder' | 'setMultipleOrder';
  payload: {
    key: string;
    sortOrder: ColumnSortOrder;
    onSort: OnSortFn | undefined;
  };
};

type UpdateColumnsAction = {
  type: 'updateColumns';
  payload: {
    columns: ColumnsSortState;
  };
};

type ColumnSortAction = SetOrderAction | UpdateColumnsAction;

const setSingleOrder: React.Reducer<ColumnsSortState, SetOrderAction> = (
  state,
  action,
) => {
  const { payload } = action;
  const { onSort } = payload;
  const clearedSortState = Object.entries(state).reduce<ColumnsSortState>(
    (newState, [currKey, currValue]) => ({
      ...newState,
      [currKey]: {
        ...currValue,
        sortOrder: null,
      },
    }),
    {},
  );

  const newState = {
    ...clearedSortState,
    [payload.key]: {
      ...state[payload.key],
      sortOrder: payload.sortOrder,
    },
  };
  onSort &&
    onSort({ columnKey: payload.key, order: payload.sortOrder }, newState);

  return newState;
};

const setMultipleOrder: React.Reducer<ColumnsSortState, SetOrderAction> = (
  state,
  action,
) => {
  const { payload } = action;
  const { onSort } = payload;
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
    {},
  );

  const newState = {
    ...clearedSortState,
    [payload.key]: {
      ...state[payload.key],
      sortOrder: payload.sortOrder,
    },
  };
  onSort &&
    onSort({ columnKey: payload.key, order: payload.sortOrder }, newState);

  return newState;
};

const updateColumns: React.Reducer<ColumnsSortState, UpdateColumnsAction> = (
  state,
  action,
) => {
  const { payload } = action;
  return merge(payload.columns, state);
};

const sortReducer: React.Reducer<ColumnsSortState, ColumnSortAction> = (
  state,
  action,
) => {
  const { type } = action;

  switch (type) {
    case 'setSingleOrder':
      return setSingleOrder(state, action);
    case 'setMultipleOrder':
      return setMultipleOrder(state, action);
    case 'updateColumns':
      return updateColumns(state, action);
    default:
      return state;
  }
};

export const useSortState = (
  initialState: ColumnsSortState = {},
  onSort: OnSortFn | undefined,
): SortStateAPI => {
  const [columnsSortState, dispatch] = React.useReducer(
    sortReducer,
    initialState,
  );

  const getColumnSortOrder: SortStateAPI['getColumnSortOrder'] = (key) => {
    return columnsSortState[key]?.sortOrder;
  };

  const updateColumnsData: SortStateAPI['updateColumnsData'] = (
    columns: ColumnsSortState,
  ) => {
    dispatch({
      type: 'updateColumns',
      payload: {
        columns,
      },
    });
  };

  const setColumnSortOrder: SortStateAPI['setColumnSortOrder'] = (
    key,
    sortOrder,
  ) => {
    if (
      columnsSortState[key]?.sortOrder !== sortOrder &&
      columnsSortState[key]?.multiple === false
    ) {
      dispatch({
        type: 'setSingleOrder',
        payload: {
          key,
          sortOrder,
          onSort,
        },
      });
    }

    if (
      columnsSortState[key]?.sortOrder !== sortOrder &&
      columnsSortState[key]?.multiple
    ) {
      dispatch({
        type: 'setMultipleOrder',
        payload: {
          key,
          sortOrder,
          onSort,
        },
      });
    }
  };

  return {
    columnsSortState,
    updateColumnsData,
    getColumnSortOrder,
    setColumnSortOrder,
  };
};

export default useSortState;
