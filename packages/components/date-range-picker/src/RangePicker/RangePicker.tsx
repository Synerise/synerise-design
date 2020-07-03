import * as React from 'react';
import { DateUtils, RangeModifier, DayModifiers } from 'react-day-picker';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsIsSameDay from 'date-fns/is_same_day';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsMin from 'date-fns/min';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsMax from 'date-fns/max';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsIsWithinRange from 'date-fns/is_within_range';

import MonthPicker from '@synerise/ds-date-picker/dist/Elements/MonthPicker/MonthPicker';
import MomentLocaleUtils from 'react-day-picker/moment';

import TimePicker from '@synerise/ds-time-picker';
import YearPicker from '@synerise/ds-date-picker/dist/Elements/YearPicker/YearPicker';
import {
  DayBackground,
  DayForeground,
  DayText,
} from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker.styles';
import DayPicker from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker';
import { fnsStartOfMonth, fnsStartOfDay, fnsEndOfDay, fnsIsSameMonth, fnsIsAfter } from '../fns';
import { Side, Sides } from './RangePicker.styles';
import { ABSOLUTE, TIME_OPTIONS } from '../constants';

import GET from '../dateUtils/get';
import SET from '../dateUtils/set';
import ADD from '../dateUtils/add';
import format from '../dateUtils/format';
import { DateFilter, DateRange } from '../date.types';
import { Limit, Props, State } from './RangePicker.types';
//import { Modifier } from '@synerise/ds-date-picker/dist/DatePicker.types';

const getDisabledTimeOptions = (
  day: string | Date | undefined,
  granularity: string,
  lowerLimit: Limit = null,
  upperLimit: Limit = null
): [] => {
  const lowLimit = lowerLimit || fnsStartOfDay(day);
  const upLimit = upperLimit || fnsEndOfDay(day);
  const options = TIME_OPTIONS[granularity].map((a: number) => SET[granularity](day, a));
  return options.filter((a: number) => !fnsIsWithinRange(a, lowLimit, upLimit)).map((a: number) => GET[granularity](a));
};

