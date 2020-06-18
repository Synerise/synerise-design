import * as React from 'react';
import * as range from 'ramda/src/range';
import * as PropTypes from 'prop-types';
import * as getHours from 'date-fns/get_hours';
import * as getMinutes from 'date-fns/get_minutes';
import * as getSeconds from 'date-fns/get_seconds';
import * as setHours from 'date-fns/set_hours';
import * as setMinutes from 'date-fns/set_minutes';
import * as setSeconds from 'date-fns/set_seconds';
import fnsFormat from "../../format";

import Navbar from '../Navbar/Navbar';
import Select from './Select/Select';
import { Container } from './TimePicker.styles';

export const TIME_OPTIONS = {
  HOURS: range(0, 24),
  MINUTES: range(0, 60),
  SECONDS: range(0, 60),
};

const formatOption = (option, disabledOptions) => {
  let value = `${option}`;
  if (option < 10) {
    value = `0${option}`;
  }

  let disabled = false;
  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
    disabled = true;
  }

  return {
    value,
    disabled,
  };
};

export default class TimePicker extends React.Component {
  static propTypes = {
    format: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    hourOptions: PropTypes.array,
    minuteOptions: PropTypes.array,
    secondOptions: PropTypes.array,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    use12Hours: PropTypes.bool,
    isAM: PropTypes.bool,
  };

  static defaultProps = {
    value: new Date(),
    format: '',
    showHour: true,
    showMinute: true,
    showSecond: true,
    hourOptions: TIME_OPTIONS.HOURS,
    minuteOptions: TIME_OPTIONS.MINUTES,
    secondOptions: TIME_OPTIONS.SECONDS,
    use12Hours: false,
    isAM: false,
  };

  onItemChange = (type, itemValue) => {
    const { onChange, use12Hours } = this.props;
    let value = this.props.value;

    if (type === 'hour') {
      if (use12Hours) {
        if (this.props.isAM) {
          value = setHours(value, +itemValue % 12);
        } else {
          value = setHours(value, (+itemValue % 12) + 12);
        }
      } else {
        value = setHours(value, +itemValue);
      }
    } else if (type === 'minute') {
      value = setMinutes(value, +itemValue);
    } else if (type === 'ampm') {
      const ampm = itemValue.toUpperCase();
      if (use12Hours) {
        const hours = getHours(value);
        if (ampm === 'PM' && hours < 12) {
          value = setHours(value, (hours % 12) + 12);
        } else if (ampm === 'AM' && hours >= 12) {
          value = setHours(value, hours - 12);
        }
      }
    } else {
      value = setSeconds(value, +itemValue);
    }
    onChange(value);
  };

  onEnterSelectPanel = range => {};

  getHourSelect(hour) {
    const { hourOptions, disabledHours, showHour, use12Hours } = this.props;
    if (!showHour) {
      return null;
    }
    const disabledOptions = disabledHours();
    let hourOptionsAdj;
    let hourAdj;
    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
      hourAdj = hour % 12 || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    return (
      <Select
        options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
        selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
        type="hour"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
      />
    );
  }

  getMinuteSelect(minute) {
    const { minuteOptions, disabledMinutes, showMinute } = this.props;
    if (!showMinute) {
      return null;
    }
    const value = this.props.value;
    const disabledOptions = disabledMinutes(getHours(value));

    return (
      <Select
        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={minuteOptions.indexOf(minute)}
        type="minute"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
      />
    );
  }

  getSecondSelect(second) {
    const { secondOptions, disabledSeconds, showSecond } = this.props;
    if (!showSecond) {
      return null;
    }
    const value = this.props.value;
    const disabledOptions = disabledSeconds(getHours(value), getMinutes(value));

    return (
      <Select
        options={secondOptions.map(option => formatOption(option, disabledOptions))}
        selectedIndex={secondOptions.indexOf(second)}
        type="second"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
      />
    );
  }

  getAMPMSelect() {
    const { use12Hours, format } = this.props;
    if (!use12Hours) {
      return null;
    }

    const AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
      .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
      .map(c => ({ value: c }));

    const selected = this.props.isAM ? 0 : 1;

    return (
      <Select
        options={AMPMOptions}
        selectedIndex={selected}
        type="ampm"
        onSelect={this.onItemChange}
        onMouseEnter={this.onEnterSelectPanel.bind(this, 'ampm')}
      />
    );
  }

  render() {
    const value = this.props.value;
    return [
      <Navbar title={fnsFormat(value, 'ddd D, YYYY')} key="head" />,
      <Container key="body">
        {this.getHourSelect(getHours(value))}
        {this.getMinuteSelect(getMinutes(value))}
        {this.getSecondSelect(getSeconds(value))}
        {this.getAMPMSelect(getHours(value))}
      </Container>,
    ];
  }
}
