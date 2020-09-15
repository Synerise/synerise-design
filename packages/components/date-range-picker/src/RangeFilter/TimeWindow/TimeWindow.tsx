import * as React from 'react';
import { range, rangeRight, groupBy, reverse, flatten, values, ceil } from 'lodash';

import { FormattedMessage, injectIntl } from 'react-intl';
import Slider from '@synerise/ds-slider';
import { SliderMarks, SliderValue } from 'antd/es/slider';
import { Header, Action } from './Header/Header';
import Day from './Day/Day';
import { formatTime } from '../../utils';
import { DayKey, Props, State, DayOptions } from './TimeWindow.types';
import * as S from './TimeWindow.styles';

class TimeWindowBase extends React.Component<Props, State> {
  state: State = { activeDay: null };

  static defaultProps = {
    days: {},
    numberOfDays: 7,
    showSelectAll: false,
    showUnselectAll: true,
    dayTemplate: (index: number) => ({ dayOfWeek: index + 1 }),
    dayFormatter: (dayKey: DayKey) => <FormattedMessage id={`DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`} />,
    timeMarks: { '0': '00:00', '12': <FormattedMessage id="DS.DATE-RANGE-PICKER.SET-HOURS" />, '24': '24:00' },
  };

  componentDidMount(): void {
    const { numberOfDays } = this.props;
    const activeDay = range(0, numberOfDays).find(day => this.isDayRestricted(day));
    activeDay && this.checkActiveDay(activeDay);
  }

  isDayRestricted = (dayKey: DayKey) => {
    const { days } = this.props;
    return !!days[dayKey] && days[dayKey].restricted;
  };

  checkActiveDay = (dayKey: DayKey): void => {
    if (!this.isDayRestricted(dayKey)) this.checkDay(dayKey);
    this.setState({ activeDay: dayKey });
  };

  uncheckActiveDay = (dayKey: DayKey): void => {
    this.setState({ activeDay: null });
    this.unCheckDay(dayKey);
  };

  toggleDay = (dayKey: DayKey, forcedState: boolean): void => {
    const { activeDay } = this.state;
    if (typeof forcedState !== 'undefined') {
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
      return;
    }
    if (activeDay === dayKey) {
      this.uncheckActiveDay(dayKey);
    } else {
      this.checkActiveDay(dayKey);
    }
  };

  handleDayChange = (dayKey: DayKey, dayChanges: Partial<DayOptions>): void => {
    const { onChange, days } = this.props;
    onChange({
      ...days,
      [dayKey]: {
        ...this.getDayValue(dayKey),
        ...dayChanges,
      },
    });
  };

  checkDay = (dayKey: DayKey): void => {
    const { onCheckDay } = this.props;

    this.handleDayChange(dayKey, {
      start: '00:00:00.000',
      stop: '23:59:59.999',
      restricted: true,
      display: true,
    });

    onCheckDay && onCheckDay(dayKey);
  };

  unCheckDay = (dayKey: DayKey): void => {
    const { onUncheckDay } = this.props;
    this.handleDayChange(dayKey, {
      start: '00:00:00.000',
      stop: '23:59:59.999',
      restricted: false,
      display: false,
    });

    onUncheckDay && onUncheckDay(dayKey);
  };

  handleDayTimeChange = (value: SliderValue, dayKey: DayKey): void =>
    this.handleDayChange(dayKey, {
      restricted: true,
      start: this.parseValueToTime(value[0], 'HH:mm:ss.SSS'),
      stop: this.parseValueToTime(value[1], 'HH:mm:ss.SSS'),
    });

  clearSelected = (): void => {
    const { onUnselectAll, onChange } = this.props;
    onUnselectAll && onUnselectAll();

    this.setState({ activeDay: null }, () => onChange({}));
  };

  selectAll = (): void => {
    const days = {};
    const { onChange, onSelectAll } = this.props;
    this.getAllKeys().forEach(key => {
      days[key] = {
        ...this.getDayValue(key),
        restricted: true,
        display: true,
      };
    });

    onSelectAll && onSelectAll();

    onChange(days);
  };

