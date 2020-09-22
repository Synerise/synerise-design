import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import Checkbox from '@synerise/ds-checkbox';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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

  const allSelected = React.useMemo(() => {
    const allRecords = dataSource.reduce((count: number, record: T) => {
      return record.children !== undefined ? count + record.children.length : count + 1;
    }, 0);
    return dataSource && selection?.selectedRowKeys && allRecords === selection.selectedRowKeys.length;
  }, [dataSource, selection]);

  const isEmpty = React.useMemo(() => {
    return dataSource.length === 0;
  }, [dataSource]);

  return selection?.selectedRowKeys ? (
    <S.Selection>
      <Checkbox
        disabled={isEmpty}
        checked={allSelected}
        onChange={(event: CheckboxChangeEvent): void => {
          if (event.target.checked) {
            selectAll();
          } else {
            unselectAll();
          }
        }}
        indeterminate={selection?.selectedRowKeys.length > 0 && !allSelected}
      />
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
          <Button mode="single-icon" type="ghost">
            <Icon component={<AngleDownS />} />
          </Button>
        </Dropdown>
      )}
    </S.Selection>
  ) : null;
}

export default TableSelection;
