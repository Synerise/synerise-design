import React from 'react';

import Tooltip from '@synerise/ds-tooltip';
import { flexRender } from '@tanstack/react-table';

import { type TableRowProps } from '../../../Table.types';
import { isSorted } from '../../../utils/sort';
import { TableCell } from '../TableCell/TableCell';
import * as S from './TableRow.styles';

export const TableRow = <TData extends object>({
  row,
  onRowClick,
  getRowProps,
  getRowTooltipProps,
}: TableRowProps<TData>) => {
  const customRowProps = getRowProps?.(row.original) ?? {};
  const { onClick: customOnClick, ...restCustomRowProps } = customRowProps;

  const mergedOnClick =
    onRowClick || customOnClick
      ? (event: React.MouseEvent<HTMLTableRowElement>): void => {
          customOnClick?.(event);
          if (onRowClick && !event.isDefaultPrevented()) {
            event.stopPropagation();
            onRowClick(row.original, event);
          }
        }
      : undefined;

  const rowContent = (
    <S.Tr
      key={row.id}
      data-key={row.id}
      data-row-depth={row.depth}
      data-row-index={row.index}
      data-index={row.index}
      role="row"
      {...restCustomRowProps}
      onClick={mergedOnClick}
    >
      {row.getVisibleCells().map((cell, columnIndex) => {
        const cellId = `cell-${cell.column.id}-${cell.row.id}`;
        const isColumnSorted = isSorted(cell.column);
        const cellContent = flexRender(
          cell.column.columnDef.cell,
          cell.getContext(),
        );
        const cellTooltipProps =
          cell.column.columnDef.meta?.getCellTooltipProps?.(row.original);

        return (
          <TableCell
            isSorted={isColumnSorted}
            key={cellId}
            headerIndex={columnIndex}
            cellKey={cellId}
            width={cell.column.getSize()}
            isPinned={cell.column.getIsPinned()}
            rightOffset={cell.column.getAfter('right')}
            leftOffset={cell.column.getStart('left')}
            align={cell.column.columnDef.meta?.align}
            style={cell.column.columnDef.meta?.style}
            data-cell-id={cellId}
            data-column-dataindex={cell.column.columnDef.meta?.dataIndex}
            data-column-title={cell.column.columnDef.meta?.title}
          >
            {cellTooltipProps ? (
              <Tooltip {...cellTooltipProps}>
                <span>{cellContent}</span>
              </Tooltip>
            ) : (
              cellContent
            )}
          </TableCell>
        );
      })}
    </S.Tr>
  );

  const rowTooltipProps = getRowTooltipProps?.(row.original);

  return rowTooltipProps ? (
    <Tooltip {...rowTooltipProps}>{rowContent}</Tooltip>
  ) : (
    rowContent
  );
};
