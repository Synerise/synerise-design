import React, {
  useCallback,
  useState,
  useRef,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useMemo,
  UIEvent,
  useImperativeHandle,
  Ref,
  ReactElement,
} from 'react';
import { FixedSizeList as List, ListOnScrollProps } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import { compact } from 'lodash';
import { useIntl } from 'react-intl';
import { TableSticky } from 'rc-table/lib/interface';
import { infiniteLoaderItemHeight } from '../InfiniteScroll/constants';
import BackToTopButton from '../InfiniteScroll/BackToTopButton';
import OuterListElement from '../InfiniteScroll/OuterListElement';
import DSTable from '../Table';
import { RowType, DSTableProps, RowSelection, CustomizeScrollBodyInfo, DSColumnType } from '../Table.types';
import VirtualTableRow, { INFINITE_LOADED_ITEM_HEIGHT, VirtualTableRowProps } from './VirtualTableRow';
import * as S from './VirtualTable.styles';
import { Props, VirtualTableRef } from './VirtualTable.types';
import { useTableLocale, calculatePixels } from '../utils';
import { useRowKey } from '../hooks/useRowKey';
import { useRowStar, CreateRowStarColumnProps } from '../hooks/useRowStar';
import { RowSelectionColumn } from '../RowSelection';
import { EXPANDED_ROW_PROPERTY, HEADER_ROW_HEIGHT, LOAD_DATA_OFFSET } from './constants';

const relativeInlineStyle: CSSProperties = { position: 'relative' };

