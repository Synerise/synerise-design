import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Expander } from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import Icon, { ChildRowLeftDownM } from '@synerise/ds-icon';
import { type CellContext, type ColumnDef } from '@tanstack/react-table';

import { Table } from '../../Table';
import * as S from './TreeTable.styles';
import { INDENT_SIZE } from './TreeTable.styles';
import { type TreeTableProps } from './TreeTable.types';

const getAllKeys = <TData,>(
  data: TData[],
  childrenKey: keyof TData,
  getRowKey: (row: TData) => string,
): string[] => {
  const keys: string[] = [];
  const traverse = (rows: TData[]) => {
    for (const row of rows) {
      keys.push(getRowKey(row));
      const children = row[childrenKey] as TData[] | undefined;
      if (children?.length) {
        traverse(children);
      }
    }
  };
  traverse(data);
  return keys;
};

export const TreeTable = <TData extends object, TValue>({
  data,
  columns,
  childrenColumnName,
  defaultExpandAllRows,
  expandedRowKeys: controlledExpandedKeys,
  onExpandRow,
  expandIconColumnIndex = 0,
  rowKey,
  ...props
}: TreeTableProps<TData, TValue>) => {
  const childrenKey = (childrenColumnName ?? 'children') as keyof TData;

  const getRowKey = useCallback(
    (row: TData): string => {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      if (typeof rowKey === 'string') {
        return String(row[rowKey as keyof TData]);
      }
      return String(
        (row as Record<string, unknown>).key ??
          (row as Record<string, unknown>).id ??
          '',
      );
    },
    [rowKey],
  );

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(
    () => {
      if (defaultExpandAllRows) {
        return getAllKeys(data, childrenKey, getRowKey);
      }
      return [];
    },
  );

  useEffect(() => {
    if (defaultExpandAllRows) {
      setInternalExpandedKeys(getAllKeys(data, childrenKey, getRowKey));
    }
  }, [data, defaultExpandAllRows, childrenKey, getRowKey]);

  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;

  const toggleExpand = useCallback(
    (key: string) => {
      const isExpanded = expandedKeys.includes(key);
      onExpandRow?.(key, !isExpanded);

      if (!controlledExpandedKeys) {
        setInternalExpandedKeys((prev) =>
          isExpanded ? prev.filter((k) => k !== key) : [...prev, key],
        );
      }
    },
    [expandedKeys, onExpandRow, controlledExpandedKeys],
  );

  const hasChildren = useCallback(
    (row: TData): boolean => {
      const children = row[childrenKey] as TData[] | undefined;
      return !!children?.length;
    },
    [childrenKey],
  );

  const treeColumns = useMemo((): ColumnDef<TData, TValue>[] => {
    if (!columns.length || expandIconColumnIndex < 0) {
      // When expandIconColumnIndex is -1, no indentation rendering
      return columns;
    }

    const targetIndex = Math.min(expandIconColumnIndex, columns.length - 1);

    return columns.map((col, index) => {
      if (index !== targetIndex) {
        return col;
      }

      return {
        ...col,
        cell: (info: CellContext<TData, TValue>) => {
          const depth = info.row.depth;
          const rowData = info.row.original;
          const rowId = getRowKey(rowData);
          const isParent = hasChildren(rowData);
          const isExpanded = expandedKeys.includes(rowId);

          const indents = Array.from({ length: depth }, (_, i) => (
            <S.IndentBar key={i} $level={i} $active={i + 1 === depth} />
          ));

          const originalCell =
            typeof col.cell === 'function'
              ? (
                  col.cell as (
                    info: CellContext<TData, TValue>,
                  ) => React.ReactNode
                )(info)
              : info.getValue();

          return (
            <S.TreeCellWrapper $indentWidth={depth * INDENT_SIZE}>
              {depth > 0 && (
                <S.IndentsContainer $depth={depth}>
                  {indents}
                </S.IndentsContainer>
              )}
              <S.ExpanderWrapper>
                {isParent ? (
                  <Expander
                    expanded={isExpanded}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleExpand(rowId);
                    }}
                  />
                ) : depth > 0 ? (
                  <Icon
                    component={<ChildRowLeftDownM />}
                    color={theme.palette['grey-400']}
                  />
                ) : null}
              </S.ExpanderWrapper>
              {originalCell as React.ReactNode}
            </S.TreeCellWrapper>
          );
        },
      };
    });
  }, [
    columns,
    expandIconColumnIndex,
    getRowKey,
    hasChildren,
    expandedKeys,
    toggleExpand,
  ]);

  return (
    <S.TreeTableRoot>
      <Table<TData, TValue>
        data={data}
        columns={treeColumns}
        rowKey={rowKey}
        expandable={{
          childrenColumnName: childrenKey,
          expandedRowKeys: expandedKeys,
        }}
        {...props}
      />
    </S.TreeTableRoot>
  );
};
