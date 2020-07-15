import * as React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import Checkbox from '@synerise/ds-checkbox';
import Scrollbar from '@synerise/ds-scrollbar';
import DSTable from '../Table';
import { DSTableProps, RowType } from '../Table.types';
import VirtualTableRow from './VirtualTableRow';

export const EXPANDED_ROW_PROPERTY = 'expandedChild';

interface Props<T> extends DSTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  scroll: {
    x?: number;
    y: number;
  };
  onRowClick?: (row: T) => void;
  cellHeight: number;
  initialWidth: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VirtualTable<T extends any & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
  props: Props<T>
): React.ReactElement {
  const {
    columns,
    scroll,
    className,
    cellHeight = 52,
    selection,
    onRowClick,
    rowKey,
    initialWidth = 0,
    dataSource,
    expandable,
  } = props;

  const [tableWidth, setTableWidth] = React.useState(initialWidth);

  const getRowKey = React.useCallback(
    (row: T): React.ReactText | undefined => {
      if (typeof rowKey === 'function') return rowKey(row);
      if (typeof rowKey === 'string') return row[rowKey];
      return undefined;
    },
    [rowKey]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const virtualColumns = React.useMemo((): any[] => {
    if (selection) {
      return [
        {
          width: 72,
          key: 'key',
          dataIndex: 'key',
          render: (key: string, record: T): React.ReactNode => {
            const recordKey = getRowKey(record);
            const hasChilds = record.children !== undefined && Array.isArray(record.children);
            const allChildsChecked =
              hasChilds &&
              record.children?.filter((child: T) => {
                const childKey = getRowKey(child);
                return childKey && selection?.selectedRowKeys.indexOf(childKey) < 0;
              }).length === 0;
            const checkedChilds =
              record.children?.filter((child: T) => {
                const childKey = getRowKey(child);
                return childKey && selection?.selectedRowKeys.indexOf(childKey) >= 0;
              }) || [];
            const isIndeterminate =
              hasChilds && checkedChilds.length > 0 && checkedChilds.length < record.children.length;
            return (
              recordKey !== undefined && (
                <Checkbox
                  checked={
                    (selection.selectedRowKeys && selection.selectedRowKeys.indexOf(recordKey) >= 0) || allChildsChecked
                  }
                  indeterminate={isIndeterminate}
                  onChange={(event): void => {
                    const { selectedRowKeys, onChange } = selection;
                    let selectedRows: T[] = [];
                    dataSource &&
                      dataSource.forEach((row: T): void => {
                        if (row.children !== undefined && Array.isArray(row.children)) {
                          row.children.forEach((child: T) => {
                            const k = getRowKey(child);
                            if (k && selectedRowKeys.indexOf(k) >= 0) {
                              selectedRows = [...selectedRows, child];
                            }
                          });
                        } else {
                          const k = getRowKey(row);
                          if (k && selectedRowKeys.indexOf(k) >= 0) {
                            selectedRows = [...selectedRows, row];
                          }
                        }
                      });
                    if (event.target.checked) {
                      if (hasChilds) {
                        selectedRows = [...selectedRows, ...record.children];
                      } else {
                        selectedRows = [...selectedRows, record];
                      }
                    } else if (hasChilds) {
                      const childsKeys = record.children.map((child: T) => getRowKey(child));
                      selectedRows = selectedRows.filter(child => childsKeys.indexOf(getRowKey(child)) < 0);
                    } else {
                      selectedRows = selectedRows.filter(row => getRowKey(row) !== recordKey);
                    }

                    selectedRows = [...new Set(selectedRows)];

                    onChange &&
                      onChange(
                        selectedRows.map(selected => getRowKey(selected) as React.ReactText),
                        selectedRows
                      );
                  }}
                />
              )
            );
          },
        },
        ...columns,
      ];
    }
    return columns;
  }, [columns, selection, getRowKey, dataSource]);

  const mergedColumns = React.useMemo(() => {
    const widthColumnCount = virtualColumns.filter(({ width }) => !width).length;
    const rowWidth = tableWidth || initialWidth;
    const definedWidth = virtualColumns
      .filter(({ width }) => width)
      .reduce((total: number, { width }): number => total + width, 0);

    return virtualColumns?.map(column => {
      if (column.width) {
        return column;
      }

      return {
        ...column,
        width: Math.floor((rowWidth - definedWidth) / widthColumnCount),
      };
    });
  }, [virtualColumns, tableWidth, initialWidth]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef = React.useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [connectObject] = React.useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = (): void => {
    if (gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
    }
  };

  const CustomScrollbar = React.useCallback(({ onScroll, children }): React.ReactElement => {
    return (
      <Scrollbar onScroll={onScroll} absolute maxHeight={scroll.y}>
        {children}
      </Scrollbar>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => resetVirtualGrid, []);
  React.useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderBody = React.useCallback(
    (rawData, meta): React.ReactNode => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderVirtualList = (data: T[], { ref, onScroll }: any): React.ReactNode => {
        // eslint-disable-next-line no-param-reassign
        ref.current = connectObject;
        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          <Grid
            ref={gridRef}
            className="virtual-grid"
            columnCount={mergedColumns.length}
            columnWidth={(index: number): number => {
              const { width } = mergedColumns[index];
              const columnWidth = index === mergedColumns.length - 1 ? width - 1 : width;
              return columnWidth;
            }}
            height={scroll.y}
            rowCount={data.length}
            rowHeight={(): number => cellHeight}
            width={tableWidth}
            onScroll={({ scrollLeft }: { scrollLeft: number }): void => {
              onScroll({ scrollLeft });
            }}
            outerElementType={CustomScrollbar}
          >
            {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
            {({
              columnIndex,
              rowIndex,
              style,
            }: {
              columnIndex: number;
              rowIndex: number;
              style: object;
            }): React.ReactNode => (
              <VirtualTableRow<T>
                columnIndex={columnIndex}
                rowIndex={rowIndex}
                style={style}
                mergedColumns={mergedColumns}
                data={data}
                selection={selection}
                onRowClick={onRowClick}
              />
            )}
          </Grid>
        );
      };

      if (expandable?.expandedRowKeys?.length) {
        const expandedRows = rawData.reduce((result: T[], currentRow: T) => {
          const key = getRowKey(currentRow);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          if (key !== undefined && expandable?.expandedRowKeys?.includes(key) && currentRow.children.length) {
            return [
              ...result,
              currentRow,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              ...currentRow.children.map((child: T) => ({ ...child, [EXPANDED_ROW_PROPERTY]: true })),
            ];
          }
          return [...result, currentRow];
        }, []);
        return renderVirtualList(expandedRows, meta);
      }
      return renderVirtualList(rawData, meta);
    },
    [
      expandable,
      getRowKey,
      mergedColumns,
      onRowClick,
      scroll,
      selection,
      tableWidth,
      CustomScrollbar,
      cellHeight,
      connectObject,
    ]
  );

  return (
    <ResizeObserver
      onResize={({ width }): void => {
        setTableWidth(width);
      }}
    >
      <DSTable
        {...props}
        className={classNames(className, 'virtual-table')}
        columns={selection ? mergedColumns.slice(1) : mergedColumns}
        pagination={false}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        components={{
          body: renderBody,
        }}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
