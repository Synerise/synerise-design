import React, { useMemo } from 'react';

import { useDataFormat } from '@synerise/ds-data-format';

import FilterTrigger from '../FilterTrigger/FilterTrigger';
import * as S from '../Table.styles';
import { type Filter } from '../Table.types';
import { type Props } from './TableHeader.types';
import { TableLimit } from './TableLimit';
import TableSelection from './TableSelection';

const TableHeader = <T extends object>({
  title,
  filters,
  searchComponent,
  filterComponent,
  selectedRows,
  itemsMenu,
  selection,
  dataSource = [],
  dataSourceFull,
  dataSourceTotalCount,
  isCounterLoading,
  rowKey,
  withBorderTop,
  headerButton,
  locale,
  renderSelectionTitle,
  renderCustomCounter,
  hideTitlePart,
  childrenColumnName,
  isLoading,
}: Props<T>) => {
  const { formatValue } = useDataFormat();

  const hasSelectedItems = useMemo(
    () =>
      (selectedRows && selectedRows > 0) ||
      selection?.globalSelection?.isSelected,
    [selectedRows, selection?.globalSelection?.isSelected],
  );

  const renderLeftSide = useMemo(() => {
    const tableTotal = dataSourceTotalCount || dataSource.length;
    const { hideSelectAll } = selection || {};
    if (selection && selection.limit) {
      return (
        <S.Left data-testid="ds-table-selection">
          {selection && !hideSelectAll && (
            <TableSelection
              rowKey={rowKey}
              dataSource={dataSource}
              dataSourceFull={dataSourceFull}
              selection={selection}
              locale={locale}
              hasSelectionLimit
              childrenColumnName={childrenColumnName}
            />
          )}
          <TableLimit
            total={tableTotal}
            selection={{ ...selection, limit: selection.limit }}
            itemsMenu={itemsMenu}
            locale={locale}
            renderCustomCounter={renderCustomCounter}
            isCounterLoading={isCounterLoading}
          />
        </S.Left>
      );
    }
    const selectedItemsCount = selectedRows || tableTotal;

    const counterContent = (
      <>
        <strong>{formatValue(tableTotal)}</strong>
        <span>{locale?.pagination?.items}</span>
      </>
    );

    return hasSelectedItems ? (
      <S.Left data-testid="ds-table-selection">
        {selection && !hideSelectAll && (
          <TableSelection
            rowKey={rowKey}
            dataSource={dataSource}
            dataSourceFull={dataSourceFull}
            selection={selection}
            locale={locale}
            childrenColumnName={childrenColumnName}
          />
        )}
        {renderSelectionTitle ? (
          <>{renderSelectionTitle(selection, filters)}</>
        ) : (
          <S.TitleContainer>
            {isCounterLoading ? (
              <S.Skeleton
                numberOfSkeletons={1}
                size="S"
                skeletonWidth="100px"
              />
            ) : (
              <S.TitlePart>
                <strong>{formatValue(selectedItemsCount)}</strong>{' '}
                <span>{locale.selected}</span>
              </S.TitlePart>
            )}
          </S.TitleContainer>
        )}
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left data-testid="ds-table-title">
        {selection && !isLoading && !hideSelectAll && (
          <TableSelection
            rowKey={rowKey}
            dataSource={dataSource}
            dataSourceFull={dataSourceFull}
            selection={selection}
            locale={locale}
            childrenColumnName={childrenColumnName}
          />
        )}
        <S.TitleContainer>
          {isLoading && (
            <div style={{ width: '100px' }}>
              <S.Skeleton
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
                    autoAdjustOverflow: true,
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
              {isCounterLoading ? (
                <S.Skeleton
                  numberOfSkeletons={1}
                  size="S"
                  skeletonWidth="100px"
                />
              ) : (
                <>
                  {renderCustomCounter
                    ? renderCustomCounter({
                        count: tableTotal,
                        content: counterContent,
                      })
                    : counterContent}
                </>
              )}
            </S.TitlePart>
          )}
        </S.TitleContainer>
      </S.Left>
    );
  }, [
    selection,
    selectedRows,
    dataSourceTotalCount,
    dataSource,
    hasSelectedItems,
    rowKey,
    dataSourceFull,
    locale,
    childrenColumnName,
    renderSelectionTitle,
    filters,
    isCounterLoading,
    renderCustomCounter,
    formatValue,
    itemsMenu,
    isLoading,
    title,
    hideTitlePart,
  ]);

  return (
    <S.Header withBorderTop={withBorderTop}>
      {renderLeftSide}
      <S.Right>
        {headerButton}
        {filters?.map((filter: Filter) => (
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
        ))}
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

export default TableHeader;
