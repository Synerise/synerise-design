import * as React from 'react';
import classNames from 'classnames';
import { EXPANDED_ROW_PROPERTY } from './VirtualTable';
import { RowSelection } from '../Table.types';
import * as S from './VirtualTable.styles';

interface Props<T> {
  index: number;
  style: object;
  data: {
    dataSource: T[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergedColumns: any[];
    onRowClick?: (row: T) => void;
    selection?: RowSelection<T>;
  };
}

class VirtualTableRow<T> extends React.PureComponent<Props<T>> {
  render(): React.ReactNode {
    const { index, style, data } = this.props;
    const { mergedColumns, onRowClick, selection, dataSource } = data;
    const rowData = dataSource[index];
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <S.RowWrapper
        className={classNames('virtual-table-row', {
          'ds-expanded-row': rowData[EXPANDED_ROW_PROPERTY],
        })}
        style={style}
        onClick={(): void => onRowClick && onRowClick(rowData)}
      >
        {mergedColumns.map((column, columnIndex) => (
          <S.ColWrapper
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              'ant-table-selection-column': columnIndex === 0 && selection,
              'ds-expanded-row-first': rowData[EXPANDED_ROW_PROPERTY] && columnIndex === 0,
              'ds-expanded-row-data':
                rowData[EXPANDED_ROW_PROPERTY] &&
                ((columnIndex === 1 && selection) || (columnIndex === 0 && !selection)),
            })}
            key={`row-${index}-column-${column.dataIndex || column.key}`}
            width={column.width}
          >
            {column.render ? column.render(rowData[column.dataIndex], rowData) : rowData[column.dataIndex]}
          </S.ColWrapper>
        ))}
      </S.RowWrapper>
    );
  }
}

export default VirtualTableRow;
