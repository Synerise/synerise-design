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
  emptyDataComponent,
  texts,
  expandable,
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
      className="ds-table-body"
      data-testid="ds-table-body"
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
        ? // Virtualized: place spacer and absolutely-positioned rows.
          // Note: `expandedRowRender` is not honored in virtual mode because
          // variable-height expanded rows are not yet integrated with the
          // virtualizer's size estimation.
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
                expandable={expandable}
                rowIndex={virtual.index}
                infiniteScroll={infiniteScroll}
                isLast={virtual.index === allRows.length - 1}
                isSelected={row.getIsSelected()}
                isExpanded={row.getIsExpanded()}
                isParentExpanded={row.getIsAllParentsExpanded()}
              />
            );
          })
        : // Non-virtualized: render rows + optional expanded-content row after
          // each expanded parent (mirrors antd's expandedRowRender behavior).
          allRows.map((row) => {
            const isExpanded = row.getIsExpanded();
            const canExpand =
              !expandable?.rowExpandable ||
              expandable.rowExpandable(row.original);
            const expandedContent =
              expandable?.expandedRowRender && isExpanded && canExpand
                ? expandable.expandedRowRender(
                    row.original,
                    row.index,
                    row.depth,
                    isExpanded,
                  )
                : null;
            return (
              <React.Fragment key={row.id}>
                <TableRow
                  onRowClick={onRowClick}
                  getRowProps={getRowProps}
                  getRowTooltipProps={getRowTooltipProps}
                  expandable={expandable}
                  row={row}
                  isSelected={row.getIsSelected()}
                  isExpanded={isExpanded}
                  isParentExpanded={row.getIsAllParentsExpanded()}
                />
                {expandedContent !== null && (
                  <S.ExpandedContentRow
                    data-key={`${row.id}-expanded`}
                    data-row-expanded-content="true"
                    role="row"
                  >
                    <S.ExpandedContentCell
                      colSpan={row.getVisibleCells().length}
                    >
                      {expandedContent}
                    </S.ExpandedContentCell>
                  </S.ExpandedContentRow>
                )}
              </React.Fragment>
            );
          })}
    </S.TBody>
  ) : (
    <TableEmptyBody emptyDataComponent={emptyDataComponent} texts={texts} />
  );
};
