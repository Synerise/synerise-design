import React, { type ReactElement } from 'react';
import type { Modifiers } from 'react-day-picker';
import { injectIntl, type WrappedComponentProps } from 'react-intl';

import {
  applyTimezoneOffset,
  currentTimeInTimezone,
  getTimeZone,
  getValueAsLocalDate,
} from '@synerise/ds-core';

import * as S from '../DatePicker.styles';
import type { State, Texts } from '../DatePicker.types';
import DayPicker from '../Elements/DayPicker/DayPicker';
import {
  DayBackground,
  DayForeground,
  DayText,
} from '../Elements/DayPicker/DayPicker.styles';
import Footer from '../Elements/Footer/Footer';
import MonthPicker from '../Elements/MonthPicker/MonthPicker';
import { QuickPicks } from '../Elements/QuickPicks/QuickPicks';
import TimePicker from '../Elements/TimePicker/TimePicker';
import YearPicker from '../Elements/YearPicker/YearPicker';
import {
  fnsAddDays,
  fnsEndOfDay,
  fnsSetDate,
  fnsSetMonth,
  fnsSetYear,
  fnsStartOfDay,
  fnsStartOfMonth,
} from '../fns';
import { toDateValue } from '../toDateValue';
import { getDefaultTexts } from '../utils/getDefaultTexts';
import type { RawDatePickerProps } from './RawDatePicker.types';

class RawDatePicker extends React.Component<
  RawDatePickerProps & WrappedComponentProps,
  State
