import * as React from 'react';
import * as fnsStartOfMonth from 'date-fns/start_of_month';
import * as fnsSetDate from 'date-fns/set_date';
import * as fnsSetMonth from 'date-fns/set_month';
import * as fnsSetYear from 'date-fns/set_year';
import * as fnsStartOfDay from 'date-fns/start_of_day';
import * as fnsEndOfDay from 'date-fns/end_of_day';

import { Modifier, Props, State } from 'DatePicker.types';
import Footer from './Elements/Footer/Footer';
import { Container } from './DatePicker.styles';
import DayPicker from './Elements/DayPicker/DayPicker';
import MonthPicker from './Elements/MonthPicker/MonthPicker';
import YearPicker from './Elements/YearPicker/YearPicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import fnsFormat from './format';
import localeUtils from './localeUtils';
import TimePicker from './Elements/TimePicker/TimePicker';

export class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    showTime: false,
    disabledHours: [],
    disabledMinutes: [],
    disabledSeconds: [],
  };

  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      mode: 'date',
      month: fnsStartOfMonth(props.value || new Date()),
      value: props.value,
      changed: false,
      enteredTo: undefined,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: Props): void {
    const { value } = this.props;
    if (nextProps.value !== value) {
      this.setState({
        mode: 'date',
        value: nextProps.value,
        month: fnsStartOfMonth(nextProps.value || new Date()),
        changed: false,
      });
    }
  }

  handleChange = (value: Date | undefined): void => this.setState({ value, changed: true });

  handleDayMouseEnter = (day: Date): void => this.setState({ enteredTo: day });

  handleDayMouseLeave = (): void => this.setState({ enteredTo: undefined });

  handleDayClick = (day: Date, modifiers: Modifier): void => {
    const { changed: isChanged, value } = this.state;
    const { useStartOfDay, useEndOfDay } = this.props;

    if (modifiers.disabled) return;

    let nextDateWithCurrentTime = isChanged && value ? value : new Date();
    nextDateWithCurrentTime = fnsSetYear(nextDateWithCurrentTime, day.getFullYear());
    nextDateWithCurrentTime = fnsSetMonth(nextDateWithCurrentTime, day.getMonth());
    nextDateWithCurrentTime = fnsSetDate(nextDateWithCurrentTime, day.getDate());

    if (useStartOfDay) {
      this.handleChange(fnsStartOfDay(nextDateWithCurrentTime));
    } else if (useEndOfDay) {
      this.handleChange(fnsEndOfDay(nextDateWithCurrentTime));
    } else {
      this.handleChange(nextDateWithCurrentTime);
    }
  };

  handleModeSwitch = (mode: string): void => this.setState({ mode });

  handleApply = (): void => {
    const { onApply } = this.props;
    const { value } = this.state;
    onApply && onApply(value);
  };

  handleMonthChange = (month: Date, mode: string): void => this.setState({ month, mode });

  renderDay = (day: Date): React.ReactNode => {
    const text = day.getDate();
    return (
      <>
        <div className="DayPicker-Day-BG" />
        <div className="DayPicker-Day-Text" data-attr={text}>
          {text}
        </div>
        <div className="DayPicker-Day-FG" />
      </>
    );
  };

  renderYearPicker = (): React.ReactNode => {
    const { month } = this.state;
    return <YearPicker value={month} onChange={(changedMonth): void => changedMonth && this.handleMonthChange(changedMonth, 'date')} />;
  };

  renderMonthPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <MonthPicker value={month} onChange={(changedMonth): void =>  changedMonth && this.handleMonthChange(changedMonth, 'date')} />
    );
  };

  renderDatePicker = (): React.ReactNode => {
    const { value, enteredTo } = this.state;
    const { disabledDate } = this.props;
    const modifiers = {
      start: value,
      end: value,
      entered: enteredTo,
      'entered-start': enteredTo,
      'entered-end': enteredTo,
    };
    const selectedDays = [value];
    const { month } = this.state;
    return (
      <DayPicker
        fixedWeeks
        showOutsideDays
        canChangeMonth={false}
        disabledDays={disabledDate}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedDays={selectedDays}
        modifiers={modifiers}
        localeUtils={localeUtils}
        month={month}
        title={fnsFormat(month, 'MMM YYYY')}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleModeSwitch('month')}
        onYearNameClick={(): void => this.handleModeSwitch('year')}
        onMonthChange={(selectedMonth: Date): void => this.handleMonthChange(selectedMonth, 'date')}
      />
    );
  };

  renderTimePicker = (): React.ReactNode => {
    const { value } = this.state;
    const { disabledHours, disabledMinutes, disabledSeconds } = this.props;

    return (
      <TimePicker
        value={value}
        onChange={this.handleChange}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
      />
    );
  };

  render(): React.ReactNode {
    const { mode, changed, value } = this.state;
    const { showTime } = this.props;

    const isValid = !!value;

    let picker;
    switch (mode) {
      case 'time':
        picker = this.renderTimePicker();
        break;
      case 'date':
        picker = this.renderDatePicker();
        break;
      case 'month':
        picker = this.renderMonthPicker();
        break;
      case 'year':
        picker = this.renderYearPicker();
        break;
      default:
        picker = null;
        break;
    }

    return (
      <Container style={{ width: 300 }}>
        {picker}
        <Footer
          text=""
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          onSwitchMode={(): void => this.handleModeSwitch(mode === 'time' ? 'date' : 'time')}
        />
      </Container>
    );
  }
}

export const DatePickerInput = ({ value, format, ...rest }: Props): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <PickerInput value={value} format={format} {...rest} content={DatePicker} />;
};
