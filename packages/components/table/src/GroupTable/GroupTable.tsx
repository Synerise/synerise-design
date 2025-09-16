import Table from 'antd/lib/table';
import { flow } from 'lodash';
import React from 'react';

import { columnWithSortButtons } from '../ColumnSortMenu/columnWithSortButtons';
import {
  getColumnsWithActiveSorting,
  sortDataSourceRows,
} from '../ColumnSortMenu/groupedColumnsSort';
import {
  columnsToSortState,
  useSortState,
} from '../ColumnSortMenu/useSortState';
import {
  type DSColumnType,
  type DSTableProps,
  type SortStateAPI,
} from '../Table.types';
import '../style/index.less';
import { type GroupType } from './GroupTable.types';
import GroupTableBody from './GroupTableBody/GroupTableBody';

const addActiveColumnClass =
  <T,>(activeColumn?: string) =>
  (column: DSColumnType<T>): DSColumnType<T> =>
    column.key === activeColumn
      ? {
          ...column,
          onHeaderCell: (): React.HTMLAttributes<HTMLElement> => ({
            className: 'ds-table-active-column',
          }),
        }
      : column;

const clearDefaultColumnSortOrder = <T,>(
  column: DSColumnType<T>,
): DSColumnType<T> => ({
  ...column,
  sortOrder: null,
});

const addSortClassByState =
  <T,>(sortStateApi: SortStateAPI) =>
  (column: DSColumnType<T>): DSColumnType<T> =>
    sortStateApi.getColumnSortOrder(String(column.key))
      ? {
          ...column,
          onHeaderCell: (): React.HTMLAttributes<HTMLElement> => ({
            className: 'ant-table-column-sort',
          }),
        }
      : column;

function GroupTable<T extends GroupType<T>>(
  props: DSTableProps<T> & {
    addItem?: (
      column: string,
      value: React.ReactText | boolean | object,
    ) => void;
    hideGroupExpander?: boolean;
    initialGroupsCollapsed?: boolean;
  },
): React.ReactElement {
  const {
    selection,
    rowKey,
    dataSource,
    columns,
    cellSize,
    roundedHeader,
    addItem,
    hideGroupExpander,
    initialGroupsCollapsed,
    onSort,
  } = props;
  const [expandedGroups, setExpandedGroups] = React.useState<React.ReactText[]>(
    initialGroupsCollapsed || !dataSource
      ? []
      : dataSource.map((group) => group.key),
  );
  const sortStateApi = useSortState(columnsToSortState(columns), onSort);

  const [data, setData] = React.useState<readonly T[]>(dataSource || []);

  React.useEffect(() => {
    setData(dataSource || []);
    setExpandedGroups(
      initialGroupsCollapsed || !dataSource
        ? []
        : dataSource.map((group) => group.key),
    );
  }, [dataSource, initialGroupsCollapsed]);

  const toggleExpand = React.useCallback(
    (groupKey: React.ReactText) => {
      if (expandedGroups.indexOf(groupKey) >= 0) {
        setExpandedGroups(expandedGroups.filter((key) => key !== groupKey));
      } else {
        setExpandedGroups([...expandedGroups, groupKey]);
      }
    },
    [expandedGroups, setExpandedGroups],
  );

  const activeColumn = React.useMemo(() => {
    return data?.length ? data[0].column : undefined;
  }, [data]);

  const allItems = React.useMemo<T[]>(() => {
    const result: T[] = [];
    dataSource &&
      dataSource.forEach((group) =>
        group.rows.forEach((row) => result.push(row)),
      );
    return result;
  }, [dataSource]);

  const getActiveGroup = React.useCallback(
    (key: React.ReactText) => {
      const active = data.find((row: T): boolean => row.key === key);
      if (active) {
        const { rows, ...activeGroup } = active;
        return activeGroup;
      }
      return undefined;
    },
    [data],
  );

  const groupTableColumnDecorator = flow(
    addActiveColumnClass<T>(activeColumn),
    addSortClassByState<T>(sortStateApi),
    clearDefaultColumnSortOrder,
  );
  const columnsWithCustomSorting = columns?.map(
    columnWithSortButtons(sortStateApi),
  );
  const decoratedColumns = columnsWithCustomSorting?.map(
    groupTableColumnDecorator,
  );
  const columnsWithActiveSorting = getColumnsWithActiveSorting(
    sortStateApi,
    columns,
  );

  const sortedRowsData = activeColumn
    ? sortDataSourceRows(sortStateApi, columnsWithActiveSorting, dataSource)
    : dataSource;

  return (
    <div
      className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}
    >
      <Table<T>
        {...props}
        dataSource={sortedRowsData}
        columns={decoratedColumns}
        components={{
          body: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            row: (record: any): JSX.Element => {
              const activeGroup = getActiveGroup(record['data-row-key']);
              return (
                <GroupTableBody
                  group={record}
                  selection={selection}
                  rowKey={rowKey}
                  allItems={allItems}
                  expanded={expandedGroups.indexOf(record['data-row-key']) >= 0}
                  expandGroup={toggleExpand}
                  // @ts-expect-error: FIXME: Type 'DSColumnType<T>[]' is not assignable to type 'GroupColumnsType<T>[]'.
                  columns={columnsWithCustomSorting}
                  addItem={addItem}
                  activeGroup={activeGroup}
                  hideGroupExpander={hideGroupExpander}
                />
              );
            },
          },
        }}
        // @ts-expect-error  Type 'undefined' is not assignable to type 'INTERNAL_SELECTION_ITEM'.
        rowSelection={
          selection && {
            ...selection,
            columnWidth: 64,
          }
        }
      />
    </div>
  );
}

export default GroupTable;
