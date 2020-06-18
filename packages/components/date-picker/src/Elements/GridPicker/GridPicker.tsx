import * as React from 'react';

import { Container } from './GridPicker.styles';

export default class GridPicker extends React.PureComponent {
  handleCellClick = cell => {
    if (cell.disabled) return;
    const { onCellClick } = this.props;
    onCellClick && onCellClick(cell.key);
  };

  renderCell = cell => {
    const { selectedKey } = this.props;
    const { key, text, disabled, outside } = cell;
    const classNames = [
      'cell',
      selectedKey === key ? 'cell--selected' : null,
      disabled ? 'cell--disabled' : null,
      outside ? 'cell--outside' : null,
    ];
    return (
      <div className={classNames.join(' ')} onClick={() => this.handleCellClick(cell)} data-attr={key} key={key}>
        <div className="cell-content">{text}</div>
      </div>
    );
  };

  render() {
    const { cells } = this.props;
    return (
      <React.Fragment>
        <Container>{cells.map(this.renderCell)}</Container>
      </React.Fragment>
    );
  }
}
