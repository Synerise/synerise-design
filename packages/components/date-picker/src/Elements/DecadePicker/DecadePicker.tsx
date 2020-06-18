import * as React from 'react';
import { range } from 'lodash';
import * as fnsSetYear from 'date-fns/set_year';
import * as fnsGetYear from 'date-fns/get_year';
import * as fnsAddYears from 'date-fns/add_years';

import GridPicker from '../GridPicker/GridPicker';
import Navbar from '../Navbar/Navbar';
import { getDecadeRange } from '../YearPicker/YearPicker';
import { Cell } from '../GridPicker/GridPicker.types';
import { DecadePickerProps, DecadePickerState } from './DecadePicker.types';

function getInitialState(props: DecadePickerProps): DecadePickerState {
  return {
    cursor: props.value || new Date(),
  };
}

function getCenturyRange(cursor: Date): number[] {
  const startYear = Math.floor(fnsGetYear(cursor) / 100) * 100;
  const endYear = startYear + 99;
  return [startYear, endYear];
}

function getCells(cursor: Date): Cell[] {
  const startYear = getCenturyRange(cursor)[0];
  return range(0, 10).map(index => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index * 10);
    return {
      key: date.toISOString(),
      text: getDecadeRange(date).join('-'),
    } as Cell;
  });
}

export default class DecadePicker extends React.PureComponent<DecadePickerProps, DecadePickerState> {
  constructor(props: DecadePickerProps) {
    super(props);
    this.state = getInitialState(props);
  }

  componentWillReceiveProps(nextProps: DecadePickerProps): void {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState(getInitialState(nextProps));
    }
  }

  handleLongPrev = (): void => this.setState({ cursor: fnsAddYears(this.state.cursor, -100) });

  handleLongNext = (): void => this.setState({ cursor: fnsAddYears(this.state.cursor, 100) });

  handleCellClick = (isoDate: React.ReactText): void => {
    const { onChange } = this.props;
    if (isoDate === -1) {
      this.handleLongPrev();
      return;
    }

    if (isoDate === 1) {
      this.handleLongNext();
      return;
    }
    onChange && onChange(new Date(isoDate));
  };

  render(): React.ReactNode {
    const { cursor } = this.state;
    const { value, onTitleClick } = this.props;
    const centuryRange = getCenturyRange(cursor);
    let cells = getCells(cursor);
    const valueCell = value
      ? cells.find((cell: Cell) => {
          const valueYear = fnsGetYear(value);
          const minYear = fnsGetYear(cell.key);
          const maxYear = minYear + 10;
          return valueYear >= minYear && valueYear < maxYear;
        })
      : null;
    const selectedKey = valueCell ? valueCell.key : null;
    cells = [
      { key: -1, text: `${centuryRange[0] - 10}-${centuryRange[0] - 1}`, outside: true },
      ...cells,
      { key: 1, text: `${centuryRange[1] + 1}-${centuryRange[1] + 10}`, outside: true },
    ];
    return [
      <Navbar
        title={centuryRange.join('-')}
        onTitleClick={onTitleClick}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker selectedKey={selectedKey} cells={cells} onCellClick={this.handleCellClick} key="body" />,
    ];
  }
}
