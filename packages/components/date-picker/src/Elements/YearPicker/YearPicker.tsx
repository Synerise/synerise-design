import * as React from 'react';
import * as fnsAddYears from 'date-fns/add_years';
import * as fnsSetYear from 'date-fns/set_year';
import * as fnsIsSameYear from 'date-fns/is_same_year';
import fnsFormat from '../../format';

// eslint-disable-next-line import/no-cycle
import DecadePicker from '../DecadePicker/DecadePicker';
import GridPicker from '../GridPicker/GridPicker';
import Navbar from '../Navbar/Navbar';
import { YearPickerProps, YearPickerState } from './YearPicker.types';
import { Cell } from '../GridPicker/GridPicker.types';
import { getDecadeRange, range } from '../../utils';

function getInitialState(props: YearPickerProps): YearPickerState {
  return {
    cursor: props.value || new Date(),
    decadeMode: false,
  };
}

function getCells(cursor: Date): Cell[] {
  const startYear = getDecadeRange(cursor)[0];
  return range(0, 10).map((index: number) => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'YYYY'),
    } as Cell;
  });
}

export default class YearPicker extends React.PureComponent<YearPickerProps, YearPickerState> {
  state = getInitialState(this.props);
  getSnapshotBeforeUpdate(prevProps: Readonly<YearPickerProps>): any | null {
    const { value } = this.props;
    if (value && prevProps?.value !== value) {
      this.setState(getInitialState(this.props));
    }
  }

  handleLongPrev = (): void => {
    const { cursor } = this.state;

    this.setState({ cursor: fnsAddYears(cursor, -10) });
  };

  handleLongNext = (): void => {
    const { cursor } = this.state;
    this.setState({ cursor: fnsAddYears(cursor, 10) });
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
    const { cursor, decadeMode } = this.state;
    const { value } = this.props;
    const decadeRange = getDecadeRange(cursor);
    let cells = getCells(cursor);
    const valueCell = value ? cells.find((cell: Cell): boolean => fnsIsSameYear(value, cell.key)) : null;
    const selectedKey = valueCell ? valueCell.key : null;
    cells = [
      { key: -1, text: decadeRange[0] - 1, outside: true },
      ...cells,
      { key: 1, text: decadeRange[1] + 1, outside: true },
    ];
    if (decadeMode) {
      return (
        <DecadePicker
          value={cursor}
          onChange={(selectedDecade): void => this.setState({ cursor: selectedDecade, decadeMode: false })}
        />
      );
    }
    return (
      <>
        <Navbar
          onTitleClick={(): void => this.setState({ decadeMode: true })}
          title={decadeRange.join('-')}
          onLongPrev={this.handleLongPrev}
          onLongNext={this.handleLongNext}
          key="head"
        />
        <GridPicker selectedKey={selectedKey} cells={cells} onCellClick={this.handleCellClick} key="body" />,
      </>
    );
  }
}
