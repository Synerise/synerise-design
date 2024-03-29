import * as React from 'react';
import { Props, State, Texts } from 'DatePicker.types';
import { FormattedMessage } from 'react-intl';
import { DayModifiers, Modifiers } from 'react-day-picker';
import { legacyParse } from '@date-fns/upgrade/v2';
import Footer from '../Elements/Footer/Footer';
import * as S from '../DatePicker.styles';
import DayPicker from '../Elements/DayPicker/DayPicker';
import MonthPicker from '../Elements/MonthPicker/MonthPicker';
import YearPicker from '../Elements/YearPicker/YearPicker';
import fnsFormat from '../format';
import TimePicker from '../Elements/TimePicker/TimePicker';

import { DayBackground, DayText, DayForeground } from '../Elements/DayPicker/DayPicker.styles';
import { fnsStartOfMonth, fnsSetYear, fnsSetMonth, fnsSetDate, fnsStartOfDay, fnsEndOfDay, fnsAddDays } from '../fns';
import { changeDayWithHoursPreserved } from '../utils';
import { RawDatePickerProps } from './RawDatePicker.types';

class RawDatePicker extends React.Component<RawDatePickerProps, State> {
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
      texts: this.getTexts(),
    };
  }

  getTexts(): Texts {
    const { texts, intl } = this.props;
    const updatedTexts: Texts = {
      apply: texts?.apply || <FormattedMessage id="DS.DATE-PICKER.APPLY" />,
      now: texts?.now || <FormattedMessage id="DS.DATE-PICKER.NOW" />,
      inputPlaceholder: texts?.inputPlaceholder || intl?.formatMessage({ id: 'DS.DATE-PICKER.SELECT-DATE' }) || '',
    };
    return updatedTexts;
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<Props>): null {
    const { value } = this.props;
    const { mode } = this.state;
    if (prevProps?.value !== value) {
      this.setState({
        value,
        month: fnsStartOfMonth(value || new Date()),
        changed: true,
        mode: value === undefined ? 'date' : mode,
      });
    }
    return null;
  }

  handleChange = (value: Date | undefined): void => {
    const { onValueChange } = this.props;
    const { mode, value: valueFromState } = this.state;
    if (mode === 'date' && !!valueFromState && !!value) {
      const dateToBeUpdated = changeDayWithHoursPreserved(valueFromState, value);
      this.setState({ value: dateToBeUpdated, changed: true });
      onValueChange && onValueChange(dateToBeUpdated);
    } else {
      this.setState({ value, changed: true });
      onValueChange && onValueChange(value);
    }
  };

  handleDayMouseEnter = (day: Date): void => this.setState({ enteredTo: day });

  handleDayMouseLeave = (): void => this.setState({ enteredTo: undefined });

  handleDayClick = (day: Date, modifiers: DayModifiers): void => {
    const { changed: isChanged, value } = this.state;
    const { useStartOfDay, useEndOfDay, showTime } = this.props;

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
    !!showTime && this.handleModeSwitch('time');
  };

  handleModeSwitch = (mode: string): void => this.setState({ mode });

  handleApply = (date: Date | undefined): void => {
    const { onApply } = this.props;
    if (!onApply) return;
    const { value } = this.state;

    if (date instanceof Date) {
      onApply(date);
      this.setState({ value: date });
    } else {
      onApply(value);
    }
    this.handleModeSwitch('date');
  };

  handleMonthChange = (month: Date, mode: string): void => this.setState({ month, mode });

  renderDay = (day: Date): React.ReactNode => {
    const text = day.getDate();
    return (
      <>
        <DayBackground />
        <DayText data-attr={text}>{text}</DayText>
        <DayForeground />
      </>
    );
  };

  renderYearPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <YearPicker
        value={month}
        onChange={(changedMonth): void => changedMonth && this.handleMonthChange(changedMonth, 'date')}
      />
    );
  };

  renderMonthPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <MonthPicker
        value={month}
        onChange={(changedMonth): void => changedMonth && this.handleMonthChange(changedMonth, 'date')}
      />
    );
  };

  renderDayPicker = (): React.ReactNode => {
    const { value, enteredTo } = this.state;
    const { disabledDates } = this.props;
    const modifiers = {
      start: value,
      end: value,
      entered: enteredTo,
      'entered-start': enteredTo,
      'entered-end': enteredTo,
    };
    const selectedDays = value ? [value] : [];
    const { month } = this.state;
    return (
      <DayPicker
        fixedWeeks
        showOutsideDays
        canChangeMonth={false}
        disabledDays={disabledDates}
        selectedDays={selectedDays}
        month={month}
        title={fnsFormat(month, 'MMM yyyy')}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleModeSwitch('month')}
        onYearNameClick={(): void => this.handleModeSwitch('year')}
        onMonthChange={(selectedMonth: Date): void => this.handleMonthChange(selectedMonth, 'date')}
        modifiers={(modifiers as unknown) as Modifiers}
      />
    );
  };

  handleDaySwitch = (day: Date): void => {
    const { disabledDates } = this.props;
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this.handleDayClick(day, { disabled: disabledDates ? disabledDates(day) : false });
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
        onShortNext={(): void => this.handleDaySwitch(fnsAddDays(legacyParse(value), 1))}
        onShortPrev={(): void => this.handleDaySwitch(fnsAddDays(legacyParse(value), -1))}
      />
    );
  };

  render(): React.ReactNode {
    const { mode, changed, value, texts } = this.state;
    const { showTime, hideNow } = this.props;

    const isValid = !!value;

    let picker;
    switch (mode) {
      case 'time':
        picker = this.renderTimePicker();
        break;
      case 'date':
        picker = this.renderDayPicker();
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
      <S.Container>
        {picker}
        <Footer
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          onSwitchMode={(): void => this.handleModeSwitch(mode === 'time' ? 'date' : 'time')}
          texts={texts}
          hideNow={hideNow}
        />
      </S.Container>
    );
  }
}

export default RawDatePicker;
