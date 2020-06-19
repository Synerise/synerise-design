import * as React from 'react';

import { Cell, GridPickerProps } from './GridPicker.types';
import * as S from './GridPicker.styles';

export default class GridPicker extends React.PureComponent<GridPickerProps> {
  handleCellClick = (cell: Cell): void => {
    if (cell.disabled) return;
    const { onCellClick } = this.props;
    onCellClick && onCellClick(cell.key);
  };

  renderCell = (cell: Cell): React.ReactNode => {
    const { selectedKey } = this.props;
    const { key, text, disabled, outside } = cell;
    const classNames = [
      'cell',
      selectedKey === key ? 'cell--selected' : null,
      disabled ? 'cell--disabled' : null,
      outside ? 'cell--outside' : null,
    ];
    return (
      <S.CellContainer
        className={classNames.join(' ')}
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
