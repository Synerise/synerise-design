import dayjs from 'dayjs';
import { range } from 'lodash';
import React, {
  type FC,
  type KeyboardEvent,
  PureComponent,
  type ReactNode,
  createRef,
} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { withDataFormat } from '@synerise/ds-data-format';

import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  TIME_FORMAT,
} from '../../constants';
import AddButton from '../AddButton/AddButton';
import SelectionCount from '../SelectionCount/SelectionCount';
import SelectionHint from '../SelectionHint/SelectionHint';
import Day from './Day/Day';
import Grid from './Grid/Grid';
import { type DateLimitMode } from './RangeFormContainer/RangeForm/RangeForm.types';
import RangeFormContainer from './RangeFormContainer/RangeFormContainer';
import type { DateValue } from './RangeFormContainer/RangeFormContainer.types';
import * as S from './TimeWindow.styles';
import {
  type DayKey,
  type DayOptions,
  type State,
  type TimeWindowProps,
  type TimeWindowTexts,
} from './TimeWindow.types';
import {
  EU_NOTATION_MONTH_DAYS_INDEXES,
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_MONTH_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from './constants/timeWindow.constants';
import { getDateFromDayValue } from './utils';

export const DEFAULT_LIMIT_MODE: DateLimitMode = 'Range';

class TimeWindowBase extends PureComponent<TimeWindowProps, State> {
  state: State = {
    activeDays: this.props.daily ? [0] : [],
    controlKeyPressed: false,
  };
  private wrapperRef = createRef<HTMLDivElement>();
  static defaultProps: Partial<TimeWindowProps> = {
    days: {},
    numberOfDays: 1,
    showSelectAll: false,
    valueSelectionModes: ['Range', 'Hour'],
    dayTemplate: (index: string | number): { dayOfWeek: number } => ({
      dayOfWeek: Number(index) + 1,
    }),
    dayFormatter: (dayKey: DayKey): ReactNode => (
      <FormattedMessage id={`DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`} />
    ),
  };

  componentDidMount() {
    const wrapper = this.wrapperRef;
    if (wrapper?.current && wrapper.current !== null) {
      // focus on wrapper to enable listening for keydown without having to click on wrapper
      wrapper.current.focus();
    }
  }

  componentDidUpdate(
    prevProps: Readonly<TimeWindowProps>,
    prevState: Readonly<State>,
  ) {
    const { activeDays } = this.state;
    const hasCommonRange = this.haveActiveDaysCommonRange();
    if (prevState.isRangeDefined !== hasCommonRange && activeDays.length) {
      this.setState((state) => ({ ...state, isRangeDefined: hasCommonRange }));
    }
  }

  isDayRestricted = (dayKey: DayKey) => {
    const { days } = this.props;
    return !!days[dayKey] && days[dayKey].restricted;
  };

  checkActiveDay = (dayKey: DayKey) => {
    const { isRangeDefined } = this.state;
    if (
      !this.isDayRestricted(dayKey) &&
      isRangeDefined &&
      !this.haveActiveDaysCommonRange()
    ) {
      this.checkDay(dayKey);
    }
    const { activeDays, controlKeyPressed, shiftKeyPressed } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.includes(dayKey)
        ? activeDays
        : [...activeDays, dayKey];
    } else if (activeDays.length > 0 && shiftKeyPressed) {
      updatedActiveDay =
        activeDays[0] < dayKey
          ? range(+activeDays[0], +dayKey + 1)
          : range(+dayKey, +activeDays[0] + 1);
    } else {
      updatedActiveDay = [dayKey];
    }
    this.setState((state) => ({ ...state, activeDays: updatedActiveDay }));
  };

  uncheckActiveDay = (dayKey: DayKey) => {
    const { activeDays, controlKeyPressed } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.filter((day) => day !== dayKey);
    }
    this.setState((state) => ({ ...state, activeDays: updatedActiveDay }));
    this.removeDaySelection(dayKey);
  };

  handleToggleDay = (dayKey: DayKey, forcedState?: boolean) => {
    const { activeDays, controlKeyPressed } = this.state;
    if (typeof forcedState !== 'undefined') {
      if (controlKeyPressed && forcedState) {
        activeDays.includes(dayKey)
          ? this.uncheckActiveDay(dayKey)
          : this.checkActiveDay(dayKey);
        return;
      }
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
    } else {
      activeDays.includes(dayKey)
        ? this.uncheckActiveDay(dayKey)
        : this.checkActiveDay(dayKey);
    }
  };

  handleClearDay = (dayKey: DayKey) => {
    this.removeDaySelection(dayKey);
  };

  handleDayChange = (dayKey: DayKey, dayChanges: Partial<DayOptions>) => {
    const { onChange, days } = this.props;
    onChange({
      ...days,
      [dayKey]: {
        ...this.getDayValue(dayKey),
        ...(dayChanges as DayOptions),
      },
    });
  };

  removeDaySelection = (dayKey: DayKey) => {
    const { onChange, days } = this.props;
    const updatedDays = days;
    delete updatedDays[dayKey];
    onChange(updatedDays);
  };

  checkDay = (dayKey: DayKey) => {
    const { onCheckDay } = this.props;

    this.handleDayChange(dayKey, {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: true,
      display: true,
    });

    onCheckDay && onCheckDay(dayKey);
  };

  handleDayTimeChange = (value: DateValue, dayKey: DayKey) => {
    this.handleDayChange(dayKey, {
      restricted: true,
      start:
        value[0] !== undefined
          ? dayjs(value[0]).format(TIME_FORMAT)
          : DEFAULT_RANGE_START,
      stop:
        value[1] !== undefined
          ? dayjs(value[1]).format(TIME_FORMAT)
          : DEFAULT_RANGE_END,
      inverted: Boolean(value[2]),
    });
  };

  handleMultipleDayTimeChange = (value: DateValue) => {
    const { onChange, days } = this.props;
    const { activeDays } = this.state;
    const updatedDays: Record<DayKey, DayOptions & { day: DayKey }> = {};
    activeDays.forEach((k) => {
      updatedDays[k] = {
        ...this.getDayValue(k),
        day: k,
        start: dayjs(value[0]).format(TIME_FORMAT),
        stop: dayjs(value[1]).format(TIME_FORMAT),
        inverted: Boolean(value[2]),
        restricted: true,
      };
    });
    onChange({ ...days, ...updatedDays });
  };

  handleRangeDelete = () => {
    const { onChange, days } = this.props;
    const { activeDays } = this.state;
    const updatedDays = days;
    activeDays.forEach((k) => {
      delete updatedDays[k];
    });
    onChange({ ...updatedDays });
  };

  handleClearSelection = () => {
    this.setState({ activeDays: [], isRangeDefined: false });
  };

  handleSelectAll = () => {
    const keys = this.getAllKeys();
    const { onSelectAll } = this.props;
    this.setState({ activeDays: keys }, () => {
      onSelectAll && onSelectAll();
    });
  };

  getDayValue = (dayKey: DayKey) => {
    const { days, dayTemplate, customDays, daily, valueSelectionModes } =
      this.props;
    let dayValue = {};
    if (daily) {
      dayValue = days;
    } else if (days[dayKey]) {
      dayValue = days[dayKey];
    } else if (typeof dayKey === 'number') {
      dayValue = dayTemplate(dayKey);
    } else if (
      customDays &&
      customDays[dayKey]?.template &&
      customDays[dayKey]?.template !== null
    ) {
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

  getDayLabel = (dayKey: DayKey, long?: boolean) => {
    const { dayFormatter, customDays } = this.props;
    let label;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      label =
        customDays[dayKey][long ? 'longLabel' : 'label'] ||
        customDays[dayKey].label;
    }
    if (!label) {
      label = dayFormatter(dayKey, long);
    }
    return label;
  };

  handleRangePaste = (dayKeys: DayKey) => {
    const { rangeClipboard } = this.props;
    const { activeDays } = this.state;
    if (rangeClipboard?.stop && rangeClipboard?.start) {
      activeDays.length > 1
        ? this.handleMultipleDayTimeChange([
            getDateFromDayValue(rangeClipboard.start),
            getDateFromDayValue(rangeClipboard.stop),
            rangeClipboard?.inverted,
          ])
        : this.handleDayTimeChange(
            [
              getDateFromDayValue(rangeClipboard.start),
              getDateFromDayValue(rangeClipboard.stop),
              rangeClipboard?.inverted,
            ],
            dayKeys,
          );
    }
  };

  handleRangeCopy = () => {
    const { onRangeCopy } = this.props;
    const { activeDays } = this.state;
    const dayValue = this.getDayValue(activeDays[0]);
    onRangeCopy &&
      onRangeCopy({
        start: dayValue.start,
        stop: dayValue.stop,
        inverted: dayValue.inverted,
      });
  };

  replaceDaysIndexesForUSNotation = (daysIndexes: number[]) => {
    const { isSundayFirstWeekDay } = this.props;
    const stringifyDaysIndexes = JSON.stringify(daysIndexes);
    const stringifyEUNotationWeekDaysIndexes = JSON.stringify(
      EU_NOTATION_WEEK_DAYS_INDEXES,
    );
    const stringifyEUNotationMonthDaysIndexes = JSON.stringify(
      EU_NOTATION_MONTH_DAYS_INDEXES,
    );
    let result = daysIndexes;

    if (
      stringifyDaysIndexes === stringifyEUNotationWeekDaysIndexes &&
      isSundayFirstWeekDay
    ) {
      result = US_NOTATION_WEEK_DAYS_INDEXES;
    }
    if (
      stringifyDaysIndexes === stringifyEUNotationMonthDaysIndexes &&
      isSundayFirstWeekDay
    ) {
      result = US_NOTATION_MONTH_DAYS_INDEXES;
    }
    return result;
  };

  getAllKeys = (): DayKey[] => {
    const { numberOfDays, customDays } = this.props;
    let keys = range(numberOfDays);
    keys = this.replaceDaysIndexesForUSNotation(keys).slice();
    if (customDays) {
      keys = [...keys, ...(Object.keys(customDays) as unknown as number[])];
    }
    return keys;
  };

  renderDay = (dayKey: DayKey) => {
    const { customDays, intl, readOnly, texts } = this.props;
    const { activeDays } = this.state;
    const isRestricted = this.isDayRestricted(dayKey);
    const isActive = activeDays.includes(dayKey);
    let Component;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      const { component: CustomComponent } = customDays[dayKey];
      if (CustomComponent) {
        Component = CustomComponent;
      }
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
        onClear={this.handleClearDay}
        texts={texts}
      />
    );
  };

  handleRangeAdd = () => {
    const { daily } = this.props;
    if (!daily && !this.haveActiveDaysCommonRange()) {
      this.handleMultipleDayTimeChange([
        getDateFromDayValue(DEFAULT_RANGE_START),
        getDateFromDayValue(DEFAULT_RANGE_END),
        false,
      ]);
    }
    this.setState({ isRangeDefined: true });
  };

  renderRangeForm = (dayKeys: DayKey | DayKey[]) => {
    const { activeDays } = this.state;
    const {
      hideHeader,
      headerOptions,
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
      rangeDisplayMode,
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
        onRangePaste={() => this.handleRangePaste(dayKeys as DayKey)}
        hideHeader={hideHeader}
        headerOptions={headerOptions}
        monthlyFilter={monthlyFilter}
        monthlyFilterPeriod={monthlyFilterPeriod}
        onRangeDelete={daily ? undefined : this.handleRangeDelete}
        texts={texts as TimeWindowTexts}
        renderSuffix={renderRangeFormSuffix}
        timePickerProps={timePickerProps}
        valueSelectionModes={valueSelectionModes}
        rangeDisplayMode={rangeDisplayMode}
      />
    );
  };

  haveActiveDaysCommonRange = () => {
    const { activeDays } = this.state;
    const { days } = this.props;
    let previousDay: DayOptions | undefined;
    const activeDaysHaveDifferentRanges = activeDays.some((dayIndex) => {
      const currentDay = days[dayIndex as number];
      if (!currentDay) {
        return true;
      }
      if (!previousDay) {
        previousDay = currentDay;
        return false;
      }
      const areRangeDifferent =
        currentDay?.start !== previousDay?.start ||
        currentDay?.stop !== previousDay?.stop;
      previousDay = currentDay;
      return areRangeDifferent;
    });
    return !activeDaysHaveDifferentRanges;
  };

  handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Shift') {
      this.setState((state) => ({
        ...state,
        controlKeyPressed: false,
        shiftKeyPressed: true,
      }));
    }
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState((state) => ({
        ...state,
        controlKeyPressed: true,
        shiftKeyPressed: false,
      }));
    }
  };

  handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState((state) => ({ ...state, controlKeyPressed: false }));
    }
    if (e.key === 'Shift') {
      this.setState((state) => ({ ...state, shiftKeyPressed: false }));
    }
  };

  render() {
    const { days, numberOfDays, daily, intl, texts, disabled, ...rest } =
      this.props;
    const { activeDays, isRangeDefined } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const rangeFormKey = singleMode ? keys[0] : activeDays;

    const shouldRenderRangeForm =
      (!!activeDays.length && isRangeDefined) || !!daily;
    const shouldRenderSelectionHint = !activeDays.length && !disabled;
    const shouldRenderAddButton =
      !!activeDays.length && !daily && !isRangeDefined && !disabled;
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
            showSelectAll={keys.length > activeDays?.length}
            title={
              <SelectionCount
                selectedDayCount={activeDays.length}
                label={texts.selected}
              />
            }
          />
        )}
        {shouldRenderRangeForm && this.renderRangeForm(rangeFormKey)}
        {shouldRenderSelectionHint && (
          <SelectionHint message={texts.selectDaysDescription} />
        )}
        {shouldRenderAddButton && (
          <S.AddButtonWrapper>
            <AddButton label={texts.addTime} onClick={this.handleRangeAdd} />
          </S.AddButtonWrapper>
        )}
      </S.TimeWindowContainer>
    );
  }
}

export default withDataFormat(
  injectIntl(TimeWindowBase),
) as FC<TimeWindowProps>;