const VirtualTable = <T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
  props: Props<T>,
  forwardedRef: Ref<VirtualTableRef>
) => {
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
    dataSourceFull,
    expandable,
    locale,
    loading,
    sticky,
    onListRefChange,
    onItemsRendered,
    onScrollToRecordIndex,
  } = props;
  const intl = useIntl();
  const tableLocale = useTableLocale(intl, locale);
  const listRef = useRef<List>(null);
  const outerListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const customBodyOnScrollRef = useRef<CustomizeScrollBodyInfo['onScroll']>();

  const [firstItem, setFirstItem] = React.useState<T | null>(null);

  const updateFirstItem = useCallback(
    (findFirstItem: (item: T) => boolean): void => {
      const prevFirstItemIndex = dataSource.findIndex(findFirstItem);
      setFirstItem(dataSource[0]);

      if (prevFirstItemIndex >= 0 && listRef?.current) {
        if (onScrollToRecordIndex) {
          onScrollToRecordIndex(prevFirstItemIndex, () => {
            // error    Expected an assignment or function call and instead saw an expression
            listRef?.current && listRef.current.scrollToItem(prevFirstItemIndex, 'start');
          });
        } else {
          listRef.current.scrollToItem(prevFirstItemIndex, 'start');
        }
      }
    },
    [dataSource, setFirstItem, onScrollToRecordIndex]
  );

  useEffect(() => {
    try {
      if (!infiniteScroll?.prevPage || dataSource.length === 0) {
        return;
      }
      if (firstItem === null) {
        setFirstItem(dataSource[0]);
        return;
      }
      if (rowKey === undefined) {
        const firstItemStringified = JSON.stringify(firstItem);
        if (JSON.stringify(dataSource[0]) !== firstItemStringified) {
          updateFirstItem(item => JSON.stringify(item) === firstItemStringified);
        }
        return;
      }
      if (typeof rowKey === 'string') {
        if (dataSource[0][rowKey] !== firstItem[rowKey]) {
          updateFirstItem(item => item[rowKey] === firstItem[rowKey]);
        }
        return;
      }
      if (typeof rowKey === 'function') {
        if (rowKey(dataSource[0]) !== rowKey(firstItem)) {
          updateFirstItem(item => rowKey(item) === rowKey(firstItem));
        }
      }
    } catch (error) {
      throw new Error('Cannot find firs item');
    }
  }, [dataSource, dataSource.length, rowKey, firstItem, infiniteScroll, updateFirstItem]);

  useEffect(() => {
    if (listRef.current && infiniteScroll?.prevPage?.hasMore) {
      listRef.current.scrollTo(INFINITE_LOADED_ITEM_HEIGHT);
    }
  }, [listRef, infiniteScroll?.prevPage?.hasMore]);

  useImperativeHandle(forwardedRef, () => ({
    virtualListRef: listRef,
    outerListRef,
    horizontalScrollRef,
    scrollTo,
    scrollToTop,
  }));

  const [tableWidth, setTableWidth] = useState(initialWidth);
  const [scrollWidth, setScrollWidth] = useState(initialWidth);
  const { getRowStarColumn } = useRowStar(rowStar?.starredRowKeys || []);

  // deprecated, verify if not used and remove
  useEffect(() => {
    listRef.current && onListRefChange && onListRefChange(listRef);
  });

  const { getRowKey } = useRowKey(rowKey);

  const allData = dataSourceFull || dataSource;

  const propsForRowStar = {
    ...props,
    rowStar: {
      ...rowStar,
      onClick: e => {
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

  const selectedRecords = getSelectedRecords();

  function getSelectedRecords() {
    if (selection) {
      const { selectedRowKeys } = selection as RowSelection<T>;
      let selectedRows: T[] = [];
      allData.forEach((row: T) => {
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
  }

  const renderRowSelection = useCallback(
    (key: string, record: T) => {
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

  const virtualColumns: DSColumnType<T>[] = useMemo(() => {
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

  const mergedColumns = useMemo(() => {
    const widthColumnCount = virtualColumns.filter(({ width }) => !width).length;
    const rowWidth = tableWidth || initialWidth;
    const definedWidth = virtualColumns.reduce((total: number, { width }) => {
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
      const calculatedWidth = Math.floor((rowWidth - definedWidth) / widthColumnCount);
      return {
        ...column,
        width: calculatedWidth > 0 ? calculatedWidth : 1,
      };
    });
  }, [virtualColumns, tableWidth, initialWidth]);

  const fixedColumns = useMemo(() => {
    const fixedLeftColumns = mergedColumns.filter(({ fixed }) => fixed === 'left');
    let cumulativeLeftOffset = 0;
    const finalFixedLeftColumns = fixedLeftColumns.map((column, index) => {
      const left = cumulativeLeftOffset;
      if (column.width) {
        cumulativeLeftOffset += column.width;
      }
      return {
        ...column,
        fixedFirst: index === fixedLeftColumns.length - 1,
        left,
      };
    });
    let cumulativeRightOffset = 0;
    const fixedRightColumns = mergedColumns.filter(({ fixed }) => fixed === 'right');
    const finalFixedRightColumns = fixedRightColumns
      .reverse()
      .map((column, index) => {
        const right = cumulativeRightOffset;
        if (column.width) {
          cumulativeRightOffset += column.width;
        }
        return {
          ...column,
          fixedFirst: index === fixedRightColumns.length - 1,
          right,
        };
      })
      .reverse();
    const remainingColumns = mergedColumns.filter(({ fixed }) => !fixed);

    return [...finalFixedLeftColumns, ...remainingColumns, ...finalFixedRightColumns];
  }, [mergedColumns]);

  const listInnerElementType = forwardRef<HTMLDivElement>(
    ({ style, ...rest }: HTMLAttributes<HTMLDivElement>, innerElementRef) => (
      <S.InnerListElement
        ref={innerElementRef}
        style={{
          ...style,
          height: `${Number(style?.height) + infiniteLoaderItemHeight}px`,
        }}
        {...rest}
      />
    )
  );

  const scrollTo = useCallback((top: number) => {
    if (!listRef.current) {
      return;
    }
    listRef.current.scrollTo(top);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const outerElement = useMemo(() => OuterListElement(containerRef, Boolean(sticky)), [sticky]);

  const createItemData = useCallback(
    (
      data: T[],
      defaultTableProps: DSTableProps<T> | undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): VirtualTableRowProps<any>['data'] => ({
      mergedColumns: fixedColumns,
      selection,
      rowStar,
      onRowClick,
      dataSource: data,
      infiniteScroll,
      cellHeight,
      defaultTableProps,
    }),
    [cellHeight, infiniteScroll, fixedColumns, onRowClick, rowStar, selection]
  );

  const offsetScroll = sticky && sticky !== true ? (sticky as TableSticky).offsetScroll : 0;

  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (outerListRef.current) {
          return outerListRef.current?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (outerListRef.current) {
          outerListRef.current.scrollTo({ left: scrollLeft });
        }
      },
    });

    return obj;
  });

  const handleStickyScrollbarScroll = useCallback(
    (event: UIEvent) => {
      if (sticky && customBodyOnScrollRef.current) {
        customBodyOnScrollRef.current({ scrollLeft: event.currentTarget.scrollLeft });
      } else {
        connectObject.scrollLeft = event.currentTarget.scrollLeft;
      }
    },
    [connectObject, sticky]
  );

  const renderBody = useCallback(
    (rawData: T[], meta: CustomizeScrollBodyInfo, defaultTableProps?: DSTableProps<T>) => {
      const { onScroll, ref } = meta;
      customBodyOnScrollRef.current = onScroll;
      // sticky header feature does NOT work without the ref assigned to a html node in the document.
      // without sticky header the ref needs to point to the connect proxy in order for the header and body components to scroll in sync
      // this gets resolved in antd 5.9.0, when antd supports virtualisation out of the box (but not infinite loader)
      if (!sticky) {
        // @ts-ignore
        ref.current = connectObject;
      }

      const renderVirtualList = (data: T[]) => {
        const listHeight = data.length * cellHeight - scroll.y + infiniteLoaderItemHeight;

        const listMaxScroll =
          sticky && sticky.scrollThreshold && infiniteScroll?.maxScroll
            ? infiniteScroll?.maxScroll - sticky.scrollThreshold
            : listHeight;

        const handleListScroll = ({ scrollOffset, scrollDirection }: ListOnScrollProps) => {
          if (loading || listMaxScroll <= 0) {
            return;
          }

          const roundedOffset = Math.ceil(scrollOffset);

          if (scrollDirection === 'forward' && containerRef.current) {
            containerRef.current.classList.remove('ant-table-show-header');
          }
          if (scrollDirection === 'backward' && containerRef.current) {
            if (roundedOffset <= 30) {
              containerRef.current.classList.remove('ant-table-show-header');
            } else {
              containerRef.current.classList.add('ant-table-show-header');
            }
          }

          if (
            scrollDirection === 'forward' &&
            roundedOffset >= listMaxScroll - LOAD_DATA_OFFSET &&
            typeof infiniteScroll?.onScrollEndReach === 'function'
          ) {
            infiniteScroll.onScrollEndReach();
          }
          if (
            scrollDirection === 'backward' &&
            ((offsetScroll && roundedOffset <= offsetScroll + LOAD_DATA_OFFSET) || roundedOffset < LOAD_DATA_OFFSET) &&
            typeof infiniteScroll?.onScrollTopReach === 'function'
          ) {
            infiniteScroll.onScrollTopReach();
          }
        };

        const itemData = createItemData(data, defaultTableProps);
        let scrollableHeight = sticky ? scroll.y - HEADER_ROW_HEIGHT : scroll.y;

        if (infiniteScroll?.nextPage?.hasMore && infiniteScroll.prevPage?.hasMore) {
          scrollableHeight += cellHeight;
        }

        const handleBodyScroll = (event: UIEvent) => {
          const { scrollLeft } = event.currentTarget;
          if (sticky) {
            const info = { scrollLeft, currentTarget: event.currentTarget as HTMLElement };
            onScroll(info);
          }

          if (horizontalScrollRef.current && horizontalScrollRef.current.scrollLeft !== scrollLeft) {
            horizontalScrollRef.current.scrollTo({ left: scrollLeft });
          }
        };

        return (
          <S.VirtualListWrapper
            listWidth={tableWidth}
            data-testid="virtual-list-wrapper"
            isSticky={Boolean(sticky)}
            listHeight={listHeight + HEADER_ROW_HEIGHT}
            onScroll={handleBodyScroll}
            // @ts-ignore
            ref={sticky ? ref : undefined}
          >
            <List
              ref={listRef}
              key="virtual-list"
              onScroll={handleListScroll}
              onItemsRendered={onItemsRendered}
              className="virtual-grid"
              height={scrollableHeight}
              layout="vertical"
              itemCount={data.length}
              itemSize={cellHeight}
              width="100%"
              itemData={itemData}
              itemKey={(index): string => {
                const key = getRowKey(data[index]);
                // @ts-ignore
                return String(key instanceof String ? key.toLowerCase() : key);
              }}
              outerElementType={outerElement}
              overscanCount={5}
              outerRef={outerListRef}
              innerElementType={infiniteScroll && listInnerElementType}
            >
              {VirtualTableRow}
            </List>
          </S.VirtualListWrapper>
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
    [
      connectObject,
      expandable?.expandedRowKeys,
      cellHeight,
      scroll.y,
      sticky,
      infiniteScroll,
      createItemData,
      tableWidth,
      onItemsRendered,
      outerElement,
      listInnerElementType,
      loading,
      offsetScroll,
      getRowKey,
    ]
  );

  const columnsSliceStartIndex = Number(!!selection) + Number(!!rowStar);
  // eslint-disable-next-line
  const scrollValue = !dataSource || dataSource?.length === 0 ? undefined : { ...props?.scroll, x: tableWidth };

  const classNames = React.useMemo(() => {
    const infiniteScrollTableClassName = infiniteScroll ? 'virtual-table-infinite-scroll' : '';
    const stickyClassName = sticky ? 'with-sticky-header' : '';
    return `virtual-table ${className} ${infiniteScrollTableClassName} ${stickyClassName}`;
  }, [className, infiniteScroll, sticky]);

  const finalColumns = fixedColumns.slice(columnsSliceStartIndex);

  useEffect(() => {
    if (containerRef?.current) {
      const headerElement = containerRef.current.querySelector<HTMLDivElement>('.ant-table-header');
      headerElement && setScrollWidth(headerElement.scrollWidth);
    }
  }, [finalColumns]);

  useEffect(() => {
    if (containerRef?.current) {
      containerRef.current.classList.remove('ant-table-show-header');
    }
  }, [dataSource.length]);

  return (
    <S.VirtualTableWrapper
      isSticky={Boolean(sticky)}
      style={sticky ? {} : relativeInlineStyle}
      key="relative-container"
      ref={containerRef}
    >
      <ResizeObserver
        onResize={({ offsetWidth }) => {
          setTableWidth(offsetWidth);
        }}
      >
        <DSTable
          {...props}
          sticky={dataSource.length ? sticky : undefined}
          loading={loading}
          scroll={scrollValue}
          className={classNames}
          // @ts-ignore
          columns={finalColumns}
          pagination={false}
          components={{
            body: renderBody,
          }}
          locale={tableLocale}
        />
      </ResizeObserver>
      {!!infiniteScroll?.showBackToTopButton && (
        <BackToTopButton onClick={scrollToTop}>{tableLocale.infiniteScrollBackToTop}</BackToTopButton>
      )}
      {sticky && dataSource.length ? (
        <S.StickyScrollbar
          offset={offsetScroll || 0}
          ref={horizontalScrollRef}
          onScroll={handleStickyScrollbarScroll}
          absolute
        >
          <S.StickyScrollbarContent scrollWidth={scrollWidth} />
        </S.StickyScrollbar>
      ) : null}
    </S.VirtualTableWrapper>
  );
};

export default forwardRef(VirtualTable) as <T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
  p: Props<T> & { ref?: Ref<VirtualTableRef> }
) => ReactElement;
