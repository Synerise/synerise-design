import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import { RowSelectionProps } from './RowSelectionColumn.types';
import { useRowKey } from '../hooks/useRowKey';
import { RowType } from '../Table.types';

// eslint-disable-next-line import/prefer-default-export
export function RowSelectionColumn<T extends object & RowType<T>>({
  rowKey,
  record,
  limit,
  independentSelectionExpandedRows,
  selectedRowKeys,
  selectedRecords,
  tableLocale,
  onChange,
  childrenColumnName,
}: RowSelectionProps<T>): React.ReactElement | null {
  const { getRowKey } = useRowKey(rowKey);
  const recordKey = getRowKey(record);
  const rowChildren = record[childrenColumnName];

  const checkedChildren = React.useMemo(() => {
    return (
      rowChildren?.filter((child: T) => {
        const childKey = getRowKey(child);
        return childKey && selectedRowKeys.indexOf(childKey) >= 0;
      }) || []
    );
  }, [getRowKey, rowChildren, selectedRowKeys]);

  const allChildrenSelected = React.useMemo(
    () =>
      !!rowChildren?.every((child: T) => {
        const childKey = getRowKey(child);
        return childKey && selectedRowKeys.indexOf(childKey) >= 0;
      }),
    [getRowKey, rowChildren, selectedRowKeys]
  );

  const isIndeterminate = React.useMemo(() => {
    if (Array.isArray(rowChildren) && !independentSelectionExpandedRows) {
      return checkedChildren.length > 0 && checkedChildren.length < (rowChildren?.length || 0);
    }
    return false;
  }, [checkedChildren.length, independentSelectionExpandedRows, rowChildren]);

  const isChecked: boolean = React.useMemo(() => {
    if (Array.isArray(rowChildren) && !independentSelectionExpandedRows) {
      return isChecked || allChildrenSelected;
    }
    return recordKey !== undefined && selectedRowKeys && selectedRowKeys.indexOf(recordKey) >= 0;
  }, [allChildrenSelected, independentSelectionExpandedRows, rowChildren, recordKey, selectedRowKeys]);

  const handleSelectionChange = React.useCallback(
    (isCheckedNext: boolean, changedRecord: T): void => {
      let selectedRows: T[] = selectedRecords;
      const changedRecordChildren = changedRecord[childrenColumnName];

      if (isCheckedNext) {
        if (Array.isArray(changedRecordChildren) && !independentSelectionExpandedRows) {
          selectedRows = [...selectedRows, ...changedRecordChildren];
        } else {
          selectedRows = [...selectedRows, changedRecord];
        }
      } else if (Array.isArray(changedRecordChildren) && !independentSelectionExpandedRows) {
        const childrenKeys = changedRecordChildren.map((child: T) => getRowKey(child));
        selectedRows = selectedRows.filter(child => childrenKeys.indexOf(getRowKey(child)) < 0);
      } else {
        selectedRows = selectedRows.filter(row => getRowKey(row) !== recordKey);
      }

      selectedRows = Array.from(new Set(selectedRows));

      onChange &&
        onChange(
          selectedRows.reduce((acc: React.ReactText[], current) => {
            const key = getRowKey(current);
            if (key !== undefined) {
              return [...acc, key];
            }
            return acc;
          }, []),
          selectedRows
        );
    },
    [getRowKey, independentSelectionExpandedRows, onChange, recordKey, selectedRecords, childrenColumnName]
  );

  return recordKey !== undefined ? (
    <Tooltip title={tableLocale?.selectRowTooltip} mouseLeaveDelay={0}>
      <Button.Checkbox
        key={`checkbox-${recordKey}`}
        data-testid="ds-table-selection-button"
        checked={isChecked}
        disabled={!isChecked && Boolean(limit !== undefined && limit <= selectedRowKeys.length)}
        indeterminate={isIndeterminate}
        onClick={(e): void => {
          e.stopPropagation();
        }}
        onChange={(isCheckedNext): void => handleSelectionChange(isCheckedNext, record)}
      />
    </Tooltip>
  ) : null;
}
