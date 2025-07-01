import { type Key, useCallback, useMemo } from 'react';

import { type Props as TableSelectionType } from '../../TableHeader/TableSelection.types';
import { isRecordSelectable } from '../../utils';
import { useRowKey } from '../useRowKey';

type BulkSelectionType = {
  allRecordsCount: number;
  selectableRecordsCount: number;
  selectableAndSelectedRecordsCount: number;
  selectedRecordsCount: number;
};

export const useBulkSelectionCount = <T extends object>({
  dataSource,
  selection,
  childrenColumnName,
  rowKey,
}: TableSelectionType<T>): BulkSelectionType => {
  const { getRowKey } = useRowKey(rowKey);

  const getSelectableChildren = useCallback(
    (children: T[] | undefined) => {
      const selectionStatusValidator =
        selection?.checkRowSelectionStatus || undefined;
      return children
        ? children.filter(
            (child: T) =>
              isRecordSelectable(child, selectionStatusValidator) &&
              getRowKey(child) !== undefined,
          )
        : [];
    },
    [getRowKey, selection?.checkRowSelectionStatus],
  );

  const result = useMemo(() => {
    const initialValue = {
      selectableRecordsCount: 0,
      selectableAndSelectedRecordsCount: 0,
      selectedRecordsCount: 0,
    };
    if (!dataSource.length || !selection) {
      return initialValue;
    }
    const {
      selectedRowKeys,
      independentSelectionExpandedRows,
      checkRowSelectionStatus,
    } = selection;

    return dataSource.reduce((count: typeof initialValue, record: T) => {
      const isSelectable = +isRecordSelectable(record, checkRowSelectionStatus);
      const rowChildren = record[childrenColumnName];
      let {
        selectableRecordsCount,
        selectableAndSelectedRecordsCount,
        selectedRecordsCount,
      } = count;
      // selectable
      if (independentSelectionExpandedRows) {
        Array.isArray(rowChildren)
          ? (selectableRecordsCount +=
              getSelectableChildren(rowChildren).length + isSelectable)
          : (selectableRecordsCount += isSelectable);
      } else {
        Array.isArray(rowChildren)
          ? (selectableRecordsCount +=
              getSelectableChildren(rowChildren).length)
          : (selectableRecordsCount += isSelectable);
      }

      if (Array.isArray(rowChildren)) {
        selectedRecordsCount += rowChildren.reduce(
          (childCount: number, child: T) => {
            const key = getRowKey(child) as Key;
            return selectedRowKeys.includes(key) ? childCount + 1 : childCount;
          },
          0,
        );

        selectableAndSelectedRecordsCount += rowChildren.reduce(
          (childCount: number, child: T) => {
            const key = getRowKey(child) as Key;
            return selectedRowKeys.includes(key) &&
              isRecordSelectable(child, checkRowSelectionStatus)
              ? childCount + 1
              : childCount;
          },
          0,
        );
      }
      if (
        !Array.isArray(rowChildren) ||
        selection.independentSelectionExpandedRows
      ) {
        const key = getRowKey(record) as Key;
        selectedRecordsCount += selectedRowKeys.includes(key) ? 1 : 0;
        selectableAndSelectedRecordsCount +=
          selectedRowKeys.includes(key) &&
          isRecordSelectable(record, checkRowSelectionStatus)
            ? 1
            : 0;
      }

      return {
        selectableRecordsCount,
        selectableAndSelectedRecordsCount,
        selectedRecordsCount,
      };
    }, initialValue);
  }, [
    childrenColumnName,
    dataSource,
    getRowKey,
    getSelectableChildren,
    selection,
  ]);

  return {
    ...result,
    allRecordsCount: dataSource.length,
  };
};
