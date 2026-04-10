import React, { useRef } from 'react';

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
  getRowTooltipProps,
  emptyDataComponent,
  texts,
}: TableBodyProps<TData, TValue>) => {
  const { table, rowVirtualizer } = useTableContext<TData>();

  const tbodyRef = useRef<HTMLTableSectionElement | null>(null);

  const virtualItems = rowVirtualizer ? rowVirtualizer.getVirtualItems() : [];

  const allRows = table.getRowModel().flatRows;

  return allRows.length ? (
    <S.TBody
      data-testid="ds-table-body"
      ref={tbodyRef}
      key="virtual-table-body"
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
                getRowTooltipProps={getRowTooltipProps}
                rowIndex={virtual.index}
                infiniteScroll={infiniteScroll}
                isLast={virtual.index === allRows.length - 1}
                isExpanded={row.getIsExpanded()}
                isParentExpanded={row.getIsAllParentsExpanded()}
              />
            );
          })
        : // Non-virtualized: render all rows in the normal flow
          allRows.map((row) => (
            <TableRow
              onRowClick={onRowClick}
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
    <TableEmptyBody emptyDataComponent={emptyDataComponent} texts={texts} />
  );
};
