import * as React from 'react';
import { compact, isEqual } from 'lodash';
import Table from 'antd/lib/table';
import { FormattedMessage } from 'react-intl';
import Result from '@synerise/ds-result';
import usePrevious from '@synerise/ds-utils/dist/usePrevious/usePrevious';
import { columnsToSortState, useSortState } from '../ColumnSortMenu/useSortState';
import { columnWithSortButtons } from '../ColumnSortMenu/columnWithSortButtons';
import { DSColumnType, DSTableProps, RowSelection, RowType } from '../Table.types';
import { useRowKey } from '../hooks/useRowKey';
import { useRowStar } from '../hooks/useRowStar/useRowStar';
import { RowSelectionColumn } from '../RowSelection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DefaultTable<T extends object & RowType<T>>(props: DSTableProps<T>): React.ReactElement {
  const { title, selection, rowStar, dataSource, rowKey, locale, expandable, components, columns, onSort } = props;
  const previousColumns = usePrevious(columns);
  const sortStateApi = useSortState(columnsToSortState(columns), onSort);
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);

  const { getRowKey } = useRowKey(rowKey);

  const starColumn = React.useMemo(() => {
    return getRowStarColumn({ ...props, getRowKey });
  }, [getRowKey, getRowStarColumn, props]);

  React.useEffect(() => {
    if (!isEqual(previousColumns, columns)) {
      sortStateApi.updateColumnsData(columnsToSortState(columns));
    }
  }, [columns, previousColumns, sortStateApi]);

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
  const decoratedColumns = columns?.map(column => columnWithSortButtons(sortStateApi, onSort)(column));
  const decoratedComponents =
    components &&
    Object.entries(components)
      .map(([key, value]) => {
        if (typeof value === 'function') {
          return [
            key,
            (rawData: T[], meta: unknown): ReturnType<typeof value> =>
              value(rawData, meta, {
                ...props,
                columns: decoratedColumns,
              }),
          ];
        }

        return [key, value];
      })
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const selectedRecords = React.useMemo((): T[] => {
    if (selection) {
      const { selectedRowKeys } = selection as RowSelection<T>;
      let selectedRows: T[] = [];
      dataSource &&
        dataSource.forEach((row: T): void => {
          const key = getRowKey(row);
          if (key && selectedRowKeys.indexOf(key) >= 0) {
            selectedRows = [...selectedRows, row];
          }
          if (row.children !== undefined && Array.isArray(row.children)) {
            row.children.forEach((child: T) => {
              const childKey = getRowKey(child);
              if (childKey && selectedRowKeys.indexOf(childKey) >= 0) {
                selectedRows = [...selectedRows, child];
              }
            });
          }
        });

      return selectedRows;
    }
    return [];
  }, [dataSource, getRowKey, selection]);

  const renderRowSelection = React.useCallback(
    (key: string, record: T): React.ReactNode => {
      const { selectedRowKeys, limit, independentSelectionExpandedRows, onChange } = selection as RowSelection<T>;
      return (
        <RowSelectionColumn
          rowKey={rowKey}
          record={record}
          limit={limit}
          selectedRowKeys={selectedRowKeys}
          independentSelectionExpandedRows={independentSelectionExpandedRows}
          onChange={onChange}
          selectedRecords={selectedRecords}
          tableLocale={locale}
        />
      );
    },
    [locale, rowKey, selectedRecords, selection]
  );

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      title={title}
      showSorterTooltip={false}
      components={{
        body: {
          row: RenderRow,
        },
        ...decoratedComponents,
      }}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      rowSelection={
        selection && {
          ...selection,
          selections: selection?.selections?.filter(Boolean),
          columnWidth: 64,
          renderCell: renderRowSelection,
        }
      }
    />
  );
}

export default DefaultTable;
