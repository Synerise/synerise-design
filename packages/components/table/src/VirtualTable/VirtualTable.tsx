import classnames from 'classnames';
import { compact } from 'lodash';
import ResizeObserver from 'rc-resize-observer';
import React, {
  type CSSProperties,
  type HTMLAttributes,
  type Key,
  type ReactElement,
  type Ref,
  type UIEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { FixedSizeList as List, type ListOnScrollProps } from 'react-window';

import { useElementInView } from '@synerise/ds-utils';

import BackToTopButton from '../InfiniteScroll/BackToTopButton';
import OuterListElement from '../InfiniteScroll/OuterListElement';
import { infiniteLoaderItemHeight } from '../InfiniteScroll/constants';
import { RowSelectionColumn } from '../RowSelection';
import DSTable from '../Table';
import type {
  CustomizeScrollBodyInfo,
  DSColumnType,
  DSTableProps,
  RowSelection,
  RowType,
  ScrollProxyType,
} from '../Table.types';
import { useRowKey } from '../hooks/useRowKey';
import { type CreateRowStarColumnProps, useRowStar } from '../hooks/useRowStar';
import { calculateColumnWidths, useTableLocale } from '../utils';
import { getChildrenColumnName } from '../utils/getChildrenColumnName';
import * as S from './VirtualTable.styles';
import type {
  VirtualColumnType,
  VirtualTableProps,
  VirtualTableRef,
} from './VirtualTable.types';
import VirtualTableRow, {
  INFINITE_LOADED_ITEM_HEIGHT,
  type VirtualTableRowProps,
} from './VirtualTableRow';
import {
  EXPANDED_ROW_PROPERTY,
  HEADER_ROW_HEIGHT,
  LOAD_DATA_OFFSET,
} from './constants';

const relativeInlineStyle: CSSProperties = { position: 'relative' };

const VirtualTable = <
  T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean },
