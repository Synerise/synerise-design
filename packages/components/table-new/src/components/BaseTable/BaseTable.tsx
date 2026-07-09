import React, { useCallback, useRef } from 'react';

import { DEFAULT_CELL_HEIGHT } from '../../Table.const';
import type { BaseTableProps, TableInternalProps } from '../../Table.types';
import { useStickyContext } from '../../contexts/StickyContext';
import { useTableContext } from '../../contexts/TableContext';
import { useScrollSync } from '../../hooks/useScrollSync';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableHorizontalScrollBar } from '../TableHorizontalScrollBar/TableHorizontalScrollBar';
import { TablePagination } from '../TablePagination/TablePagination';
import * as S from './BaseTable.styles';
import { StickyTableContent } from './StickyTableContent';
import { UnifiedTableContent } from './UnifiedTableContent';

export const BaseTable = <TData extends object, TValue>({
  infiniteScroll,
  cellHeight = DEFAULT_CELL_HEIGHT,
  className,
  style,
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
  noResultsComponent,
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
  hasNoSearchResults,
  searchProps,
  summary,
}: BaseTableProps<TData, TValue> & TableInternalProps) => {
  const horizontalScrollRefs = useRef<Array<HTMLDivElement>>([]);
  useScrollSync(horizontalScrollRefs);

  const { table, rowVirtualizer } = useTableContext<TData>();
  const stickyContext = useStickyContext();
  const useUnifiedScroll = !stickyContext;
  // Colgroup-based layout is the unified-mode default, but only when not
  // virtualizing. VirtualTable needs tbody as display: block (set in
  // TableBody.styles.ts) to act as the virtualizer's scroll container, and
  // TableRowVirtual sizes cells via the useColumnSizing() CSS variables —
  // so for virtual+unified we keep that classic pipeline.
  const useColgroupLayout = useUnifiedScroll && !rowVirtualizer;

  const addNode = useCallback((node: HTMLDivElement | null) => {
    if (node && !horizontalScrollRefs.current.includes(node)) {
      horizontalScrollRefs.current.push(node);
    }
  }, []);

  const size = Object.values(columnSizing).reduce((sum, n) => sum + n, 0);
  const isEmpty = !table.getRowModel().flatRows.length;
  // Hide the pagination footer entirely when there are no results to page through. getRowCount()
  // is the prepagination row count: the filtered/searched set in client mode, or the server-driven
  // `total` in manual mode — so this covers an empty dataSource, a search/filter matching nothing,
  // and a server total of 0 alike. It mirrors the header counter's effective total
  // (TableHeader: dataSourceTotalCount ?? getRowCount()), keeping "header shows 0" and
  // "pagination hidden" consistent.
  const hasResults = table.getRowCount() > 0;

  const contentProps = {
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
    expandable,
  };

  return (
    <S.BaseTableWrapper
      isEmpty={isEmpty}
      columnSizing={useColgroupLayout ? {} : columnSizing}
      $isColumnSizingReady={isColumnSizingReady}
      $size={useColgroupLayout ? undefined : size}
      style={style}
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
          <UnifiedTableContent<TData, TValue>
            useColgroupLayout={useColgroupLayout}
            {...contentProps}
          />
        ) : (
          <StickyTableContent<TData, TValue> {...contentProps} />
        )}
        {hasPagination && hasResults && (
          <TablePagination {...paginationProps} />
        )}
      </S.TableContainer>
      {!isEmpty && !!stickyContext && (
        <TableHorizontalScrollBar
          contentRef={(element: HTMLDivElement) => addNode(element)}
        />
      )}
    </S.BaseTableWrapper>
  );
};
