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

function getInitialState(props) {
  return {
    cursor: props.value || new Date(),
    yearMode: false,
  };
}

function getCells(cursor, min, max) {
  const minDate = min ? fnsStartOfMonth(min) : fnsSetMonth(cursor, 0);
  const maxDate = max ? fnsEndOfMonth(max) : fnsSetMonth(cursor, 12);
  return range(0, 12).map(index => {
    const date = fnsSetMonth(cursor, index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'MMM'),
      disabled: fnsIsAfter(date, maxDate) || fnsIsBefore(date, minDate),
    };
  });
}

export default class MonthPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState(getInitialState(nextProps));
    }
  }

  handleLongPrev = () => this.setState({ cursor: fnsAddYears(this.state.cursor, -1) });

  handleLongNext = () => this.setState({ cursor: fnsAddYears(this.state.cursor, 1) });

  render() {
    const { cursor, yearMode } = this.state;
    const { min, max, value, onChange } = this.props;
    const cells = getCells(cursor, min, max);
    const valueCell = value ? cells.find(cell => fnsIsSameMonth(value, cell.key)) : null;
    const selectedKey = valueCell ? valueCell.key : null;
    if (yearMode) {
      return <YearPicker value={cursor} onChange={cursor => this.setState({ cursor, yearMode: false })} />;
    }
    return [
      <Navbar
        onTitleClick={() => this.setState({ yearMode: true })}
        title={fnsFormat(cursor, 'YYYY')}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker
        selectedKey={selectedKey}
        cells={cells}
        onCellClick={isoDate => onChange(new Date(isoDate))}
        key="body"
      />,
    ];
  }
}
