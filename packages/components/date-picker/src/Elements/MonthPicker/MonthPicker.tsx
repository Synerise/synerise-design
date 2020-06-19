import * as React from 'react';
import { range } from 'lodash';
import * as fnsAddYears from 'date-fns/add_years';
import * as fnsSetMonth from 'date-fns/set_month';
import * as fnsStartOfMonth from 'date-fns/start_of_month';
import * as fnsEndOfMonth from 'date-fns/end_of_month';
import * as fnsIsSameMonth from 'date-fns/is_same_month';
import * as fnsIsBefore from 'date-fns/is_before';
import * as fnsIsAfter from 'date-fns/is_after';
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
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: MonthPickerProps): void {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState(getInitialState(nextProps));
    }
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
        title={fnsFormat(cursor, 'YYYY')}
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
