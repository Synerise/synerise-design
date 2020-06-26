import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DateUtils } from 'react-day-picker';
import fnsStartOfMonth from 'date-fns/start_of_month';
import fnsIsSameMonth from 'date-fns/is_same_month';
import fnsIsSameDay from 'date-fns/is_same_day';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import fnsIsAfter from 'date-fns/is_after';
import fnsIsWithinRange from 'date-fns/is_within_range';
import fnsStartOfDay from 'date-fns/start_of_day';
import fnsEndOfDay from 'date-fns/end_of_day';

import MonthPicker from '@synerise/ds-date-picker/dist/Elements/MonthPicker/MonthPicker';
import DayPicker from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker';
//import localeUtils from '@synerise/ds-date-picker/dist/localeUtils';
import MomentLocaleUtils from 'react-day-picker/moment';

import { Side, Sides } from './RangePicker.styles';
import { ABSOLUTE, TIME_OPTIONS } from '../constants';
import TimePicker from '@synerise/ds-time-picker';

import GET from '../dateUtils/get';
import SET from '../dateUtils/set';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';
import { DateRange } from '../date.types';
import YearPicker from '@synerise/ds-date-picker/dist/Elements/YearPicker/YearPicker';
import {
  DayBackground,
  DayForeground,
  DayText,
} from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker.styles';

const getDisabledTimeOptions = (day, granularity, lowerLimit = null, upperLimit = null) => {
  lowerLimit = lowerLimit || fnsStartOfDay(day);
  upperLimit = upperLimit || fnsEndOfDay(day);
  const options = TIME_OPTIONS[granularity].map(a => SET[granularity](day, a));
  return options.filter(a => !fnsIsWithinRange(a, lowerLimit, upperLimit)).map(a => GET[granularity](a));
};

const getSidesState = (value: DateRange) => {
  let from = fnsStartOfMonth(value.from || new Date());
  let to = fnsStartOfMonth(value.to || new Date());
  if (fnsIsSameMonth(from, to)) to = ADD.MONTHS(to, 1);
  return {
    left: {
      month: from,
      monthTitle: format(from, 'MMM YYYY'),
      mode: 'date',
    },
    right: {
      month: to,
      monthTitle: format(to, 'MMM YYYY'),
      mode: 'date',
    },
  };
};

interface Props {
  value: DateRange;
  onChange: (value: DateRange) => {};
  mode: string;
  disabledDate: (value: DateRange) => {};
}

interface State {
  enteredTo: Date | null;
  left: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
  right: {
    month: Date | string;
    monthTitle: string;
    mode: string;
  };
}

