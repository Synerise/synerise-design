import * as React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import Checkbox from '@synerise/ds-checkbox';
import Scrollbar from '@synerise/ds-scrollbar';
import DSTable from '../Table';
import { DSTableProps } from '../Table.types';

const EXPANDED_ROW_PROPERTY = 'expanendChild';

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
function VirtualTable<T extends object = { children?: []; [EXPANDED_ROW_PROPERTY]?: boolean }>(
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
            return (
              recordKey !== undefined && (
                <Checkbox
                  checked={selection.selectedRowKeys && selection.selectedRowKeys.indexOf(recordKey) >= 0}
                  onChange={(event): void => {
                    const { selectedRowKeys, onChange } = selection;
                    let selectedKeys = selectedRowKeys || [];
                    if (event.target.checked) {
                      selectedKeys = [...selectedKeys, recordKey];
                    } else {
                      selectedKeys = selectedKeys.filter(k => k !== recordKey);
                    }
                    onChange &&
                      onChange(
                        selectedKeys,
                        (dataSource &&
                          dataSource.filter(row => {
                            const dataSourceRowKey = getRowKey(row);
                            return dataSourceRowKey && selectedKeys.includes(dataSourceRowKey);
                          })) ||
                          []
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderVirtualList = (rawData: T[], { ref, onScroll }: any): React.ReactNode => {
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
        rowCount={rawData.length}
        rowHeight={(): number => cellHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }): void => {
          onScroll({ scrollLeft });
        }}
        outerElementType={CustomScrollbar}
      >
        {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: object }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              'ant-table-selection-column': columnIndex === 0 && selection,
              'ds-expanded-row': rawData[rowIndex][EXPANDED_ROW_PROPERTY],
              'ds-expanded-row-data':
                rawData[rowIndex][EXPANDED_ROW_PROPERTY] &&
                ((columnIndex === 1 && selection) || (columnIndex === 0 && !selection)),
              'ds-expanded-row-first': rawData[rowIndex][EXPANDED_ROW_PROPERTY] && columnIndex === 0,
            })}
            onClick={(): void => onRowClick && onRowClick(rawData[rowIndex])}
            style={style}
          >
            {mergedColumns[columnIndex].render
              ? mergedColumns[columnIndex].render(
                  rawData[rowIndex][mergedColumns[columnIndex].dataIndex],
                  rawData[rowIndex]
                )
              : rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  const renderBody = React.useCallback(
    (rawData, meta): React.ReactNode => {
      if (expandable?.expandedRowKeys?.length) {
        const expandedRows = rawData.reduce((result: T[], currentRow: T) => {
          const key = getRowKey(currentRow);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          if (key !== undefined && expandable?.expandedRowKeys?.includes(key) && currentRow.children.length) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return [
              ...result,
              currentRow,
              ...currentRow.children.map((child: T) => ({ ...child, [EXPANDED_ROW_PROPERTY]: true })),
            ];
          }
          return [...result, currentRow];
        }, []);
        return renderVirtualList(expandedRows, meta);
      }
      return renderVirtualList(rawData, meta);
    },
    [expandable, getRowKey, renderVirtualList]
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
