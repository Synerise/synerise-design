import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import Table from 'antd/lib/table';

import './style/index.less';
import Icon from '@synerise/ds-icon';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import Button from '@synerise/ds-button';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Checkbox from '@synerise/ds-checkbox';
import Result from '@synerise/ds-result';
import * as S from './Table.styles';
import { DSTableProps } from './Table.types';
import TableHeader from './TableHeader/TableHeader';

export const SELECTION_ALL = 'SELECTION_ALL';
export const SELECTION_INVERT = 'SELECTION_INVERT';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const {
    title,
    onSearch,
    loading,
    selection,
    itemsMenu,
    cellSize,
    pagination,
    dataSource,
    roundedHeader,
    filters,
    searchComponent,
    filterComponent,
    rowKey,
    locale,
  } = props;

  const getRowKey = React.useCallback(
    (row: T): React.ReactText | undefined => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return undefined;
    },
    [rowKey]
  );

  const footerPagination = React.useMemo((): object => {
    return {
      showTotal: (total: number, range: number[]): React.ReactNode => (
        <span>
          <strong>{range[0]}</strong>-<strong>{range[1]}</strong> of <strong>{total}</strong> items
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
  }, [pagination]);

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = selection && selection?.selectedRowKeys && selection?.selectedRowKeys.length;
    return (
      <TableHeader
        selectedRows={size}
        title={title}
        onSearch={onSearch}
        filters={filters}
        itemsMenu={itemsMenu}
        selection={selection}
        dataSource={dataSource}
        searchComponent={searchComponent}
        filterComponent={filterComponent}
        rowKey={rowKey}
      />
    );
  }, [selection, title, onSearch, dataSource, filters, itemsMenu, searchComponent, filterComponent, rowKey]);

  const toggleRowSelection = React.useCallback(
    (checked, record) => {
      const key = getRowKey(record);
      if (selection?.selectedRowKeys && selection.onChange && key) {
        const { onChange, selectedRowKeys } = selection;
        const selectedKeys = checked ? [...selectedRowKeys, key] : selectedRowKeys.filter(k => k !== key);
        const selectedRows =
          selectedKeys.map(selectedKey => dataSource?.find(row => getRowKey(row) === selectedKey)) || [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onChange(selectedKeys, selectedRows);
      }
    },
    [selection, getRowKey, dataSource]
  );

  return (
    <div className={`ds-table ds-table-cell-size-${cellSize} ${roundedHeader ? 'ds-table-rounded' : ''}`}>
      {loading && (
        <S.Spinner className="spinner">
          <Icon component={<SpinnerM />} color="#6a7580" />
        </S.Spinner>
      )}
      <Table<T>
        {...props}
        locale={{
          ...locale,
          emptyText: <Result description={locale?.emptyText || 'No data'} type="no-results" noSearchResults />,
        }}
        pagination={dataSource?.length && pagination ? footerPagination : false}
        title={renderHeader}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        rowSelection={
          selection && {
            ...selection,
            selections: selection?.selections?.filter(Boolean),
            columnWidth: 72,
            renderCell: (checked: boolean, record: T): React.ReactNode => {
              return (
                <Checkbox
                  checked={checked}
                  onChange={(event): void => {
                    toggleRowSelection(event.target.checked, record);
                  }}
                />
              );
            },
          }
        }
      />
    </div>
  );
}

DSTable.SELECTION_ALL = SELECTION_ALL;
DSTable.SELECTION_INVERT = SELECTION_INVERT;

export default DSTable;
