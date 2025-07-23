import React, { type ReactText, useCallback, useMemo } from 'react';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';

import { type RowType } from '../Table.types';
import { useRowKey } from '../hooks/useRowKey';
import { getRecordSelectionStatus, isRecordSelectable } from '../utils';
import { type RowSelectionProps } from './RowSelectionColumn.types';

export function RowSelectionColumn<T extends object & RowType<T>>({
  rowKey,
  record,
  limit,
  independentSelectionExpandedRows,
  isGlobalAllSelected,
  selectedRowKeys,
  selectedRecords,
  tableLocale,
  onChange,
  checkRowSelectionStatus,
  childrenColumnName,
}: RowSelectionProps<T>) {
  const { getRowKey } = useRowKey(rowKey);
  const recordKey = getRowKey(record);
  const rowChildren = record[childrenColumnName];

  const isSelectable = useCallback(
    (item: T) => isRecordSelectable(item, checkRowSelectionStatus),
    [checkRowSelectionStatus],
  );

  const checkedChildren = useMemo(() => {
    return (
      rowChildren?.filter((child: T) => {
        const childKey = getRowKey(child);
        return (
          childKey &&
          selectedRowKeys.indexOf(childKey) >= 0 &&
          isSelectable(child)
        );
      }) || []
    );
  }, [isSelectable, getRowKey, rowChildren, selectedRowKeys]);

  const allChildrenSelected = useMemo(
    () =>
      !!rowChildren?.filter(isSelectable).every((child: T) => {
        const childKey = getRowKey(child);
        return childKey && selectedRowKeys.indexOf(childKey) >= 0;
      }),
    [getRowKey, isSelectable, rowChildren, selectedRowKeys],
  );

  const isIndeterminate = useMemo(() => {
    if (Array.isArray(rowChildren) && !independentSelectionExpandedRows) {
      const clickableChildren = rowChildren?.filter(isSelectable);
      return (
        checkedChildren.length > 0 &&
        checkedChildren.length < (clickableChildren.length || 0)
      );
    }
    return false;
  }, [
    checkedChildren.length,
    independentSelectionExpandedRows,
    isSelectable,
    rowChildren,
  ]);

  const isChecked: boolean = useMemo(() => {
    if (Array.isArray(rowChildren) && !independentSelectionExpandedRows) {
      return isChecked || allChildrenSelected;
    }
    return (
      recordKey !== undefined &&
      selectedRowKeys &&
      selectedRowKeys.indexOf(recordKey) >= 0
    );
  }, [
    allChildrenSelected,
    independentSelectionExpandedRows,
    rowChildren,
    recordKey,
    selectedRowKeys,
  ]);

  const handleSelectionChange = useCallback(
    (isCheckedNext: boolean, changedRecord: T): void => {
      let selectedRows: T[] = selectedRecords;
      const changedRecordChildren = changedRecord[childrenColumnName];

      if (isCheckedNext) {
        if (
          Array.isArray(changedRecordChildren) &&
          !independentSelectionExpandedRows
        ) {
          const clickableChildren = changedRecordChildren.filter(isSelectable);
          selectedRows = [...selectedRows, ...clickableChildren];
        } else {
          selectedRows = [...selectedRows, changedRecord];
        }
      } else if (
        Array.isArray(changedRecordChildren) &&
        !independentSelectionExpandedRows
      ) {
        const childrenKeys = changedRecordChildren
          .filter(isSelectable)
          .map((child: T) => getRowKey(child));
        selectedRows = selectedRows.filter(
          (child) => childrenKeys.indexOf(getRowKey(child)) < 0,
        );
      } else {
        selectedRows = selectedRows.filter(
          (row) => getRowKey(row) !== recordKey,
        );
      }

      selectedRows = Array.from(new Set(selectedRows));

      onChange &&
        onChange(
          selectedRows.reduce((acc: ReactText[], current) => {
            const key = getRowKey(current);
            if (key !== undefined) {
              return [...acc, key];
            }
            return acc;
          }, []),
          selectedRows,
        );
    },
    [
      getRowKey,
      independentSelectionExpandedRows,
      isSelectable,
      onChange,
      recordKey,
      selectedRecords,
      childrenColumnName,
    ],
  );
  const { unavailable, disabled } = getRecordSelectionStatus(
    checkRowSelectionStatus,
    record,
  );

  const disabledProp =
    isGlobalAllSelected ||
    (!isChecked &&
      Boolean(limit !== undefined && limit <= selectedRowKeys.length)) ||
    disabled;
  return recordKey !== undefined && !unavailable ? (
    <Tooltip title={tableLocale?.selectRowTooltip} mouseLeaveDelay={0}>
      <Button.Checkbox
        key={`checkbox-${recordKey}`}
        data-testid="ds-table-selection-button"
        checked={isChecked || isGlobalAllSelected}
        disabled={disabledProp}
        indeterminate={isIndeterminate}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={(isCheckedNext) =>
          !isGlobalAllSelected && handleSelectionChange(isCheckedNext, record)
        }
      />
    </Tooltip>
  ) : null;
}
