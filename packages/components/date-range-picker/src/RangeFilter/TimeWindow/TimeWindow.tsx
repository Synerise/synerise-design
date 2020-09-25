import * as React from 'react';
import { range } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import dayjs from 'dayjs';
import { Header } from './Header/Header';
import Day from './Day/Day';
import { DayKey, Props, State, DayOptions } from './TimeWindow.types';
import * as S from './TimeWindow.styles';
import RangeForm from '../DailyFilter/RangeForm/RangeForm';
import RangeSummary from './RangeSummary/RangeSummary';
import { getDateFromDayValue } from './utils';
import Grid from './Grid/Grid';

class TimeWindowBase extends React.PureComponent<Props, State> {
  state: State = { activeDay: [], multipleMode: false };
  static defaultProps = {
    days: {},
    numberOfDays: 7,
    showSelectAll: false,
    showUnselectAll: true,
    dayTemplate: (index: number) => ({ dayOfWeek: index + 1 }),
    dayFormatter: (dayKey: DayKey) => <FormattedMessage id={`DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`} />,
    timeMarks: { '0': '00:00', '12': <FormattedMessage id="DS.DATE-RANGE-PICKER.SET-HOURS" />, '24': '24:00' },
  };

  isDayRestricted = (dayKey: DayKey): boolean => {
    const { days } = this.props;
    return !!days[dayKey] && days[dayKey].restricted;
  };

  checkActiveDay = (dayKey: DayKey): void => {
    if (!this.isDayRestricted(dayKey)) this.checkDay(dayKey);
    const { activeDay, multipleMode } = this.state;
    let updatedActiveDay = [];
    if (multipleMode) {
      updatedActiveDay = activeDay.includes(dayKey) ? activeDay : [...activeDay, dayKey];
    } else {
      updatedActiveDay = [dayKey];
    }
    this.setState({ activeDay: updatedActiveDay });
  };

  uncheckActiveDay = (dayKey: DayKey): void => {
    const { activeDay, multipleMode } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (multipleMode) {
      updatedActiveDay = activeDay.filter(day => day !== dayKey);
    }
    this.setState({ activeDay: updatedActiveDay });
    this.unCheckDay(dayKey);
  };

  toggleDay = (dayKey: DayKey, forcedState: boolean): void => {
    const { activeDay, multipleMode } = this.state;
    if (typeof forcedState !== 'undefined') {
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
      return;
    }
    if (!multipleMode) {
      activeDay.includes(dayKey) ? this.uncheckActiveDay(dayKey) : this.checkActiveDay(dayKey);
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

  handleDayTimeChange = (value: [Date, Date], dayKey: DayKey): void =>
    this.handleDayChange(dayKey, {
      restricted: true,
      start: dayjs(value[0]).format('HH:mm:ss.SSS'),
      stop: dayjs(value[1]).format('HH:mm:ss.SSS'),
    });

  handleMultipleDayTimeChange = (value: [Date, Date]): void => {
    const { onChange, days } = this.props;
    const { activeDay } = this.state;
    const updatedDays = {};
    activeDay.forEach(k => {
      updatedDays[k] = {
        restricted: true,
        start: dayjs(value[0]).format('HH:mm:ss.SSS'),
        stop: dayjs(value[1]).format('HH:mm:ss.SSS'),
      };
    });
    onChange({ ...days, ...updatedDays });
  };

  handleClearSelection = (): void => {
    const { onUnselectAll, onChange } = this.props;
    onUnselectAll && onUnselectAll();
    this.setState({ activeDay: [] }, () => onChange({}));
  };

  handleSelectAll = (): void => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDayLabel = (dayKey: DayKey, long?: boolean): any => {
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

  renderDay = (dayKey: DayKey): JSX.Element => {
    const { customDays, intl, readOnly } = this.props;
    const { activeDay } = this.state;
    const isRestricted = this.isDayRestricted(dayKey);
    const isActive = activeDay.includes(dayKey);
    let tooltip, Component;
    if (typeof dayKey === 'string' && customDays && customDays[dayKey]) {
      const { component: CustomComponent, tooltip: customTooltip } = customDays[dayKey];
      if (CustomComponent) Component = CustomComponent;
      if (customTooltip) tooltip = customTooltip;
    }
    if (!tooltip && !isActive) {
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

  renderRangeForm = (dayKeys: DayKey, singleMode: boolean): React.ReactNode => {
    const { activeDay } = this.state;
    const dayValue = this.getDayValue(activeDay[0]);
    const rangeForm = (
      <RangeForm
        startDate={getDateFromDayValue(dayValue.start)}
        endDate={getDateFromDayValue(dayValue.stop)}
        onStartChange={(value: Date): void =>
          activeDay.length > 1
            ? this.handleMultipleDayTimeChange([value, getDateFromDayValue(dayValue.stop)])
            : this.handleDayTimeChange([value, getDateFromDayValue(dayValue.stop)], dayKeys)
        }
        onEndChange={(value: Date): void =>
          activeDay.length > 1
            ? this.handleMultipleDayTimeChange([value, getDateFromDayValue(dayValue.stop)])
            : this.handleDayTimeChange([getDateFromDayValue(dayValue.start), value], dayKeys)
        }
      />
    );
    const { hideHeader } = this.props;
    if (hideHeader) return rangeForm;
    return (
      <>
        <Header
          title={<RangeSummary dayKeys={dayKeys} getDayLabel={this.getDayLabel} />}
          style={{ marginBottom: 16, marginTop: singleMode ? 0 : 44 }}
        />
        {rangeForm}
      </>
    );
  };

  render(): JSX.Element {
    const { style, days, intl, ...rest } = this.props;
    const { activeDay, multipleMode } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const rangeFormKey = singleMode ? keys[0] : activeDay;
    return (
      <S.TimeWindowContainer
        style={style}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
          if (e.key === 'Shift') {
            this.setState({ multipleMode: !multipleMode });
          }
        }}
      >
        {!singleMode && (
          <Grid
            onClearSelected={this.handleClearSelection}
            onSelectAll={this.handleSelectAll}
            renderDay={this.renderDay}
            keys={keys}
            days={days}
            intl={intl}
            {...rest}
          />
        )}
        {rangeFormKey !== null && this.renderRangeForm(rangeFormKey, singleMode)}
      </S.TimeWindowContainer>
    );
  }
}

const TimeWindow = TimeWindowBase;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(TimeWindow);
