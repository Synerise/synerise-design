import React, { useCallback, useEffect, useRef } from 'react';

import type { BaseTableProps, TableInternalProps } from '../../Table.types';
import { useStickyContext } from '../../contexts/StickyContext';
import { useTableContext } from '../../contexts/TableContext';
import { TableBody } from '../TableBody/TableBody';
import { TableBodySkeleton } from '../TableBody/TableBodySkeleton/TableBodySkeleton';
import { TableColumns } from '../TableColumns/TableColumns';
import { TableHorizontalScroll } from '../TableHorizontalScroll/TableHorizontalScroll';
import * as S from './BaseTable.styles';

export type StickyTableContentProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue> & TableInternalProps,
  | 'infiniteScroll'
  | 'texts'
  | 'isLoading'
  | 'emptyDataComponent'
  | 'onRowClick'
  | 'getRowProps'
  | 'getRowTooltipProps'
  | 'summary'
  | 'hideColumnNames'
  | 'disableColumnNamesLineBreak'
  | 'withBodyScroll'
  | 'maxHeight'
  | 'tableBodyScrollRef'
> & {
  cellHeight: number;
  addNode: (node: HTMLDivElement | null) => void;
  isEmpty: boolean;
};

// Sticky mode: column headers render in a separately scrollable wrapper so
// they can stick under the title bar, and column widths are distributed via
// the useColumnSizing()-derived CSS variables emitted on BaseTableWrapper.
// Used by VirtualTable.
export const StickyTableContent = <TData extends object, TValue>({
  infiniteScroll,
  cellHeight,
  texts,
  isLoading,
  emptyDataComponent,
  onRowClick,
  getRowProps,
  getRowTooltipProps,
  summary,
  hideColumnNames,
  disableColumnNamesLineBreak,
  withBodyScroll,
  maxHeight,
  tableBodyScrollRef,
  addNode,
  isEmpty,
}: StickyTableContentProps<TData, TValue>) => {
  const { table, rowVirtualizer } = useTableContext<TData>();
  const stickyContext = useStickyContext();
  const stickyContextRef = useRef(stickyContext);
  const tableBodyWrapperRef = useRef<HTMLDivElement | null>(null);
  const tableColumnsWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    stickyContextRef.current = stickyContext;
  }, [stickyContext]);

  const handleColumnsRef = useCallback(
    (element: HTMLDivElement | null) => {
      tableColumnsWrapperRef.current = element;
      if (!element) {
        return;
      }
      const ctx = stickyContextRef.current;
      if (
        element.clientHeight &&
        ctx &&
        ctx.stickyData.columnHeadersHeight !== element.clientHeight
      ) {
        const { setStickyData } = ctx;
        setStickyData((prevValue) => ({
          ...prevValue,
          columnHeadersHeight: element.clientHeight,
        }));
      }
      addNode(element);
    },
    [addNode],
  );

  const body = (
    <TableHorizontalScroll
      stickyRight={table.getRightTotalSize()}
      stickyLeft={table.getLeftTotalSize()}
      ref={(element) => {
        tableBodyWrapperRef.current = element;
        addNode(element);
      }}
    >
      <S.StyledTable role="table" className="ds-table">
        {isLoading ? (
          <TableBodySkeleton
            wrapperRef={tableBodyWrapperRef}
            cellHeight={cellHeight}
            key="table-body-skeleton"
          />
        ) : (
          <TableBody
            cellHeight={cellHeight}
            infiniteScroll={infiniteScroll}
            emptyDataComponent={emptyDataComponent}
            texts={texts}
            onRowClick={onRowClick}
            getRowProps={getRowProps}
            getRowTooltipProps={getRowTooltipProps}
            key="table-body"
          />
        )}
        {!isLoading && summary && <S.Tfoot>{summary}</S.Tfoot>}
      </S.StyledTable>
    </TableHorizontalScroll>
  );

  return (
    <>
      {!hideColumnNames && (!isEmpty || isLoading) && (
        <S.TableColumnsHorizontalScroll
          stickyRight={table.getRightTotalSize()}
          stickyLeft={table.getLeftTotalSize()}
          stickyData={stickyContext?.stickyData}
          isScrolled={rowVirtualizer?.scrollOffset}
          ref={handleColumnsRef}
        >
          <S.StyledTable role="table" className="ds-table">
            <TableColumns
              texts={texts}
              disableColumnNamesLineBreak={disableColumnNamesLineBreak}
            />
          </S.StyledTable>
        </S.TableColumnsHorizontalScroll>
      )}
      {withBodyScroll ? (
        <S.TableBodyScrollWrapper
          ref={tableBodyScrollRef}
          $maxHeight={maxHeight}
        >
          {body}
        </S.TableBodyScrollWrapper>
      ) : (
        body
      )}
    </>
  );
};
