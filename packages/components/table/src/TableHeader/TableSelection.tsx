import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { OptionVerticalM } from '@synerise/ds-icon/dist/icons';
import * as S from '../Table.styles';
import { Selection, SelectionItem } from '../Table.types';
import { SELECTION_ALL, SELECTION_INVERT } from '../Table';
import { Props } from './TableSelection.types';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
function TableSelection<T extends { key: React.ReactText; children?: T[] }>({
  dataSource,
  selection,
  rowKey,
  locale,
}: Props<T>): React.ReactElement | null {
  const getRowKey = React.useCallback(
    (row): React.ReactText | undefined => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return undefined;
    },
    [rowKey]
  );

  const selectAll = React.useCallback(() => {
    if (dataSource && selection) {
      let keys: React.ReactText[] = [];
      let rows: T[] = [];
      dataSource.forEach((record: T) => {
        if (record.children !== undefined && Array.isArray(record.children)) {
          keys = [...keys, ...record.children.map((child: T) => getRowKey(child) as React.ReactText)];
          rows = [...rows, ...record.children];
        } else {
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

  const selectInvert = React.useCallback(() => {
    if (dataSource && selection) {
      let selected: T[] = [];
      dataSource.forEach((record: T): void => {
        const hasChilds = record.children !== undefined && Array.isArray(record.children);
        if (hasChilds) {
          record.children &&
            record.children.forEach((child: T) => {
              if (selection?.selectedRowKeys.indexOf(getRowKey(child) as React.ReactText) < 0) {
                selected = [...selected, child];
              }
            });
        } else if (selection?.selectedRowKeys.indexOf(getRowKey(record) as React.ReactText) < 0) {
          selected = [...selected, record];
        }
      });

      selection.onChange(
        selected.map((record: T) => getRowKey(record) as React.ReactText),
        selected
      );
    }
  }, [dataSource, selection, getRowKey]);

  const isEmpty = React.useMemo(() => {
    return dataSource.length === 0;
  }, [dataSource]);

  const allSelected = React.useMemo(() => {
    if (isEmpty) return false;
    const allRecords = dataSource.reduce((count: number, record: T) => {
      return record.children !== undefined ? count + record.children.length : count + 1;
    }, 0);
    return selection?.selectedRowKeys && allRecords === selection.selectedRowKeys.length;
  }, [dataSource, selection, isEmpty]);

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
              {selection?.selections.filter(Boolean).map(
                (selectionMenuElement: Selection | SelectionItem): React.ReactNode => {
                  switch (selectionMenuElement) {
                    case SELECTION_ALL: {
                      return !allSelected ? (
                        <Menu.Item onClick={selectAll}>Select all</Menu.Item>
                      ) : (
                        <Menu.Item onClick={unselectAll}>Unselect all</Menu.Item>
                      );
                    }
                    case SELECTION_INVERT: {
                      return <Menu.Item onClick={selectInvert}>Invert selection</Menu.Item>;
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
                }
              )}
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
