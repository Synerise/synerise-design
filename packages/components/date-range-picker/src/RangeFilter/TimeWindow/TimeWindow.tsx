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
import RangeActions from './RangeActions/RangeActions';
import SelectionCount from '../SelectionCount/SelectionCount';

class TimeWindowBase extends React.PureComponent<Props, State> {
  // eslint-disable-next-line react/destructuring-assignment
  state: State = { activeDays: this.props.daily ? [0] : [], multipleSelectionMode: false };
  static defaultProps = {
    days: {},
    numberOfDays: 7,
    showSelectAll: false,
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
    const { activeDays, multipleSelectionMode } = this.state;
    let updatedActiveDay = [];
    if (multipleSelectionMode) {
      updatedActiveDay = activeDays.includes(dayKey) ? activeDays : [...activeDays, dayKey];
    } else {
      updatedActiveDay = [dayKey];
    }
    this.setState({ activeDays: updatedActiveDay });
  };

  uncheckActiveDay = (dayKey: DayKey): void => {
    const { activeDays, multipleSelectionMode } = this.state;
    let updatedActiveDay: DayKey[] = [];
    if (multipleSelectionMode) {
      updatedActiveDay = activeDays.filter(day => day !== dayKey);
    }
    this.setState({ activeDays: updatedActiveDay });
    this.unCheckDay(dayKey);
  };

  toggleDay = (dayKey: DayKey, forcedState: boolean): void => {
    const { activeDays, multipleSelectionMode } = this.state;
    if (typeof forcedState !== 'undefined') {
      forcedState ? this.checkActiveDay(dayKey) : this.uncheckActiveDay(dayKey);
      return;
    }
    if (!multipleSelectionMode) {
      activeDays.includes(dayKey) ? this.uncheckActiveDay(dayKey) : this.checkActiveDay(dayKey);
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

  handleDayTimeChange = (value: [Date, Date], dayKey: DayKey): void => {
    this.handleDayChange(dayKey, {
      restricted: true,
      start: dayjs(value[0]).format('HH:mm:ss.SSS'),
      stop: dayjs(value[1]).format('HH:mm:ss.SSS'),
    });
  };

  handleMultipleDayTimeChange = (value: [Date, Date]): void => {
    const { onChange, days } = this.props;
    const { activeDays } = this.state;
    const updatedDays = {};
    activeDays.forEach(k => {
      updatedDays[k] = {
        restricted: true,
        start: dayjs(value[0]).format('HH:mm:ss.SSS'),
        stop: dayjs(value[1]).format('HH:mm:ss.SSS'),
      };
    });
    onChange({ ...days, ...updatedDays });
  };

  handleClearSelection = (): void => {
    const { onChange } = this.props;
    this.setState({ activeDays: [] }, () => onChange({}));
  };

  handleSelectAll = (): void => {
    const days = {};
    const keys = this.getAllKeys();

    const { onChange, onSelectAll } = this.props;
    this.setState({ multipleSelectionMode: true, activeDays: keys }, () => {
      keys.forEach(key => {
        days[key] = {
          ...this.getDayValue(key),
          restricted: true,
          display: true,
        };
      });
      onSelectAll && onSelectAll();
      onChange(days);
    });
  };

  getDayValue = (dayKey: DayKey) => {
    const { days, dayTemplate, customDays, daily } = this.props;
    let dayValue = {};
    if (daily) dayValue = days;
    else if (days[dayKey]) dayValue = days[dayKey];
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

  handleRangeClear = (dayKeys: DayKey): void => {
    const { activeDays } = this.state;
    activeDays.length > 1
      ? this.handleMultipleDayTimeChange([getDateFromDayValue('00:00:00.000'), getDateFromDayValue('23:59:59.999')])
      : this.handleDayTimeChange([getDateFromDayValue('00:00:00.000'), getDateFromDayValue('23:59:59.999')], dayKeys);
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

  renderRangeForm = (dayKeys: DayKey | DayKey[]): React.ReactNode => {
    const { activeDays } = this.state;
    const dayValue = this.getDayValue(activeDays[0]);
    const rangeForm = (
      <RangeForm
        startDate={getDateFromDayValue(dayValue.start)}
        endDate={getDateFromDayValue(dayValue.stop)}
        onStartChange={(value: Date): void =>
          activeDays.length > 1
            ? this.handleMultipleDayTimeChange([value, getDateFromDayValue(dayValue.stop)])
            : this.handleDayTimeChange([value, getDateFromDayValue(dayValue.stop)], dayKeys)
        }
        onEndChange={(value: Date): void =>
          activeDays.length > 1
            ? this.handleMultipleDayTimeChange([getDateFromDayValue(dayValue.start),value])
            : this.handleDayTimeChange([getDateFromDayValue(dayValue.start), value], dayKeys)
        }
      />
    );
    const { hideHeader, monthlyFilter } = this.props;
    if (hideHeader) return rangeForm;
    return (
      <>
        <Header
          title={<RangeSummary dayKeys={dayKeys} getDayLabel={this.getDayLabel} monthlyFilter={monthlyFilter} />}
          suffix={
            <RangeActions
              onRangeClear={(): void => this.handleRangeClear(dayKeys)}
              onRangeCopy={this.handleRangeCopy}
              onRangePaste={(): void => this.handleRangePaste(dayKeys)}
              texts={{ clearRange: ' Clear range', copyRange: 'Copy range', pasteRange: 'Paste range' }}
            />
          }
        />
        {rangeForm}
      </>
    );
  };

  render(): JSX.Element {
    const { style, days, daily, intl, ...rest } = this.props;
    const { activeDays, multipleSelectionMode } = this.state;
    const keys = this.getAllKeys();
    const singleMode = keys.length === 1;
    const rangeFormKey = singleMode ? keys[0] : activeDays;
    return (
      <S.TimeWindowContainer
        style={style}
        onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>): void => {
          if (e.key === 'Shift') {
            this.setState({ multipleSelectionMode: true });
          }
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>): void => {
          if (e.key === 'Shift') {
            this.setState({ multipleSelectionMode: false });
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
            title={
              <SelectionCount
                selectedDayCount={activeDays.length}
                label="Selected"
                tooltipLabel="Use shift to switch to multiple mode"
              />
            }
          />
        )}
        {(!!activeDays.length || !!daily) && this.renderRangeForm(rangeFormKey)}
      </S.TimeWindowContainer>
    );
  }
}

const TimeWindow = TimeWindowBase;
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(TimeWindow);
