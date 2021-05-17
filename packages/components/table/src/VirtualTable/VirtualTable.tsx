import * as React from 'react';
import { FixedSizeList as List } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { compact } from 'lodash';
import { useIntl } from 'react-intl';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Scrollbar from '@synerise/ds-scrollbar';
import { infiniteLoaderItemHeight } from '../InfiniteScroll/constants';
import BackToTopButton from '../InfiniteScroll/BackToTopButton';
import DSTable from '../Table';
import { RowType, DSTableProps } from '../Table.types';
import VirtualTableRow from './VirtualTableRow';
import { Props } from './VirtualTable.types';
import useRowStar from '../hooks/useRowStar';
import { useTableLocale } from '../utils/locale';

export const EXPANDED_ROW_PROPERTY = 'expandedChild';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function VirtualTable<T extends RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
  props: Props<T>
): React.ReactElement {
  const {
    columns = [],
    scroll,
    className,
    cellHeight = 52,
    infiniteScroll,
    selection,
    onRowClick,
    rowKey,
    rowStar,
    initialWidth = 0,
    dataSource = [],
    expandable,
    locale,
  } = props;
  const intl = useIntl();
  const tableLocale = useTableLocale(intl, locale);

  const [tableWidth, setTableWidth] = React.useState(initialWidth);
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);
  const propsForRowStar = {
    ...props,
    rowStar: {
      ...rowStar,
      onClick: (e): void => {
        e.stopPropagation();

        if (typeof rowStar?.onClick === 'function') {
          rowStar.onClick(e);
        }
      },
    },
    locale: tableLocale,
  } as Props<T>;
  const rowStarColumn = getRowStarColumn(propsForRowStar);

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
    return compact([
      !!selection && {
        width: 64,
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
          const checked =
            (recordKey !== undefined &&
              selection.selectedRowKeys &&
              selection.selectedRowKeys.indexOf(recordKey) >= 0) ||
            allChildsChecked;
          return (
            recordKey !== undefined && (
              <Tooltip title={tableLocale?.selectRowTooltip} mouseLeaveDelay={0}>
                <Button.Checkbox
                  key={`checkbox-${recordKey}`}
                  checked={checked}
                  disabled={!checked && Boolean(selection.limit && selection.limit <= selection.selectedRowKeys.length)}
                  indeterminate={isIndeterminate}
                  onClick={(e): void => {
                    e.stopPropagation();
                  }}
                  onChange={(isChecked): void => {
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
                    if (isChecked) {
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
              </Tooltip>
            )
          );
        },
      },
      !!rowStar && rowStarColumn,
      ...columns,
    ]);
  }, [columns, selection, rowStar, rowStarColumn, getRowKey, dataSource, tableLocale]);

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
  const listRef = React.useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [connectObject] = React.useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (listRef.current) {
          listRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const scrollBarRef = React.useRef<HTMLElement>(null);

  const CustomScrollbar = React.useCallback(({ onScroll, children }): React.ReactElement => {
    const handleScrollEndReach = infiniteScroll?.onScrollEndReach;

    return (
      <Scrollbar
        ref={scrollBarRef}
        onScroll={onScroll}
        absolute
        maxHeight={scroll.y}
        onYReachEnd={handleScrollEndReach}
      >
        {children}
      </Scrollbar>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listInnerElementType = React.forwardRef<HTMLDivElement>(
    ({ style, ...rest }: React.HTMLAttributes<HTMLDivElement>, ref) => (
      <div
        ref={ref}
        style={{
          ...style,
          height: `${Number(style?.height) + infiniteLoaderItemHeight}px`,
        }}
        {...rest}
      />
    )
  );

  const handleBackToTopClick = (): void => {
    if (!scrollBarRef.current) {
      return;
    }

    scrollBarRef.current.scrollTop = 0;
  };

  const renderBody = React.useCallback(
    (rawData: T[], meta: unknown, defaultTableProps?: DSTableProps<T>): React.ReactNode => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderVirtualList = (data: T[], { ref }: any): React.ReactNode => {
        // eslint-disable-next-line no-param-reassign
        ref.current = connectObject;
        return (
          <>
            <List
              ref={listRef}
              className="virtual-grid"
              height={scroll.y}
              itemCount={data.length}
              itemSize={cellHeight}
              width={tableWidth}
              itemData={{
                mergedColumns,
                selection,
                onRowClick,
                dataSource: data,
                infiniteScroll,
                cellHeight,
                defaultTableProps,
              }}
              itemKey={(index): string => {
                return String(getRowKey(data[index]));
              }}
              outerElementType={CustomScrollbar}
              overscanCount={1}
              innerElementType={infiniteScroll && listInnerElementType}
            >
              {VirtualTableRow}
            </List>
            {infiniteScroll && <BackToTopButton onClick={handleBackToTopClick} />}
          </>
        );
      };

      if (expandable?.expandedRowKeys?.length) {
        const expandedRows = rawData.reduce((result: T[], currentRow: T) => {
          const key = getRowKey(currentRow);
          if (key !== undefined && expandable?.expandedRowKeys?.includes(key) && currentRow.children.length) {
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
      infiniteScroll,
      listInnerElementType,
    ]
  );

  const columnsSliceStartIndex = Number(!!selection) + Number(!!rowStar);

  return (
    <ResizeObserver
      onResize={({ offsetWidth }): void => {
        setTableWidth(offsetWidth);
      }}
    >
      <DSTable
        {...props}
        className={classNames(className, 'virtual-table', !!infiniteScroll && 'virtual-table-infinite-scroll')}
        // Remove columns which cause header columns indent
        columns={mergedColumns.slice(columnsSliceStartIndex)}
        pagination={false}
        components={{
          body: renderBody,
        }}
        locale={tableLocale}
      />
    </ResizeObserver>
  );
}

export default VirtualTable;