>(
  props: VirtualTableProps<T>,
  forwardedRef: Ref<VirtualTableRef>,
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
    getRowTooltipProps,
    onListRefChange,
    onItemsRendered,
    onScrollToRecordIndex,
  } = props;
  const intl = useIntl();
  const tableLocale = useTableLocale(intl, locale);
  const listRef = useRef<List>(null);
  const listScrollTopRef = useRef(0);
  const outerListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const customBodyOnScrollRef = useRef<CustomizeScrollBodyInfo['onScroll']>();
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [firstItem, setFirstItem] = useState<T | null>(null);

  const childrenColumnName = getChildrenColumnName<T>(
    expandable?.childrenColumnName as keyof T,
  );

  const hasInfiniteScroll = Boolean(infiniteScroll);
  const isSticky = Boolean(sticky);
  const stickyScrollThreshold = sticky && sticky.scrollThreshold;
  const dataSourceEmpty = dataSource.length === 0;

  const updateFirstItem = useCallback(
    (findFirstItem: (item: T) => boolean): void => {
      const prevFirstItemIndex = dataSource.findIndex(findFirstItem);
      setFirstItem(dataSource[0]);

      if (prevFirstItemIndex >= 0 && listRef?.current) {
        if (onScrollToRecordIndex) {
          onScrollToRecordIndex(prevFirstItemIndex, () => {
            listRef?.current &&
              listRef.current.scrollToItem(prevFirstItemIndex, 'start');
          });
        } else {
          listRef.current.scrollToItem(prevFirstItemIndex, 'start');
        }
      }
    },
    [dataSource, setFirstItem, onScrollToRecordIndex],
  );

  useEffect(() => {
    if (dataSourceEmpty) {
      setIsHeaderVisible(false);
    }
  }, [dataSourceEmpty]);

  useEffect(() => {
    try {
      if (!infiniteScroll?.prevPage || dataSourceEmpty) {
        return;
      }
      if (firstItem === null) {
        setFirstItem(dataSource[0]);
        return;
      }
      if (rowKey === undefined) {
        const firstItemStringified = JSON.stringify(firstItem);
        if (JSON.stringify(dataSource[0]) !== firstItemStringified) {
          updateFirstItem(
            (item) => JSON.stringify(item) === firstItemStringified,
          );
        }
        return;
      }
      if (typeof rowKey === 'string') {
        if (dataSource[0][rowKey as keyof T] !== firstItem[rowKey as keyof T]) {
          updateFirstItem(
            (item) => item[rowKey as keyof T] === firstItem[rowKey as keyof T],
          );
        }
        return;
      }
      if (typeof rowKey === 'function') {
        if (rowKey(dataSource[0]) !== rowKey(firstItem)) {
          updateFirstItem((item) => rowKey(item) === rowKey(firstItem));
        }
      }
    } catch (_error) {
      throw new Error('Cannot find firs item');
    }
  }, [
    dataSource,
    dataSourceEmpty,
    rowKey,
    firstItem,
    infiniteScroll,
    updateFirstItem,
  ]);

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
  const [titleBarHeight, setTitleBarHeight] = useState(0);
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
      onClick: (e) => {
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

  const selectedRecords = useMemo(() => {
    if (selection) {
      const { selectedRowKeys = [] } = selection as RowSelection<T>;
      let selectedRows: T[] = [];
      allData.forEach((row: T) => {
        const key = getRowKey(row);
        const rowChildren = row[childrenColumnName];

        if (key && selectedRowKeys.indexOf(key) >= 0) {
          selectedRows = [...selectedRows, row];
        }
        if (rowChildren !== undefined && Array.isArray(rowChildren)) {
          rowChildren.forEach((child: T) => {
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
  }, [allData, childrenColumnName, getRowKey, selection]);

  const renderRowSelection = useCallback(
    (key: string, record: T) => {
      const {
        selectedRowKeys,
        limit,
        independentSelectionExpandedRows,
        onChange,
        checkRowSelectionStatus,
      } = selection as RowSelection<T>;
      const handleChange = (keys: Key[], records: T[]) => {
        if (isSticky && listScrollTopRef.current) {
          setIsHeaderVisible(true);
        }
        onChange(keys, records);
      };
      return (
        <RowSelectionColumn
          rowKey={rowKey}
          record={record}
          limit={limit}
          selectedRowKeys={selectedRowKeys}
          independentSelectionExpandedRows={independentSelectionExpandedRows}
          onChange={handleChange}
          selectedRecords={selectedRecords}
          isGlobalAllSelected={selection?.globalSelection?.isSelected}
          tableLocale={locale}
          getSelectionTooltipProps={selection?.getSelectionTooltipProps}
          checkRowSelectionStatus={checkRowSelectionStatus}
          childrenColumnName={childrenColumnName}
        />
      );
    },
    [isSticky, locale, rowKey, selectedRecords, selection, childrenColumnName],
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

  const mergedColumns: VirtualColumnType<T>[] = useMemo(() => {
    const columnWidths = calculateColumnWidths(virtualColumns, tableWidth);
    let cumulativeRightOffset = 0;
    let cumulativeLeftOffset = 0;
    let firstFixedRightFound = false;

    const { fixedLeft, remaining, fixedRight } = virtualColumns.reduce(
      (prev, column, index) => {
        const left = cumulativeLeftOffset;
        const right = cumulativeRightOffset;
        const width = columnWidths[index];
        if (column.fixed === 'right') {
          cumulativeRightOffset += width;
          const fixedFirst = !firstFixedRightFound;
          if (!firstFixedRightFound) {
            firstFixedRightFound = true;
          }
          return {
            ...prev,
            fixedRight: [
              ...prev.fixedRight,
              {
                ...column,
                fixedFirst,
                right,
                width,
              },
            ],
          };
        }
        if (column.fixed === 'left') {
          cumulativeLeftOffset += width;
          const { fixedLeft: prevFixedLeft } = prev;
          const newFixedLeft = prevFixedLeft.length
            ? [
                ...prevFixedLeft,
                { ...prevFixedLeft.pop(), fixedFirst: false },
                {
                  ...column,
                  fixedFirst: true,
                  left,
                  width,
                },
              ]
            : [
                ...prevFixedLeft,
                {
                  ...column,
                  fixedFirst: true,
                  left,
                  width,
                },
              ];

          return {
            ...prev,
            fixedLeft: newFixedLeft,
          };
        }
        return {
          ...prev,
          remaining: [
            ...prev.remaining,
            {
              ...column,
              width,
            },
          ],
        };
      },
      {
        fixedLeft: [] as VirtualColumnType<T>[],
        fixedRight: [] as VirtualColumnType<T>[],
        remaining: [] as VirtualColumnType<T>[],
      },
    );
    return [...fixedLeft, ...remaining, ...fixedRight];
  }, [tableWidth, virtualColumns]);

  const infiniteLoaderOffset = useMemo(() => {
    if (isSticky && infiniteScroll?.prevPage?.hasMore) {
      return infiniteLoaderItemHeight * 2;
    }
    return infiniteLoaderItemHeight;
  }, [isSticky, infiniteScroll?.prevPage?.hasMore]);

  const listInnerElementType = useMemo(
    () =>
      forwardRef<HTMLDivElement>(
        (
          { style, ...rest }: HTMLAttributes<HTMLDivElement>,
          innerElementRef,
        ) => (
          <S.InnerListElement
            ref={innerElementRef}
            style={{
              ...style,
              height: `${Number(style?.height) + infiniteLoaderOffset}px`,
            }}
            {...rest}
          />
        ),
      ),
    [infiniteLoaderOffset],
  );

  const scrollTo = useCallback((top: number) => {
    if (!listRef.current) {
      return;
    }
    listRef.current.scrollTo(top);
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  const outerElement = useMemo(
    () => OuterListElement(containerRef, isSticky),
    [isSticky],
  );

  const createItemData = useCallback(
    (
      data: readonly T[],
      defaultTableProps: DSTableProps<T> | undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): VirtualTableRowProps<any>['data'] => ({
      mergedColumns,
      selection,
      rowStar,
      onRowClick,
      getRowTooltipProps,
      dataSource: data,
      infiniteScroll,
      cellHeight,
      defaultTableProps,
    }),
    [
      mergedColumns,
      getRowTooltipProps,
      selection,
      rowStar,
      onRowClick,
      infiniteScroll,
      cellHeight,
    ],
  );

  const offsetScroll = sticky && sticky !== true ? sticky.offsetScroll : 0;
  const offsetStickyHeader =
    sticky && sticky !== true ? sticky.offsetHeader : 0;

  const connectObject = useMemo(() => {
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

    return obj as ScrollProxyType;
  }, []);

  const handleStickyScrollbarScroll = useCallback(
    (event: UIEvent) => {
      if (isSticky && customBodyOnScrollRef.current) {
        customBodyOnScrollRef.current({
          scrollLeft: event.currentTarget.scrollLeft,
        });
      } else {
        connectObject.scrollLeft = event.currentTarget.scrollLeft;
      }
    },
    [connectObject, isSticky],
  );

  const renderBody = useCallback(
    (
      rawData: readonly T[],
      meta: CustomizeScrollBodyInfo,
      defaultTableProps?: DSTableProps<T>,
    ) => {
      const { onScroll, ref } = meta;
      customBodyOnScrollRef.current = onScroll;
      // sticky header feature does NOT work without the ref assigned to a html node in the document.
      // without sticky header the ref needs to point to the connect proxy in order for the header and body components to scroll in sync
      // this gets resolved in antd 5.9.0, when antd supports virtualisation out of the box (but not infinite loader)
      if (!isSticky) {
        // @ts-expect-error Property 'current' does not exist on type '(instance: ScrollProxyType | null) => void
        ref.current = connectObject;
      }

      const renderVirtualList = (data: readonly T[]) => {
        const listHeight =
          data.length * cellHeight - scroll.y + infiniteLoaderOffset;

        const listMaxScroll =
          stickyScrollThreshold && infiniteScroll?.maxScroll
            ? infiniteScroll.maxScroll - stickyScrollThreshold
            : listHeight;

        const handleListScroll = ({
          scrollOffset,
          scrollDirection,
        }: ListOnScrollProps) => {
          if (!infiniteScroll || loading || listMaxScroll <= 0) {
            return;
          }
          const { onScrollTopReach, isLoading, onScrollEndReach } =
            infiniteScroll;
          const roundedOffset = Math.ceil(scrollOffset);
          listScrollTopRef.current = roundedOffset;

          if (
            isSticky &&
            scrollDirection === 'forward' &&
            containerRef.current
          ) {
            setIsHeaderVisible(false);
          }
          if (
            isSticky &&
            scrollDirection === 'backward' &&
            containerRef.current
          ) {
            setIsHeaderVisible(roundedOffset > 0);
          }

          if (isLoading) {
            return;
          }

          if (
            scrollDirection === 'forward' &&
            roundedOffset >= listMaxScroll - LOAD_DATA_OFFSET &&
            typeof onScrollEndReach === 'function'
          ) {
            onScrollEndReach();
          } else if (
            scrollDirection === 'backward' &&
            ((offsetScroll &&
              roundedOffset <= offsetScroll + LOAD_DATA_OFFSET) ||
              roundedOffset < LOAD_DATA_OFFSET) &&
            typeof onScrollTopReach === 'function'
          ) {
            onScrollTopReach();
          }
        };

        const itemData = createItemData(data, defaultTableProps);
        let scrollableHeight = isSticky
          ? scroll.y - HEADER_ROW_HEIGHT
          : scroll.y;

        if (
          infiniteScroll?.nextPage?.hasMore &&
          infiniteScroll.prevPage?.hasMore
        ) {
          scrollableHeight += cellHeight;
        }

        const handleBodyScroll = (event: UIEvent) => {
          const { scrollLeft } = event.currentTarget;
          if (isSticky) {
            const info = {
              scrollLeft,
              currentTarget: event.currentTarget as HTMLElement,
            };
            onScroll(info);
          }

          if (
            horizontalScrollRef.current &&
            horizontalScrollRef.current.scrollLeft !== scrollLeft
          ) {
            horizontalScrollRef.current.scrollTo({ left: scrollLeft });

            setPingRight(
              Math.ceil(scrollLeft) <
                horizontalScrollRef.current.scrollWidth -
                  horizontalScrollRef.current.clientWidth,
            );
            setPingLeft(Math.floor(scrollLeft) > 0);
          }
        };

        return (
          <S.VirtualListWrapper
            listWidth={tableWidth}
            data-testid="virtual-list-wrapper"
            isSticky={isSticky}
            listHeight={listHeight + HEADER_ROW_HEIGHT}
            onScroll={handleBodyScroll}
            // @ts-expect-error Type 'RefObject<ScrollProxyType>' is not assignable to type 'RefObject<HTMLDivElement>'
            ref={isSticky ? ref : undefined}
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
              width={scrollWidth}
              itemData={itemData}
              itemKey={(index) => {
                const key = getRowKey(data[index]);
                // @ts-expect-error The left-hand side of an 'instanceof' expression must be of type 'any', an object type or a type parameter.
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
          const rowChildren = currentRow[childrenColumnName];

          if (
            key !== undefined &&
            expandable?.expandedRowKeys?.includes(key) &&
            Array.isArray(rowChildren) &&
            rowChildren.length
          ) {
            return [
              ...result,
              currentRow,
              ...rowChildren.map((child: T, index: number) => ({
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
      isSticky,
      stickyScrollThreshold,
      infiniteScroll,
      createItemData,
      tableWidth,
      scrollWidth,
      onItemsRendered,
      outerElement,
      listInnerElementType,
      loading,
      offsetScroll,
      getRowKey,
      infiniteLoaderOffset,
      childrenColumnName,
    ],
  );

  const columnsSliceStartIndex = Number(!!selection) + Number(!!rowStar);

  const scrollValue =
    !dataSource || dataSource?.length === 0 ? undefined : scroll;
  const [pingRight, setPingRight] = useState(false);
  const [pingLeft, setPingLeft] = useState(false);
  const classNames = React.useMemo(() => {
    return classnames('virtual-table', className, {
      'virtual-table-infinite-scroll': hasInfiniteScroll,
      'with-sticky-header': isSticky,
      'ds-table-ping-left': pingLeft,
      'ds-table-ping-right': pingRight,
    });
  }, [className, hasInfiniteScroll, isSticky, pingLeft, pingRight]);

  const finalColumns = mergedColumns.slice(columnsSliceStartIndex);

  useEffect(() => {
    // trigger body component onScroll to toggle .ant-table-ping-left / .ant-table-ping-right classes that indicate where columns overflow
    if (
      customBodyOnScrollRef.current &&
      outerListRef.current &&
      outerListRef.current.parentElement
    ) {
      const scrollableElement = outerListRef.current.parentElement;
      const {
        scrollLeft,
        scrollWidth: fullWidth,
        clientWidth,
      } = scrollableElement;
      setPingLeft(fullWidth > clientWidth && Math.floor(scrollLeft) > 0);
      setPingRight(
        fullWidth > clientWidth &&
          Math.ceil(scrollLeft) < fullWidth - clientWidth,
      );
      customBodyOnScrollRef.current({ currentTarget: scrollableElement });
    }
  }, [tableWidth, scrollWidth]);

  useEffect(() => {
    if (containerRef?.current) {
      const headerElement =
        containerRef.current.querySelector<HTMLDivElement>('.ant-table-header');
      const titleElement =
        containerRef.current.querySelector<HTMLDivElement>('.ant-table-title');
      headerElement && setScrollWidth(headerElement.scrollWidth);
      titleElement && setTitleBarHeight(titleElement.clientHeight);
    }
  }, [tableWidth, mergedColumns.length, dataSource.length, loading]);

  const { isIntersecting: isStuck, elementRef } =
    useElementInView<HTMLDivElement>(
      {
        rootMargin: `0px 0px 12px 0px`,
        threshold: 0,
      },
      containerRef,
    );
  return (
    <S.VirtualTableWrapper
      isSticky={isSticky}
      titleBarTop={offsetStickyHeader || 0}
      titleBarHeight={titleBarHeight}
      style={isSticky ? {} : relativeInlineStyle}
      key="relative-container"
      ref={containerRef}
      isHeaderVisible={isHeaderVisible}
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
          columns={finalColumns}
          pagination={false}
          components={{
            body: renderBody,
          }}
          locale={tableLocale}
        />
      </ResizeObserver>
      {!!infiniteScroll?.showBackToTopButton && (
        <BackToTopButton onClick={scrollToTop}>
          {tableLocale.infiniteScrollBackToTop}
        </BackToTopButton>
      )}
      {isSticky && dataSource.length ? (
        <S.StickyScrollbar
          isStuck={isStuck}
          offset={offsetScroll || 0}
          ref={horizontalScrollRef}
          onScroll={handleStickyScrollbarScroll}
          absolute
        >
          <S.StickyScrollbarContent
            ref={elementRef}
            scrollWidth={scrollWidth}
          />
        </S.StickyScrollbar>
      ) : null}
    </S.VirtualTableWrapper>
  );
};

type VirtualTableType = <
  T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean },
>(
  p: VirtualTableProps<T> & { ref?: Ref<VirtualTableRef> },
) => ReactElement;

export default forwardRef(VirtualTable) as VirtualTableType;
