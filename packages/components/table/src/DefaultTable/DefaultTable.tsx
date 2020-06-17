import * as React from 'react';
import Table from 'antd/lib/table';
import Button from '@synerise/ds-button';
import Result from '@synerise/ds-result';
import Icon from '@synerise/ds-icon';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';
import Checkbox from '@synerise/ds-checkbox';
import { DSTableProps } from '../Table.types';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const { title, selection, pagination, dataSource, rowKey, locale } = props;

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
    <Table<T>
      {...props}
      locale={{
        ...locale,
        emptyText: <Result description={locale?.emptyText || 'No data'} type="no-results" noSearchResults />,
      }}
      pagination={dataSource?.length && pagination ? footerPagination : false}
      /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
      // @ts-ignore
      title={title}
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
  );
}

export default DefaultTable;
