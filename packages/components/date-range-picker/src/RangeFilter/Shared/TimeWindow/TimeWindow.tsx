import * as React from 'react';
import { range } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';

import { withDataFormat } from '@synerise/ds-data-format';

import { DayKey, TimeWindowProps, State, DayOptions, TimeWindowTexts } from './TimeWindow.types';
import * as S from './TimeWindow.styles';
import { getDateFromDayValue } from './utils';
import Grid from './Grid/Grid';
import SelectionCount from '../SelectionCount/SelectionCount';
import { FilterDefinition } from '../../RangeFilter.types';
import { DEFAULT_RANGE_END, DEFAULT_RANGE_START, TIME_FORMAT } from '../../constants';
import AddButton from '../AddButton/AddButton';
import RangeFormContainer from './RangeFormContainer/RangeFormContainer';
import Day from './Day/Day';
import SelectionHint from '../SelectionHint/SelectionHint';
import { DateLimitMode } from './RangeFormContainer/RangeForm/RangeForm.types';
import type { DateValue } from './RangeFormContainer/RangeFormContainer.types';
import {
  EU_NOTATION_MONTH_DAYS_INDEXES,
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_MONTH_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from './constants/timeWindow.constants';

export const DEFAULT_LIMIT_MODE: DateLimitMode = 'Range';

class TimeWindowBase extends React.PureComponent<TimeWindowProps, State> {
  // eslint-disable-next-line react/destructuring-assignment
  state: State = { activeDays: this.props.daily ? [0] : [], controlKeyPressed: false };
  private wrapperRef = React.createRef<HTMLDivElement>();
  static defaultProps: Partial<TimeWindowProps> = {
    days: {},
    numberOfDays: 1,
    showSelectAll: false,
    valueSelectionModes: ['Range', 'Hour'],
    dayTemplate: (index): { dayOfWeek: number } => ({ dayOfWeek: Number(index) + 1 }),
    dayFormatter: (dayKey: DayKey): React.ReactNode => (
      <FormattedMessage id={`DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`} />
    ),
  };

  componentDidMount(): void {
    const wrapper = this.wrapperRef;
    if (wrapper?.current && wrapper.current !== null) {
      // focus on wrapper to enable listening for keydown without having to click on wrapper
      wrapper.current.focus();
    }
  }

  componentDidUpdate(prevProps: Readonly<TimeWindowProps>, prevState: Readonly<State>): void {
    const { activeDays } = this.state;
    const hasCommonRange = this.haveActiveDaysCommonRange();
    if (prevState.isRangeDefined !== hasCommonRange && activeDays.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(state => ({ ...state, isRangeDefined: hasCommonRange }));
    }
  }

  isDayRestricted = (dayKey: DayKey): boolean => {
    const { days } = this.props;
    return !!days[dayKey] && days[dayKey].restricted;
  };

  checkActiveDay = (dayKey: DayKey): void => {
    const { isRangeDefined } = this.state;
    if (!this.isDayRestricted(dayKey) && isRangeDefined && !this.haveActiveDaysCommonRange()) this.checkDay(dayKey);
    const { activeDays, controlKeyPressed, shiftKeyPressed } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.includes(dayKey) ? activeDays : [...activeDays, dayKey];
    } else if (activeDays.length > 0 && shiftKeyPressed) {
      updatedActiveDay =
        activeDays[0] < dayKey ? range(+activeDays[0], +dayKey + 1) : range(+dayKey, +activeDays[0] + 1);
    } else {
      updatedActiveDay = [dayKey];
    }
    this.setState(state => ({ ...state, activeDays: updatedActiveDay }));
  };

  uncheckActiveDay = (dayKey: DayKey): void => {
    const { activeDays, controlKeyPressed } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.filter(day => day !== dayKey);
    }
    this.setState(state => ({ ...state, activeDays: updatedActiveDay }));
    this.removeDaySelection(dayKey);
  };

  handleToggleDay = (dayKey: DayKey, forcedState?: boolean): void => {
    const { activeDays, controlKeyPressed } = this.state;
    if (typeof forcedState !== 'undefined') {
      if (controlKeyPressed && forcedState) {
        activeDays.includes(dayKey) ? this.uncheckActiveDay(dayKey) : this.checkActiveDay(dayKey);
        return;
      }
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
    } else {
      activeDays.includes(dayKey) ? this.uncheckActiveDay(dayKey) : this.checkActiveDay(dayKey);
    }
  };

  handleDayChange = (dayKey: DayKey, dayChanges: Partial<DayOptions>): void => {
    const { onChange, days } = this.props;
    onChange({
      ...days,
      [dayKey]: {
        ...this.getDayValue(dayKey),
        ...(dayChanges as DayOptions),
      },
    });
  };

  removeDaySelection = (dayKey: DayKey): void => {
    const { onChange, days } = this.props;
    const updatedDays = days;
    delete updatedDays[dayKey];
    onChange(updatedDays);
  };

  checkDay = (dayKey: DayKey): void => {
    const { onCheckDay } = this.props;

    this.handleDayChange(dayKey, {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: true,
      display: true,
    });

    onCheckDay && onCheckDay(dayKey);
  };

  handleDayTimeChange = (value: DateValue, dayKey: DayKey): void => {
    this.handleDayChange(dayKey, {
      restricted: true,
      start: value[0] !== undefined ? dayjs(value[0]).format(TIME_FORMAT) : DEFAULT_RANGE_START,
      stop: value[1] !== undefined ? dayjs(value[1]).format(TIME_FORMAT) : DEFAULT_RANGE_END,
    });
  };

  handleMultipleDayTimeChange = (value: DateValue): void => {
    const { onChange, days } = this.props;
    const { activeDays } = this.state;
    const updatedDays = {};
    activeDays.forEach(k => {
      updatedDays[k] = {
        day: k,
        start: dayjs(value[0]).format(TIME_FORMAT),
        stop: dayjs(value[1]).format(TIME_FORMAT),
        restricted: true,
      };
    });
    onChange({ ...days, ...updatedDays });
  };

  handleRangeDelete = (): void => {
    const { onChange, days } = this.props;
    const { activeDays } = this.state;
    const updatedDays = days;
    activeDays.forEach(k => {
      delete updatedDays[k];
    });
    onChange({ ...updatedDays });
  };

  handleClearSelection = (): void => {
    this.setState({ activeDays: [], isRangeDefined: false });
  };

  handleSelectAll = (): void => {
    const keys = this.getAllKeys();
    const { onSelectAll } = this.props;
    this.setState({ activeDays: keys }, () => {
      onSelectAll && onSelectAll();
    });
  };

  getDayValue = (dayKey: DayKey): Partial<FilterDefinition> => {
    const { days, dayTemplate, customDays, daily, valueSelectionModes } = this.props;
    let dayValue = {};
    if (daily) dayValue = days;
    else if (days[dayKey]) dayValue = days[dayKey];
    else if (typeof dayKey === 'number') dayValue = dayTemplate(dayKey);
    else if (customDays && customDays[dayKey]?.template && customDays[dayKey]?.template !== null) {
      dayValue = customDays[dayKey].template as object;
    }
    return {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: false,
      display: false,
      inverted: false,
      mode: valueSelectionModes[0] || DEFAULT_LIMIT_MODE,
      ...dayValue,
    };
  };

  getDayLabel = (dayKey: DayKey, long?: boolean): string | object | React.ReactNode => {
    const { dayFormatter, customDays } = this.props;
    let label;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      label = customDays[dayKey][long ? 'longLabel' : 'label'] || customDays[dayKey].label;
    }
    if (!label) label = dayFormatter(dayKey, long);
    return label;
  };

  handleRangePaste = (dayKeys: DayKey): void => {
    const { rangeClipboard } = this.props;
    const { activeDays } = this.state;
    if (rangeClipboard?.stop && rangeClipboard?.start) {
      activeDays.length > 1
        ? this.handleMultipleDayTimeChange([
            getDateFromDayValue(rangeClipboard.start),
            getDateFromDayValue(rangeClipboard.stop),
          ])
        : this.handleDayTimeChange(
            [getDateFromDayValue(rangeClipboard.start), getDateFromDayValue(rangeClipboard.stop)],
            dayKeys
          );
    }
  };

  handleRangeCopy = (): void => {
    const { onRangeCopy } = this.props;
    const { activeDays } = this.state;
    const dayValue = this.getDayValue(activeDays[0]);
    onRangeCopy && onRangeCopy({ start: dayValue.start, stop: dayValue.stop });
  };

  replaceDaysIndexesForUSNotation = (daysIndexes: number[]): number[] => {
    const { isSundayFirstWeekDay } = this.props;
    const stringifyDaysIndexes = JSON.stringify(daysIndexes);
    const stringifyEUNotationWeekDaysIndexes = JSON.stringify(EU_NOTATION_WEEK_DAYS_INDEXES);
    const stringifyEUNotationMonthDaysIndexes = JSON.stringify(EU_NOTATION_MONTH_DAYS_INDEXES);
    let result = daysIndexes;

    if (stringifyDaysIndexes === stringifyEUNotationWeekDaysIndexes && isSundayFirstWeekDay) {
      result = US_NOTATION_WEEK_DAYS_INDEXES;
    }
    if (stringifyDaysIndexes === stringifyEUNotationMonthDaysIndexes && isSundayFirstWeekDay) {
      result = US_NOTATION_MONTH_DAYS_INDEXES;
    }
    return result;
  };

  getAllKeys = (): DayKey[] => {
    const { numberOfDays, customDays } = this.props;
    let keys = range(numberOfDays);
    keys = this.replaceDaysIndexesForUSNotation(keys).slice();
    if (customDays) keys = [...keys, ...(Object.keys(customDays) as unknown as number[])];
    return keys;
  };

  renderDay = (dayKey: DayKey): JSX.Element => {
    const { customDays, intl, readOnly, texts } = this.props;
    const { activeDays } = this.state;
    const isRestricted = this.isDayRestricted(dayKey);
    const isActive = activeDays.includes(dayKey);
    let Component;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      const { component: CustomComponent } = customDays[dayKey];
      if (CustomComponent) Component = CustomComponent;
    }
    if (!Component) {
      Component = Day;
    }
    return (
      <Component
        key={dayKey}
        dayKey={dayKey}
        data-attr={dayKey}
        label={this.getDayLabel(dayKey)}
        restricted={isRestricted}
        active={isActive}
        readOnly={readOnly}
        intl={intl}
        onToggle={this.handleToggleDay}
        texts={texts}
      />
    );
  };

  handleRangeAdd = (): void => {
    const { daily } = this.props;
    if (!daily && !this.haveActiveDaysCommonRange()) {
      this.handleMultipleDayTimeChange([
        getDateFromDayValue(DEFAULT_RANGE_START),
        getDateFromDayValue(DEFAULT_RANGE_END),
      ]);
    }
    this.setState({ isRangeDefined: true });
  };

  renderRangeForm = (dayKeys: DayKey | DayKey[]): React.ReactNode => {
    const { activeDays } = this.state;
    const {
      hideHeader,
      monthlyFilterPeriod,
      monthlyFilter,
      daily,
      days,
      onChange,
      texts,
      valueSelectionModes,
      renderRangeFormSuffix,
      timePickerProps,
      disabled,
    } = this.props;
    return (
      <RangeFormContainer
        disabled={disabled}
        onChange={onChange}
        days={days}
        activeDays={activeDays}
        dayKeys={dayKeys}
        getDayLabel={this.getDayLabel}
        getDayValue={this.getDayValue}
        onMultipleDayTimeChange={this.handleMultipleDayTimeChange}
        onDayTimeChange={this.handleDayTimeChange}
        onRangeClear={disabled ? undefined : this.handleRangeDelete}
        onRangeCopy={disabled ? undefined : this.handleRangeCopy}
        onRangePaste={(): void => this.handleRangePaste(dayKeys as DayKey)}
        hideHeader={hideHeader}
        monthlyFilter={monthlyFilter}
        monthlyFilterPeriod={monthlyFilterPeriod}
        onRangeDelete={daily ? undefined : this.handleRangeDelete}
        texts={(texts || {}) as TimeWindowTexts}
        renderSuffix={renderRangeFormSuffix}
        timePickerProps={timePickerProps}
        valueSelectionModes={valueSelectionModes}
      />
    );
  };

  haveActiveDaysCommonRange = (): boolean => {
    const { activeDays } = this.state;
    const { days } = this.props;
    let previousDay: DayOptions | undefined;
    const activeDaysHaveDifferentRanges = activeDays.some((dayIndex): boolean => {
      const currentDay = days[dayIndex as number];
      if (!currentDay) {
        return true;
      }
      if (!previousDay) {
        previousDay = currentDay;
        return false;
      }
      const areRangeDifferent = currentDay?.start !== previousDay?.start || currentDay?.stop !== previousDay?.stop;
      previousDay = currentDay;
      return areRangeDifferent;
    });
    return !activeDaysHaveDifferentRanges;
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Shift') {
      this.setState(state => ({ ...state, controlKeyPressed: false, shiftKeyPressed: true }));
    }
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState(state => ({ ...state, controlKeyPressed: true, shiftKeyPressed: false }));
    }
  };

  handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState(state => ({ ...state, controlKeyPressed: false }));
    }
    if (e.key === 'Shift') {
      this.setState(state => ({ ...state, shiftKeyPressed: false }));
    }
  };

  render(): JSX.Element {
    const { days, numberOfDays, daily, intl, texts, disabled, ...rest } = this.props;
    const { activeDays, isRangeDefined } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const rangeFormKey = singleMode ? keys[0] : activeDays;

    const shouldRenderRangeForm = (!!activeDays.length && isRangeDefined) || !!daily;
    const shouldRenderSelectionHint = !activeDays.length && !disabled;
    const shouldRenderAddButton = !!activeDays.length && !daily && !isRangeDefined && !disabled;
    return (
      <S.TimeWindowContainer
        tabIndex={0}
        ref={this.wrapperRef}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        {!singleMode && (
          <Grid
            onUnselectAll={this.handleClearSelection}
            onSelectAll={this.handleSelectAll}
            showUnselectAll={activeDays?.length > 0}
            renderDay={this.renderDay}
            keys={keys as number[]}
            days={days}
            intl={intl}
            numberOfDays={numberOfDays}
            texts={texts}
            {...rest}
            title={
              <SelectionCount
                selectedDayCount={activeDays.length}
                label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECTED', defaultMessage: 'Selected: ' })}
              />
            }
          />
        )}
        {shouldRenderRangeForm && this.renderRangeForm(rangeFormKey)}
        {shouldRenderSelectionHint && (
          <SelectionHint message={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECT-DAYS-DESCRIPTION' })} />
        )}
        {shouldRenderAddButton && (
          <S.AddButtonWrapper>
            <AddButton
              label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.ADD-TIME', defaultMessage: 'Add time' })}
              onClick={this.handleRangeAdd}
            />
          </S.AddButtonWrapper>
        )}
      </S.TimeWindowContainer>
    );
  }
}

export default withDataFormat(injectIntl(TimeWindowBase)) as React.FC<TimeWindowProps>;
