import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import Icon from '@synerise/ds-icon';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import { IntlShape, useIntl } from 'react-intl';
import * as S from './Table.styles';
import { DSTableProps, Locale } from './Table.types';
import TableHeader from './TableHeader/TableHeader';
import DefaultTable from './DefaultTable/DefaultTable';
import GroupTable from './GroupTable/GroupTable';
import { GroupType } from './GroupTable/GroupTable.types';

export const SELECTION_ALL = 'SELECTION_ALL';
export const SELECTION_INVERT = 'SELECTION_INVERT';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
};

const DEFAULT_LOCALE = (intl: IntlShape): Locale => ({
  pagination: {
    items: intl.formatMessage({ id: 'DS.TABLE.PAGINATION.ITEMS', defaultMessage: 'results' }),
    groups: intl.formatMessage({ id: 'DS.TABLE.PAGINATION.GROUPS', defaultMessage: 'groups' }),
  },
  selected: intl.formatMessage({ id: 'DS.TABLE.SELECTED', defaultMessage: 'selected' }),
  emptyText: intl.formatMessage({ id: 'DS.TABLE.EMPTY_TEXT', defaultMessage: 'No data' }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends any>(props: DSTableProps<T>): React.ReactElement {
  const intl = useIntl();
  const {
    title,
    onSearch,
    loading,
    selection,
    itemsMenu,
    cellSize,
    dataSource,
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
  } = props;

  const getLocale = React.useMemo((): Locale => {
    return {
      ...DEFAULT_LOCALE(intl),
      ...locale,
      pagination: { ...DEFAULT_LOCALE(intl).pagination, ...locale?.pagination },
    };
  }, [intl, locale]);

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    const data = grouped
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        dataSource?.reduce((items: T[], group: GroupType<T>) => {
          if (group.rows) {
            return [...items, ...group.rows];
          }
          return [...items];
        }, [])
      : dataSource;
    return (
      !hideTitleBar && (
        <TableHeader
          withBorderTop={headerWithBorderTop}
          selectedRows={size}
          title={title}
          onSearch={onSearch}
          filters={filters}
          itemsMenu={itemsMenu}
          selection={selection}
          dataSource={data}
          searchComponent={searchComponent}
          filterComponent={filterComponent}
          headerButton={headerButton}
          rowKey={rowKey}
          locale={getLocale}
        />
      )
    );
  }, [
    selection,
    grouped,
    dataSource,
    hideTitleBar,
    headerWithBorderTop,
    title,
    onSearch,
    filters,
    itemsMenu,
    searchComponent,
    filterComponent,
    headerButton,
    rowKey,
    getLocale,
  ]);

  const footerPagination = React.useMemo((): object => {
    return {
      showTotal: (total: number, range: number[]): React.ReactNode => (
        <span>
          <strong>{range[0]}</strong>-<strong>{range[1]}</strong> of <strong>{total}</strong>{' '}
          {grouped ? getLocale?.pagination?.groups : getLocale?.pagination?.items}
        </span>
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
  }, [pagination, grouped, getLocale]);

  return (
    <S.TableWrapper
      className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}
      hideColumnNames={hideColumnNames}
    >
      {loading && (
        <S.Spinner className="spinner">
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Spinner>
      )}
      {grouped && dataSource?.length ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <GroupTable<T>
          {...props}
          title={renderHeader}
          pagination={dataSource?.length && pagination ? footerPagination : false}
        />
      ) : (
        <DefaultTable<T>
          scroll={{ x: 'auto' }}
          tableLayout="auto"
          {...props}
          title={renderHeader}
          pagination={dataSource?.length && pagination ? footerPagination : false}
        />
      )}
    </S.TableWrapper>
  );
}

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;
