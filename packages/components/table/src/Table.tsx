import React, { type ReactNode, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';
import { useDataFormat } from '@synerise/ds-data-format';
import Icon, { AngleLeftS, AngleRightS } from '@synerise/ds-icon';
import Skeleton from '@synerise/ds-skeleton';

import DefaultTable from './DefaultTable/DefaultTable';
import GroupTable from './GroupTable/GroupTable';
import { type GroupType } from './GroupTable/GroupTable.types';
import * as S from './Table.styles';
import { type DSTableProps } from './Table.types';
import TableHeader from './TableHeader/TableHeader';
import {
  ITEM_RENDER_TYPE,
  SELECTION_ALL,
  SELECTION_INVERT,
} from './constants/Table.constants';
import './style/index.less';
import {
  TableLocaleContext,
  getChildrenColumnName,
  getSkeletonProps,
  isGrouped,
  useTableLocale,
} from './utils';

const DSTable = <T extends object>(props: DSTableProps<T>) => {
  const intl = useIntl();
  const {
    title,
    loading,
    selection,
    itemsMenu,
    cellSize,
    dataSource,
    dataSourceFull,
    dataSourceTotalCount,
    roundedHeader,
    filters,
    searchComponent,
    filterComponent,
    rowKey,
    headerWithBorderTop,
    hideTitleBar,
    grouped,
    pagination,
    locale,
    headerButton,
    hideColumnNames,
    renderSelectionTitle,
    hideTitlePart,
    disableColumnNamesLineBreak,
    expandable,
    columns,
    skeletonProps,
    isCounterLoading,
    renderCustomCounter,
  } = props;

  const tableLocale = useTableLocale(intl, locale);
  const { formatValue } = useDataFormat();

  const renderHeader = useCallback((): JSX.Element => {
    const size =
      selection &&
      selection?.selectedRowKeys &&
      selection?.selectedRowKeys.length;

    const data =
      grouped && isGrouped(dataSource)
        ? dataSource?.reduce((items: T[], group: GroupType<T>) => {
            if (group.rows) {
              const merged = [...items, ...group.rows];
              return merged;
            }
            const result = [...items];
            return result;
          }, [])
        : dataSource;

    const totalCount =
      dataSourceTotalCount || dataSource?.length || dataSourceFull?.length;
    return !hideTitleBar ? (
      <TableHeader
        withBorderTop={headerWithBorderTop}
        selectedRows={size}
        title={title}
        filters={filters}
        itemsMenu={itemsMenu}
        selection={selection}
        dataSource={data}
        dataSourceFull={dataSourceFull}
        dataSourceTotalCount={totalCount}
        isCounterLoading={isCounterLoading}
        searchComponent={searchComponent}
        filterComponent={filterComponent}
        headerButton={headerButton}
        rowKey={rowKey}
        locale={tableLocale}
        renderCustomCounter={renderCustomCounter}
        renderSelectionTitle={renderSelectionTitle}
        hideTitlePart={hideTitlePart}
        childrenColumnName={getChildrenColumnName(
          expandable?.childrenColumnName,
        )}
        isLoading={loading}
      />
    ) : (
      <></>
    );
  }, [
    selection,
    grouped,
    dataSource,
    dataSourceTotalCount,
    dataSourceFull,
    hideTitleBar,
    headerWithBorderTop,
    title,
    filters,
    itemsMenu,
    searchComponent,
    filterComponent,
    headerButton,
    rowKey,
    tableLocale,
    renderCustomCounter,
    renderSelectionTitle,
    hideTitlePart,
    expandable?.childrenColumnName,
    loading,
    isCounterLoading,
  ]);

  const footerPagination = useMemo(() => {
    return {
      showTotal: (total: number, range: number[]) =>
        !hideTitlePart ? (
          <span>
            <strong>{formatValue(range[0])}</strong>-
            <strong>{formatValue(range[1])}</strong> of{' '}
            <strong>{formatValue(total)}</strong>{' '}
            {grouped
              ? tableLocale?.pagination?.groups
              : tableLocale?.pagination?.items}
          </span>
        ) : (
          <div style={{ width: '150px' }}>
            <Skeleton size="M" />
          </div>
        ),
      columnWidth: 72,
      itemRender: (page: number, type: string, originalElement: ReactNode) => {
        if (type === ITEM_RENDER_TYPE.prev) {
          return (
            <Button mode="single-icon" type="ghost">
              <Icon component={<AngleLeftS />} />
            </Button>
          );
        }
        if (type === ITEM_RENDER_TYPE.next) {
          return (
            <Button mode="single-icon" type="ghost">
              <Icon component={<AngleRightS />} />
            </Button>
          );
        }
        return originalElement;
      },
      ...pagination,
    };
  }, [pagination, formatValue, grouped, tableLocale, hideTitlePart]);

  const tableContent = useMemo(() => {
    const extraProps = loading
      ? getSkeletonProps(skeletonProps, columns)
      : {
          pagination: pagination ? footerPagination : (false as const),
        };

    return (
      <DefaultTable<T>
        scroll={{ x: 'auto' }}
        tableLayout="fixed"
        {...props}
        locale={tableLocale}
        title={renderHeader}
        {...extraProps}
      />
    );
  }, [
    columns,
    footerPagination,
    loading,
    pagination,
    props,
    renderHeader,
    skeletonProps,
    tableLocale,
  ]);

  return (
    <TableLocaleContext.Provider value={tableLocale}>
      <S.TableWrapper
        className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}
        hideColumnNames={hideColumnNames}
        disableColumnNamesLineBreak={disableColumnNamesLineBreak}
      >
        {!loading && grouped && dataSource?.length ? (
          // @ts-expect-error type 'T' does not satisfy the constraint 'GroupType<T>'.
          <GroupTable<T>
            {...props}
            locale={tableLocale}
            title={renderHeader}
            pagination={
              dataSource?.length && pagination ? footerPagination : false
            }
          />
        ) : (
          tableContent
        )}
      </S.TableWrapper>
    </TableLocaleContext.Provider>
  );
};

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;
