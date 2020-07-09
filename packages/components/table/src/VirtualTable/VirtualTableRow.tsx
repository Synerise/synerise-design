import * as React from 'react';
import classNames from 'classnames';
import { EXPANDED_ROW_PROPERTY } from './VirtualTable';
import { RowSelection } from '../Table.types';

interface Props<T> {
  columnIndex: number;
  rowIndex: number;
  style: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mergedColumns: any[];
  onRowClick?: (row: T) => void;
  selection?: RowSelection<T>;
  data: T[];
}

class VirtualTableRow<T> extends React.PureComponent<Props<T>> {
  render(): React.ReactNode {
    const { columnIndex, rowIndex, style, mergedColumns, data, onRowClick, selection } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={classNames('virtual-table-cell', {
          'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
          'ant-table-selection-column': columnIndex === 0 && selection,
          'ds-expanded-row': data[rowIndex][EXPANDED_ROW_PROPERTY],
          'ds-expanded-row-data':
            data[rowIndex][EXPANDED_ROW_PROPERTY] &&
            ((columnIndex === 1 && selection) || (columnIndex === 0 && !selection)),
          'ds-expanded-row-first': data[rowIndex][EXPANDED_ROW_PROPERTY] && columnIndex === 0,
        })}
        onClick={(): void => onRowClick && onRowClick(data[rowIndex])}
        style={style}
      >
        {mergedColumns[columnIndex].render
          ? mergedColumns[columnIndex].render(data[rowIndex][mergedColumns[columnIndex].dataIndex], data[rowIndex])
          : data[rowIndex][mergedColumns[columnIndex].dataIndex]}
      </div>
    );
  }
}

export default VirtualTableRow;
