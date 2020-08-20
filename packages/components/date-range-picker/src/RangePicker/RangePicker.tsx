import * as React from 'react';
import { DateUtils, RangeModifier, DayModifiers } from 'react-day-picker';
import fnsIsSameDay from 'date-fns/isSameDay';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import parseISO from 'date-fns/parseISO'

import MonthPicker from '@synerise/ds-date-picker/dist/Elements/MonthPicker/MonthPicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import TimePicker from '@synerise/ds-date-picker/dist/Elements/TimePicker/TimePicker';
import {
  DayBackground,
  DayForeground,
  DayText,
  DayTooltip,
} from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker.styles';
import YearPicker from '@synerise/ds-date-picker/dist/Elements/YearPicker/YearPicker';
import DayPicker from '@synerise/ds-date-picker/dist/Elements/DayPicker/DayPicker';
import Icon from '@synerise/ds-icon';
import { CalendarM, ClockM } from '@synerise/ds-icon/dist/icons';
import { fnsDifferenceInYears } from '@synerise/ds-date-picker/dist/fns';
import { Range } from '../RelativeRangePicker/RelativeRangePicker.styles';
import { fnsStartOfDay, fnsEndOfDay, fnsIsSameMonth, fnsIsAfter, fnsFormat, fnsAddMinutes, fnsAddDays } from '../fns';
import * as S from './RangePicker.styles';
import { ABSOLUTE, COLUMNS, MODES } from '../constants';

import ADD from '../dateUtils/add';
import { DateFilter } from '../date.types';
import { Props, State, Side as SideType } from './RangePicker.types';
import getDateFromString from '../dateUtils/getDateFromString';
import { getSidesState, getDisabledTimeOptions } from './utils';

