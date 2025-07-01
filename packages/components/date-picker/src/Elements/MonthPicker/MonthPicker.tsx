import { range } from 'lodash';
import React from 'react';
import { type WrappedComponentProps, injectIntl } from 'react-intl';

import { legacyParse } from '@date-fns/upgrade/v2';

import {
  fnsAddYears,
  fnsEndOfMonth,
  fnsIsAfter,
  fnsIsBefore,
  fnsIsSameMonth,
  fnsSetMonth,
  fnsStartOfMonth,
} from '../../fns';
import fnsFormat from '../../format';
import GridPicker from '../GridPicker/GridPicker';
import { type Cell } from '../GridPicker/GridPicker.types';
import Navbar from '../Navbar/Navbar';
import YearPicker from '../YearPicker/YearPicker';
import {
  type MonthPickerProps,
  type MonthPickerState,
} from './MonthPicker.types';

function getInitialState(props: MonthPickerProps): MonthPickerState {
  return {
    cursor: props.value || new Date(),
    yearMode: false,
  };
}

function getCells(
  cursor: Date,
  min?: Date,
  max?: Date,
  locale?: string,
): Cell[] {
  const minDate = min ? fnsStartOfMonth(min) : fnsSetMonth(cursor, 0);
  const maxDate = max ? fnsEndOfMonth(max) : fnsSetMonth(cursor, 12);
  return range(0, 12).map((index) => {
    const date = fnsSetMonth(cursor, index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'MMM', locale),
      disabled: fnsIsAfter(date, maxDate) || fnsIsBefore(date, minDate),
    } as Cell;
  });
}

class MonthPicker extends React.PureComponent<
  MonthPickerProps & WrappedComponentProps,
  MonthPickerState
> {
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
    const { min, max, value, intl, onChange } = this.props;
    const cells = getCells(cursor, min, max, intl?.locale);
    const valueCell = value
      ? cells.find((cell) => fnsIsSameMonth(value, legacyParse(cell.key)))
      : null;
    const selectedKey = valueCell ? valueCell.key : null;
    if (yearMode) {
      return (
        <YearPicker
          value={cursor}
          onChange={(changedDate: Date): void =>
            this.setState({ cursor: changedDate, yearMode: false })
          }
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
export default injectIntl(MonthPicker);
