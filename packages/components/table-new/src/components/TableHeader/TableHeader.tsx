import React, { useEffect, useMemo, useRef } from 'react';

import { useDataFormat } from '@synerise/ds-core';

import { BOTTOM_BORDER_WIDTH } from '../../Table.const';
import { TableSkeleton } from '../../Table.styles';
import { type TableHeaderProps } from '../../Table.types';
import { useSelectionContext } from '../../contexts/SelectionContext';
import { useStickyContext } from '../../contexts/StickyContext';
import { useTableContext } from '../../contexts/TableContext';
import { TableCounter } from './TableCounter/TableCounter';
import * as S from './TableHeader.styles';
import { TableHeaderSelection } from './TableHeaderSelection/TableHeaderSelection';
import { TableLimit } from './TableLimit/TableLimit';

export const TableHeader = <TData extends object, TValue>({
  title,
  //   filters,
  searchComponent,
  filterComponent,
  itemsMenu,
  isCounterLoading,
  headerButton,
  texts,
  renderSelectionTitle,
  renderCustomCounter,
  hideTitlePart,
  dataSourceTotalCount,
  isLoading,
}: TableHeaderProps<TData, TValue>) => {
  const { formatValue } = useDataFormat();
  const { table, rowVirtualizer } = useTableContext<TData>();
  const stickyContext = useStickyContext();
  const headerRef = useRef<HTMLDivElement>(null);

  const selectionConfig = useSelectionContext<TData>();

  const hasGlobalSelection =
    selectionConfig?.globalSelectionOnChange !== undefined;
  const isGlobalSelected =
    hasGlobalSelection && selectionConfig?.globalSelected;

  useEffect(() => {
    if (stickyContext && headerRef.current) {
      const { setStickyData } = stickyContext;
      setStickyData((prevValue) => ({
        ...prevValue,
        titleBarHeight: headerRef.current
          ? headerRef.current.clientHeight + BOTTOM_BORDER_WIDTH
          : 0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectedItemsCount = table.getSelectedRowModel().rows.length;
  const tableTotal = dataSourceTotalCount ?? table.getRowCount();
  const displayedSelectedItems = isGlobalSelected
    ? tableTotal
    : selectedItemsCount;

  const hasSelectedItems = useMemo(
    () => selectedItemsCount > 0 || isGlobalSelected,
    [isGlobalSelected, selectedItemsCount],
  );

  const renderLeftSide = useMemo(() => {
    const { hideSelectAll } = selectionConfig || {};

    if (selectionConfig && selectionConfig.limit) {
      return (
        <S.Left data-testid="ds-table-selection">
          {selectionConfig && !hideSelectAll && (
            <TableHeaderSelection texts={texts} />
          )}
          <TableLimit
            selection={{ ...selectionConfig, limit: selectionConfig.limit }}
            itemsMenu={itemsMenu}
            texts={texts}
            renderCustomCounter={renderCustomCounter}
            isCounterLoading={isCounterLoading}
          />
        </S.Left>
      );
    }

    return hasSelectedItems ? (
      <S.Left data-testid="ds-table-selection">
        {selectionConfig && !hideSelectAll && (
          <TableHeaderSelection texts={texts} />
        )}
        {renderSelectionTitle ? (
          <>{renderSelectionTitle(selectionConfig)}</>
        ) : (
          <S.TitleContainer>
            <TableCounter
              selectedItemsCount={displayedSelectedItems}
              texts={texts}
              isCounterLoading={isCounterLoading}
              tableTotal={tableTotal}
            />
          </S.TitleContainer>
        )}
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left data-testid="ds-table-title">
        {selectionConfig && !isLoading && !hideSelectAll && (
          <TableHeaderSelection texts={texts} />
        )}
        <S.TitleContainer>
          {isLoading && (
            <div style={{ width: '100px' }}>
              <TableSkeleton
                width="L"
                numberOfSkeletons={1}
                skeletonWidth="100px"
              />
            </div>
          )}

          {!isLoading && title && (
            <>
              <S.TitlePartEllipsis
                ellipsis={{
                  tooltipProps: {
                    description: <>{title}</>,
                    type: 'largeSimple',
                    offset: 'small',
                  },
                }}
              >
                <>{title}</>
              </S.TitlePartEllipsis>
              {!hideTitlePart && <S.TitleSeparator />}
            </>
          )}
          {!isLoading && !hideTitlePart && (
            <S.TitlePart>
              <TableCounter
                texts={texts}
                isCounterLoading={isCounterLoading}
                tableTotal={tableTotal}
                renderCustomCounter={renderCustomCounter}
              />
            </S.TitlePart>
          )}
        </S.TitleContainer>
      </S.Left>
    );
  }, [
    selectionConfig,
    formatValue,
    texts,
    hasSelectedItems,
    renderSelectionTitle,
    isCounterLoading,
    selectedItemsCount,
    itemsMenu,
    isLoading,
    title,
    hideTitlePart,
    renderCustomCounter,
    tableTotal,
  ]);

  return (
    <S.Header
      ref={headerRef}
      stickyData={stickyContext?.stickyData}
      data-testid="ds-table-header"
      isVirtual={!!rowVirtualizer}
    >
      {renderLeftSide}
      <S.Right>
        {headerButton}
        {/* {filters?.map((filter: Filter) => (
          <FilterTrigger
            key={filter.key}
            name={filter.key}
            iconComponent={filter.icon}
            tooltips={filter.tooltips}
            openedLabel={filter.openedLabel}
            handleClear={filter.handleClear}
            show={filter.show}
            showList={filter.showList}
            selected={filter.selected}
            disabled={filter.disabled}
          />
        ))} */}
        {filterComponent && (
          <S.RightSideWrapper data-testid="ds-table-filter-wrapper">
            {filterComponent}
          </S.RightSideWrapper>
        )}
        {searchComponent && (
          <S.RightSideWrapper data-testid="ds-table-search-wrapper">
            {searchComponent}
          </S.RightSideWrapper>
        )}
      </S.Right>
    </S.Header>
  );
};
