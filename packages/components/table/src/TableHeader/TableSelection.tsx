import * as React from 'react';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from '../Table.styles';
import { RowSelection, Selection, SelectionItem } from '../Table.types';
import { SELECTION_ALL, SELECTION_INVERT } from '../Table';

interface Props<T extends { key: React.ReactText }> {
  selection?: RowSelection<T>;
  dataSource: T[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const TableSelection: React.FC<Props> = ({ dataSource, selection }) => {
  const selectAll = React.useCallback(() => {
    if (dataSource && selection) selection.setRowSelection(dataSource.map((record: Selection) => record.key));
  }, [dataSource, selection]);

  const unselectAll = React.useCallback(() => {
    if (selection) selection.setRowSelection([]);
  }, [selection]);

  const selectInvert = React.useCallback(() => {
    if (dataSource && selection)
      selection.setRowSelection(
        dataSource
          .filter((record: Selection) => !selection.selectedRowKeys.includes(record.key))
          .map((record: Selection) => record.key)
      );
  }, [dataSource, selection]);

  const allSelected = React.useMemo(() => {
    return dataSource && selection?.selectedRowKeys && dataSource.length === selection.selectedRowKeys.length;
  }, [dataSource, selection]);

  const { selectedRowKeys, selections } = selection;

  return selectedRowKeys ? (
    <S.Selection>
      <Checkbox
        checked={allSelected}
        onChange={(event: CheckboxChangeEvent): void => {
          if (event.target.checked) {
            selectAll();
          } else {
            unselectAll();
          }
        }}
        indeterminate={selectedRowKeys.length > 0 && !allSelected}
      />
      {selections && (
        <Dropdown
          trigger={['click']}
          overlay={
            <S.SelectionMenu>
              {selections.indexOf(SELECTION_ALL) >= 0 && !allSelected && (
                <Menu.Item onClick={selectAll}>Select all</Menu.Item>
              )}
              {selections.indexOf(SELECTION_INVERT) && <Menu.Item onClick={selectInvert}>Invert selection</Menu.Item>}
              {selections.indexOf(SELECTION_ALL) >= 0 && allSelected && (
                <Menu.Item onClick={unselectAll}>Unselect all</Menu.Item>
              )}
              {selections
                .filter(
                  (sel: Selection | SelectionItem): sel is Selection => typeof (sel as Selection).key === 'string'
                )
                .map(
                  (sel: Selection): React.ReactNode => (
                    // eslint-disable-next-line react/jsx-handler-names
                    <Menu.Item key={sel.key} onClick={sel.onClick}>
                      {sel.label}
                    </Menu.Item>
                  )
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
};

export default TableSelection;
