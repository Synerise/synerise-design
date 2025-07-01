import { range } from 'lodash';
import React from 'react';

import { legacyParse } from '@date-fns/upgrade/v2';

import { fnsAddYears, fnsGetYear, fnsSetYear } from '../../fns';
import { getCenturyRange, getDecadeRange } from '../../utils';
import GridPicker from '../GridPicker/GridPicker';
import { type Cell } from '../GridPicker/GridPicker.types';
import Navbar from '../Navbar/Navbar';
import {
  type DecadePickerProps,
  type DecadePickerState,
} from './DecadePicker.types';

function getInitialState(props: DecadePickerProps): DecadePickerState {
  return {
    cursor: props.value || new Date(),
  };
}

function getCells(cursor: Date): Cell[] {
  const startYear = getCenturyRange(cursor)[0];
  return range(0, 10).map((index) => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index * 10);
    return {
      key: date.toISOString(),
      text: getDecadeRange(date).join('-'),
    } as Cell;
  });
}

export default class DecadePicker extends React.PureComponent<
  DecadePickerProps,
  DecadePickerState
> {
  state = getInitialState(this.props);

  getSnapshotBeforeUpdate(prevProps: Readonly<DecadePickerProps>): null {
    const { value } = this.props;
    if (prevProps?.value !== value) {
      this.setState(getInitialState(this.props));
    }
    return null;
  }

  handleLongPrev = (): void => {
    const { cursor } = this.state;
    this.setState({ cursor: fnsAddYears(cursor, -100) });
  };

  handleLongNext = (): void => {
    const { cursor } = this.state;
    this.setState({ cursor: fnsAddYears(cursor, 100) });
  };

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
          const minYear = fnsGetYear(legacyParse(cell.key));
          const maxYear = minYear + 10;
          return valueYear >= minYear && valueYear < maxYear;
        })
      : null;
    const selectedKey = valueCell ? valueCell.key : null;
    cells = [
      {
        key: -1,
        text: `${centuryRange[0] - 10}-${centuryRange[0] - 1}`,
        outside: true,
      },
      ...cells,
      {
        key: 1,
        text: `${centuryRange[1] + 1}-${centuryRange[1] + 10}`,
        outside: true,
      },
    ];
    return [
      <Navbar
        title={centuryRange.join('-')}
        onTitleClick={onTitleClick}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker
        selectedKey={selectedKey}
        cells={cells}
        onCellClick={this.handleCellClick}
        key="body"
      />,
    ];
  }
}