const getSidesState = (value: DateRange): State => {
  const from = fnsStartOfMonth(value.from || new Date());
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

export default class RangePicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      enteredTo: null,
      ...getSidesState(props.value),
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<Props>): null {
    const { value } = this.props;
    if (value !== prevProps.value) this.setState(getSidesState(value));
    return null;
  }

  handleDayMouseEnter = (day: Date): void => {
    this.setState({ enteredTo: day });
  };

  handleDayMouseLeave = (): void => {
    this.setState({ enteredTo: null });
  };

  handleDayClick = (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>): void => {
    const { value, onChange } = this.props;
    if (modifiers.disabled) return;
    let { from, to } = DateUtils.addDayToRange(day, value as RangeModifier);
    from = from ? fnsStartOfDay(from) : from;
    to = to ? fnsEndOfDay(to) : to;
    if (to) {
      const now = new Date();
      if (fnsIsSameDay(to, now)) {
        to = now;
      }
    }
    onChange && onChange({ type: ABSOLUTE, from, to });
  };

  handleFromTimeChange = (from: string | Date | undefined): void => {
    const { onChange, value } = this.props;
    onChange({ type: ABSOLUTE, from, to: value.to });
  };

  handleToTimeChange = (to: string | Date | undefined): void => {
    const { onChange, value } = this.props;
    onChange({ type: ABSOLUTE, from: value.from, to });
  };

  handleSideMonthChange = (side: 'left' | 'right', month: Date, mode: string) => {
    const opposite = side === 'left' ? 'right' : 'left';
    const { state } = this;
    if (fnsIsSameMonth(month, state[opposite])) {
      const dir = fnsIsAfter(month, state[side].month) ? 1 : -1;
      month = ADD.MONTHS(month, dir);
    }
    this.setState((prevState) => ({ ...prevState, [side]: { ...state[side], month, mode } }));
  };

  handleSideModeChange = (side: string, mode: string): void => {
    this.setState((prevState) => ({ ...prevState, [side]: { ...prevState[side], mode } }));
  };

  renderDay = (day: Date): React.ReactNode => {
    const text = day.getDate();
    return (
      <>
        <DayBackground className="DayPicker-Day-BG" />
        <DayText className="DayPicker-Day-Text" data-attr={text}>
          {text}
        </DayText>
        <DayForeground className="DayPicker-Day-FG" />
      </>
    );
  };

  renderYearPicker = (side: 'left' | 'right'): React.ReactNode => {
    const { [side]: currentSide } = this.state;
    const { month } = currentSide;
    return (
      <YearPicker
        key={`year_picker_${side}`}
        value={month instanceof Date ? month : new Date(month)}
        onChange={(m): void => this.handleSideMonthChange(side, m, 'date')}
      />
    );
  };

  renderMonthPicker = (side: 'left' | 'right'): React.ReactNode => {
    const opposite = side === 'left' ? 'right' : 'left';
    const { [side]: currentSide, [opposite]: oppositeSide } = this.state;
    return (
      <MonthPicker
        key={`month_picker_${opposite}`}
        max={side === 'left' ? ADD.MONTHS(oppositeSide.month, -1) : undefined}
        min={side === 'right' ? ADD.MONTHS(oppositeSide.month, 1) : undefined}
        value={currentSide.month instanceof Date ? currentSide.month : new Date(currentSide.month)}
        onChange={(month): void => this.handleSideMonthChange(side, month, 'date')}
      />
    );
  };

  getDate(date: Date | string) {
    if (typeof date === 'string') return new Date(date);
    return date;
  }

  renderDatePicker = (side: 'left' | 'right'): React.ReactNode => {
    const { value, disabledDate } = this.props;
    console.log('RagenPickerProps', this.props);
    console.log('RagenPickerState', this.state);
    const { enteredTo, left, right } = this.state;
    const { from, to, type } = value;
    const isSelecting = from && !to && enteredTo;
    const enteredStart = isSelecting ? fnsMin(from, enteredTo) : enteredTo;
    const enteredEnd = isSelecting ? fnsMax(from, enteredTo) : enteredTo;
    const entered = isSelecting
      ? (day: Date | string | number): boolean => fnsIsWithinRange(day, enteredStart, enteredEnd)
      : enteredTo;
    const modifiers = {
      start: isSelecting && !!enteredTo && !!from && enteredTo < from ? undefined : from,
      end: isSelecting && !!enteredTo && !!from && enteredTo < from ? from : to,
      entered,
      'entered-start': enteredStart,
      'entered-end': enteredEnd,
    };
    const selectedDays = [from, { from, to } as DateFilter];
    const sidesAreAdjacent = fnsIsSameMonth(ADD.MONTHS(left.month, 1), right.month);
    return (
      <DayPicker
        key={`day_picker_${side}`}
        className={type.toLowerCase()}
        canChangeMonth={false}
        disabledDays={disabledDate}
        localeUtils={MomentLocaleUtils}
        month={this.getDate(this.state[side].month)}
        title={this.state[side].monthTitle}
        hideNext={side === 'left' && sidesAreAdjacent}
        hidePrev={side === 'right' && sidesAreAdjacent}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleSideModeChange(side, 'month')}
        onYearNameClick={(): void => this.handleSideModeChange(side, 'year')}
        onMonthChange={(month): void => this.handleSideMonthChange(side, month, 'date')}
        fixedWeeks
        showOutsideDay
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedDays={selectedDays}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modifiers={modifiers}
      />
    );
  };

  getRangeEndValue = (value: string | Date | undefined): Date | undefined => {
    if (typeof value === 'string') {
      return new Date(value);
    }
    return value;
  };

  renderTimePicker = (side: 'left' | 'right'): React.ReactNode => {
    const { value } = this.props;
    const { from, to } = value;
    switch (side) {
      case 'left': {
        return (
          <TimePicker
            key={`left_time_${side}`}
            value={this.getRangeEndValue(from)}
            onChange={this.handleFromTimeChange}
            disabledHours={getDisabledTimeOptions(from, 'HOURS', null, to)}
            disabledMinutes={getDisabledTimeOptions(from, 'MINUTES', null, to)}
            disabledSeconds={getDisabledTimeOptions(from, 'SECONDS', null, to)}
          />
        );
      }
      case 'right': {
        return (
          <TimePicker
            key={`right_time_${side}`}
            value={this.getRangeEndValue(to)}
            onChange={this.handleToTimeChange}
            disabledHours={getDisabledTimeOptions(to, 'HOURS', from, null)}
            disabledMinutes={getDisabledTimeOptions(to, 'MINUTES', from, null)}
            disabledSeconds={getDisabledTimeOptions(to, 'SECONDS', from, null)}
          />
        );
      }
      default:
        return null;
    }
  };

  renderSide = (side: 'left' | 'right'): React.ReactNode | null => {
    const { mode } = this.props;
    const { state } = this;
    if (mode === 'time') return this.renderTimePicker(side);
    switch (state[side].mode) {
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

  render(): JSX.Element {
    const { mode } = this.props;
    console.log('RangePicker state', this.state);
    console.log('RangePicker props', this.props);
    return (
      <Sides bordered={mode === 'time'}>
        <Side>{this.renderSide('left')}</Side>
        <Side>{this.renderSide('right')}</Side>
      </Sides>
    );
  }
}
