import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useVirtualizer } from '@tanstack/react-virtual';

import {
  DEFAULT_CELL_HEIGHT,
  DEFAULT_STICKY_VALUE,
  INFINITE_LOADER_ITEM_HEIGHT,
  INFINITE_SCROLL_PADDING_START,
} from './Table.const';
import { type StickyData, type VirtualTableProps } from './Table.types';
import { BackToTopButton } from './components/BackToTopButton/BackToTopButton';
import { BaseTable } from './components/BaseTable/BaseTable';
import { SelectionContext } from './contexts/SelectionContext';
import { StickyContext } from './contexts/StickyContext';
import { TableContext } from './contexts/TableContext';
import { useDefaultTexts } from './hooks/useDefaultTexts';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useTable } from './hooks/useTable';
import { useTableHighlight } from './hooks/useTableHighlight';
import { getDefaultSkeletonColumns } from './utils/getDefaultSkeletonColumns';
import { getInfiniteScrollPadding } from './utils/getInfiniteScrollPadding';
import { getIsRevealed } from './utils/getIsRevealed';
import { processColumns } from './utils/processColumns';

export const VirtualTable = <TData extends object, TValue>({
  data,
  infiniteScroll,
  scrollElementRef,
  columns,
  tableRef,
  selectionConfig,
  selectedRowKeys,
  rowKey,
  onSort,
  stickyHeader,
  texts: defaultTexts,
  cellHeight = DEFAULT_CELL_HEIGHT,
  expandable,
  onItemsRendered,
  isLoading,
  onScrollToRecordIndex,
  maxHeight,
  matchesSearchQuery,
  filterData,
  onSearchQueryChange,
  searchProps,
  showBackToTopButton,
  onBackToTop,
  ...props
}: VirtualTableProps<TData, TValue>) => {
  const [stickyData, setStickyData] =
    useState<StickyData>(DEFAULT_STICKY_VALUE);

  const texts = useDefaultTexts(defaultTexts);

  const tableOuterRef = useRef<HTMLDivElement | null>(null);
  const tableBodyScrollRef = useRef<HTMLDivElement | null>(null);
  const hasExternalScroll = !!scrollElementRef;
  const withContainerScroll = !hasExternalScroll && !!stickyHeader;
  const withBodyScroll = !hasExternalScroll && !stickyHeader;

  // Determine the scroll element that powers the virtualizer:
  // 1. External scroll container (scrollElementRef)
  // 2. TableContainer itself (stickyHeader — header sticks while container scrolls)
  // 3. Body-only wrapper (no stickyHeader — header/columns stay visible, body scrolls)
  const scrollableContainerRef =
    scrollElementRef || (stickyHeader ? tableOuterRef : tableBodyScrollRef);
  const hasSelection = !!selectionConfig;

  const processedColumns = useMemo(() => {
    return columns.length
      ? processColumns(columns, hasSelection, texts)
      : columns;
  }, [columns, hasSelection, texts]);

  const skeletonColumns = useMemo(
    () => getDefaultSkeletonColumns<TData, TValue>(),
    [],
  );

  const finalColumns =
    !processedColumns.length && isLoading ? skeletonColumns : processedColumns;

  const {
    table,
    columnSizing,
    isColumnSizingReady,
    searchQuery,
    setSearchQuery,
    handleSearchClear,
    hasBuiltInSearch,
    totalDataCount,
  } = useTable({
    data,
    expandable,
    columns: finalColumns,
    infiniteScroll,
    wrapperRef: scrollableContainerRef,
    rowKey,
    selectionConfig,
    selectedRowKeys,
    matchesSearchQuery,
    filterData,
    onSearchQueryChange,
    onSort,
    pagination: false,
  });

  const tableIsEmpty = table.getRowModel().rows.length === 0;

  const handleItemsRendered = useCallback(
    ({ visibleStartIndex }: { visibleStartIndex: number }) => {
      if (!onItemsRendered) {
        return;
      }
      const { flatRows, rows: topLevelRows } = table.getRowModel();
      const row = flatRows[visibleStartIndex];
      if (!row) {
        return;
      }
      // walk up to root (no-op for depth-0 rows)
      let rootRow = row;
      let parent = row.getParentRow();
      while (parent) {
        rootRow = parent;
        parent = parent.getParentRow();
      }
      const rootIndex = topLevelRows.findIndex((r) => r.id === rootRow.id);
      onItemsRendered({
        visibleStartIndex: rootIndex >= 0 ? rootIndex : visibleStartIndex,
      });
    },
    [onItemsRendered, table],
  );

  const { scrollDirection, handleScrollDirection } = useInfiniteScroll({
    infiniteScroll,
    onItemsRendered: handleItemsRendered,
    setStickyData,
  });

  const getDimensions = useCallback(() => {
    return {
      titleHeight: stickyData.titleBarHeight,
      parentTopOffset: stickyData.containerPaddingTop,
      headerHeight: stickyData.columnHeadersHeight,
    };
  }, [
    stickyData.columnHeadersHeight,
    stickyData.containerPaddingTop,
    stickyData.titleBarHeight,
  ]);

  //region virtualiser
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().flatRows.length,
    getScrollElement: () => scrollableContainerRef.current,
    estimateSize: () => cellHeight + 1,
    onChange: handleScrollDirection,
    overscan: 15,
    paddingEnd: getInfiniteScrollPadding(infiniteScroll),
  });

  // retain scrollPosition after loading prev page
  const [firstItem, setFirstItem] = useState<TData>();
  const updateFirstItem = useCallback(
    (findFirstItem: (item: TData) => boolean): void => {
      const prevFirstItemIndex = data.findIndex(findFirstItem);

      if (prevFirstItemIndex >= 0) {
        rowVirtualizer.scrollToIndex(prevFirstItemIndex, {
          align: 'start',
          behavior: 'auto',
        });
      }
      setFirstItem(data[0]);
    },
    [data, rowVirtualizer],
  );

  useEffect(() => {
    try {
      if (!infiniteScroll?.prevPage || data.length === 0) {
        return;
      }
      if (!firstItem) {
        setFirstItem(data[0]);
        return;
      }
      if (rowKey === undefined) {
        const firstItemStringified = JSON.stringify(firstItem);
        if (JSON.stringify(data[0]) !== firstItemStringified) {
          updateFirstItem(
            (item) => JSON.stringify(item) === firstItemStringified,
          );
        }
        return;
      }
      if (typeof rowKey === 'string') {
        if (
          data[0][rowKey as keyof TData] !== firstItem[rowKey as keyof TData]
        ) {
          updateFirstItem(
            (item) =>
              item[rowKey as keyof TData] === firstItem[rowKey as keyof TData],
          );
        }
        return;
      }
      if (typeof rowKey === 'function') {
        if (rowKey(data[0]) !== rowKey(firstItem)) {
          updateFirstItem((item) => rowKey(item) === rowKey(firstItem));
        }
      }
    } catch (_error) {
      // eslint-disable-next-line no-console
      console.warn('Cannot find first item');
    }
  }, [data, firstItem, infiniteScroll?.prevPage, rowKey, updateFirstItem]);

  useEffect(() => {
    if (rowVirtualizer && infiniteScroll?.prevPage?.hasMore) {
      // scroll down to hide loader
      rowVirtualizer.scrollToOffset(INFINITE_LOADER_ITEM_HEIGHT);
    }
  }, [rowVirtualizer, infiniteScroll?.prevPage?.hasMore]);
  //endregion

  const { highlightRow } = useTableHighlight(tableOuterRef);

  useImperativeHandle(tableRef, () => ({
    getDimensions,
    highlightRow,
    scrollTo: rowVirtualizer.scrollToOffset,
    scrollToIndex: (
      topLevelIndex: number,
      options?: Parameters<typeof rowVirtualizer.scrollToIndex>[1],
    ) => {
      const { rows: topLevelRows, flatRows } = table.getRowModel();
      const targetRow = topLevelRows[topLevelIndex];
      if (!targetRow) {
        return;
      }
      const flatIndex = flatRows.findIndex((r) => r.id === targetRow.id);
      if (flatIndex >= 0) {
        const offsetData = rowVirtualizer.getOffsetForIndex(flatIndex, 'start');
        if (offsetData !== undefined) {
          rowVirtualizer.scrollToOffset(
            offsetData[0] + INFINITE_SCROLL_PADDING_START,
            options,
          );
        }
      }
    },
    scrollToTop: () => rowVirtualizer.scrollToOffset(0),
  }));

  //region sticky context value
  const stickyValue = useMemo(
    () => (stickyHeader ? { stickyData, setStickyData } : null),
    [stickyData, stickyHeader],
  );

  useEffect(() => {
    if (stickyHeader && scrollableContainerRef.current) {
      const { paddingTop } = getComputedStyle(scrollableContainerRef.current);
      setStickyData((prevValue) => ({
        ...prevValue,
        containerPaddingTop: parseFloat(paddingTop),
      }));
    }
  }, [scrollableContainerRef, stickyHeader]);

  useEffect(() => {
    if (stickyHeader) {
      setStickyData((prevValue) => ({
        ...prevValue,
        isRevealed: getIsRevealed({
          scrollDirection,
          hasData: !tableIsEmpty,
        }),
      }));
    }
  }, [stickyHeader, scrollDirection, tableIsEmpty]);

  const getScrollContainer = useCallback(() => {
    return scrollableContainerRef.current;
  }, [scrollableContainerRef]);

  //region table context value
  const tableContextValue = useMemo(
    () => ({ table, rowVirtualizer, getScrollContainer }),
    [table, rowVirtualizer, getScrollContainer],
  );

  const handleBackToTop = useCallback(() => {
    if (onBackToTop) {
      onBackToTop();
      return;
    }
    rowVirtualizer.scrollToOffset(0);
  }, [onBackToTop, rowVirtualizer]);

  return (
    <TableContext.Provider value={tableContextValue}>
      <StickyContext.Provider value={stickyValue}>
        <SelectionContext.Provider value={selectionConfig}>
          <BaseTable
            columnSizing={columnSizing}
            isColumnSizingReady={isColumnSizingReady}
            texts={texts}
            tableOuterRef={tableOuterRef}
            tableBodyScrollRef={tableBodyScrollRef}
            withScroll={withContainerScroll}
            withBodyScroll={withBodyScroll}
            maxHeight={maxHeight}
            hasPagination={false}
            infiniteScroll={infiniteScroll}
            isLoading={isLoading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchClear={handleSearchClear}
            hasBuiltInSearch={hasBuiltInSearch}
            searchProps={searchProps}
            dataSourceTotalCount={totalDataCount}
            cellHeight={cellHeight}
            {...props}
          />
          {showBackToTopButton && (
            <BackToTopButton
              label={texts.infiniteScrollBackToTop}
              onClick={handleBackToTop}
              scrollContainerRef={scrollableContainerRef}
              hasData={!tableIsEmpty && columns.length > 0}
              threshold={
                (stickyData.titleBarHeight || 0) +
                (Number.isFinite(stickyData.containerPaddingTop)
                  ? stickyData.containerPaddingTop
                  : 0)
              }
            />
          )}
        </SelectionContext.Provider>
      </StickyContext.Provider>
    </TableContext.Provider>
  );
};
