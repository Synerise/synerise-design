import Table from 'antd/lib/table';
import compact from 'lodash.compact';
import isEqual from 'lodash.isequal';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import Result from '@synerise/ds-result';
import Tooltip from '@synerise/ds-tooltip';
import { usePrevious } from '@synerise/ds-utils';

import { columnWithSortButtons } from '../ColumnSortMenu/columnWithSortButtons';
import {
  columnsToSortState,
  useSortState,
} from '../ColumnSortMenu/useSortState';
import { RowSelectionColumn } from '../RowSelection';
import {
  type DSColumnType,
  type DSTableProps,
  type RowSelection,
  type RowType,
} from '../Table.types';
import { useRowKey } from '../hooks/useRowKey';
import { useRowStar } from '../hooks/useRowStar/useRowStar';
import { getChildrenColumnName, isRecordSelectable } from '../utils';
import { columnWithCellTooltip } from '../utils/columnWithCellTooltip';

function DefaultTable<T extends object & RowType<T>>(props: DSTableProps<T>) {
  const {
    title,
    selection,
    rowStar,
    dataSource,
    rowKey,
    locale,
    expandable,
    components,
    columns,
    onSort,
    emptyDataComponent,
    getRowTooltipProps,
  } = props;
  const previousColumns = usePrevious(columns);
  const sortStateApi = useSortState(columnsToSortState(columns), onSort);
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);
  const childrenColumnName = getChildrenColumnName<T>(
    expandable?.childrenColumnName as keyof T,
  );

  const { getRowKey } = useRowKey(rowKey);

  const starColumn = useMemo(() => {
    return getRowStarColumn({ ...props, getRowKey });
  }, [getRowKey, getRowStarColumn, props]);

  const emptyData = useMemo(() => {
    return emptyDataComponent !== undefined ? (
      emptyDataComponent
    ) : (
      <Result
        description={
          locale?.emptyText || <FormattedMessage id="DS.TABLE.EMPTY_TEXT" />
        }
        type="no-results"
        noSearchResults
      />
    );
  }, [emptyDataComponent, locale?.emptyText]);

  useEffect(() => {
    if (!isEqual(previousColumns, columns)) {
      sortStateApi.updateColumnsData(columnsToSortState(columns));
    }
  }, [columns, previousColumns, sortStateApi]);

  const RenderRow = useCallback(
    // @ts-expect-error Parameter 'row' implicitly has an 'any' type.ts(7006)
    (row) => {
      const { children, ...rowProps } = row;
      const classNameWithLevel = row.className
        .split(' ')
        .find((name: string) => name.includes('row-level'));
      let level;
      if (classNameWithLevel) {
        level = classNameWithLevel.split('-').pop();
      }
      const tooltipProps = getRowTooltipProps?.(row);
      const rowContent = (
        <tr
          {...rowProps}
          className={`${row.className} ds-table-row ${level ? `ds-table-row-level-${level}` : ''}`}
        >
          {children}
        </tr>
      );
      return tooltipProps ? (
        <Tooltip {...tooltipProps}>{rowContent}</Tooltip>
      ) : (
        rowContent
      );
    },
    [getRowTooltipProps],
  );

  const prependedColumns = compact<DSColumnType<T>>([!!rowStar && starColumn]);
  const decoratedColumns = columns?.map((column) => {
    const columnsWithCellTooltips = columnWithCellTooltip(column);
    return columnWithSortButtons(sortStateApi, onSort)(columnsWithCellTooltips);
  });
  const decoratedComponents =
    components &&
    Object.entries(components)
      .map(([key, value]) => {
        if (typeof value === 'function') {
          return [
            key,
            (rawData: T[], meta: unknown): ReturnType<typeof value> =>
              value(rawData, meta, {
                ...props,
                columns: decoratedColumns,
              }),
          ];
        }

        return [key, value];
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const selectedRecords = useMemo((): T[] => {
    if (selection) {
      const { selectedRowKeys, checkRowSelectionStatus } =
        selection as RowSelection<T>;
      let selectedRows: T[] = [];
      dataSource &&
        dataSource.forEach((row: T): void => {
          const key = getRowKey(row);
          if (
            key &&
            selectedRowKeys.indexOf(key) >= 0 &&
            isRecordSelectable(row, checkRowSelectionStatus)
          ) {
            selectedRows = [...selectedRows, row];
          }

          const rowChildren = row[childrenColumnName];
          if (rowChildren !== undefined && Array.isArray(rowChildren)) {
            rowChildren.forEach((child: T) => {
              const childKey = getRowKey(child);
              if (
                childKey &&
                selectedRowKeys.indexOf(childKey) >= 0 &&
                isRecordSelectable(child, checkRowSelectionStatus)
              ) {
                selectedRows = [...selectedRows, child];
              }
            });
          }
        });

      return selectedRows;
    }
    return [];
  }, [childrenColumnName, dataSource, getRowKey, selection]);

  const renderRowSelection = useCallback(
    (key: string, record: T) => {
      const {
        selectedRowKeys,
        limit,
        independentSelectionExpandedRows,
        onChange,
        checkRowSelectionStatus,
      } = selection as RowSelection<T>;
      return (
        <RowSelectionColumn
          rowKey={rowKey}
          record={record}
          limit={limit}
          selectedRowKeys={selectedRowKeys}
          independentSelectionExpandedRows={independentSelectionExpandedRows}
          onChange={onChange}
          selectedRecords={selectedRecords}
          isGlobalAllSelected={selection?.globalSelection?.isSelected}
          tableLocale={locale}
          checkRowSelectionStatus={checkRowSelectionStatus}
          childrenColumnName={childrenColumnName}
        />
      );
    },
    [locale, rowKey, selectedRecords, selection, childrenColumnName],
  );

  return (
    <Table<T>
      {...props}
      data-popup-container
      columns={[
        ...prependedColumns,
        // @ts-expect-error: decoratedColumns type is different in DSTableProps than AntTableProps
        ...decoratedColumns,
      ]}
      expandable={{
        expandIconColumnIndex: -1,
        ...expandable,
      }}
      locale={{
        ...locale,
        emptyText: emptyData,
      }}
      // @ts-expect-error Type mismatch
      title={title}
      showSorterTooltip={false}
      components={{
        body: {
          row: RenderRow,
        },
        ...decoratedComponents,
      }}
      // @ts-expect-error Type mismatch
      rowSelection={
        selection && {
          ...selection,
          selections: selection?.selections?.filter(Boolean),
          columnWidth: 64,
          renderCell: renderRowSelection,
        }
      }
    />
  );
}

export default DefaultTable;
