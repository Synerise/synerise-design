import * as React from 'react';
import Table from 'antd/lib/table';
import Result from '@synerise/ds-result';
import Checkbox from '@synerise/ds-checkbox';
import { DSTableProps, RowType } from '../Table.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTable<T extends any & RowType<T>>(props: DSTableProps<T>): React.ReactElement {
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
        let selectedKeys = [...selectedRowKeys];
        const selectedRows: T[] = [];
        if (record.children !== undefined && Array.isArray(record.children)) {
          record.children.forEach((child: T): void => {
            const childKey = getRowKey(child);
            selectedKeys = checked && childKey ? [...selectedKeys, childKey] : selectedKeys.filter(k => k !== childKey);
          });
        } else {
          selectedKeys = checked ? [...selectedRowKeys, key] : selectedRowKeys.filter(k => k !== key);
        }

        selectedKeys = [...new Set(selectedKeys)];
        if (dataSource) {
          dataSource.forEach(row => {
            const dataRowKey = getRowKey(row);
            if (row.children !== undefined && Array.isArray(row.children)) {
              row.children.forEach((child: T) => {
                const childKey = getRowKey(child);
                if (childKey && selectedKeys.indexOf(childKey) >= 0) {
                  selectedRows.push(child);
                }
              });
            } else if (dataRowKey && selectedKeys.indexOf(dataRowKey) >= 0) {
              selectedRows.push(row);
            }
          });
        }

        onChange(selectedKeys, selectedRows);
      }
    },
    [selection, getRowKey, dataSource]
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
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
            const hasChilds = record.children !== undefined && Array.isArray(record.children);
            const allChildsChecked =
              (hasChilds &&
                record.children?.filter((child: T) => {
                  const childKey = getRowKey(child);
                  return childKey && selection?.selectedRowKeys.indexOf(childKey) < 0;
                }).length === 0) ||
              false;
            const checkedChilds =
              record.children?.filter((child: T) => {
                const childKey = getRowKey(child);
                return childKey && selection?.selectedRowKeys.indexOf(childKey) >= 0;
              }) || [];
            const isIndeterminate =
              hasChilds && checkedChilds.length > 0 && checkedChilds.length < record.children.length;
            return (
              <Checkbox
                checked={checked || allChildsChecked}
                indeterminate={isIndeterminate}
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
