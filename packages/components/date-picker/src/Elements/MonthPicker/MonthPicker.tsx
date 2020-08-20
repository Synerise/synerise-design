import * as React from 'react';
import { range } from 'lodash';
import {
  fnsStartOfMonth,
  fnsEndOfMonth,
  fnsSetMonth,
  fnsIsBefore,
  fnsAddYears,
  fnsIsAfter,
  fnsIsSameMonth,
} from '../../fns';
import fnsFormat from '../../format';

import YearPicker from '../YearPicker/YearPicker';
import GridPicker from '../GridPicker/GridPicker';
import Navbar from '../Navbar/Navbar';
import { MonthPickerProps, MonthPickerState } from './MonthPicker.types';
import { Cell } from '../GridPicker/GridPicker.types';

function getInitialState(props: MonthPickerProps): MonthPickerState {
  return {
    cursor: props.value || new Date(),
    yearMode: false,
  };
}

function getCells(cursor: Date, min?: Date, max?: Date): Cell[] {
  const minDate = min ? fnsStartOfMonth(min) : fnsSetMonth(cursor, 0);
  const maxDate = max ? fnsEndOfMonth(max) : fnsSetMonth(cursor, 12);
  return range(0, 12).map(index => {
    const date = fnsSetMonth(cursor, index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'MMM'),
      disabled: fnsIsAfter(date, maxDate) || fnsIsBefore(date, minDate),
    } as Cell;
  });
}

export default class MonthPicker extends React.PureComponent<MonthPickerProps, MonthPickerState> {
  state = getInitialState(this.props);

  getSnapshotBeforeUpdate(prevProps: Readonly<MonthPickerProps>): null {
    const { value } = this.props;
    if (prevProps?.value !== value) {
      this.setState(getInitialState(this.props));
    }
    return null;
  }

  handleLongPrev = (): void => {
    const { cursor } = this.state;
    this.setState({ cursor: fnsAddYears(cursor, -1) });
  };

  handleLongNext = (): void => {
    const { cursor } = this.state;
    this.setState({ cursor: fnsAddYears(cursor, 1) });
  };

  render(): React.ReactNode {
    const { cursor, yearMode } = this.state;
    const { min, max, value, onChange } = this.props;
    const cells = getCells(cursor, min, max);
    const valueCell = value ? cells.find(cell => fnsIsSameMonth(value, cell.key)) : null;
    const selectedKey = valueCell ? valueCell.key : null;
    if (yearMode) {
      return (
        <YearPicker
          value={cursor}
          onChange={(changedDate: Date): void => this.setState({ cursor: changedDate, yearMode: false })}
        />
      );
    }
    return [
      <Navbar
        onTitleClick={(): void => this.setState({ yearMode: true })}
        title={fnsFormat(cursor, 'yyyy')}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker
        selectedKey={selectedKey}
        cells={cells}
        onCellClick={(isoDate): void => onChange(new Date(isoDate))}
        key="body"
      />,
    ];
  }
}
