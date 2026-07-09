import React, { useRef } from 'react';

import type { BaseTableProps, TableInternalProps } from '../../Table.types';
import { useTableContext } from '../../contexts/TableContext';
import { getUnifiedColumnSizingStyle } from '../../utils/getUnifiedColumnSizingStyle';
import { TableBody } from '../TableBody/TableBody';
import { TableBodySkeleton } from '../TableBody/TableBodySkeleton/TableBodySkeleton';
import { TableColumns } from '../TableColumns/TableColumns';
import { TableHorizontalScroll } from '../TableHorizontalScroll/TableHorizontalScroll';
import * as S from './BaseTable.styles';

export type UnifiedTableContentProps<TData, TValue> = Pick<
  BaseTableProps<TData, TValue> & TableInternalProps,
  | 'infiniteScroll'
  | 'texts'
  | 'isLoading'
  | 'emptyDataComponent'
  | 'noResultsComponent'
  | 'hasNoSearchResults'
  | 'onRowClick'
  | 'getRowProps'
  | 'getRowTooltipProps'
  | 'summary'
  | 'hideColumnNames'
  | 'disableColumnNamesLineBreak'
  | 'withBodyScroll'
  | 'maxHeight'
  | 'tableBodyScrollRef'
  | 'expandable'
> & {
  cellHeight: number;
  addNode: (node: HTMLDivElement | null) => void;
  isEmpty: boolean;
  // When false (virtual+unified), skip the <colgroup>/auto-layout overrides
  // so tbody can stay display:block for the virtualizer and cells can size
  // themselves via the useColumnSizing() CSS variables.
  useColgroupLayout: boolean;
};

// Unified-content mode: one <table> contains the column headers and body, and
// columns size themselves via a <colgroup> plus matching width/min/max on each
// <th>/<td> (see getUnifiedColumnSizingStyle). Used when no StickyContext is
// available (e.g. the paginated Table).
export const UnifiedTableContent = <TData extends object, TValue>({
  infiniteScroll,
  cellHeight,
  texts,
  isLoading,
  emptyDataComponent,
  noResultsComponent,
  hasNoSearchResults,
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
  useColgroupLayout,
  expandable,
}: UnifiedTableContentProps<TData, TValue>) => {
  const { table } = useTableContext<TData>();
  const tableBodyWrapperRef = useRef<HTMLDivElement | null>(null);

  const body = (
    <TableHorizontalScroll
      stickyRight={table.getRightTotalSize()}
      stickyLeft={table.getLeftTotalSize()}
      ref={(element) => {
        tableBodyWrapperRef.current = element;
        addNode(element);
      }}
      nativeScrollbar={useColgroupLayout}
    >
      <S.StyledTable
        role="table"
        className="ds-table"
        $tableLayoutAuto={useColgroupLayout}
      >
        {useColgroupLayout && !isEmpty && (
          <colgroup>
            {table.getVisibleLeafColumns().map((column, index) => (
              <col
                key={column.id ?? `col-${index}`}
                style={getUnifiedColumnSizingStyle(column)}
              />
            ))}
          </colgroup>
        )}
        {!hideColumnNames && (!isEmpty || isLoading) && (
          <TableColumns
            texts={texts}
            disableColumnNamesLineBreak={disableColumnNamesLineBreak}
          />
        )}
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
            noResultsComponent={noResultsComponent}
            hasNoSearchResults={hasNoSearchResults}
            texts={texts}
            onRowClick={onRowClick}
            getRowProps={getRowProps}
            getRowTooltipProps={getRowTooltipProps}
            expandable={expandable}
            key="table-body"
          />
        )}
        {!isLoading && summary && <S.Tfoot>{summary}</S.Tfoot>}
      </S.StyledTable>
    </TableHorizontalScroll>
  );

  return withBodyScroll ? (
    <S.TableBodyScrollWrapper ref={tableBodyScrollRef} $maxHeight={maxHeight}>
      {body}
    </S.TableBodyScrollWrapper>
  ) : (
    body
  );
};