export default class RangePicker extends React.PureComponent<Props, State> {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    mode: PropTypes.string,
    disabledDate: PropTypes.func,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      enteredTo: null,
      ...getSidesState(props.value),
    };
  }

  componentWillReceiveProps({ value }: Props) {
    if (value !== this.props.value) this.setState(getSidesState(value));
  }

  handleDayMouseEnter = (day: Date) => this.setState({ enteredTo: day });

  handleDayMouseLeave = () => this.setState({ enteredTo: null });

  handleDayClick = (day: Date, modifiers: { disabled: boolean }) => {
    if (modifiers.disabled) return;
    // @ts-ignore
    let { from, to } = DateUtils.addDayToRange(day, this.props.value);
    from = from ? fnsStartOfDay(from) : from;
    to = to ? fnsEndOfDay(to) : to;
    if (to) {
      const now = new Date();
      if (fnsIsSameDay(to, now)) {
        to = now;
      }
    }
    this.props.onChange({ type: ABSOLUTE, from, to });
  };

  handleFromTimeChange = (from: string | Date) =>
    this.props.onChange({ type: ABSOLUTE, from, to: this.props.value.to });

  handleToTimeChange = to => this.props.onChange({ type: ABSOLUTE, from: this.props.value.from, to });

  handleSideMonthChange = (side: 'left' | 'right', month: number, mode: string) => {
    const opposite = side === 'left' ? 'right' : 'left';
    if (fnsIsSameMonth(month, this.state[opposite])) {
      const dir = fnsIsAfter(month, this.state[side].month) ? 1 : -1;
      month = ADD.MONTHS(month, dir);
    }
    this.setState({ [side]: { ...this.state[side], month, mode } });
  };

  handleSideModeChange = (side, mode) => this.setState({ [side]: { ...this.state[side], mode } });

  renderDay = (day: Date) => {
    const text = day.getDate();
    return (
      <React.Fragment>
        <DayBackground className="DayPicker-Day-BG" />
        <DayText className="DayPicker-Day-Text" data-attr={text}>
          {text}
        </DayText>
        <DayForeground className="DayPicker-Day-FG" />
      </React.Fragment>
    );
  };

  renderYearPicker = (side: 'left' | 'right') => {
    return (
      <YearPicker
        key={`year_picker_${side}`}
        value={this.state[side].month}
        onChange={month => this.handleSideMonthChange(side, month, 'date')}
      />
    );
  };

  renderMonthPicker = (side: 'left' | 'right') => {
    const opposite = side === 'left' ? 'right' : 'left';
    return (
      <MonthPicker
        key={`month_picker_${opposite}`}
        max={side === 'left' ? ADD.MONTHS(this.state[opposite].month, -1) : undefined}
        min={side === 'right' ? ADD.MONTHS(this.state[opposite].month, 1) : undefined}
        value={this.state[side].month}
        onChange={month => this.handleSideMonthChange(side, month, 'date')}
      />
    );
  };

  renderDatePicker = (side: 'left' | 'right') => {
    const { value, disabledDate } = this.props;
    const { enteredTo, left, right } = this.state;
    const { from, to, type } = value;
    const isSelecting = from && !to && enteredTo;
    const enteredStart = isSelecting ? fnsMin(from, enteredTo) : enteredTo;
    const enteredEnd = isSelecting ? fnsMax(from, enteredTo) : enteredTo;
    const entered = isSelecting ? day => fnsIsWithinRange(day, enteredStart, enteredEnd) : enteredTo;
    const modifiers = {
      start: isSelecting && enteredTo < from ? undefined : from,
      end: isSelecting && enteredTo < from ? from : to,
      entered,
      'entered-start': enteredStart,
      'entered-end': enteredEnd,
    };
    const selectedDays = [from, { from, to }];
    const sidesAreAdjacent = fnsIsSameMonth(ADD.MONTHS(left.month, 1), right.month);
    return (
      <DayPicker
        key={`day_picker_${side}`}
        className={type.toLowerCase()}
        fixedWeeks={true}
        showOutsideDays={true}
        canChangeMonth={false}
        disabledDays={disabledDate}
        selectedDays={selectedDays}
        modifiers={modifiers}
        localeUtils={MomentLocaleUtils}
        month={this.state[side].month}
        title={this.state[side].monthTitle}
        hideNext={side === 'left' && sidesAreAdjacent}
        hidePrev={side === 'right' && sidesAreAdjacent}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={() => this.handleSideModeChange(side, 'month')}
        onYearNameClick={() => this.handleSideModeChange(side, 'year')}
        onMonthChange={month => this.handleSideMonthChange(side, month, 'date')}
      />
    );
  };

  renderTimePicker = (side: 'left' | 'right') => {
    const { value } = this.props;
    const { from, to } = value;
    switch (side) {
      case 'left': {
        return (
          <TimePicker
            key={`left_time_${side}`}
            value={from}
            onChange={this.handleFromTimeChange}
            disabledHours={() => getDisabledTimeOptions(from, 'HOURS', null, to)}
            disabledMinutes={() => getDisabledTimeOptions(from, 'MINUTES', null, to)}
            disabledSeconds={() => getDisabledTimeOptions(from, 'SECONDS', null, to)}
          />
        );
      }
      case 'right': {
        return (
          <TimePicker
            key={`right_time_${side}`}
            value={to}
            onChange={this.handleToTimeChange}
            disabledHours={() => getDisabledTimeOptions(to, 'HOURS', from, null)}
            disabledMinutes={() => getDisabledTimeOptions(to, 'MINUTES', from, null)}
            disabledSeconds={() => getDisabledTimeOptions(to, 'SECONDS', from, null)}
          />
        );
      }
      default:
        return null;
    }
  };

  renderSide = (side: 'left' | 'right') => {
    const { mode } = this.props;
    if (mode === 'time') return this.renderTimePicker(side);
    switch (this.state[side].mode) {
      case 'date':
        return this.renderDatePicker(side);
      case 'month':
        return this.renderMonthPicker(side);
      case 'year':
        return this.renderYearPicker(side);
      default:
        return null;
    }
  };

  render(): React.ReactNode {
    const { mode } = this.props;
    return (
      <Sides bordered={mode === 'time'}>
        <Side>{this.renderSide('left')}</Side>
        <Side>{this.renderSide('right')}</Side>
      </Sides>
    );
  }
}
