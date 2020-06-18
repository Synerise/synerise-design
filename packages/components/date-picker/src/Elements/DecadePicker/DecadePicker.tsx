import * as React from 'react';
import { range } from 'lodash';
import * as fnsSetYear from 'date-fns/set_year';
import * as fnsGetYear from 'date-fns/get_year';
import * as fnsAddYears from 'date-fns/add_years';

import GridPicker from '../GridPicker/GridPicker';
import Navbar from '../Navbar/Navbar';
import { getDecadeRange } from '../YearPicker/YearPicker';

function getInitialState(props): object {
  return {
    cursor: props.value || new Date(),
  };
}

function getCenturyRange(cursor): number[] {
  const startYear = Math.floor(fnsGetYear(cursor) / 100) * 100;
  const endYear = startYear + 99;
  return [startYear, endYear];
}

function getCells(cursor): object[] {
  const startYear = getCenturyRange(cursor)[0];
  return range(0, 10).map(index => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index * 10);
    return {
      key: date.toISOString(),
      text: getDecadeRange(date).join('-'),
    };
  });
}

export default class DecadePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState(getInitialState(nextProps));
    }
  }

  handleLongPrev = () => this.setState({ cursor: fnsAddYears(this.state.cursor, -100) });

  handleLongNext = () => this.setState({ cursor: fnsAddYears(this.state.cursor, 100) });

  handleCellClick = isoDate => {
    if (isoDate === -1) return this.handleLongPrev();
    if (isoDate === 1) return this.handleLongNext();
    this.props.onChange && this.props.onChange(new Date(isoDate));
  };

  render() {
    const { cursor } = this.state;
    const { value, onTitleClick } = this.props;
    const range = getCenturyRange(cursor);
    let cells = getCells(cursor);
    const valueCell = value
      ? cells.find(cell => {
          const valueYear = fnsGetYear(value);
          const minYear = fnsGetYear(cell.key);
          const maxYear = minYear + 10;
          return valueYear >= minYear && valueYear < maxYear;
        })
      : null;
    const selectedKey = valueCell ? valueCell.key : null;
    cells = [
      { key: -1, text: `${range[0] - 10}-${range[0] - 1}`, outside: true },
      ...cells,
      { key: 1, text: `${range[1] + 1}-${range[1] + 10}`, outside: true },
    ];
    return [
      <Navbar
        title={range.join('-')}
        onTitleClick={onTitleClick}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker selectedKey={selectedKey} cells={cells} onCellClick={this.handleCellClick} key="body" />,
    ];
  }
}
