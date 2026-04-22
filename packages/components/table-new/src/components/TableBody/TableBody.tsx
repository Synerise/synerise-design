import React from 'react';

import { DEFAULT_CELL_HEIGHT } from '../../Table.const';
import { type TableBodyProps } from '../../Table.types';
import { useTableContext } from '../../contexts/TableContext';
import * as S from './TableBody.styles';
import { TableEmptyBody } from './TableEmptyBody/TableEmptyBody';
import { TableRow } from './TableRow/TableRow';
import { TableRowVirtual } from './TableRow/TableRowVirtual';

export const TableBody = <TData extends object, TValue>({
  cellHeight = DEFAULT_CELL_HEIGHT,
  infiniteScroll,
  onRowClick,
  getRowProps,
  getRowTooltipProps,

  withBodyScroll,
  tableBodyScrollRef,
  maxHeight,
  emptyDataComponent,
  texts,
}: TableBodyProps<TData, TValue>) => {
  const { table, rowVirtualizer } = useTableContext<TData>();

  const virtualItems = rowVirtualizer ? rowVirtualizer.getVirtualItems() : [];

  const flatRows = table.getRowModel().flatRows;

  // For non-virtual tables, filter out sub-rows whose parents are not expanded.
  // Virtual tables handle this via the virtualizer count which is set in VirtualTable.tsx.
  const expandedState = table.getState().expanded;
  const isExpandedMap =
    typeof expandedState === 'object' ? expandedState : null;
  const nonVirtualRows =
    !rowVirtualizer && isExpandedMap && flatRows.some((row) => row.depth > 0)
      ? flatRows.filter((row) => {
          if (row.depth === 0) {
            return true;
          }
          let current = row.getParentRow();
          while (current) {
            if (!isExpandedMap[current.id]) {
              return false;
            }
            current = current.getParentRow();
          }
          return true;
        })
      : flatRows;

  const allRows = rowVirtualizer ? flatRows : nonVirtualRows;

  return allRows.length ? (
    <S.TBody
      data-testid="ds-table-body"
      ref={(node) => {
        if (tableBodyScrollRef) {
          tableBodyScrollRef.current = node;
        }
      }}
      key="virtual-table-body"
      $maxHeight={maxHeight}
      withBodyScroll={withBodyScroll}
      role="rowgroup"
      data-popup-container
      style={
        rowVirtualizer && virtualItems.length
          ? {
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }
          : undefined
      }
    >
      {rowVirtualizer && virtualItems.length
        ? // Virtualized: place spacer and absolutely-positioned rows
          virtualItems.map((virtual) => {
            const row = allRows[virtual.index];
            return (
              <TableRowVirtual
                virtual={virtual}
                cellHeight={cellHeight}
                row={row}
                key={row.id}
                texts={texts}
                onRowClick={onRowClick}
                getRowProps={getRowProps}
                getRowTooltipProps={getRowTooltipProps}
                rowIndex={virtual.index}
                infiniteScroll={infiniteScroll}
                isLast={virtual.index === allRows.length - 1}
                isSelected={row.getIsSelected()}
                isExpanded={row.getIsExpanded()}
                isParentExpanded={row.getIsAllParentsExpanded()}
              />
            );
          })
        : // Non-virtualized: render all rows in the normal flow
          allRows.map((row) => (
            <TableRow
              onRowClick={onRowClick}
              getRowProps={getRowProps}
              getRowTooltipProps={getRowTooltipProps}
              key={row.id}
              row={row}
              isSelected={row.getIsSelected()}
              isExpanded={row.getIsExpanded()}
              isParentExpanded={row.getIsAllParentsExpanded()}
            />
          ))}
    </S.TBody>
  ) : (
    <TableEmptyBody
      emptyDataComponent={emptyDataComponent}
      texts={texts}
      tableBodyScrollRef={tableBodyScrollRef}
    />
  );
};
