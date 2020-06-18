import * as React from 'react';
import * as fnsStartOfMonth from 'date-fns/start_of_month';
import * as fnsSetDate from 'date-fns/set_date';
import * as fnsSetMonth from 'date-fns/set_month';
import * as fnsSetYear from 'date-fns/set_year';
import * as fnsStartOfDay from 'date-fns/start_of_day';
import * as fnsEndOfDay from 'date-fns/end_of_day';

import { Props, State } from 'DatePicker.types';
import Footer from './Elements/Footer/Footer';
import { Container } from './DatePicker.styles';
import DayPicker from './Elements/DayPicker/DayPicker';
import TimePicker from './Elements/TimePicker/TimePicker';
import MonthPicker from './Elements/MonthPicker/MonthPicker';
import YearPicker from './Elements/YearPicker/YearPicker';
import PickerInput from './Elements/PickerInput/PickerInput';
import fnsFormat from './format';
import localeUtils from './localeUtils';

export class DatePicker extends React.Component<Props, State> {

   static defaultProps = {
      showTime: false,
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
   };

   constructor(props: Props) {
      super(props);

      this.state = {
         mode: 'date',
         month: fnsStartOfMonth(props.value || new Date()),
         value: props.value,
         changed: false,
         enteredTo: null,
      };
   }

   componentWillReceiveProps(nextProps: Props) {
      if (nextProps.value !== this.props.value) {
         this.setState({
            mode: 'date',
            value: nextProps.value,
            month: fnsStartOfMonth(nextProps.value || new Date()),
            changed: false,
         });
      }
   }

   handleChange = (value: Date) => this.setState({ value, changed: true });

   handleDayMouseEnter = (day: Date) => this.setState({ enteredTo: day });

   handleDayMouseLeave = () => this.setState({ enteredTo: null });

   handleDayClick = (day: Date, modifiers: Object) => {
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

   handleModeSwitch = (mode: string) => this.setState({ mode });

   handleApply = () => this.props.onApply && this.props.onApply(this.state.value);

   handleMonthChange = (month: Date, mode: string) => this.setState({ month, mode });

   renderDay = (day: Date) => {
      const text = day.getDate();
      return (
        <React.Fragment>
           <div className="DayPicker-Day-BG" />
           <div className="DayPicker-Day-Text" data-attr={text}>
              {text}
           </div>
           <div className="DayPicker-Day-FG" />
        </React.Fragment>
      );
   };

   renderYearPicker = () => {
      return <YearPicker value={this.state.month} onChange={month => this.handleMonthChange(month, 'date')} />;
   };

   renderMonthPicker = () => {
      return <MonthPicker value={this.state.month} onChange={month => this.handleMonthChange(month, 'date')} />;
   };

   renderDatePicker = () => {
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
      return (
        <DayPicker
          fixedWeeks
          showOutsideDays
          canChangeMonth={false}
          disabledDays={disabledDate}
          selectedDays={selectedDays}
          modifiers={modifiers}
          localeUtils={localeUtils}
          month={this.state.month}
          title={fnsFormat(this.state.month, 'MMM YYYY')}
          renderDay={this.renderDay}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          onDayMouseLeave={this.handleDayMouseLeave}
          onMonthNameClick={() => this.handleModeSwitch('month')}
          onYearNameClick={() => this.handleModeSwitch('year')}
          onMonthChange={month => this.handleMonthChange(month, 'date')}
        />
      );
   };

   renderTimePicker = () => {
      const { value } = this.state;
      const { disabledHours, disabledMinutes, disabledSeconds } = this.props;

      return (
        <TimePicker
          value={value}
          onChange={this.handleChange}
          disabledHours={() => disabledHours(value)}
          disabledMinutes={() => disabledMinutes(value)}
          disabledSeconds={() => disabledSeconds(value)}
        />
      );
   };

   render() {
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
             text={''}
             canApply={isValid && changed}
             onApply={this.handleApply}
             dateOnly={!showTime}
             mode={mode}
             canSwitchMode={isValid}
             onSwitchMode={() => this.handleModeSwitch(mode === 'time' ? 'date' : 'time')}
           />
        </Container>
      );
   }
}

export const DatePickerInput = ({ value, format, ...rest }: Props) => {
   return <PickerInput value={value} format={format} {...rest} content={DatePicker} />;
};
