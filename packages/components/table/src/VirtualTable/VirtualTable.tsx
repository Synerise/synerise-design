import * as React from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import { compact } from 'lodash';
import { useIntl } from 'react-intl';
import { ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar.types';
import Scrollbar from '@synerise/ds-scrollbar';
import { infiniteLoaderItemHeight } from '../InfiniteScroll/constants';
import BackToTopButton from '../InfiniteScroll/BackToTopButton';
import DSTable from '../Table';
import { RowType, DSTableProps, RowSelection } from '../Table.types';
import VirtualTableRow, { VirtualTableRowProps } from './VirtualTableRow';
import { RelativeContainer } from './VirtualTable.styles';
import { Props } from './VirtualTable.types';
import { useTableLocale, calculatePixels } from '../utils';
import { useRowKey } from '../hooks/useRowKey';
import { useRowStar } from '../hooks/useRowStar/useRowStar';
import { CreateRowStarColumnProps } from '../hooks/useRowStar/useRowStar.types';
import { RowSelectionColumn } from '../RowSelection';

export const EXPANDED_ROW_PROPERTY = 'expandedChild';

const relativeInlineStyle: React.CSSProperties = { position: 'relative' };
const CustomScrollbar = (containerRef: React.RefObject<HTMLDivElement>): React.FC =>
  React.forwardRef<HTMLElement, React.HTMLAttributes<Element>>(
    ({ onScroll, children, style }, ref): React.ReactElement => {
      const [header, setHeader] = React.useState<HTMLDivElement | null>(null);
      React.useEffect(() => {
        if (containerRef?.current) {
          const headerElement = containerRef.current.querySelector<HTMLDivElement>('.ant-table-header');
          headerElement && setHeader(headerElement);
        }
      }, []);
      const onScrollHandler: ScrollbarProps['onScroll'] = React.useCallback(
        e => {
          if (header) {
            header.scrollTo({ left: e.currentTarget.scrollLeft });
          }
          onScroll && onScroll(e);
        },
        [onScroll, header]
      );
      return (
        <Scrollbar ref={ref} onScroll={onScrollHandler} absolute maxHeight={style?.height}>
          {children}
        </Scrollbar>
      );
    }
  );

function VirtualTable<T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
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
    onListRefChange,
  } = props;
  const intl = useIntl();
  const tableLocale = useTableLocale(intl, locale);
  const listRef = React.useRef<List>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [tableWidth, setTableWidth] = React.useState(initialWidth);
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);

  React.useEffect(() => {
    onListRefChange && onListRefChange(listRef);
  }, [listRef, onListRefChange]);

  const { getRowKey } = useRowKey(rowKey);

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
    getRowKey,
    locale: tableLocale,
  } as CreateRowStarColumnProps;

  const rowStarColumn = getRowStarColumn(propsForRowStar);

  const selectedRecords = React.useMemo(() => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const virtualColumns = React.useMemo((): any[] => {
    return compact([
      !!selection && {
        width: 64,
        key: 'key',
        dataIndex: 'key',
        render: renderRowSelection,
      },
      !!rowStar && rowStarColumn,
      ...columns,
    ]);
  }, [selection, renderRowSelection, rowStar, rowStarColumn, columns]);

  const mergedColumns = React.useMemo(() => {
    const widthColumnCount = virtualColumns.filter(({ width }) => !width).length;
    const rowWidth = tableWidth || initialWidth;
    const definedWidth = virtualColumns.reduce((total: number, { width }): number => {
      const widthInPx = calculatePixels(width) || 0;
      return total + widthInPx;
    }, 0);

    return virtualColumns?.map(column => {
      if (column.width) {
        return {
          ...column,
          width: calculatePixels(column.width),
        };
      }

      return {
        ...column,
        width: Math.floor((rowWidth - definedWidth) / widthColumnCount),
      };
    });
  }, [virtualColumns, tableWidth, initialWidth]);

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
    if (!listRef.current) {
      return;
    }

    listRef.current.scrollTo(0);
  };

  const outerElement = React.useMemo(() => CustomScrollbar(containerRef), [containerRef]);

  const createItemData = React.useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultTableProps: DSTableProps<any> | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): VirtualTableRowProps<any>['data'] => ({
      mergedColumns,
      selection,
      rowStar,
      onRowClick,
      dataSource: data,
      infiniteScroll,
      cellHeight,
      defaultTableProps,
    }),
    [cellHeight, infiniteScroll, mergedColumns, onRowClick, rowStar, selection]
  );

  const renderBody = React.useCallback(
    (rawData: T[], meta: unknown, defaultTableProps?: DSTableProps<T>): React.ReactNode => {
      const renderVirtualList = (data: T[]): React.ReactNode => {
        const listHeight = data.length * cellHeight - scroll.y + infiniteLoaderItemHeight;

        const handleListScroll = ({ scrollOffset, scrollDirection }: ListOnScrollProps): void => {
          if (
            scrollDirection === 'forward' &&
            scrollOffset >= listHeight &&
            typeof infiniteScroll?.onScrollEndReach === 'function'
          ) {
            infiniteScroll.onScrollEndReach();
          }
          if (
            scrollDirection === 'backward' &&
            scrollOffset === 0 &&
            typeof infiniteScroll?.onScrollTopReach === 'function'
          ) {
            infiniteScroll.onScrollTopReach();
          }
        };

        const itemData = createItemData(data, defaultTableProps);

        return (
          <List
            ref={listRef}
            key="virtual-list"
            onScroll={handleListScroll}
            className="virtual-grid"
            height={scroll.y}
            itemCount={data.length}
            itemSize={cellHeight}
            width="100%"
            itemData={itemData}
            itemKey={(index): string => {
              return String(getRowKey(data[index]));
            }}
            outerElementType={outerElement}
            overscanCount={1}
            innerElementType={infiniteScroll && listInnerElementType}
          >
            {VirtualTableRow}
          </List>
        );
      };

      if (expandable?.expandedRowKeys?.length) {
        const expandedRows = rawData.reduce((result: T[], currentRow: T) => {
          const key = getRowKey(currentRow);
          if (
            key !== undefined &&
            expandable?.expandedRowKeys?.includes(key) &&
            Array.isArray(currentRow.children) &&
            currentRow.children.length
          ) {
            return [
              ...result,
              currentRow,
              ...currentRow.children.map((child: T, index: number) => ({
                ...child,
                [EXPANDED_ROW_PROPERTY]: true,
                index,
              })),
            ];
          }
          return [...result, currentRow];
        }, []);
        return renderVirtualList(expandedRows);
      }
      return renderVirtualList(rawData);
    },
    [cellHeight, createItemData, expandable, getRowKey, infiniteScroll, listInnerElementType, outerElement, scroll.y]
  );

  const columnsSliceStartIndex = Number(!!selection) + Number(!!rowStar);
  const scrollValue = !dataSource || dataSource?.length === 0 ? undefined : props?.scroll;

  return (
    <RelativeContainer key="relative-container" ref={containerRef} style={relativeInlineStyle}>
      <ResizeObserver
        onResize={({ offsetWidth }): void => {
          setTableWidth(offsetWidth);
        }}
      >
        <DSTable
          {...props}
          scroll={scrollValue}
          className={classNames(className, 'virtual-table', !!infiniteScroll && 'virtual-table-infinite-scroll')}
          // Remove columns which cause header columns indent
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          columns={mergedColumns.slice(columnsSliceStartIndex)}
          pagination={false}
          components={{
            body: renderBody,
          }}
          locale={tableLocale}
        />
      </ResizeObserver>
      {!!infiniteScroll?.showBackToTopButton && (
        <BackToTopButton onClick={handleBackToTopClick}>{tableLocale.infiniteScrollBackToTop}</BackToTopButton>
      )}
    </RelativeContainer>
  );
}

export default VirtualTable;
