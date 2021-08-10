import * as React from 'react';
import classNames from 'classnames';
import InfiniteLoaderItem from '../InfiniteScroll/InfiniteLoaderItem';
import { InfiniteScrollProps } from '../InfiniteScroll/constants';
import { RowSelection, DSColumnType, DSTableProps } from '../Table.types';
import { EXPANDED_ROW_PROPERTY } from './VirtualTable';
import * as S from './VirtualTable.styles';

interface Props<T> {
  data: {
    dataSource: T[];
    cellHeight: number;
    infiniteScroll: InfiniteScrollProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergedColumns: any[];
    selection?: RowSelection<T>;
    onRowClick?: (row: T) => void;
    defaultTableProps?: DSTableProps<T>;
  };
  index: number;
  style: React.CSSProperties;
}

const isColumnSortingActive = <T extends unknown>(columns: DSColumnType<T>[], column: DSColumnType<T>): boolean =>
  !!columns.find((c): boolean => c.key === column.key && !!c.sortOrder);

class VirtualTableRow<T> extends React.PureComponent<Props<T>> {
  render(): React.ReactNode {
    const { index, style, data } = this.props;
    const { mergedColumns, onRowClick, selection, dataSource, cellHeight, infiniteScroll, defaultTableProps } = data;
    const rowData = dataSource[index];

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <>
        <S.RowWrapper
          className={classNames('virtual-table-row', {
            'ds-expanded-row': rowData[EXPANDED_ROW_PROPERTY],
          })}
          style={style}
          onClick={(): void => onRowClick && onRowClick(rowData)}
        >
          {mergedColumns.map((column, columnIndex) => {
            return (
              <S.ColWrapper
                className={classNames(
                  'virtual-table-cell',
                  {
                    'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
                    'ant-table-selection-column': columnIndex === 0 && selection,
                    'ds-expanded-row-first': rowData[EXPANDED_ROW_PROPERTY] && columnIndex === 0,
                    'ds-expanded-row-data':
                      rowData[EXPANDED_ROW_PROPERTY] &&
                      ((columnIndex === 1 && selection) || (columnIndex === 0 && !selection)),
                  },
                  isColumnSortingActive<T>(defaultTableProps?.columns || [], column) && 'ant-table-column-sort',
                  column.className
                )}
                key={`row-${index}-column-${column.dataIndex || column.key}`}
                minWidth={column?.minWidth}
                width={column.width}
                maxWidth={column?.maxWidth}
              >
                {column.render ? column.render(rowData[column.dataIndex], rowData) : rowData[column.dataIndex]}
              </S.ColWrapper>
            );
          })}
        </S.RowWrapper>
        {infiniteScroll && index === dataSource.length - 1 && (
          <S.RowWrapper
            style={{ ...style, top: `${Number(style.top) + cellHeight}px`, height: '64px', padding: '16px 24px' }}
          >
            <InfiniteLoaderItem infiniteScroll={infiniteScroll} />
          </S.RowWrapper>
        )}
      </>
    );
  }
}

export default VirtualTableRow;
