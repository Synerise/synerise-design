import classNames from 'classnames';
import React, {
  type CSSProperties,
  type ReactElement,
  memo,
  useCallback,
  useMemo,
} from 'react';
import { areEqual } from 'react-window';

import InfiniteLoaderItem from '../InfiniteScroll/InfiniteLoaderItem';
import type {
  InfiniteScrollProps,
  LoaderItemPosition,
} from '../InfiniteScroll/InfiniteLoaderItem.types';
import type { DSColumnType, DSTableProps, RowSelection } from '../Table.types';
import { type RowStar } from '../hooks/useRowStar';
import { calculatePixels, getValueFromPath } from '../utils';
import * as S from './VirtualTable.styles';
import { EXPANDED_ROW_PROPERTY } from './constants';

export const INFINITE_LOADED_ITEM_HEIGHT = 64;

export interface VirtualTableRowProps<T> {
  data: {
    dataSource: readonly T[];
    cellHeight: number;
    infiniteScroll: InfiniteScrollProps | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergedColumns: any[];
    selection?: RowSelection<T>;
    rowStar?: RowStar<T>;
    onRowClick?: (row: T) => void;
    defaultTableProps?: DSTableProps<T>;
  };
  index: number;
  style: CSSProperties;
}

const isColumnSortingActive = <T,>(
  columns: DSColumnType<T>[],
  column: DSColumnType<T>,
): boolean =>
  !!columns.find((c): boolean => c.key === column.key && !!c.sortOrder);

const calculateToPixelsIfDefined = (
  value: string | number | undefined | null,
): number | undefined | null =>
  value ? calculatePixels(value) : (value as number);

function VirtualTableRow<T extends object>({
  index,
  style,
  data: {
    mergedColumns,
    onRowClick,
    selection,
    rowStar,
    dataSource,
    cellHeight,
    infiniteScroll,
    defaultTableProps,
  },
}: VirtualTableRowProps<T>): ReactElement {
  const renderColumn = useCallback(
    (column: DSColumnType<T>, rowData: T, columnIndex: number) => {
      if (rowData[EXPANDED_ROW_PROPERTY as keyof T] && column.childRender) {
        return column.childRender(
          getValueFromPath(rowData, column.dataIndex),
          rowData,
          columnIndex,
        );
      }
      return column.render
        ? column.render(
            getValueFromPath(rowData, column.dataIndex),
            rowData,
            columnIndex,
          )
        : getValueFromPath(rowData, column.dataIndex);
    },
    [],
  );

  const rowData = useMemo(() => dataSource[index], [dataSource, index]);

  const infiniteLoader = useCallback(
    (position: LoaderItemPosition) => {
      let isVisible = false;
      let infiniteLoaderItemProps;
      let { top } = style;

      if (position === 'TOP') {
        isVisible = Boolean(
          infiniteScroll && infiniteScroll.prevPage?.hasMore && index === 0,
        );
        infiniteLoaderItemProps = infiniteScroll?.prevPage;
        top = `0px`;
      }
      if (position === 'BOTTOM') {
        isVisible = Boolean(index === dataSource.length - 1);
        infiniteLoaderItemProps = infiniteScroll?.nextPage;
        const prevDataInfiniteLoaderHeight = infiniteScroll?.prevPage?.hasMore
          ? INFINITE_LOADED_ITEM_HEIGHT
          : 0;
        top = `${Number(style.top) + cellHeight + prevDataInfiniteLoaderHeight}px`;
      }

      return (
        infiniteLoaderItemProps &&
        isVisible && (
          <S.RowWrapper
            style={{
              ...style,
              top,
              height: `${INFINITE_LOADED_ITEM_HEIGHT}px`,
              padding: '0 24px',
              display: 'flex',
            }}
          >
            <InfiniteLoaderItem
              infiniteScroll={{ ...infiniteScroll, ...infiniteLoaderItemProps }}
              position={position}
            />
          </S.RowWrapper>
        )
      );
    },
    [cellHeight, dataSource.length, index, infiniteScroll, style],
  );

  const top = infiniteScroll?.prevPage?.hasMore
    ? `${Number(style.top) + INFINITE_LOADED_ITEM_HEIGHT}px`
    : style.top;

  return (
    <>
      {infiniteLoader('TOP')}
      <S.RowWrapper
        className={classNames('virtual-table-row', {
          'ds-expanded-row': rowData[EXPANDED_ROW_PROPERTY as keyof T],
        })}
        style={{ ...style, top }}
        onClick={(event): void => {
          event.stopPropagation();
          onRowClick && onRowClick(rowData);
        }}
        onRowClickAvailable={onRowClick !== undefined}
      >
        {mergedColumns.map((column, columnIndex) => {
          const firstWithSelectionAndStar =
            selection && rowStar && columnIndex === 2;
          const firstWithSelectionOrStar =
            (selection || rowStar) && columnIndex === 1;
          const firstWithoutSelectionAndStar =
            columnIndex === 0 && !selection && !rowStar;

          return (
            <S.ColWrapper
              left={column.fixed === 'left' ? column.left : undefined}
              right={column.fixed === 'right' ? column.right : undefined}
              className={classNames(
                'virtual-table-cell',
                {
                  'virtual-table-cell-last':
                    columnIndex === mergedColumns.length - 1,
                  'ant-table-selection-column': columnIndex === 0 && selection,
                  'ant-table-cell-fix-right': column.fixed === 'right',
                  'ant-table-cell-fix-left': column.fixed === 'left',
                  'ant-table-cell-fix-right-first':
                    column.fixed === 'right' && column.fixedFirst,
                  'ant-table-cell-fix-left-first':
                    column.fixed === 'left' && column.fixedFirst,
                  'ds-expanded-row-first':
                    rowData[EXPANDED_ROW_PROPERTY as keyof T] &&
                    columnIndex === 0,
                  'ds-expanded-row-data':
                    rowData[EXPANDED_ROW_PROPERTY as keyof T] &&
                    (firstWithoutSelectionAndStar ||
                      firstWithSelectionOrStar ||
                      firstWithSelectionAndStar),
                },
                isColumnSortingActive<T>(
                  defaultTableProps?.columns || [],
                  column,
                ) && 'ant-table-column-sort',
                column.className,
              )}
              key={`row-${index}-column-${column.dataIndex || column.key}`}
              minWidth={calculateToPixelsIfDefined(column?.minWidth)}
              width={column.width}
              maxWidth={calculateToPixelsIfDefined(column?.maxWidth)}
            >
              <>{renderColumn(column, rowData, columnIndex)}</>
            </S.ColWrapper>
          );
        })}
      </S.RowWrapper>
      {infiniteLoader('BOTTOM')}
    </>
  );
}

export default memo(VirtualTableRow, areEqual);