  getDayValue = (dayKey: DayKey) => {
    const { days, dayTemplate, customDays } = this.props;
    let dayValue = {};

    if (days[dayKey]) dayValue = days[dayKey];
    else if (typeof dayKey === 'number') dayValue = dayTemplate(dayKey);
    else if (customDays && customDays[dayKey] && customDays[dayKey].template) {
      dayValue = customDays[dayKey].template!;
    }

    return {
      start: '00:00:00.000',
      stop: '23:59:59.999',
      restricted: false,
      display: false,
      inverted: false,
      ...dayValue,
    };
  };

  getDayLabel = (dayKey: DayKey, long?: boolean) => {
    const { dayFormatter, customDays } = this.props;
    let label: any;

    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      label = customDays[dayKey][long ? 'longLabel' : 'label'] || customDays[dayKey].label;
    }
    if (typeof label === 'function') {
      label = label(dayKey, this.getDayValue(dayKey));
    }
    if (!label) label = dayFormatter(dayKey, long);

    return label;
  };

  getAllKeys = (): number[] => {
    const { numberOfDays, customDays } = this.props;
    let keys = range(numberOfDays);

    if (customDays) keys = [...keys, ...((Object.keys(customDays) as unknown) as number[])];

    return keys;
  };

  parseTimeToFloat = (value: string) => {
    const date = new Date(`1970-01-01T${value}`);
    return date.getHours() + ceil(date.getMinutes() / 60, 2);
  };

  parseValueToTime = (value: number, format?: string): string =>
    formatTime(value === 24 ? 24 * 60 * 60 - 0.001 : value * 3600, format);

  tooltipFormatter = (value: number | number[], index?: number): React.ReactNode => {
    const format = 'HH:mm';
    if (typeof value !== 'number' && value.length && index) {
      const CONCAT_VALUES = 1.75;
      const isClose = value[1] - value[0] <= CONCAT_VALUES;
      const isSameValue = value[0] === value[1];
      if (isClose) {
        return index === 0 ? (
          <span style={{ width: isSameValue ? 'auto' : '145px', textAlign: 'center', display: 'inline-block' }}>
            {this.parseValueToTime(value[0], format)}
            {!isSameValue && ` - ${this.parseValueToTime(value[1], format)}`}
          </span>
        ) : (
          ''
        );
      }
      return this.parseValueToTime(value[index], format);
    }
    return this.parseValueToTime(value as number, format);
  };

  renderDay = (dayKey: DayKey): JSX.Element => {
    const { customDays, intl, readOnly } = this.props;
    const { activeDay } = this.state;
    const isRestricted = this.isDayRestricted(dayKey);
    const isActive = activeDay === dayKey;
    let tooltip, Component;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      const { component: CustomComponent, tooltip: customTooltip } = customDays[dayKey];
      if (CustomComponent) Component = CustomComponent;
      if (customTooltip) tooltip = customTooltip;
    }
    if (!tooltip && activeDay !== dayKey) {
      tooltip = intl.formatMessage({
        id: isRestricted ? 'DS.DATE-RANGE-PICKER.CLICK-TO-SET-TIME' : 'DS.DATE-RANGE-PICKER.CLICK-TO-SELECT',
      });
    }
    if (!Component) {
      Component = Day;
    }
    return (
      <Component
        key={dayKey}
        data-attr={dayKey}
        value={this.getDayValue(dayKey)}
        label={this.getDayLabel(dayKey)}
        tooltip={tooltip}
        restricted={isRestricted}
        active={isActive}
        readOnly={readOnly}
        intl={intl}
        onToggle={(forceState: boolean): false | void => !readOnly && this.toggleDay(dayKey, forceState)}
        onChange={(dayChanges: DayOptions): void => this.handleDayChange(dayKey, dayChanges)}
      />
    );
  };

  reverseRange = (inputRange: number[], groupItem: number): number[] => {
    const grouping = (item: number): number => Math.floor(item / groupItem);
    return flatten(reverse(values(groupBy(inputRange, grouping))));
  };

  renderGrid = (keys: number[]): React.ReactNode => {
    const {
      numberOfDays,
      numberOfDaysPerRow,
      rowLabelFormatter,
      title,
      showUnselectAll,
      showSelectAll,
      inverted,
      labelInverted,
      reverseGroup,
    } = this.props;
    const numberOfColumns = numberOfDaysPerRow || numberOfDays;
    const rangeMethod = labelInverted ? rangeRight : range;
    const actions: Action[] = [];

    if (showUnselectAll)
      actions.push({
        key: 'unselect-all',
        onClick: this.clearSelected,
        label: <FormattedMessage id="DS.DATE-RANGE-PICKER.UNSELECT-ALL" />,
      });
    if (showSelectAll)
      actions.push({
        key: 'select-all',
        onClick: this.selectAll,
        label: <FormattedMessage id="DS.DATE-RANGE-PICKER.SELECT-ALL" />,
      });
    let grid = (
      <S.Days columns={numberOfColumns}>
        {inverted ? this.reverseRange(keys, reverseGroup).map(this.renderDay) : keys.map(this.renderDay)}
      </S.Days>
    );
    const numberOfRows = Math.ceil(numberOfDays / numberOfColumns);

    if (rowLabelFormatter) {
      grid = (
        <S.Wrapper>
          <S.Labels>
            {rangeMethod(numberOfRows).map(
              (rowIndex: number): React.ReactNode => (
                <span key={rowIndex}>{rowLabelFormatter(rowIndex)}</span>
              )
            )}
          </S.Labels>
          {grid}
        </S.Wrapper>
      );
    }
    return (
      <>
        <Header title={title} actions={actions} style={{ marginBottom: 16 }} />
        {grid}
      </>
    );
  };

  renderSlider = (dayKey: DayKey, singleMode: boolean): React.ReactNode => {
    const { customForm } = this.props;
    if (customForm) {
      return customForm(dayKey, singleMode);
    }

    const { invertibleTime, timeMarks } = this.props;
    const dayValue = this.getDayValue(dayKey);
    const slider = (
      <Slider
        dots={false}
        style={{ marginTop: !invertibleTime ? 64 : undefined }}
        inverted={invertibleTime ? dayValue.inverted : undefined}
        tipFormatter={this.tooltipFormatter}
        range
        value={[this.parseTimeToFloat(dayValue.start), this.parseTimeToFloat(dayValue.stop)]}
        min={0}
        max={24}
        step={0.25}
        marks={timeMarks as SliderMarks}
        onChange={(value: SliderValue): void => this.handleDayTimeChange(value, dayKey)}
        tooltipVisible
        // onInvert={invertibleTime ? (): void => this.handleDayChange(dayKey, { inverted: !dayValue.inverted }) : undefined}
      />
    );
    if (!invertibleTime) return slider;
    const actions = [
      {
        key: 'invert',
        onClick: () => this.handleDayChange(dayKey, { inverted: !dayValue.inverted }),
        label: <FormattedMessage id="DS.DATE-RANGE-PICKER.INVERSE-SELECTION" />,
      },
    ];
    return (
      <>
        <Header
          title={this.getDayLabel(dayKey, true)}
          actions={actions}
          style={{ marginBottom: 16, marginTop: singleMode ? 0 : 44 }}
        />
        {slider}
      </>
    );
  };

  render(): JSX.Element {
    const { style } = this.props;
    const { activeDay } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const sliderKey = singleMode ? keys[0] : activeDay;
    return (
      <S.TimeWindowContainer style={style}>
        {!singleMode && this.renderGrid(keys)}
        {sliderKey !== null && this.renderSlider(sliderKey, singleMode)}
      </S.TimeWindowContainer>
    );
  }
}

const TimeWindow = TimeWindowBase;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(TimeWindow);
