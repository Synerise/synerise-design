import * as React from 'react';
import { compact } from 'lodash';
import Table from 'antd/lib/table';
import { FormattedMessage } from 'react-intl';
import Result from '@synerise/ds-result';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import { columnsToSortState, useSortState } from '../ColumnSortMenu/useSortState';
import useRowStar from '../hooks/useRowStar';
import { DSColumnType, DSTableProps, RowType } from '../Table.types';
import { columnWithSortButtons } from '../ColumnSortMenu/columnWithSortButtons';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTable<T extends any & RowType<T>>(props: DSTableProps<T>): React.ReactElement {
  const { title, selection, rowStar, dataSource, rowKey, locale, expandable, components, columns } = props;
  const sortStateApi = useSortState(columnsToSortState(columns));
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);
  const starColumn = getRowStarColumn(props);

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

  const RenderRow = React.useCallback((row): JSX.Element => {
    const { children, ...rowProps } = row;
    const classNameWithLevel = row.className.split(' ').find((name: string) => name.includes('row-level'));
    let level;
    if (classNameWithLevel) {
      level = classNameWithLevel.split('-').pop();
    }
    return (
      // eslint-disable-next-line react/jsx-handler-names
      <tr {...rowProps} className={`${row.className} ds-table-row ${level ? `ds-table-row-level-${level}` : ''}`}>
        {children}
      </tr>
    );
  }, []);

  const prependedColumns = compact<DSColumnType<T>>([!!rowStar && starColumn]);
  const decoratedColumns = columns?.map(column => columnWithSortButtons(sortStateApi)(column));

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <Table<T>
      {...props}
      data-popup-container
      columns={[
        ...prependedColumns,
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore: decoratedColumns type is different in DSTableProps than AntTableProps
        ...decoratedColumns,
      ]}
      expandable={{
        expandIconColumnIndex: -1,
        ...expandable,
      }}
      locale={{
        ...locale,
        emptyText: (
          <Result
            description={locale?.emptyText || <FormattedMessage id="DS.TABLE.EMPTY_TEXT" />}
            type="no-results"
            noSearchResults
          />
        ),
      }}
      title={title}
      components={{
        body: {
          row: RenderRow,
        },
        ...components,
      }}
      rowSelection={
        selection && {
          ...selection,
          selections: selection?.selections?.filter(Boolean),
          columnWidth: 64,
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
              <Tooltip title={locale?.selectRowTooltip}>
                <Button.Checkbox
                  checked={checked || allChildsChecked}
                  disabled={!checked && Boolean(selection.limit && selection.limit <= selection.selectedRowKeys.length)}
                  indeterminate={isIndeterminate}
                  onChange={(isChecked): void => {
                    toggleRowSelection(isChecked, record);
                  }}
                />
              </Tooltip>
            );
          },
        }
      }
    />
  );
}

export default DefaultTable;
