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
import type { Props } from './TableSelection.types';
import { useRowKey } from '../hooks/useRowKey';
import { isRecordSelectable } from '../utils';

const TableSelection = <T extends { key: ReactText; children?: T[] }>({
  dataSource,
  dataSourceFull,
  selection,
  rowKey,
  locale,
  childrenColumnName,
}: Props<T>) => {
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
              return key && isRecordSelectable(child, checkRowSelectionStatus) ? [...acc, key] : acc;
            }, []),
          ];
        }
        if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record);
          keys = key !== undefined && isRecordSelectable(record, checkRowSelectionStatus) ? [...keys, key] : [...keys];
        }
      });
      const uniqueKeys = Array.from(new Set(keys));
      const rows = getRowsForKeys(uniqueKeys);
      selection.onChange(uniqueKeys, rows);
    }
  }, [childrenColumnName, dataSource, selection, isShowingSubset, getRowsForKeys, getRowKey]);

  const unselectAll = useCallback(() => {
    if (selection) {
      if (isShowingSubset) {
        const { selectedRowKeys } = selection;
        let keysToUnselect: Key[] = [];

        dataSource.forEach((record: T) => {
          const rowChildren = record[childrenColumnName];

          if (Array.isArray(rowChildren)) {
            keysToUnselect = [
              ...keysToUnselect,
              ...rowChildren.reduce((acc: Key[], child: T) => {
                const key = getRowKey(child);
                return key ? [...acc, key] : acc;
              }, []),
            ];
          }
          if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
            const key = getRowKey(record);
            keysToUnselect = key !== undefined ? [...keysToUnselect, key] : [...keysToUnselect];
          }
        });
        const keysLeft = selectedRowKeys.filter(key => !keysToUnselect.includes(key));
        const rows = getRowsForKeys(keysLeft);
        selection.onChange(keysLeft, rows);
      } else {
        selection.onChange([], []);
      }
    }
  }, [dataSource, getRowKey, getRowsForKeys, isShowingSubset, selection, childrenColumnName]);

  const getSelectableChildren = useCallback(
    (children: T[] | undefined) => {
      const selectionStatusValidator =
        selection && 'checkRowSelectionStatus' in selection ? selection.checkRowSelectionStatus : undefined;
      return children
        ? children.filter(
            (child: T) => isRecordSelectable(child, selectionStatusValidator) && getRowKey(child) !== undefined
          )
        : [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getRowKey, selection?.checkRowSelectionStatus]
  );

  const selectInvert = useCallback(() => {
    if (dataSource && selection) {
      const { selectedRowKeys, checkRowSelectionStatus } = selection;
      let keys: Key[] = isShowingSubset ? [...selectedRowKeys] : [];
      dataSource.forEach((record: T): void => {
        const rowChildren = record[childrenColumnName];

        const hasChildren = Array.isArray(rowChildren);
        const selectableChildren = hasChildren ? getSelectableChildren(rowChildren) : false;
        if (selectableChildren) {
          selectableChildren.forEach((child: T) => {
            const key = getRowKey(child) as Key;
            if (selectedRowKeys.includes(key)) {
              if (isShowingSubset) keys.splice(keys.indexOf(key), 1);
            } else {
              keys = [...keys, key];
            }
          });
        }
        if (!selectableChildren || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record) as Key;
          if (selectedRowKeys.includes(key)) {
            if (isShowingSubset) keys.splice(keys.indexOf(key), 1);
          } else if (isRecordSelectable(record, checkRowSelectionStatus)) {
            keys = [...keys, key];
          }
        }
      });
      const rows = getRowsForKeys(keys);
      selection.onChange(keys, rows);
    }
  }, [childrenColumnName, dataSource, selection, isShowingSubset, getRowsForKeys, getSelectableChildren, getRowKey]);

  const isEmpty = useMemo(() => {
    return dataSource.length === 0;
  }, [dataSource]);

  const allSelectableRecordsCount = useMemo(() => {
    if (isEmpty || !selection) return 0;
    const { independentSelectionExpandedRows, checkRowSelectionStatus } = selection;
    return dataSource.reduce((count: number, record: T) => {
      const isSelectable = +isRecordSelectable(record, checkRowSelectionStatus);
      const rowChildren = record[childrenColumnName];
      if (independentSelectionExpandedRows) {
        return Array.isArray(rowChildren)
          ? count + getSelectableChildren(rowChildren).length + isSelectable
          : count + isSelectable;
      }
      return Array.isArray(rowChildren) ? count + getSelectableChildren(rowChildren).length : count + isSelectable;
    }, 0);
  }, [childrenColumnName, dataSource, getSelectableChildren, isEmpty, selection]);

  const allSelected = useMemo(() => {
    if (isEmpty || !selection) return false;
    const { selectedRowKeys } = selection;
    const selectedKeysInDataSourceCount = isShowingSubset
      ? dataSource.reduce((count: number, record: T) => {
          const rowChildren = record[childrenColumnName];
          if (Array.isArray(rowChildren)) {
            return rowChildren.reduce((childCount: number, child: T) => {
              const key = getRowKey(child) as Key;
              return selectedRowKeys.includes(key) ? childCount + 1 : childCount;
            }, 0);
          }
          if (!Array.isArray(rowChildren) || selection.independentSelectionExpandedRows) {
            const key = getRowKey(record) as Key;
            return selectedRowKeys.includes(key) ? count + 1 : count;
          }
          return count;
        }, 0)
      : selectedRowKeys.length;

    return allSelectableRecordsCount === selectedKeysInDataSourceCount;
  }, [isEmpty, selection, isShowingSubset, dataSource, allSelectableRecordsCount, childrenColumnName, getRowKey]);

  const selectionTooltipTitle = !allSelected ? locale?.selectAllTooltip : locale?.unselectAll;

  const menuDataSource = useMemo(() => {
    return selection?.selections
      ?.filter(Boolean)
      .map((selectionMenuElement: Selection | SelectionItem): MenuItemProps => {
        switch (selectionMenuElement) {
          case SELECTION_ALL: {
            return !allSelected
              ? { onClick: selectAll, text: locale?.selectAll }
              : { onClick: unselectAll, text: locale?.unselectAll };
          }
          case SELECTION_INVERT: {
            return { onClick: selectInvert, text: locale?.selectInvert };
          }
          default: {
            const sel = selectionMenuElement as Selection;
            return { ...sel, text: sel.label };
          }
        }
      });
  }, [
    allSelected,
    locale?.selectAll,
    locale?.selectInvert,
    locale?.unselectAll,
    selectAll,
    selectInvert,
    selection?.selections,
    unselectAll,
  ]);

  return selection?.selectedRowKeys ? (
    <S.Selection data-popup-container>
      <Tooltip title={selectionTooltipTitle}>
        <Button.Checkbox
          disabled={isEmpty || allSelectableRecordsCount === 0}
          data-testid="ds-table-batch-selection-button"
          checked={allSelected && allSelectableRecordsCount > 0}
          onChange={(isChecked): void => {
            if (isChecked) {
              selectAll();
            } else {
              unselectAll();
            }
          }}
          indeterminate={selection?.selectedRowKeys.length > 0 && !allSelected}
        />
      </Tooltip>
      {selection?.selections && (
        <Dropdown
          disabled={isEmpty || allSelectableRecordsCount === 0}
          trigger={['click']}
          overlay={<S.SelectionMenu dataSource={menuDataSource} />}
        >
          <Tooltip title={locale?.selectionOptionsTooltip}>
            <Button mode="single-icon" type="ghost">
              <Icon component={<OptionVerticalM />} />
            </Button>
          </Tooltip>
        </Dropdown>
      )}
    </S.Selection>
  ) : null;
};

export default TableSelection;
