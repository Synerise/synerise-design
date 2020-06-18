import * as React from 'react';
import Checkbox from '@synerise/ds-checkbox/dist';
import Status from '@synerise/ds-status';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import AddS from '@synerise/ds-icon/dist/icons/AddS';
import { GROUP_BY } from '@synerise/ds-column-manager/dist/ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';
import * as S from '../GroupTable.styles';
import { RowSelection } from '../../Table.types';
import { GroupColumnsType, GroupType } from '../GroupTable';

interface Props<T extends unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any;
  rowKey: string | Function | undefined;
  selection?: RowSelection<T>;
  allItems: T[];
  expanded: boolean;
  expandGroup: (key: React.ReactText) => void;
  columns?: GroupColumnsType<T>[];
  addItem?: (column: string, value: React.ReactText | boolean | object) => void;
  activeGroup?: Omit<GroupType<T>, 'rows'> | undefined;
}

function GroupTableBody<T extends unknown>({
  group,
  columns,
  rowKey,
  selection,
  allItems,
  expanded,
  expandGroup,
  addItem,
  activeGroup,
}: Props<T>): JSX.Element {
  const getRowKey = React.useCallback(
    row => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return undefined;
    },
    [rowKey]
  );

  const allRowKeys = React.useMemo(() => {
    return group.children.length ? group.children[0].props.record.rows.map((row: T) => getRowKey(row)) : [];
  }, [group, getRowKey]);

  const selectedRowsNumber = React.useMemo(() => {
    return selection?.selectedRowKeys.filter((key: React.ReactText) => allRowKeys.includes(key)).length || 0;
  }, [allRowKeys, selection]);

  const activeColumn = React.useMemo(() => {
    return group.children.length
      ? columns?.find(column => column.dataIndex === group.children[0].props.record.column)
      : undefined;
  }, [columns, group]);

  return (
    <>
      <tr className={`${group.className} ds-group-row`}>
        <td colSpan={group.children.length + 1}>
          <S.GroupRow>
            <S.GroupRowLeft>
              <S.GroupSelection>
                {selection && (
                  <Checkbox
                    checked={selectedRowsNumber === allRowKeys.length && allRowKeys.length > 0}
                    disabled={allRowKeys.length === 0}
                    indeterminate={selectedRowsNumber > 0 && selectedRowsNumber < allRowKeys.length}
                    onChange={(event): void => {
                      if (event.target.checked) {
                        const selectedKeys = [...new Set([...selection?.selectedRowKeys, ...allRowKeys])];
                        selection.onChange(
                          selectedKeys,
                          allItems.filter(item => selectedKeys.indexOf(getRowKey(item)) >= 0)
                        );
                      } else {
                        const selectedKeys = selection?.selectedRowKeys.filter(
                          selected => allRowKeys.indexOf(selected) < 0
                        );
                        selection.onChange(
                          selectedKeys,
                          allItems.filter(item => selectedKeys?.indexOf(getRowKey(item)) < 0)
                        );
                      }
                    }}
                  />
                )}
              </S.GroupSelection>
              <S.GroupValue>
                {activeColumn?.render && activeGroup?.groupType === GROUP_BY.value ? (
                  activeColumn.render(group.children[0].props.record.value, {} as T, -1)
                ) : (
                  <S.GroupValueLabel>{group.children[0].props.record.value}</S.GroupValueLabel>
                )}
                <Status type="disabled" label={group.children[0].props.record.rows.length} />
              </S.GroupValue>
            </S.GroupRowLeft>
            <S.GroupRowRight>
              {addItem && activeGroup && (
                <Button
                  type="ghost"
                  mode="icon-label"
                  onClick={(): void => {
                    addItem(activeGroup.column, activeGroup.value);
                  }}
                >
                  <Icon component={<AddS />} />
                  Add item
                </Button>
              )}
              <Button.Expander onClick={(): void => expandGroup(group['data-row-key'])} expanded={expanded} />
            </S.GroupRowRight>
          </S.GroupRow>
        </td>
      </tr>
      {expanded &&
        group.children[0].props.record.rows.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (rowRecord: any): React.ReactNode => {
            const key = getRowKey(rowRecord);
            return (
              <tr key={rowRecord.column}>
                <S.SubRow withBorderLeft>
                  {selection && (
                    <Checkbox
                      checked={selection.selectedRowKeys.indexOf(key) >= 0}
                      onChange={(event): void => {
                        if (event.target.checked) {
                          selection.onChange([...selection.selectedRowKeys, key], [...allItems, rowRecord]);
                        } else {
                          selection.onChange(
                            selection?.selectedRowKeys.filter(item => item !== key),
                            allItems.filter(item => getRowKey(item) !== key)
                          );
                        }
                      }}
                    />
                  )}
                </S.SubRow>
                {columns?.map(
                  (column, index): React.ReactNode => {
                    return (
                      column.dataIndex && (
                        <S.SubRow
                          key={index}
                          selected={column.dataIndex === group.children[0].props.record.column}
                          sorted={Boolean(column.sortOrder)}
                        >
                          {(column.render && column.render(rowRecord[column.dataIndex as string], rowRecord, index)) ||
                            rowRecord[column.dataIndex as string]}
                        </S.SubRow>
                      )
                    );
                  }
                )}
              </tr>
            );
          }
        )}
    </>
  );
}

export default GroupTableBody;
