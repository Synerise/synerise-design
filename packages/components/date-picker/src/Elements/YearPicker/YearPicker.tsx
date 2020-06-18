import * as React from 'react';
import range from 'ramda/src/range';
import fnsAddYears from 'date-fns/add_years';
import fnsSetYear from 'date-fns/set_year';
import fnsGetYear from 'date-fns/get_year';
import fnsIsSameYear from 'date-fns/is_same_year';
import fnsFormat from "../../format";

// eslint-disable-next-line import/no-cycle
import DecadePicker from '../DecadePicker/DecadePicker';
import GridPicker from '../GridPicker/GridPicker';
import Navbar from '../Navbar/Navbar';

function getInitialState(props) {
  return {
    cursor: props.value || new Date(),
    decadeMode: false,
  };
}

export function getDecadeRange(cursor) {
  const startYear = Math.floor(fnsGetYear(cursor) / 10) * 10;
  const endYear = startYear + 9;
  return [startYear, endYear];
}

function getCells(cursor) {
  const startYear = getDecadeRange(cursor)[0];
  return range(0, 10).map(index => {
    const date = fnsAddYears(fnsSetYear(cursor, startYear), index);
    return {
      key: date.toISOString(),
      text: fnsFormat(date, 'YYYY'),
    };
  });
}

export default class YearPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getInitialState(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState(getInitialState(nextProps));
    }
  }

  handleLongPrev = () => this.setState({ cursor: fnsAddYears(this.state.cursor, -10) });

  handleLongNext = () => this.setState({ cursor: fnsAddYears(this.state.cursor, 10) });

  handleCellClick = isoDate => {
    if (isoDate === -1) return this.handleLongPrev();
    if (isoDate === 1) return this.handleLongNext();
    this.props.onChange && this.props.onChange(new Date(isoDate));
  };

  render() {
    const { cursor, decadeMode } = this.state;
    const { value } = this.props;
    const range = getDecadeRange(cursor);
    let cells = getCells(cursor);
    const valueCell = value ? cells.find(cell => fnsIsSameYear(value, cell.key)) : null;
    const selectedKey = valueCell ? valueCell.key : null;
    cells = [{ key: -1, text: range[0] - 1, outside: true }, ...cells, { key: 1, text: range[1] + 1, outside: true }];
    if (decadeMode) {
      return <DecadePicker value={cursor} onChange={cursor => this.setState({ cursor, decadeMode: false })} />;
    }
    return [
      <Navbar
        onTitleClick={() => this.setState({ decadeMode: true })}
        title={range.join('-')}
        onLongPrev={this.handleLongPrev}
        onLongNext={this.handleLongNext}
        key="head"
      />,
      <GridPicker selectedKey={selectedKey} cells={cells} onCellClick={this.handleCellClick} key="body" />,
    ];
  }
}
