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

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function TableSelection<T extends { key: React.ReactText; children?: T[] }>({
  dataSource,
  selection,
  rowKey,
  locale,
}: Props<T>): React.ReactElement | null {
  const { getRowKey } = useRowKey(rowKey);

  const selectAll = React.useCallback(() => {
    if (dataSource && selection) {
      let keys: React.ReactText[] = [];
      let rows: T[] = [];
      dataSource.forEach((record: T) => {
        if (Array.isArray(record.children)) {
          keys = [
            ...keys,
            ...record.children.reduce((acc: React.ReactText[], child: T) => {
              const key = getRowKey(child) as React.ReactText;
              return key ? [...acc, key] : acc;
            }, []),
          ];
          rows = [...rows, ...record.children];
        }
        if (!Array.isArray(record.children) || selection.independentSelectionExpandedRows) {
          const key = getRowKey(record);
          keys = key !== undefined ? [...keys, key] : [...keys];
          rows = [...rows, record];
        }
      });
      selection.onChange(keys, rows);
    }
  }, [dataSource, selection, getRowKey]);

  const unselectAll = React.useCallback(() => {
    if (selection) selection.onChange([], []);
  }, [selection]);

  const getSelectableChildren = React.useCallback(
    (children: T[] | undefined) => {
      return children ? children.filter((child: T) => getRowKey(child) !== undefined) : [];
    },
    [getRowKey]
  );

  const selectInvert = React.useCallback(() => {
    if (dataSource && selection) {
      let selected: T[] = [];
      dataSource.forEach((record: T): void => {
        const hasChildren = Array.isArray(record.children);
        const selectableChildren = hasChildren ? getSelectableChildren(record.children) : false;
        if (selectableChildren) {
          selectableChildren.forEach((child: T) => {
            if (selection?.selectedRowKeys.indexOf(getRowKey(child) as React.ReactText) < 0) {
              selected = [...selected, child];
            }
          });
        }
        if (
          selection?.selectedRowKeys.indexOf(getRowKey(record) as React.ReactText) < 0 &&
          (!selectableChildren || selection.independentSelectionExpandedRows)
        ) {
          selected = [...selected, record];
        }
      });

      selection.onChange(
        selected.map((record: T) => getRowKey(record) as React.ReactText),
        selected
      );
    }
  }, [dataSource, selection, getRowKey, getSelectableChildren]);

  const isEmpty = React.useMemo(() => {
    return dataSource.length === 0;
  }, [dataSource]);

  const allSelected = React.useMemo(() => {
    if (isEmpty) return false;
    const allRecords = dataSource.reduce((count: number, record: T) => {
      if (selection?.independentSelectionExpandedRows) {
        return Array.isArray(record.children) ? count + getSelectableChildren(record.children).length + 1 : count + 1;
      }
      return Array.isArray(record.children) ? count + getSelectableChildren(record.children).length : count + 1;
    }, 0);

    return selection?.selectedRowKeys && allRecords === selection.selectedRowKeys.length;
  }, [isEmpty, dataSource, selection, getSelectableChildren]);

  return selection?.selectedRowKeys ? (
    <S.Selection data-popup-container>
      <Tooltip title={locale?.selectAllTooltip}>
        <Button.Checkbox
          disabled={isEmpty}
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