const TOOLTIP_FORMAT = 'd MMM yyyy, H:mm';
export default class RangePicker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      enteredTo: null,
      ...getSidesState(props.value),
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<Props>): null {
    const { value, forceAdjacentMonths } = this.props;
    const { left } = this.state;
    if (
      (!!value?.to && value?.to !== prevProps?.value?.to && !fnsIsSameMonth(value.to, left.month)) ||
      forceAdjacentMonths !== prevProps.forceAdjacentMonths
    ) {
      this.setState(getSidesState(value, forceAdjacentMonths));
    }
    return null;
  }

  handleDayMouseEnter = (day: Date): void => {
    this.setState({ enteredTo: day });
  };

  handleDayMouseLeave = (): void => {
    this.setState({ enteredTo: null });
  };

  handleDayClick = (day: Date, modifiers: DayModifiers, e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
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

  handleAddDay = (numberOfDays: number, side: string): void => {
    if (side === COLUMNS.LEFT) {
      const { onChange, value } = this.props;
      onChange({ ...value, type: ABSOLUTE, from: fnsAddDays(value.from, numberOfDays) });
    }
    if (side === COLUMNS.RIGHT) {
      const { onChange, value } = this.props;
      onChange({ ...value, type: ABSOLUTE, to: fnsAddDays(value.to, numberOfDays) });
    }
  };

  handleSideMonthChange = (side: 'left' | 'right', month: Date, mode: string): void => {
    const opposite = side === COLUMNS.LEFT ? COLUMNS.RIGHT : COLUMNS.LEFT;
    const { state } = this;
    const { forceAdjacentMonths } = this.props;
    if (fnsIsSameMonth(month, state[opposite])) {
      const dir = fnsIsAfter(month, state[side].month) ? 1 : -1;
      const adjacentMonth = ADD.MONTHS(month, dir);
      this.setState(prevState => ({ ...prevState, [side]: { ...state[side], adjacentMonth, mode } }));
      return;
    }
    if (forceAdjacentMonths) {
      const dir = side === COLUMNS.RIGHT ? -1 : 1;
      this.setState(prevState => ({
        ...prevState,
        [opposite]: { ...state[opposite], month: ADD.MONTHS(month, dir) },
        [side]: { ...state[side], month, mode },
      }));
      return;
    }
    this.setState(prevState => ({ ...prevState, [side]: { ...state[side], month, mode } }));
  };

  handleSideModeChange = (side: string, mode: string): void => {
    this.setState(prevState => ({ ...prevState, [side]: { ...prevState[side], mode } }));
  };

  renderDay = (day: Date): React.ReactNode => {
    const text = day.getDate();
    const { value, intl } = this.props;
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

  renderYearPicker = (side: SideType): React.ReactNode => {
    const { [side]: currentSide } = this.state;
    const { month } = currentSide;
    return (
      <YearPicker
        key={`year_picker_${side}`}
        value={month instanceof Date ? month : new Date(month)}
        onChange={(m: Date): void => this.handleSideMonthChange(side, m, 'date')}
      />
    );
  };

  renderMonthPicker = (side: SideType): React.ReactNode => {
    const opposite: SideType = side === COLUMNS.LEFT ? (COLUMNS.RIGHT as SideType) : (COLUMNS.LEFT as SideType);
    const { [side]: currentSide, [opposite]: oppositeSide } = this.state;
    return (
      <MonthPicker
        key={`month_picker_${opposite}`}
        max={side === COLUMNS.LEFT ? ADD.MONTHS(oppositeSide.month, -1) : undefined}
        min={side === COLUMNS.RIGHT ? ADD.MONTHS(oppositeSide.month, 1) : undefined}
        value={currentSide.month instanceof Date ? currentSide.month : new Date(currentSide.month)}
        onChange={(month: Date): void => this.handleSideMonthChange(side, month, 'date')}
      />
    );
  };

  renderDatePicker = (side: SideType): React.ReactNode => {
    const { value, disabledDate, forceAdjacentMonths } = this.props;
    const { enteredTo, left, right, [side]: sideState } = this.state;
    const { from, to, type } = value;
    const isSelecting = from && !to && enteredTo;
    const enteredStart = isSelecting ? fnsMin(from, enteredTo) : enteredTo;
    const enteredEnd = isSelecting ? fnsMax(from, enteredTo) : enteredTo;
/*    const entered = isSelecting
      ? (day: Date | string | number): boolean => fnsIsWithinRange(day, { start: enteredStart, end: enteredEnd })
      : enteredTo;*/
    const startModifier = isSelecting && !!enteredTo && !!from && enteredTo < from ? undefined : from;
    const endModifier = isSelecting && !!enteredTo && !!from && enteredTo < from ? from : to;
    const modifiers = {
      start: startModifier,
      end: endModifier,

      'entered-start': enteredStart,
      'entered-end': enteredEnd,
      'initial-entered': !endModifier ? startModifier : undefined,
      initial: !false && !endModifier ? startModifier : undefined,
    };
    const selectedDays = [from, { from, to } as DateFilter];
    const adjacentMonths = forceAdjacentMonths || fnsIsSameMonth(ADD.MONTHS(left.month, 1), right.month);
    const adjacentYears = forceAdjacentMonths || fnsDifferenceInYears(ADD.MONTHS(left.month, 1), right.month) === 0;
    return (
      <DayPicker
        key={`day_picker_${side}`}
        className={type.toLowerCase()}
        canChangeMonth={false}
        disabledDays={disabledDate}
        localeUtils={MomentLocaleUtils}
        month={getDateFromString(sideState.month)}
        title={sideState.monthTitle}
        hideLongNext={side === COLUMNS.LEFT && adjacentYears}
        hideShortNext={side === COLUMNS.LEFT && adjacentMonths}
        hideLongPrev={side === COLUMNS.RIGHT && adjacentYears}
        hideShortPrev={side === COLUMNS.RIGHT && adjacentMonths}
        renderDay={this.renderDay}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleSideModeChange(side, 'month')}
        onYearNameClick={(): void => this.handleSideModeChange(side, 'year')}
        onMonthChange={(month: Date): void => this.handleSideMonthChange(side, month, 'date')}
        fixedWeeks
        showOutsideDay
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        onDayClick={this.handleDayClick}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedDays={selectedDays}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modifiers={modifiers}
      />
    );
  };

  renderTimePicker = (side: SideType): React.ReactNode => {
    const { value } = this.props;
    const { from, to } = value;
    const sidesAreAdjacent = fnsIsSameDay(from, to);
    switch (side) {
      case COLUMNS.LEFT: {
        return (
          <TimePicker
            key={`time-picker-${side}`}
            value={getDateFromString(from)}
            onChange={this.handleFromTimeChange}
            disabledHours={getDisabledTimeOptions(from, 'HOURS', null, to)}
            disabledMinutes={getDisabledTimeOptions(from, 'MINUTES', null, to)}
            disabledSeconds={getDisabledTimeOptions(from, 'SECONDS', null, to)}
            onShortNext={
              sidesAreAdjacent
                ? undefined
                : (): void => {
                    this.handleAddDay(1, COLUMNS.LEFT);
                  }
            }
            onShortPrev={(): void => {
              this.handleAddDay(-1, COLUMNS.LEFT);
            }}
          />
        );
      }
      case COLUMNS.RIGHT: {
        return (
          <TimePicker
            key={`time-picker-${side}`}
            value={getDateFromString(to)}
            onChange={this.handleToTimeChange}
            disabledHours={getDisabledTimeOptions(to, 'HOURS', from, null)}
            disabledMinutes={getDisabledTimeOptions(to, 'MINUTES', from, null)}
            disabledSeconds={getDisabledTimeOptions(to, 'SECONDS', from, null)}
            onShortNext={(): void => {
              this.handleAddDay(1, COLUMNS.RIGHT);
            }}
            onShortPrev={
              sidesAreAdjacent
                ? undefined
                : (): void => {
                    this.handleAddDay(-1, COLUMNS.RIGHT);
                  }
            }
          />
        );
      }
      default:
        return null;
    }
  };

  renderSide = (side: SideType): React.ReactNode | null => {
    const { mode } = this.props;
    const { [side]: sideState } = this.state;
    if (mode === MODES.TIME) return this.renderTimePicker(side);
    switch (sideState.mode) {
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
    const { mode, onChange, value, canSwitchMode, dateOnly, onSwitchMode, intl } = this.props;

    return (
      <>
        <S.Sides>
          <S.Side mode={mode}>{this.renderSide(COLUMNS.LEFT as SideType)}</S.Side>
          <S.Side mode={mode}>{this.renderSide(COLUMNS.RIGHT as SideType)}</S.Side>
        </S.Sides>
        <S.PickerFooter>
          <Range
            onClick={(): void => {
              onChange({ ...value, type: 'ABSOLUTE', to: fnsAddMinutes(new Date(), 1), from: new Date() });
            }}
          >
            {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.NOW` })}
          </Range>
          <S.FooterSeparator />
          {!dateOnly && (
            <S.DateTimeModeSwitch
              type="ghost"
              mode="label-icon"
              disabled={!canSwitchMode}
              onClick={onSwitchMode}
              className="ds-date-time-switch"
            >
              {intl.formatMessage({
                id: mode === MODES.TIME ? `DS.DATE-RANGE-PICKER.SELECT-DATE` : `DS.DATE-RANGE-PICKER.SELECT-TIME`,
              })}
              <Icon component={mode === MODES.TIME ? <CalendarM /> : <ClockM />} />
            </S.DateTimeModeSwitch>
          )}
        </S.PickerFooter>
      </>
    );
  }
}
