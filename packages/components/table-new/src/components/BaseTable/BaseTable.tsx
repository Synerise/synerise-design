import React, { useCallback, useEffect, useRef } from 'react';

import { DEFAULT_CELL_HEIGHT } from '../../Table.const';
import type { BaseTableProps, TableInternalProps } from '../../Table.types';
import { useStickyContext } from '../../contexts/StickyContext';
import { useTableContext } from '../../contexts/TableContext';
import { useScrollSync } from '../../hooks/useScrollSync';
import { TableBody } from '../TableBody/TableBody';
import { TableBodySkeleton } from '../TableBody/TableBodySkeleton/TableBodySkeleton';
import { TableColumns } from '../TableColumns/TableColumns';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableHorizontalScroll } from '../TableHorizontalScroll/TableHorizontalScroll';
import { TableHorizontalScrollBar } from '../TableHorizontalScrollBar/TableHorizontalScrollBar';
import { TablePagination } from '../TablePagination/TablePagination';
import * as S from './BaseTable.styles';

export const BaseTable = <TData extends object, TValue>({
  infiniteScroll,
  cellHeight = DEFAULT_CELL_HEIGHT,
  className,
  itemsMenu,
  texts,
  isCounterLoading,
  isLoading,
  rowKey,
  title,
  hideTitleBar,
  hideTitlePart,
  renderCustomCounter,
  renderSelectionTitle,
  searchComponent,
  filterComponent,
  headerWithBorderTop,
  emptyDataComponent,
  headerButton,
  hideColumnNames,
  expandable,
  columnSizing,
  isColumnSizingReady,
  paginationProps,
  hasPagination,
  disableColumnNamesLineBreak,
  dataSourceTotalCount,
  cardStyles,
  tableOuterRef,
  withScroll,
  withBodyScroll,
  maxHeight,
  tableBodyScrollRef,
  onRowClick,
  getRowProps,
  getRowTooltipProps,
  searchQuery,
  setSearchQuery,
  handleSearchClear,
  hasBuiltInSearch,
  searchProps,
}: BaseTableProps<TData, TValue> & TableInternalProps) => {
  const horizontalScrollRefs = useRef<Array<HTMLDivElement>>([]);
  const tableBodyWrapperRef = useRef<HTMLDivElement | null>(null);

  const tableColumnsWrapperRef = useRef<HTMLDivElement | null>(null);
  useScrollSync(horizontalScrollRefs);
  const { table, rowVirtualizer } = useTableContext();
  const stickyContext = useStickyContext();
  const stickyContextRef = useRef(stickyContext);
  const useUnifiedScroll = !stickyContext;

  useEffect(() => {
    stickyContextRef.current = stickyContext;
  }, [stickyContext]);

  const addNode = useCallback((node: HTMLDivElement | null) => {
    if (node && !horizontalScrollRefs.current.includes(node)) {
      horizontalScrollRefs.current.push(node);
    }
  }, []);

  const size = Object.values(columnSizing).reduce((sum, n) => sum + n, 0);
  const isEmpty = !table.getRowModel().flatRows.length;

  const handleRef = useCallback(
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

  const tableBodyContent = (
    <TableHorizontalScroll
      stickyRight={table.getRightTotalSize()}
      stickyLeft={table.getLeftTotalSize()}
      ref={(element) => {
        tableBodyWrapperRef.current = element;
        addNode(element);
      }}
    >
      <S.StyledTable role="table">
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
      </S.StyledTable>
    </TableHorizontalScroll>
  );

  const unifiedTableContent = (
    <TableHorizontalScroll
      stickyRight={table.getRightTotalSize()}
      stickyLeft={table.getLeftTotalSize()}
      ref={(element) => {
        tableBodyWrapperRef.current = element;
        addNode(element);
      }}
    >
      <S.StyledTable role="table">
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
            withBodyScroll={withBodyScroll}
            tableBodyScrollRef={tableBodyScrollRef}
            maxHeight={maxHeight}
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
      </S.StyledTable>
    </TableHorizontalScroll>
  );

  return (
    <S.BaseTableWrapper
      isEmpty={isEmpty}
      columnSizing={columnSizing}
      $isColumnSizingReady={isColumnSizingReady}
      $size={size}
    >
      <S.TableContainer
        ref={tableOuterRef}
        className={className}
        withBorderTop={headerWithBorderTop}
        cardStyles={cardStyles}
        withScroll={withScroll}
        $maxHeight={maxHeight}
        data-testid="ds-table-container"
      >
        {!hideTitleBar && (
          <TableHeader
            itemsMenu={itemsMenu}
            texts={texts}
            childrenColumnName={expandable?.childrenColumnName}
            isCounterLoading={isCounterLoading}
            isLoading={isLoading}
            rowKey={rowKey}
            title={title}
            hideTitlePart={hideTitlePart}
            renderCustomCounter={renderCustomCounter}
            renderSelectionTitle={renderSelectionTitle}
            searchComponent={searchComponent}
            filterComponent={filterComponent}
            headerButton={headerButton}
            dataSourceTotalCount={dataSourceTotalCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchClear={handleSearchClear}
            hasBuiltInSearch={hasBuiltInSearch}
            searchProps={searchProps}
          />
        )}
        {useUnifiedScroll ? (
          unifiedTableContent
        ) : (
          <>
            {!hideColumnNames && (!isEmpty || isLoading) && (
              <S.TableColumnsHorizontalScroll
                stickyRight={table.getRightTotalSize()}
                stickyLeft={table.getLeftTotalSize()}
                stickyData={stickyContext?.stickyData}
                isScrolled={rowVirtualizer?.scrollOffset}
                ref={handleRef}
              >
                <S.StyledTable role="table">
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
                {tableBodyContent}
              </S.TableBodyScrollWrapper>
            ) : (
              tableBodyContent
            )}
          </>
        )}
        {hasPagination && <TablePagination {...paginationProps} />}
      </S.TableContainer>
      {!isEmpty && !!stickyContext && (
        <TableHorizontalScrollBar
          contentRef={(element: HTMLDivElement) => addNode(element)}
        />
      )}
    </S.BaseTableWrapper>
  );
};
