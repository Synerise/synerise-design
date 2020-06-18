import * as React from 'react';
import Table from 'antd/lib/table';
import Result from '@synerise/ds-result';
import Checkbox from '@synerise/ds-checkbox';
import { DSTableProps } from '../Table.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const { title, selection, dataSource, rowKey, locale } = props;

  const getRowKey = React.useCallback(
    (row: T): React.ReactText | undefined => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return undefined;
    },
    [rowKey]
  );

  const toggleRowSelection = React.useCallback(
    (checked, record) => {
      const key = getRowKey(record);
      if (selection?.selectedRowKeys && selection.onChange && key !== undefined) {
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
