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
import classNames from 'classnames';
import { compact } from 'lodash';
import { useIntl } from 'react-intl';
import { infiniteLoaderItemHeight } from '../InfiniteScroll/constants';
import BackToTopButton from '../InfiniteScroll/BackToTopButton';
import OuterListElement from '../InfiniteScroll/OuterListElement';
import DSTable from '../Table';
import { RowType, DSTableProps, RowSelection, CustomizeScrollBodyInfo } from '../Table.types';
import VirtualTableRow, { VirtualTableRowProps } from './VirtualTableRow';
import * as S from './VirtualTable.styles';
import { Props, VirtualTableRef } from './VirtualTable.types';
import { useTableLocale, calculatePixels } from '../utils';
import { useRowKey } from '../hooks/useRowKey';
import { useRowStar, CreateRowStarColumnProps } from '../hooks/useRowStar';
import { RowSelectionColumn } from '../RowSelection';
import { EXPANDED_ROW_PROPERTY, HEADER_ROW_HEIGHT } from './constants';

const relativeInlineStyle: CSSProperties = { position: 'relative' };

const VirtualTable = <T extends object & RowType<T> & { [EXPANDED_ROW_PROPERTY]?: boolean }>(
  props: Props<T>,
  ref: Ref<VirtualTableRef>
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
  } = props;
  const intl = useIntl();
  const tableLocale = useTableLocale(intl, locale);
  const listRef = useRef<List>(null);
  const outerListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const customBodyOnScrollRef = useRef<CustomizeScrollBodyInfo['onScroll']>();

  useImperativeHandle(ref, () => ({
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const virtualColumns = useMemo(() => {
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

  const handleStickyScrollbarScroll = useCallback((event: UIEvent) => {
    if (customBodyOnScrollRef.current) {
      customBodyOnScrollRef.current({ scrollLeft: event.currentTarget.scrollLeft });
    }
  }, []);

  const renderBody = useCallback(
    (rawData: T[], meta: CustomizeScrollBodyInfo, defaultTableProps?: DSTableProps<T>) => {
      customBodyOnScrollRef.current = meta.onScroll;

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
          if (
            scrollDirection === 'forward' &&
            roundedOffset >= listMaxScroll &&
            typeof infiniteScroll?.onScrollEndReach === 'function'
          ) {
            infiniteScroll.onScrollEndReach();
          }
          if (
            scrollDirection === 'backward' &&
            roundedOffset === 0 &&
            typeof infiniteScroll?.onScrollTopReach === 'function'
          ) {
            infiniteScroll.onScrollTopReach();
          }
        };

        const itemData = createItemData(data, defaultTableProps);
        const scrollableHeight = sticky ? scroll.y - HEADER_ROW_HEIGHT : scroll.y;
        const handleBodyScroll = (event: UIEvent) => {
          const { scrollLeft } = event.currentTarget;
          const info = { scrollLeft, currentTarget: event.currentTarget as HTMLElement };
          meta.onScroll(info);

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
            ref={meta.ref}
          >
            <List
              ref={listRef}
              key="virtual-list"
              onScroll={handleListScroll}
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
      cellHeight,
      createItemData,
      expandable?.expandedRowKeys,
      getRowKey,
      infiniteScroll,
      listInnerElementType,
      loading,
      outerElement,
      scroll.y,
      sticky,
      tableWidth,
    ]
  );

  const columnsSliceStartIndex = Number(!!selection) + Number(!!rowStar);
  // eslint-disable-next-line
  const scrollValue = !dataSource || dataSource?.length === 0 ? undefined : props?.scroll;

  const finalColumns = mergedColumns.slice(columnsSliceStartIndex);

  useEffect(() => {
    if (containerRef?.current) {
      const headerElement = containerRef.current.querySelector<HTMLDivElement>('.ant-table-header');
      headerElement && setScrollWidth(headerElement.scrollWidth);
    }
  }, [finalColumns]);

  const offsetScroll = sticky && sticky !== true ? sticky.offsetScroll : 0;

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
          className={classNames(
            className,
            'virtual-table',
            !!infiniteScroll && 'virtual-table-infinite-scroll',
            Boolean(sticky) && 'with-sticky-header'
          )}
          // Remove columns which cause header columns indent

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
