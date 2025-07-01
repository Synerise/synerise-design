import React from 'react';

import { legacyParse } from '@date-fns/upgrade/v2';

import { fnsAddYears, fnsIsSameYear, fnsSetYear } from '../../fns';
import fnsFormat from '../../format';
import { getDecadeRange } from '../../utils';
import DecadePicker from '../DecadePicker/DecadePicker';
import GridPicker from '../GridPicker/GridPicker';
import { type Cell } from '../GridPicker/GridPicker.types';
import Navbar from '../Navbar/Navbar';
import { type YearPickerProps, type YearPickerState } from './YearPicker.types';

function getInitialState(props: YearPickerProps): YearPickerState {
  return {
    cursor: props.value || new Date(),
    decadeMode: false,
  };
}

function getCells(cursor: Date): Cell[] {
  const startYear = getDecadeRange(cursor)[0];
  return Array.from(Array(10)).map((_, index: number) => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'yyyy'),
    } as Cell;
  });
}

export default class YearPicker extends React.PureComponent<
  YearPickerProps,
  YearPickerState
> {
  state = getInitialState(this.props);
  getSnapshotBeforeUpdate(prevProps: Readonly<YearPickerProps>): null {
    const { value } = this.props;
    if (value && prevProps?.value !== value) {
      this.setState(getInitialState(this.props));
    }
    return null;
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
    const valueCell = value
      ? cells.find((cell: Cell): boolean =>
          fnsIsSameYear(value, legacyParse(cell.key)),
        )
      : null;
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
          onChange={(selectedDecade): void =>
            this.setState({ cursor: selectedDecade, decadeMode: false })
          }
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
        <GridPicker
          selectedKey={selectedKey}
          cells={cells}
          onCellClick={this.handleCellClick}
          key="body"
        />
      </>
    );
  }
}
