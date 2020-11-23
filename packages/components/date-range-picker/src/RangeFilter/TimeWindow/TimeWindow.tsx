import * as React from 'react';
import { range } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import dayjs from 'dayjs';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { InfoM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Day from './Day/Day';
import { DayKey, TimeWindowProps, State, DayOptions } from './TimeWindow.types';
import * as S from './TimeWindow.styles';
import { getDateFromDayValue } from './utils';
import Grid from './Grid/Grid';
import SelectionCount from '../SelectionCount/SelectionCount';
import { FilterDefinition } from '../RangeFilter.types';
import { DEFAULT_RANGE_END, DEFAULT_RANGE_START, TIME_FORMAT } from '../constants';
import AddButton from '../AddButton/AddButton';
import RangeFormContainer from './RangeFormContainer/RangeFormContainer';

class TimeWindowBase extends React.PureComponent<TimeWindowProps, State> {
  // eslint-disable-next-line react/destructuring-assignment
  state: State = { activeDays: this.props.daily ? [0] : [], controlKeyPressed: false };
  private wrapperRef = React.createRef<HTMLDivElement>();
  static defaultProps = {
    days: {},
    numberOfDays: 7,
    showSelectAll: false,
    dayTemplate: (index: number): { dayOfWeek: number } => ({ dayOfWeek: index + 1 }),
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
    const hasCommonRange = this.haveActiveDaysCommonRange();
    if (prevState.isRangeDefined !== hasCommonRange) {
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
    let updatedActiveDay = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.includes(dayKey) ? activeDays : [...activeDays, dayKey];
    } else if (activeDays.length > 0 && shiftKeyPressed) {
      updatedActiveDay =
        activeDays[0] < dayKey ? range(+activeDays[0], +dayKey + 1) : range(+dayKey, +activeDays[0] + 1);
    } else {
      updatedActiveDay = [dayKey];
    }
    this.setState({ activeDays: updatedActiveDay });
  };

  uncheckActiveDay = (dayKey: DayKey): void => {
    const { activeDays, controlKeyPressed } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (controlKeyPressed) {
      updatedActiveDay = activeDays.filter(day => day !== dayKey);
    }
    this.setState({ activeDays: updatedActiveDay });
    this.unCheckDay(dayKey);
  };

  toggleDay = (dayKey: DayKey, forcedState: boolean): void => {
    const { activeDays, controlKeyPressed } = this.state;
    if (typeof forcedState !== 'undefined') {
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
      return;
    }
    if (!controlKeyPressed) {
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

  unCheckDay = (dayKey: DayKey): void => {
    const { onUncheckDay } = this.props;
    this.handleDayChange(dayKey, {
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: false,
      display: false,
    });

    onUncheckDay && onUncheckDay(dayKey);
  };

  handleDayTimeChange = (value: [Date, Date], dayKey: DayKey): void => {
    this.handleDayChange(dayKey, {
      restricted: true,
      start: dayjs(value[0]).format(TIME_FORMAT),
      stop: dayjs(value[1]).format(TIME_FORMAT),
    });
  };

  handleMultipleDayTimeChange = (value: [Date, Date]): void => {
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

  handleClearSelection = (): void => {
    this.setState({ activeDays: [] });
  };

  handleSelectAll = (): void => {
    const keys = this.getAllKeys();
    const { onSelectAll } = this.props;
    this.setState({ activeDays: keys }, () => {
      onSelectAll && onSelectAll();
    });
  };

  getDayValue = (dayKey: DayKey): Partial<FilterDefinition> => {
    const { days, dayTemplate, customDays, daily } = this.props;
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
      ...dayValue,
    };
  };

  getDayLabel = (dayKey: DayKey, long?: boolean): string | object => {
    const { dayFormatter, customDays } = this.props;
    let label;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      label = customDays[dayKey][long ? 'longLabel' : 'label'] || customDays[dayKey].label;
    }
    if (!label) label = dayFormatter(dayKey, long);
    return label;
  };

  handleRangeClear = (dayKeys: DayKey): void => {
    const { activeDays } = this.state;
    activeDays.length > 1
      ? this.handleMultipleDayTimeChange([
          getDateFromDayValue(DEFAULT_RANGE_START),
          getDateFromDayValue(DEFAULT_RANGE_END),
        ])
      : this.handleDayTimeChange(
          [getDateFromDayValue(DEFAULT_RANGE_START), getDateFromDayValue(DEFAULT_RANGE_END)],
          dayKeys
        );
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

  getAllKeys = (): DayKey[] => {
    const { numberOfDays, customDays } = this.props;
    let keys = range(numberOfDays);
    if (customDays) keys = [...keys, ...((Object.keys(customDays) as unknown) as number[])];
    return keys;
  };

  renderDay = (dayKey: DayKey): JSX.Element => {
    const { customDays, intl, readOnly } = this.props;
    const { activeDays } = this.state;
    const isRestricted = this.isDayRestricted(dayKey);
    const isActive = activeDays.includes(dayKey);
    let tooltip, Component;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      const { component: CustomComponent, tooltip: customTooltip } = customDays[dayKey];
      if (CustomComponent) Component = CustomComponent;
      if (customTooltip) tooltip = customTooltip;
    }
    if (!Component) {
      Component = Day;
    }
    return (
      <Component
        key={dayKey}
        data-attr={dayKey}
        label={this.getDayLabel(dayKey)}
        tooltip={tooltip}
        restricted={isRestricted}
        active={isActive}
        readOnly={readOnly}
        intl={intl}
        onToggle={(forceState?: boolean): false | void => !readOnly && this.toggleDay(dayKey, forceState as boolean)}
        onChange={(dayChanges: DayOptions): void => this.handleDayChange(dayKey, dayChanges)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        value={this.getDayValue(dayKey)}
      />
    );
  };

  renderRangeForm = (dayKeys: DayKey | DayKey[]): React.ReactNode => {
    const { activeDays } = this.state;
    const { hideHeader, monthlyFilterPeriod, monthlyFilter } = this.props;
    return (
      <RangeFormContainer
        activeDays={activeDays}
        dayKeys={dayKeys}
        getDayLabel={this.getDayLabel}
        getDayValue={this.getDayValue}
        onMultipleDayTimeChange={this.handleMultipleDayTimeChange}
        onDayTimeChange={this.handleDayTimeChange}
        onRangeClear={(): void => this.handleRangeClear(dayKeys as DayKey)}
        onRangeCopy={this.handleRangeCopy}
        onRangePaste={(): void => this.handleRangePaste(dayKeys as DayKey)}
        hideHeader={hideHeader}
        monthlyFilter={monthlyFilter}
        monthlyFilterPeriod={monthlyFilterPeriod}
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
      this.setState({ controlKeyPressed: false, shiftKeyPressed: true });
    }
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState({ controlKeyPressed: true, shiftKeyPressed: false });
    }
  };

  handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Control' || e.key === 'Meta') {
      this.setState({ controlKeyPressed: false });
    }
    if (e.key === 'Shift') {
      this.setState({ shiftKeyPressed: false });
    }
  };

  render(): JSX.Element {
    const { days, numberOfDays, daily, intl, ...rest } = this.props;
    const { activeDays, isRangeDefined } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const rangeFormKey = singleMode ? keys[0] : activeDays;

    const shouldRenderRangeForm = (!!activeDays.length && isRangeDefined) || !!daily;
    const shouldRenderSelectionHint = !activeDays.length;
    const shouldRenderAddButton = !!activeDays.length && !daily && !isRangeDefined;
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
            {...rest}
            title={
              <SelectionCount
                selectedDayCount={activeDays.length}
                label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECTED' })}
              />
            }
          />
        )}
        {shouldRenderRangeForm && this.renderRangeForm(rangeFormKey)}
        {shouldRenderSelectionHint && (
          <S.SelectionHint>
            <Icon component={<InfoM />} color={theme.palette['grey-600']} />{' '}
            {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECT-DAYS-DESCRIPTION' })}
          </S.SelectionHint>
        )}
        {shouldRenderAddButton && (
          <S.AddButtonWrapper>
            <AddButton
              label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.ADD-RANGE' })}
              onClick={(): void => {
                if (!daily && !this.haveActiveDaysCommonRange()) {
                  this.handleMultipleDayTimeChange([
                    getDateFromDayValue(DEFAULT_RANGE_START),
                    getDateFromDayValue(DEFAULT_RANGE_END),
                  ]);
                }
                this.setState({ isRangeDefined: true });
              }}
            />
          </S.AddButtonWrapper>
        )}
      </S.TimeWindowContainer>
    );
  }
}

const TimeWindow = TimeWindowBase;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(TimeWindow);
