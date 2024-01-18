import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { OptionVerticalM } from '@synerise/ds-icon';
import * as S from '../Table.styles';
import { Selection, SelectionItem } from '../Table.types';
import { SELECTION_ALL, SELECTION_INVERT } from '../Table';
import { Props } from './TableSelection.types';
import { useRowKey } from '../hooks/useRowKey';

// @ts-ignore
function TableSelection<T extends { key: React.ReactText; children?: T[] }>({
  dataSource,
  dataSourceFull,
  selection,
  rowKey,
  locale,
}: Props<T>): React.ReactElement | null {
  const { getRowKey } = useRowKey(rowKey);

  const allData = dataSourceFull || dataSource;
  const isShowingSubset = dataSourceFull && dataSourceFull.length !== dataSource.length;

  const getRowsForKeys = React.useCallback(
    keys => {
      if (selection) {
        let rows: T[] = [];
        allData.forEach((record: T) => {
          if (Array.isArray(record.children)) {
            record.children.forEach(child => {
              const key = getRowKey(child) as React.Key;
              if (record.children && key && keys.includes(key)) {
                rows = [...rows, record];
              }
            });
          }
          if (!Array.isArray(record.children) || selection.independentSelectionExpandedRows) {
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
    [allData, getRowKey, selection]
  );

  const selectAll = React.useCallback(() => {
    if (dataSource && selection) {
      const { selectedRowKeys } = selection;
      let keys: React.ReactText[] = isShowingSubset ? [...selectedRowKeys] : [];
      dataSource.forEach((record: T) => {
        if (Array.isArray(record.children)) {
          keys = [
            ...keys,
            ...record.children.reduce((acc: React.ReactText[], child: T) => {
              const key = getRowKey(child) as React.ReactText;
              return key ? [...acc, key] : acc;
            }, []),
          ];
        }
        if (!Array.isArray(record.children) || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record);
          keys = key !== undefined ? [...keys, key] : [...keys];
        }
      });
      const uniqueKeys = Array.from(new Set(keys));
      const rows = getRowsForKeys(uniqueKeys);
      selection.onChange(uniqueKeys, rows);
    }
  }, [dataSource, selection, isShowingSubset, getRowsForKeys, getRowKey]);

  const unselectAll = React.useCallback(() => {
    if (selection) {
      if (isShowingSubset) {
        const { selectedRowKeys } = selection;
        let keysToUnselect: React.ReactText[] = [];

        dataSource.forEach((record: T) => {
          if (Array.isArray(record.children)) {
            keysToUnselect = [
              ...keysToUnselect,
              ...record.children.reduce((acc: React.ReactText[], child: T) => {
                const key = getRowKey(child) as React.ReactText;
                return key ? [...acc, key] : acc;
              }, []),
            ];
          }
          if (!Array.isArray(record.children) || selection.independentSelectionExpandedRows) {
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
  }, [dataSource, getRowKey, getRowsForKeys, isShowingSubset, selection]);

  const getSelectableChildren = React.useCallback(
    (children: T[] | undefined) => {
      return children ? children.filter((child: T) => getRowKey(child) !== undefined) : [];
    },
    [getRowKey]
  );

  const selectInvert = React.useCallback(() => {
    if (dataSource && selection) {
      const { selectedRowKeys } = selection;
      let keys: React.ReactText[] = isShowingSubset ? [...selectedRowKeys] : [];
      dataSource.forEach((record: T): void => {
        const hasChildren = Array.isArray(record.children);
        const selectableChildren = hasChildren ? getSelectableChildren(record.children) : false;
        if (selectableChildren) {
          selectableChildren.forEach((child: T) => {
            const key = getRowKey(child) as React.ReactText;
            if (selectedRowKeys.includes(key)) {
              if (isShowingSubset) keys.splice(keys.indexOf(key), 1);
            } else {
              keys = [...keys, key];
            }
          });
        }
        if (!selectableChildren || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record) as React.ReactText;
          if (selectedRowKeys.includes(key)) {
            if (isShowingSubset) keys.splice(keys.indexOf(key), 1);
          } else {
            keys = [...keys, key];
          }
        }
      });
      const rows = getRowsForKeys(keys);
      selection.onChange(keys, rows);
    }
  }, [dataSource, selection, isShowingSubset, getRowsForKeys, getSelectableChildren, getRowKey]);

  const isEmpty = React.useMemo(() => {
    return dataSource.length === 0;
  }, [dataSource]);

  const allSelected = React.useMemo(() => {
    if (isEmpty || !selection) return false;
    const { selectedRowKeys, independentSelectionExpandedRows } = selection;

    const allRecordsCount = dataSource.reduce((count: number, record: T) => {
      if (independentSelectionExpandedRows) {
        return Array.isArray(record.children) ? count + getSelectableChildren(record.children).length + 1 : count + 1;
      }
      return Array.isArray(record.children) ? count + getSelectableChildren(record.children).length : count + 1;
    }, 0);

    const selectedKeysInDataSourceCount = isShowingSubset
      ? dataSource.reduce((count: number, record: T) => {
          if (Array.isArray(record.children)) {
            return record.children.reduce((childCount: number, child: T) => {
              const key = getRowKey(child) as React.Key;
              return selectedRowKeys.includes(key) ? childCount + 1 : childCount;
            }, 0);
          }
          if (!Array.isArray(record.children) || selection.independentSelectionExpandedRows) {
            const key = getRowKey(record) as React.Key;
            return selectedRowKeys.includes(key) ? count + 1 : count;
          }
          return count;
        }, 0)
      : selectedRowKeys.length;

    return allRecordsCount === selectedKeysInDataSourceCount;
  }, [isEmpty, selection, dataSource, isShowingSubset, getSelectableChildren, getRowKey]);

  return selection?.selectedRowKeys ? (
    <S.Selection data-popup-container>
      <Tooltip title={locale?.selectAllTooltip}>
        <Button.Checkbox
          disabled={isEmpty}
          data-testid="ds-table-batch-selection-button"
          checked={allSelected}
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
          disabled={isEmpty}
          trigger={['click']}
          overlay={
            <S.SelectionMenu>
              {selection?.selections
                .filter(Boolean)
                .map((selectionMenuElement: Selection | SelectionItem): React.ReactNode => {
                  switch (selectionMenuElement) {
                    case SELECTION_ALL: {
                      return !allSelected ? (
                        <Menu.Item onClick={selectAll}>{locale?.selectAll}</Menu.Item>
                      ) : (
                        <Menu.Item onClick={unselectAll}>{locale?.unselectAll}</Menu.Item>
                      );
                    }
                    case SELECTION_INVERT: {
                      return <Menu.Item onClick={selectInvert}>{locale?.selectInvert}</Menu.Item>;
                    }
                    default: {
                      const sel = selectionMenuElement as Selection;
                      return (
                        // eslint-disable-next-line react/jsx-handler-names
                        <Menu.Item key={sel.key} onClick={sel.onClick}>
                          {sel.label}
                        </Menu.Item>
                      );
                    }
                  }
                })}
            </S.SelectionMenu>
          }
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
}

export default TableSelection;
