import React from 'react';
import { useIntl } from 'react-intl';
import '@synerise/ds-core/dist/js/style';
import Icon, { AngleLeftS, AngleRightS, SpinnerM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import Skeleton from '@synerise/ds-skeleton';
import { useDataFormat } from '@synerise/ds-data-format';

import './style/index.less';
import * as S from './Table.styles';
import { DSTableProps } from './Table.types';
import TableHeader from './TableHeader/TableHeader';
import DefaultTable from './DefaultTable/DefaultTable';
import GroupTable from './GroupTable/GroupTable';
import { GroupType } from './GroupTable/GroupTable.types';
import { useTableLocale, TableLocaleContext } from './utils/locale';
import { getChildrenColumnName } from './utils/getChildrenColumnName';

export const SELECTION_ALL = 'SELECTION_ALL';
export const SELECTION_INVERT = 'SELECTION_INVERT';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
};

function DSTable<T extends object>(props: DSTableProps<T>): React.ReactElement {
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
  } = props;

  const tableLocale = useTableLocale(intl, locale);
  const { formatValue } = useDataFormat();

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    const data = grouped
      ? // @ts-ignore
        dataSource?.reduce((items: T[], group: GroupType<T>) => {
          if (group.rows) {
            return [...items, ...group.rows];
          }
          return [...items];
        }, [])
      : dataSource;
    const totalCount = dataSourceTotalCount || dataSource?.length || dataSourceFull?.length;
    return (
      !hideTitleBar && (
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
          searchComponent={searchComponent}
          filterComponent={filterComponent}
          headerButton={headerButton}
          rowKey={rowKey}
          locale={tableLocale}
          renderSelectionTitle={renderSelectionTitle}
          hideTitlePart={hideTitlePart}
          childrenColumnName={getChildrenColumnName(expandable?.childrenColumnName)}
        />
      )
    );
  }, [
    selection,
    grouped,
    dataSource,
    dataSourceTotalCount,
    hideTitleBar,
    headerWithBorderTop,
    title,
    filters,
    itemsMenu,
    dataSourceFull,
    searchComponent,
    filterComponent,
    headerButton,
    rowKey,
    tableLocale,
    renderSelectionTitle,
    hideTitlePart,
    expandable?.childrenColumnName,
  ]);

  const footerPagination = React.useMemo((): object => {
    return {
      showTotal: (total: number, range: number[]): React.ReactNode =>
        !hideTitlePart ? (
          <span>
            <strong>{formatValue(range[0])}</strong>-<strong>{formatValue(range[1])}</strong> of{' '}
            <strong>{formatValue(total)}</strong>{' '}
            {grouped ? tableLocale?.pagination?.groups : tableLocale?.pagination?.items}
          </span>
        ) : (
          <div style={{ width: '150px' }}>
            <Skeleton size="M" />
          </div>
        ),
      columnWidth: 72,
      itemRender: (page: number, type: string, originalElement: React.ReactNode): React.ReactNode => {
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

  return (
    <TableLocaleContext.Provider value={tableLocale}>
      <S.TableWrapper
        className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}
        hideColumnNames={hideColumnNames}
        disableColumnNamesLineBreak={disableColumnNamesLineBreak}
      >
        {loading && (
          <S.Spinner className="spinner">
            <Icon component={<SpinnerM />} color="#6a7580" />
          </S.Spinner>
        )}
        {grouped && dataSource?.length ? (
          // @ts-ignore
          <GroupTable<T>
            {...props}
            locale={tableLocale}
            title={renderHeader}
            pagination={dataSource?.length && pagination ? footerPagination : false}
          />
        ) : (
          <DefaultTable<T>
            scroll={{ x: 'auto' }}
            tableLayout="auto"
            {...props}
            locale={tableLocale}
            title={renderHeader}
            pagination={dataSource?.length && pagination ? footerPagination : false}
          />
        )}
      </S.TableWrapper>
    </TableLocaleContext.Provider>
  );
}

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;
