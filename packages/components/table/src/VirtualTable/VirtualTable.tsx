import * as React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import Checkbox from '@synerise/ds-checkbox';
import DSTable from '../Table';
import { AntTableProps } from '../Table.types';

interface Props<T> extends AntTableProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  scroll: {
    x: number;
    y: number;
  };
  onRowClick?: (row: T) => void;
  cellHeight: number;
  initialWidth: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VirtualTable<T extends object = any>(props: Props<T>): React.ReactElement {
  const {
    columns,
    scroll,
    className,
    cellHeight = 52,
    rowSelection,
    onRowClick,
    rowKey,
    initialWidth = 0,
    dataSource,
    selection,
  } = props;
  const [tableWidth, setTableWidth] = React.useState(initialWidth);

  const getRowKey = React.useCallback(
    (row: T): React.ReactText => {
      return typeof rowKey === 'function' ? rowKey(row) : rowKey || 'key';
    },
    [rowKey]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const virtualColumns = React.useMemo((): any[] => {
    if (rowSelection) {
      return [
        {
          width: 64,
          key: 'key',
          dataIndex: 'key',
          render: (key: string, record: T): React.ReactNode => {
            const recordKey = getRowKey(record);
            return (
              <Checkbox
                checked={rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.indexOf(recordKey) >= 0}
                onChange={(event): void => {
                  const { selectedRowKeys, onChange } = rowSelection;
                  let selectedKeys = selectedRowKeys || [];
                  if (event.target.checked) {
                    selectedKeys = [...selectedKeys, recordKey];
                  } else {
                    selectedKeys = selectedKeys.filter(k => k !== recordKey);
                  }
                  onChange &&
                    onChange(
                      selectedKeys,
                      (dataSource && dataSource.filter(row => selectedKeys.includes(getRowKey(row)))) || []
                    );
                }}
              />
            );
          },
        },
        ...columns,
      ];
    }
    return columns;
  }, [columns, rowSelection, getRowKey, dataSource]);

  const mergedColumns = React.useMemo(() => {
    const widthColumnCount = virtualColumns.filter(({ width }) => !width).length;
    const definedWidth = virtualColumns
      .filter(({ width }) => width)
      .reduce((total: number, { width }): number => total + width, 0);

    return virtualColumns?.map(column => {
      if (column.width) {
        return column;
      }

      return {
        ...column,
        width: Math.floor((tableWidth - definedWidth) / widthColumnCount),
      };
    });
  }, [virtualColumns, tableWidth]);

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

  React.useEffect(() => resetVirtualGrid, []);
  React.useEffect(() => resetVirtualGrid, [tableWidth]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderVirtualList = (rawData: T[], { scrollbarSize, ref, onScroll }: any): React.ReactNode => {
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
          const columnWidth = index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
          return columnWidth;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={(): number => cellHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }): void => {
          onScroll({ scrollLeft });
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: object }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              'ant-table-selection-column': columnIndex === 0 && selection,
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
        selection={selection}
        pagination={false}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
