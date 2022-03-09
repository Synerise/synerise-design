import * as React from 'react';
import classNames from 'classnames';
import { areEqual } from 'react-window';
import InfiniteLoaderItem from '../InfiniteScroll/InfiniteLoaderItem';
import { InfiniteScrollProps } from '../InfiniteScroll/constants';
import { RowSelection, DSColumnType, DSTableProps } from '../Table.types';
import { EXPANDED_ROW_PROPERTY } from './VirtualTable';
import * as S from './VirtualTable.styles';
import { calculatePixels } from '../utils/calculatePixels';
import { RowStar } from '../hooks/useRowStar.types';

interface Props<T> {
  data: {
    dataSource: T[];
    cellHeight: number;
    infiniteScroll: InfiniteScrollProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergedColumns: any[];
    selection?: RowSelection<T>;
    rowStar?: RowStar<T>;
    onRowClick?: (row: T) => void;
    defaultTableProps?: DSTableProps<T>;
  };
  index: number;
  style: React.CSSProperties;
}

const isColumnSortingActive = <T extends unknown>(columns: DSColumnType<T>[], column: DSColumnType<T>): boolean =>
  !!columns.find((c): boolean => c.key === column.key && !!c.sortOrder);

const calculateToPixelsIfDefined = (value: string | number | undefined | null): number | undefined | null =>
  value ? calculatePixels(value) : (value as number);

class VirtualTableRow<T extends any> extends React.PureComponent<Props<T>> {
  renderColumn = (column: any, rowData: T, index: number): React.ReactNode => {
    if (rowData[EXPANDED_ROW_PROPERTY] && column.childRender) {
      return column.childRender(rowData[column.dataIndex], rowData, index);
    }
    return column.render ? column.render(rowData[column.dataIndex], rowData, index) : rowData[column.dataIndex];
  };

  render(): React.ReactNode {
    const { index, style, data } = this.props;
    const { mergedColumns, onRowClick, selection, rowStar, dataSource, cellHeight, infiniteScroll, defaultTableProps } =
      data;

    const rowData = dataSource[index];

    return (
      <>
        <S.RowWrapper
          className={classNames('virtual-table-row', {
            'ds-expanded-row': rowData[EXPANDED_ROW_PROPERTY],
          })}
          style={style}
          onClick={(event): void => {
            event.stopPropagation();
            onRowClick && onRowClick(rowData);
          }}
        >
          {mergedColumns.map((column, columnIndex) => {
            const firstWithSelectionAndStar = selection && rowStar && columnIndex === 2;
            const firstWithSelectionOrStar = (selection || rowStar) && columnIndex === 1;
            const firstWithoutSelectionAndStar = columnIndex === 0 && !selection && !rowStar;
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
                      (firstWithoutSelectionAndStar || firstWithSelectionOrStar || firstWithSelectionAndStar),
                  },
                  isColumnSortingActive<T>(defaultTableProps?.columns || [], column) && 'ant-table-column-sort',
                  column.className
                )}
                key={`row-${index}-column-${column.dataIndex || column.key}`}
                minWidth={calculateToPixelsIfDefined(column?.minWidth)}
                width={column.width}
                maxWidth={calculateToPixelsIfDefined(column?.maxWidth)}
              >
                {this.renderColumn(column, rowData, columnIndex)}
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

export default React.memo(VirtualTableRow, areEqual);
