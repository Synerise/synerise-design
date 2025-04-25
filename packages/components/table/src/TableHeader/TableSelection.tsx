import React, { useCallback, useMemo } from 'react';
import type { Key, ReactText } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import type { MenuItemProps } from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { OptionVerticalM } from '@synerise/ds-icon';

import * as S from '../Table.styles';
import type { Selection, SelectionItem } from '../Table.types';
import { SELECTION_ALL, SELECTION_INVERT } from '../Table';
import type { TableSelectionProps } from './TableSelection.types';
import { isRecordSelectable } from '../utils';
import { useRowKey } from '../hooks/useRowKey';
import { useBulkSelectionCount } from '../hooks/useBulkSelection';

const TableSelection = <T extends { key: ReactText; children?: T[] }>({
  dataSource,
  dataSourceFull,
  selection,
  rowKey,
  locale,
  hasSelectionLimit,
  childrenColumnName,
}: TableSelectionProps<T>) => {
  const { getRowKey } = useRowKey(rowKey);

  const allData = dataSourceFull || dataSource;
  const isShowingSubset = dataSourceFull && dataSourceFull.length !== dataSource.length;

  const getRowsForKeys = useCallback(
    (keys: Key[]) => {
      if (selection) {
        let rows: T[] = [];
        allData.forEach((record: T) => {
          const rowChildren = record[childrenColumnName];
          if (Array.isArray(rowChildren)) {
            rowChildren.forEach(child => {
              const key = getRowKey(child) as Key;
              if (rowChildren && key && keys.includes(key)) {
                rows = [...rows, record];
              }
            });
          }
          if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
            const key = getRowKey(record);
            if (key && keys.includes(key)) {
              rows = [...rows, record];
            }
          }
        });
        return rows;
      }
      return [];
    },
    [allData, getRowKey, selection, childrenColumnName]
  );

  const selectAll = useCallback(() => {
    if (dataSource && selection) {
      const { selectedRowKeys, checkRowSelectionStatus } = selection;
      let keys: Key[] = isShowingSubset ? [...selectedRowKeys] : [];
      dataSource.forEach((record: T) => {
        const rowChildren = record[childrenColumnName];

        if (Array.isArray(rowChildren)) {
          keys = [
            ...keys,
            ...rowChildren.reduce((acc: Key[], child: T) => {
              const key = getRowKey(child);
              return key && (isRecordSelectable(child, checkRowSelectionStatus) || selectedRowKeys.includes(key))
                ? [...acc, key]
                : acc;
            }, []),
          ];
        }
        if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record);
          keys =
            key !== undefined && (isRecordSelectable(record, checkRowSelectionStatus) || selectedRowKeys.includes(key))
              ? [...keys, key]
              : [...keys];
        }
      });
      const uniqueKeys = Array.from(new Set(keys));
      const rows = getRowsForKeys(uniqueKeys);
      selection.onChange(uniqueKeys, rows);
    }
  }, [childrenColumnName, dataSource, selection, isShowingSubset, getRowsForKeys, getRowKey]);

  const unselectAll = useCallback(() => {
    if (selection) {
      const { selectedRowKeys, checkRowSelectionStatus } = selection;
      let keysToUnselect: Key[] = [];

      dataSource.forEach((record: T) => {
        const rowChildren = record[childrenColumnName];

        if (Array.isArray(rowChildren)) {
          keysToUnselect = [
            ...keysToUnselect,
            ...rowChildren.reduce((acc: Key[], child: T) => {
              const key = getRowKey(child) as Key;
              return key && isRecordSelectable(child, checkRowSelectionStatus) ? [...acc, key] : acc;
            }, []),
          ];
        }
        if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record);
          keysToUnselect =
            key !== undefined && isRecordSelectable(record, checkRowSelectionStatus)
              ? [...keysToUnselect, key]
              : [...keysToUnselect];
        }
      });
      const keysLeft = selectedRowKeys.filter(key => !keysToUnselect.includes(key));
      const rows = getRowsForKeys(keysLeft);
      selection.onChange(keysLeft, rows);
    }
  }, [dataSource, getRowKey, getRowsForKeys, selection, childrenColumnName]);

  const getSelectableChildren = useCallback(
    (children: T[] | undefined) => {
      const selectionStatusValidator = selection?.checkRowSelectionStatus || undefined;
      return children
        ? children.filter(
            (child: T) => isRecordSelectable(child, selectionStatusValidator) && getRowKey(child) !== undefined
          )
        : [];
    },
    [getRowKey, selection?.checkRowSelectionStatus]
  );

  const selectInvert = useCallback(() => {
    if (dataSource && selection) {
      const { selectedRowKeys, checkRowSelectionStatus } = selection;
      let keys: Key[] = [...selectedRowKeys];
      dataSource.forEach((record: T): void => {
        const rowChildren = record[childrenColumnName];

        const hasChildren = Array.isArray(rowChildren);
        const selectableChildren = hasChildren ? getSelectableChildren(rowChildren) : false;
        if (selectableChildren) {
          selectableChildren.forEach((child: T) => {
            const key = getRowKey(child) as Key;
            if (selectedRowKeys.includes(key)) {
              keys.splice(keys.indexOf(key), 1);
            } else {
              keys = [...keys, key];
            }
          });
        }
        if (!selectableChildren || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record) as Key;
          const isSelectable = isRecordSelectable(record, checkRowSelectionStatus);
          if (!isSelectable) return;
          if (selectedRowKeys.includes(key)) {
            keys.splice(keys.indexOf(key), 1);
          } else {
            keys = [...keys, key];
          }
        }
      });
      const rows = getRowsForKeys(keys);
      selection.onChange(keys, rows);
    }
  }, [childrenColumnName, dataSource, selection, getRowsForKeys, getSelectableChildren, getRowKey]);

  const { allRecordsCount, selectableRecordsCount, selectableAndSelectedRecordsCount, selectedRecordsCount } =
    useBulkSelectionCount({ dataSource, selection, childrenColumnName, rowKey });
  const isIndeterminate = selectedRecordsCount > 0 && selectableRecordsCount !== selectableAndSelectedRecordsCount;
  const disabledBulkSelection =
    allRecordsCount === 0 || selectableRecordsCount === 0 || (hasSelectionLimit && selectedRecordsCount === 0);
  const isAllSelected = !disabledBulkSelection && selectableRecordsCount === selectableAndSelectedRecordsCount;
  const isAnySelected = allRecordsCount > 0 && selectedRecordsCount > 0;

  const selectionTooltipTitle = !isAllSelected ? locale?.selectAllTooltip : locale?.unselectAll;

  const menuDataSource = useMemo(() => {
    return selection?.selections
      ?.filter(Boolean)
      .flatMap((selectionMenuElement: Selection | SelectionItem): MenuItemProps | MenuItemProps[] => {
        switch (selectionMenuElement) {
          case SELECTION_ALL: {
            const items: MenuItemProps[] = [];
            if (!isAllSelected && !hasSelectionLimit) {
              items.push({ onClick: selectAll, text: locale?.selectAll });
            }
            if (isAnySelected) {
              items.push({ onClick: unselectAll, text: locale?.unselectAll });
            }
            return items;
          }
          case SELECTION_INVERT: {
            return !hasSelectionLimit ? { onClick: selectInvert, text: locale?.selectInvert } : [];
          }
          default: {
            const sel = selectionMenuElement as Selection;
            return { ...sel, text: sel.label };
          }
        }
      });
  }, [
    isAllSelected,
    locale?.selectAll,
    locale?.selectInvert,
    locale?.unselectAll,
    selectAll,
    selectInvert,
    selection?.selections,
    unselectAll,
    isAnySelected,
    hasSelectionLimit,
  ]);

  return selection?.selectedRowKeys ? (
    <S.Selection data-popup-container>
      {!hasSelectionLimit && (
        <Tooltip title={selectionTooltipTitle}>
          <Button.Checkbox
            disabled={disabledBulkSelection}
            data-testid="ds-table-batch-selection-button"
            checked={isAllSelected}
            onChange={() => {
              if (!isAllSelected) {
                selectAll();
              } else {
                unselectAll();
              }
            }}
            indeterminate={isIndeterminate}
          />
        </Tooltip>
      )}
      {selection?.selections && (
        <Dropdown
          disabled={disabledBulkSelection || menuDataSource?.length === 0}
          trigger={['click']}
          overlay={<S.SelectionMenu dataSource={menuDataSource} />}
          hideOnItemClick
        >
          <Tooltip title={locale?.selectionOptionsTooltip}>
            <Button disabled={disabledBulkSelection || menuDataSource?.length === 0} mode="single-icon" type="ghost">
              <Icon component={<OptionVerticalM />} />
            </Button>
          </Tooltip>
        </Dropdown>
      )}
    </S.Selection>
  ) : null;
};

export default TableSelection;
