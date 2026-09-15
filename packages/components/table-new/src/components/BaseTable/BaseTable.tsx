import React, { useCallback, useEffect, useRef } from 'react';

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
  subHeaderComponent,
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

  // --- Sub-header height ---
  // Every sticky offset below the band is derived from its height, so getting this wrong is not a
  // cosmetic matter: a band whose height reads 0 parks at exactly the column header row's pinned
  // offset, where its higher z-index makes it cover the column headers instead of the reverse.
  //
  // Measured on a callback ref rather than through useResizeObserver, whose observe effect has
  // all-stable deps and therefore only ever fires on mount. The band is typically absent on the
  // table's first render and appears when a title-bar control reveals it, so a mount-only observer
  // never sees the element at all. A callback ref runs on every attach and detach, which is exactly
  // the lifecycle here.
  //
  // offsetHeight rather than the observer's contentRect: the injected content carries its own
  // border, and the band has to be measured to its outer edge or the column header row overlaps it
  // by a pixel. Observed as well as measured on attach because the content reflows — a filter
  // bar's chips wrap onto a second line as they are added.
  //
  // Writing this cannot loop: subHeaderHeight only feeds the `top` of its siblings, never its own
  // height.
  const stickyContextRef = useRef(stickyContext);
  stickyContextRef.current = stickyContext;
  const subHeaderObserverRef = useRef<ResizeObserver | null>(null);

  const reportSubHeaderHeight = useCallback((height: number) => {
    const ctx = stickyContextRef.current;
    if (!ctx || ctx.stickyData.subHeaderHeight === height) {
      return;
    }
    ctx.setStickyData((prevValue) => ({
      ...prevValue,
      subHeaderHeight: height,
    }));
  }, []);

  const handleSubHeaderRef = useCallback(
    (element: HTMLDivElement | null) => {
      subHeaderObserverRef.current?.disconnect();
      subHeaderObserverRef.current = null;

      if (!element) {
        // The band going away has to zero the offsets it was contributing to.
        reportSubHeaderHeight(0);
        return;
      }

      reportSubHeaderHeight(element.offsetHeight);

      if (typeof ResizeObserver !== 'undefined') {
        subHeaderObserverRef.current = new ResizeObserver(() => {
          reportSubHeaderHeight(element.offsetHeight);
        });
        subHeaderObserverRef.current.observe(element);
      }
    },
    [reportSubHeaderHeight],
  );

  useEffect(
    () => () => {
      subHeaderObserverRef.current?.disconnect();
    },
    [],
  );

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

  // Widths ride on inline custom properties: a width change is one CSSOM write,
  // not a new styled-components class (see BaseTable.styles.ts).
  const columnWidthVars = Object.fromEntries(
    Object.entries(useColgroupLayout ? {} : columnSizing).map(
      ([key, value]) => [`--${key}-width`, `${value}px`],
    ),
  );
  const tableSize =
    !isEmpty && !useColgroupLayout && size ? `${size}px` : '100%';
  const wrapperStyle = {
    ...columnWidthVars,
    '--table-size': tableSize,
    ...style,
  } as React.CSSProperties;

  return (
    <S.BaseTableWrapper
      $isColumnSizingReady={isColumnSizingReady}
      style={wrapperStyle}
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
        {/*
         * Sibling of TableHeader, above the column header row. Sticky in the same
         * stack as the title bar and revealed with it, so the surface a title-bar
         * control opens cannot be scrolled away while the control stays. Width,
         * padding and borders belong to the injected content.
         */}
        {subHeaderComponent && (
          <S.SubHeader
            ref={handleSubHeaderRef}
            stickyData={stickyContext?.stickyData}
            data-testid="ds-table-subheader"
          >
            {subHeaderComponent}
          </S.SubHeader>
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