> {
  static defaultProps = {
    showTime: false,
    disabledHours: [],
    disabledMinutes: [],
    disabledSeconds: [],
  };

  constructor(props: RawDatePickerProps & WrappedComponentProps) {
    super(props);
    const { value, timeZone, intl } = props;

    const resolvedTimeZone = getTimeZone(timeZone, intl);
    this.state = {
      mode: 'date',
      month: fnsStartOfMonth(
        props.value ? getValueAsLocalDate(value, resolvedTimeZone) : new Date(),
      ),
      value: props.value
        ? getValueAsLocalDate(value, resolvedTimeZone)
        : undefined,
      changed: false,
      enteredTo: undefined,
      texts: this.getTexts(),
    };
  }

  getTexts(): Texts {
    const { texts, intl } = this.props;
    return getDefaultTexts(intl, texts);
  }

  getSnapshotBeforeUpdate(
    prevProps: Readonly<RawDatePickerProps & WrappedComponentProps>,
  ): null {
    const { value, timeZone, intl } = this.props;
    const { mode } = this.state;
    const resolvedTimeZone = getTimeZone(timeZone, intl);
    if (prevProps?.value !== value) {
      const valueAsDate =
        (value && getValueAsLocalDate(value, resolvedTimeZone)) || undefined;
      this.setState({
        value: valueAsDate,
        month: fnsStartOfMonth(valueAsDate || new Date()),
        changed: true,
        mode: value === undefined ? 'date' : mode,
      });
    }
    return null;
  }

  handleChange = (value: Date | undefined): void => {
    const { onValueChange, timeZone, intl } = this.props;
    this.setState({ value, changed: true });
    onValueChange && onValueChange(applyTimezoneOffset(value, timeZone, intl));
  };

  handleDayMouseEnter = (day: Date): void => this.setState({ enteredTo: day });

  handleDayMouseLeave = (): void => this.setState({ enteredTo: undefined });

  handleDayClick = (day: Date, modifiers: Modifiers): void => {
    const { value } = this.state;
    const { useStartOfDay, useEndOfDay, showTime, timeZone, intl } = this.props;

    if (modifiers.disabled) {
      return;
    }
    const resolvedTimeZone = getTimeZone(timeZone, intl);
    const now = resolvedTimeZone
      ? currentTimeInTimezone(resolvedTimeZone)
      : new Date();
    // Carrying the time of day forward is what the three setters below do: they rewrite the
    // calendar fields of the existing value and leave its local clock alone, which is correct
    // across a DST boundary because local fields are what a wall clock means.
    //
    // `value` rather than `isChanged && value`: the old guard fell back to "now" on the first
    // click of a picker that already had a value, throwing that value's time away — and
    // `handleChange` then put it back by re-deriving it from a seconds difference. That
    // round-trip is what `changeDayWithHoursPreserved` existed for, and it assumed every
    // calendar day is 86400s, so any pair of dates straddling a DST transition came out an hour
    // wrong. Starting from `value` makes the round-trip unnecessary rather than fixing its
    // arithmetic.
    //
    // The fallback is the provider's clock rather than the browser's when `timeZone` resolved to
    // one, so a picker opened with no value starts on the provider's day.
    let nextDateWithCurrentTime = value || now;
    nextDateWithCurrentTime = fnsSetYear(
      nextDateWithCurrentTime,
      day.getFullYear(),
    );
    nextDateWithCurrentTime = fnsSetMonth(
      nextDateWithCurrentTime,
      day.getMonth(),
    );
    nextDateWithCurrentTime = fnsSetDate(
      nextDateWithCurrentTime,
      day.getDate(),
    );

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

  getNowDate = (): Date => {
    const { timeZone, intl } = this.props;
    const resolvedTimeZone = getTimeZone(timeZone, intl);
    return resolvedTimeZone
      ? currentTimeInTimezone(resolvedTimeZone)
      : new Date();
  };

  handleApply = (date: Date | undefined): void => {
    const { onApply, timeZone, intl } = this.props;
    if (!onApply) {
      return;
    }
    const { value } = this.state;

    if (date instanceof Date) {
      onApply(applyTimezoneOffset(date, timeZone, intl));
      this.setState({ value: date });
    } else {
      onApply(applyTimezoneOffset(value, timeZone, intl));
    }
    this.handleModeSwitch('date');
  };

  handleMonthChange = (month: Date, mode: string): void =>
    this.setState({ month, mode });

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
        onChange={(changedMonth): void =>
          changedMonth && this.handleMonthChange(changedMonth, 'date')
        }
      />
    );
  };

  renderMonthPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <MonthPicker
        value={month}
        onChange={(changedMonth): void =>
          changedMonth && this.handleMonthChange(changedMonth, 'date')
        }
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
        today={this.getNowDate()}
        canChangeMonth={false}
        disabledDays={disabledDates}
        selectedDays={selectedDays}
        month={month}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleModeSwitch('month')}
        onYearNameClick={(): void => this.handleModeSwitch('year')}
        onMonthChange={(selectedMonth: Date): void =>
          this.handleMonthChange(selectedMonth, 'date')
        }
        modifiers={modifiers}
      />
    );
  };

  handleDaySwitch = (day: Date): void => {
    const { disabledDates } = this.props;

    this.handleDayClick(day, {
      disabled: disabledDates ? disabledDates(day) : false,
    } as Modifiers);
  };

  renderTimePicker = (): React.ReactNode => {
    const { value } = this.state;
    const {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      disabledDates,
      timeZone,
    } = this.props;
    const prevDay = fnsAddDays(toDateValue(value), -1);
    const nextDay = fnsAddDays(toDateValue(value), 1);
    const inactivePrev = disabledDates ? disabledDates(prevDay) : false;
    const inactiveNext = disabledDates ? disabledDates(nextDay) : false;
    return (
      <TimePicker
        value={value}
        timeZone={timeZone}
        onChange={this.handleChange}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        inactiveNext={inactiveNext}
        inactivePrev={inactivePrev}
        onShortNext={(): void => this.handleDaySwitch(nextDay)}
        onShortPrev={(): void => this.handleDaySwitch(prevDay)}
      />
    );
  };

  render(): React.ReactNode {
    const { mode, changed, value, texts } = this.state;
    const { showTime, hideNow, quickPicks } = this.props;

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
        <S.ContentWrapper withQuickPicks={!!quickPicks?.length}>
          {quickPicks?.length && (
            <QuickPicks
              value={value}
              onChange={(item) => {
                this.handleMonthChange(item.value, 'date');
                this.handleChange(item.value);
              }}
              items={quickPicks}
              texts={texts}
            />
          )}
          <S.PickerWrapper>{picker}</S.PickerWrapper>
        </S.ContentWrapper>
        <Footer
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          onSwitchMode={(): void =>
            this.handleModeSwitch(mode === 'time' ? 'date' : 'time')
          }
          texts={texts}
          hideNow={hideNow}
          getNowDate={this.getNowDate}
        />
      </S.Container>
    );
  }
}

export default injectIntl(RawDatePicker) as (
  props: RawDatePickerProps,
) => ReactElement;
