import classNames from 'classnames';
import React from 'react';

import * as S from './GridPicker.styles';
import { type Cell, type GridPickerProps } from './GridPicker.types';

export default class GridPicker extends React.PureComponent<GridPickerProps> {
  handleCellClick = (cell: Cell): void => {
    if (cell.disabled) {
      return;
    }
    const { onCellClick } = this.props;
    onCellClick && onCellClick(cell.key);
  };

  renderCell = (cell: Cell): React.ReactNode => {
    const { selectedKey } = this.props;
    const { key, text, disabled, outside } = cell;
    return (
      <S.CellContainer
        className={classNames('cell', {
          'cell--selected': selectedKey === key,
          'cell--disabled': disabled,
          'cell--outside': outside,
        })}
        onClick={(): void => this.handleCellClick(cell)}
        data-attr={key}
        key={key}
      >
        <div className="cell-content">{text}</div>
      </S.CellContainer>
    );
  };

  render(): React.ReactNode {
    const { cells } = this.props;
    return (
      <>
        <S.GridContainer>{cells.map(this.renderCell)}</S.GridContainer>
      </>
    );
  }
}
