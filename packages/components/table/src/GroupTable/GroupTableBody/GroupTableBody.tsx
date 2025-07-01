import React, { type Key } from 'react';

import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import Icon, { AddS } from '@synerise/ds-icon';
import Status from '@synerise/ds-status';

import { useRowKey } from '../../hooks/useRowKey';
import * as S from '../GroupTable.styles';
import { GROUP_BY } from '../GroupTable.types';
import { type Props } from './GroupTableBody.types';

function GroupTableBody<T>({
  group,
  columns,
  rowKey,
  selection,
  allItems,
  expanded,
  expandGroup,
  addItem,
  activeGroup,
  hideGroupExpander,
}: Props<T>): JSX.Element {
  const { getRowKey } = useRowKey(rowKey);

  const allRowKeys = React.useMemo(() => {
    return group.children.length
      ? group.children[0].props.record.rows.map((row: T) => getRowKey(row))
      : [];
  }, [group, getRowKey]);

  const selectedRowsNumber = React.useMemo(() => {
    return (
      selection?.selectedRowKeys?.filter((key: Key) => allRowKeys.includes(key))
        .length || 0
    );
  }, [allRowKeys, selection]);

  const activeColumn = React.useMemo(() => {
    return group.children.length
      ? columns?.find(
          (column) =>
            column.dataIndex === group.children[0].props.record.column,
        )
      : undefined;
  }, [columns, group]);

  const groupExpander = React.useMemo(() => {
    return (
      !hideGroupExpander && (
        <Button.Expander
          onClick={(): void => expandGroup(group['data-row-key'])}
          expanded={expanded}
        />
      )
    );
  }, [expanded, expandGroup, hideGroupExpander, group]);

  return (
    <>
      <S.GroupTableRow className={`${group.className} ds-group-row`}>
        <td colSpan={group.children.length + 1}>
          <S.GroupRow>
            <S.GroupRowLeft>
              {selection && (
                <S.GroupSelection>
                  <Checkbox
                    checked={
                      selectedRowsNumber === allRowKeys.length &&
                      allRowKeys.length > 0
                    }
                    disabled={allRowKeys.length === 0}
                    indeterminate={
                      selectedRowsNumber > 0 &&
                      selectedRowsNumber < allRowKeys.length
                    }
                    onChange={(event): void => {
                      if (event.target.checked) {
                        const selectedKeys = Array.from(
                          new Set([
                            ...(selection?.selectedRowKeys || []),
                            ...allRowKeys,
                          ]),
                        );
                        selection.onChange(
                          selectedKeys,
                          allItems.filter(
                            (item) =>
                              selectedKeys.indexOf(getRowKey(item)) >= 0,
                          ),
                        );
                      } else {
                        const selectedKeys = selection?.selectedRowKeys.filter(
                          (selected) => allRowKeys.indexOf(selected) < 0,
                        );
                        selection.onChange(
                          selectedKeys,
                          allItems.filter((item) => {
                            const key = getRowKey(item);
                            return key && selectedKeys?.indexOf(key) < 0;
                          }),
                        );
                      }
                    }}
                  />
                </S.GroupSelection>
              )}
              <S.GroupValue withSelection={Boolean(selection)}>
                {activeColumn?.render &&
                activeGroup?.groupType === GROUP_BY.value ? (
                  activeColumn.render(
                    group.children[0].props.record.value,
                    {} as T,
                    -1,
                  )
                ) : (
                  <S.GroupValueLabel>
                    {group.children[0].props.record.value}
                  </S.GroupValueLabel>
                )}
                <Status
                  type="disabled"
                  label={group.children[0].props.record.rows.length}
                />
              </S.GroupValue>
            </S.GroupRowLeft>
            <S.GroupRowRight>
              {addItem && activeGroup && (
                <S.GroupAddItemButton
                  type="ghost"
                  mode="icon-label"
                  onClick={(): void => {
                    addItem(activeGroup.column, activeGroup.value);
                  }}
                >
                  <Icon component={<AddS />} />
                  Add item
                </S.GroupAddItemButton>
              )}
              {groupExpander}
            </S.GroupRowRight>
          </S.GroupRow>
        </td>
      </S.GroupTableRow>
      {expanded &&
        group.children[0].props.record.rows.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (rowRecord: any): React.ReactNode => {
            const key = getRowKey(rowRecord);
            return (
              <tr key={rowRecord.column}>
                {selection && (
                  <S.SubRow withBorderLeft>
                    <Checkbox
                      checked={
                        key !== undefined &&
                        selection.selectedRowKeys.indexOf(key) >= 0
                      }
                      onChange={(event): void => {
                        if (event.target.checked && key !== undefined) {
                          selection.onChange(
                            [...selection.selectedRowKeys, key],
                            [...allItems, rowRecord],
                          );
                        } else {
                          selection.onChange(
                            selection?.selectedRowKeys.filter(
                              (item) => item !== key,
                            ),
                            allItems.filter((item) => getRowKey(item) !== key),
                          );
                        }
                      }}
                    />
                  </S.SubRow>
                )}
                {columns?.map((column, index): React.ReactNode => {
                  return (
                    column.dataIndex && (
                      <S.SubRow
                        key={column.dataIndex}
                        selected={
                          column.dataIndex ===
                          group.children[0].props.record.column
                        }
                        sorted={Boolean(column.sortOrder)}
                      >
                        {(column.render &&
                          column.render(
                            rowRecord[column.dataIndex as string],
                            rowRecord,
                            index,
                          )) ||
                          rowRecord[column.dataIndex as string]}
                      </S.SubRow>
                    )
                  );
                })}
              </tr>
            );
          },
        )}
    </>
  );
}

export default GroupTableBody;
