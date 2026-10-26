import { flexRender, type Row } from '@tanstack/react-table';
import React, { memo, useCallback } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import { useTableContext } from '../../../contexts/TableContext';
import { useExpandedRowMeasure } from '../../../hooks/useExpandedRowMeasure';
import { INFINITE_LOADER_ITEM_HEIGHT } from '../../../Table.const';
import type { TableRowVirtualProps } from '../../../Table.types';
import { isSorted } from '../../../utils/sort';
import { TableCell } from '../TableCell/TableCell';
import { InfiniteLoaderRow } from './InfiniteLoaderRow/InfiniteLoaderRow';
import * as S from './TableRow.styles';

const TableRowVirtualInner = <TData extends object>({
  cellHeight,
  rowIndex,
  virtual,
  infiniteScroll,
  texts,
  row,
  isLast,
  onRowClick,
  getRowProps,
  getRowTooltipProps,
  isExpanded,
  isParentExpanded,
  expandable,
}: TableRowVirtualProps<TData>) => {
  const { rowVirtualizer } = useTableContext();
  const isFirst = rowIndex === 0;

  const renderLoaderRow = useCallback(
    (position: 'TOP' | 'BOTTOM') => {
      let isVisible = false;
      let infiniteLoaderItemProps;

      let top = virtual.start;
      let loadMore = infiniteScroll?.onScrollEndReach;

      if (position === 'TOP') {
        isVisible = Boolean(
          infiniteScroll?.prevPage?.hasMore && rowIndex === 0,
        );
        infiniteLoaderItemProps = infiniteScroll?.prevPage;
        top = 0;
        loadMore = infiniteScroll?.onScrollTopReach;
      }
      if (position === 'BOTTOM') {
        isVisible = Boolean(isLast && infiniteScroll?.nextPage);
        infiniteLoaderItemProps = infiniteScroll?.nextPage;
        const prevDataInfiniteLoaderHeight = infiniteScroll?.prevPage?.hasMore
          ? INFINITE_LOADER_ITEM_HEIGHT
          : 0;
        top = virtual.start + virtual.size + prevDataInfiniteLoaderHeight + 1; // +1 accounts for border
      }

      return (
        infiniteLoaderItemProps &&
        isVisible && (
          <InfiniteLoaderRow
            position={position}
            texts={texts}
            infiniteLoaderItemProps={infiniteLoaderItemProps}
            loadMore={loadMore}
            style={{
              position: 'absolute',
              top: `${top}px`,
              height: `${INFINITE_LOADER_ITEM_HEIGHT}px`,
              left: 0,
              right: 0,
            }}
          />
        )
      );
    },
    [virtual.size, infiniteScroll, isLast, rowIndex, texts, virtual.start],
  );

  const top = infiniteScroll?.prevPage?.hasMore
    ? virtual.start + INFINITE_LOADER_ITEM_HEIGHT
    : virtual.start;

  const isChild = !!row.parentId;
  const isChildExpanded = isChild && !!isParentExpanded;
  const isVisible = !isChild || !!isParentExpanded;

  const renderRow = useCallback(
    (tableRow: Row<TData>) => {
      return tableRow.getVisibleCells().map((cell, columnIndex) => {
        const colId = cell.column.id;
        const isColumnSorted = isSorted(cell.column);
        const cellRenderer = isChild
          ? (cell.column.columnDef.meta?.childCell ??
            cell.column.columnDef.cell)
          : cell.column.columnDef.cell;
        const cellContent = flexRender(cellRenderer, cell.getContext());
        const cellTooltipProps =
          cell.column.columnDef.meta?.getCellTooltipProps?.(tableRow.original);

        return (
          <TableCell
            isSorted={isColumnSorted}
            key={colId}
            headerIndex={columnIndex}
            data-column-key={colId}
            width={cell.column.getSize()}
            height={cellHeight}
            isPinned={cell.column.getIsPinned()}
            rightOffset={cell.column.getAfter('right')}
            leftOffset={cell.column.getStart('left')}
            align={cell.column.columnDef.meta?.align}
            style={cell.column.columnDef.meta?.style}
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
      });
    },
    [cellHeight, isChild],
  );

  const rowTooltipProps = getRowTooltipProps?.(row.original);

  const customRowProps = getRowProps?.(row.original) ?? {};
  const {
    onClick: customOnClick,
    style: customStyle,
    ...restCustomRowProps
  } = customRowProps;

  const canExpand =
    !expandable?.rowExpandable || expandable.rowExpandable(row.original);

  const measuresExpandedContent = !!expandable?.expandedRowRender;
  const expandedContent =
    expandable?.expandedRowRender && isVisible && isExpanded && canExpand
      ? expandable.expandedRowRender(
          row.original,
          row.index,
          row.depth,
          isExpanded,
        )
      : null;
  const { rowRef, contentRef, rowHeight } = useExpandedRowMeasure({
    index: virtual.index,
    enabled: measuresExpandedContent,
    hasExpandedContent: expandedContent !== null,
    initialRowHeight: cellHeight + 1,
  });

  let rowHeightStyle: string | undefined = `${virtual.size}px`;
  if (!isVisible) {
    rowHeightStyle = '0px';
  } else if (measuresExpandedContent) {
    // virtual.size includes the expanded content below the row
    rowHeightStyle = undefined;
  }

  const togglesOnRowClick = !!expandable?.expandRowByClick && canExpand;

  const mergedOnClick =
    onRowClick || customOnClick || togglesOnRowClick
      ? (event: React.MouseEvent<HTMLTableRowElement>): void => {
          customOnClick?.(event);
          if (togglesOnRowClick && !event.isDefaultPrevented()) {
            const nextExpanded = !row.getIsExpanded();
            row.toggleExpanded();
            expandable?.onExpand?.(nextExpanded, row.original);
          }
          if (onRowClick && !event.isDefaultPrevented()) {
            event.stopPropagation();
            onRowClick(row.original, event);
          }
        }
      : undefined;

  const virtualRowContent = (
    <S.VirtualRow
      key={row.id}
      data-key={row.id}
      data-row-depth={row.depth}
      data-row-ischild={isChild}
      data-row-index={virtual.index}
      data-index={virtual.index}
      {...(isChild ? { 'data-row-expanded': isChildExpanded } : {})}
      {...restCustomRowProps}
      className={
        restCustomRowProps.className
          ? `ds-table-row ${restCustomRowProps.className}`
          : 'ds-table-row'
      }
      ref={measuresExpandedContent ? rowRef : rowVirtualizer?.measureElement}
      style={{
        ...customStyle,
        position: 'absolute',
        top: `${top}px`,
        height: rowHeightStyle,
        left: 0,
        right: 0,
      }}
      isVisible={isVisible}
      isChild={isChild}
      onClick={mergedOnClick}
    >
      {renderRow(row)}
    </S.VirtualRow>
  );

  return (
    <>
      {isFirst && renderLoaderRow('TOP')}
      {rowTooltipProps ? (
        <Tooltip {...rowTooltipProps}>{virtualRowContent}</Tooltip>
      ) : (
        virtualRowContent
      )}
      {expandedContent !== null && (
        <S.VirtualExpandedContentRow
          ref={contentRef}
          data-key={`${row.id}-expanded`}
          data-row-expanded-content="true"
          role="row"
          style={{
            position: 'absolute',
            top: `${top + rowHeight}px`,
            left: 0,
            right: 0,
          }}
        >
          <S.VirtualExpandedContentCell colSpan={row.getVisibleCells().length}>
            {expandedContent}
          </S.VirtualExpandedContentCell>
        </S.VirtualExpandedContentRow>
      )}
      {isLast && renderLoaderRow('BOTTOM')}
    </>
  );
};

export const TableRowVirtual = memo(
  TableRowVirtualInner,
) as typeof TableRowVirtualInner;
