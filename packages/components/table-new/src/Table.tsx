import React, { useImperativeHandle, useMemo, useRef } from 'react';

import type { TableProps } from './Table.types';
import { BaseTable } from './components/BaseTable/BaseTable';
import { SelectionContext } from './contexts/SelectionContext';
import { TableContext } from './contexts/TableContext';
import { useDefaultTexts } from './hooks/useDefaultTexts';
import { useTable } from './hooks/useTable';
import { useTableHighlight } from './hooks/useTableHighlight';
import { getDefaultSkeletonColumns } from './utils/getDefaultSkeletonColumns';
import { processColumns } from './utils/processColumns';

export const Table = <TData extends object, TValue>({
  data,
  columns,
  texts: defaultTexts,
  selectionConfig,
  isLoading,
  selectedRowKeys,
  pagination,
  matchesSearchQuery,
  filterData,
  onSearchQueryChange,
  searchProps,
  expandable,
  rowKey,
  onSort,
  tableRef,
  ...props
}: TableProps<TData, TValue>) => {
  const texts = useDefaultTexts(defaultTexts);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

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

  // Sub in skeleton columns whenever real columns aren't ready yet AND there is something to
  // render for — either an in-flight data load OR data that already arrived ahead of the
  // column config. Prevents rows with zero cells when the data fetch wins the race.
  const useSkeletonColumns =
    !processedColumns.length && (isLoading || data.length > 0);
  const finalColumns = useSkeletonColumns ? skeletonColumns : processedColumns;

  // Drive the skeleton body path for the race case too — skeleton column defs have no cell
  // renderer, so real rows cannot be rendered through them.
  const effectiveIsLoading = isLoading || useSkeletonColumns;

  const {
    table,
    paginationProps,
    hasPagination,
    columnSizing,
    isColumnSizingReady,
    searchQuery,
    setSearchQuery,
    handleSearchClear,
    hasBuiltInSearch,
    totalDataCount,
  } = useTable({
    data,
    columns: finalColumns,
    pagination,
    selectionConfig,
    selectedRowKeys,
    matchesSearchQuery,
    filterData,
    onSearchQueryChange,
    expandable,
    rowKey,
    onSort,
    wrapperRef,
    requireColumnSizing: false,
  });

  const { highlightRow } = useTableHighlight(wrapperRef);

  useImperativeHandle(tableRef, () => ({
    highlightRow,
  }));

  const tableContextValue = useMemo(
    () => ({ table, getScrollContainer: () => null }),
    [table],
  );

  return (
    <TableContext.Provider value={tableContextValue}>
      <SelectionContext.Provider value={selectionConfig}>
        <BaseTable
          texts={texts}
          isLoading={effectiveIsLoading}
          hasPagination={hasPagination}
          paginationProps={paginationProps}
          tableOuterRef={wrapperRef}
          selectedRowKeys={selectedRowKeys}
          columnSizing={columnSizing}
          isColumnSizingReady={isColumnSizingReady}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchClear={handleSearchClear}
          hasBuiltInSearch={hasBuiltInSearch}
          searchProps={searchProps}
          dataSourceTotalCount={totalDataCount}
          {...props}
        />
      </SelectionContext.Provider>
    </TableContext.Provider>
  );
};
