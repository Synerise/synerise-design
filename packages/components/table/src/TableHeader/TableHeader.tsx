import React, { useMemo } from 'react';

import { useDataFormat } from '@synerise/ds-data-format';

import * as S from '../Table.styles';
import FilterTrigger from '../FilterTrigger/FilterTrigger';
import { Filter } from '../Table.types';
import TableSelection from './TableSelection';
import { Props } from './TableHeader.types';
import { TableLimit } from './TableLimit';

const TableHeader = ({
  title,
  filters,
  searchComponent,
  filterComponent,
  selectedRows,
  itemsMenu,
  selection,
  dataSource,
  dataSourceFull,
  dataSourceTotalCount,
  rowKey,
  withBorderTop,
  headerButton,
  locale,
  renderSelectionTitle,
  hideTitlePart,
  childrenColumnName,
  isLoading,
}: // @ts-ignore
Props) => {
  const { formatValue } = useDataFormat();

  const renderLeftSide = useMemo(() => {
    const { limit, hideSelectAll } = selection || {};
    if (limit) {
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
            total={dataSourceTotalCount || dataSource.length}
            selection={selection}
            itemsMenu={itemsMenu}
            locale={locale}
          />
        </S.Left>
      );
    }

    return selectedRows && selectedRows > 0 ? (
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
            <S.TitlePart>
              <strong>{formatValue(selectedRows)}</strong> <span>{locale.selected}</span>
            </S.TitlePart>
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
              <S.Skeleton width="L" numberOfSkeletons={1} />
            </div>
          )}

          {!isLoading && title && (
            <>
              <S.TitlePartEllipsis
                ellipsis={{
                  tooltipProps: { description: title, type: 'largeSimple', offset: 'small', autoAdjustOverflow: true },
                }}
              >
                {title}
              </S.TitlePartEllipsis>
              {!hideTitlePart && <S.TitleSeparator />}
            </>
          )}
          {!isLoading && !hideTitlePart && (
            <S.TitlePart>
              <strong>{formatValue(dataSourceTotalCount || dataSource.length)}</strong>{' '}
              <span>{locale?.pagination?.items}</span>
            </S.TitlePart>
          )}
        </S.TitleContainer>
      </S.Left>
    );
  }, [
    selection,
    dataSourceTotalCount,
    dataSource,
    itemsMenu,
    locale,
    selectedRows,
    rowKey,
    dataSourceFull,
    childrenColumnName,
    renderSelectionTitle,
    filters,
    formatValue,
    title,
    hideTitlePart,
    isLoading,
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
            /* eslint-disable-next-line react/jsx-handler-names */
            handleClear={filter.handleClear}
            show={filter.show}
            showList={filter.showList}
            selected={filter.selected}
            disabled={filter.disabled}
          />
        ))}
        {filterComponent && (
          <S.RightSideWrapper data-testid="ds-table-filter-wrapper">{filterComponent}</S.RightSideWrapper>
        )}
        {searchComponent && (
          <S.RightSideWrapper data-testid="ds-table-search-wrapper">{searchComponent}</S.RightSideWrapper>
        )}
      </S.Right>
    </S.Header>
  );
};

export default TableHeader;
