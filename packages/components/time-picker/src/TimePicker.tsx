import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { range } from 'lodash';
import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';

import Icon, { ClockM, Close3S } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { useDataFormat } from '@synerise/ds-data-format';

import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './types/TimePicker.types';
import { handleTimeChange } from './utils/timePicker.utils';
import { AM, CLOCK_MODES, HOUR, HOUR_12, MINUTE, PM, SECOND } from './constants/timePicker.constants';

dayjs.extend(customParseFormatPlugin);

const defaultUnits = [HOUR, MINUTE, SECOND] as dayjs.UnitType[];

const TimePicker: React.FC<TimePickerProps> = ({
  placement,
  placeholder,
  trigger,
  value,
  units,
  defaultOpen,
  onChange,
  containerStyle = {},
  timeFormat,
  valueFormatOptions,
  use12HourClock,
  alwaysOpen,
  dropdownProps = {},
  inputProps = {},
  disabled,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  overlayClassName,
  className,
  clearTooltip = <FormattedMessage id="DS.TIME-PICKER.CLEAR-TOOLTIP" defaultMessage="Clear" />,
  raw,
  onClockModeChange,
  intl,
}) => {
  const { formatValue, is12HoursClock: is12HoursClockFromDataFormat } = useDataFormat();
  const [open, setOpen] = React.useState<boolean>(defaultOpen || false);

  const [clockMode, setClockMode] = React.useState<string>(() => {
    const initialDate = dayjs(value);
    const initialHour = initialDate.get(HOUR);
    return initialHour >= HOUR_12 ? PM : AM;
  });

  const is12HourClock: boolean = React.useMemo(() => {
    if (use12HourClock === undefined) return is12HoursClockFromDataFormat;
    return use12HourClock;
  }, [is12HoursClockFromDataFormat, use12HourClock]);

  const timeFormatByClockMode = React.useMemo(
    () => timeFormat ?? (is12HourClock ? 'hh:mm:ss A' : 'HH:mm:ss'),
    [timeFormat, is12HourClock]
  );

  const getTimeString = React.useCallback(
    (date: Date): string => {
      if (timeFormat) {
        return dayjs(date).format(timeFormatByClockMode);
      }

      return formatValue(date, { targetFormat: 'time', second: 'numeric', ...valueFormatOptions });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeFormat, timeFormatByClockMode, formatValue]
  );

  const unitConfig: UnitConfig[] = [
    {
      unit: HOUR,
      options: is12HourClock ? range(1, 13) : range(24),
      disabled: disabledHours,
      insertSeperator: true,
    },
    {
      unit: MINUTE,
      options: range(60),
      disabled: disabledMinutes,
      insertSeperator: true,
    },
    {
      unit: SECOND,
      options: range(60),
      disabled: disabledSeconds,
      insertSeperator: is12HourClock,
    },
  ];

  const unitsToRender = React.useMemo(() => {
    const availableUnits = units?.length ? units : defaultUnits;
    return unitConfig.filter(u => availableUnits && availableUnits.includes(u.unit));
  }, [units, unitConfig]);

  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible && onChange && onChange(value as Date, getTimeString(value as Date));
  };

  const handleChange = (
    unit: dayjs.UnitType | undefined,
    newValue: number | undefined,
    clockModeChanged = false
  ): void => {
    const newDate = handleTimeChange(value, unit, newValue, clockModeChanged, is12HourClock, clockMode, unitConfig);
    onChange && onChange(newDate, getTimeString(newDate));
  };

  React.useEffect(() => {
    handleChange(undefined, undefined, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clockMode]);

  const renderClockSwitch = (): React.ReactNode => {
    return (
      <S.Unit>
        {Object.values(CLOCK_MODES).map(mode => (
          <S.Cell
            key={mode}
            active={clockMode === mode}
            onClick={(): void => {
              setClockMode(mode);
              onClockModeChange && onClockModeChange(mode);
            }}
          >
            <S.CellText>{mode}</S.CellText>
          </S.Cell>
        ))}
      </S.Unit>
    );
  };

  const overlay = (
    <S.OverlayContainer data-testid="tp-overlay-container" className={overlayClassName}>
      {unitsToRender.map((u, index) => (
        <React.Fragment key={u.unit}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Unit
            {...u}
            value={value}
            onSelect={(newValue): void => handleChange(u.unit, newValue)}
            use12HourClock={is12HourClock}
          />
          {(index !== unitsToRender.length - 1 || is12HourClock) && <S.UnitSeperator />}
        </React.Fragment>
      ))}
      {is12HourClock && renderClockSwitch()}
    </S.OverlayContainer>
  );

  const localValue = value;
  const dateString = localValue && getTimeString(localValue);

  const clear = React.useCallback(() => {
    setOpen(false);
    onChange && onChange(undefined, '');
  }, [setOpen, onChange]);

  const timePickerIcon = React.useMemo(() => {
    return (alwaysOpen || open) && dateString ? (
      <S.ClearIcon
        component={
          <Tooltip title={clearTooltip}>
            <Close3S />
          </Tooltip>
        }
        onClick={clear}
      />
    ) : (
      <Icon component={<ClockM />} size={24} onClick={disabled ? undefined : (): void => setOpen(true)} />
    );
  }, [open, dateString, clear, clearTooltip, alwaysOpen, disabled]);

  const placeholderValue = React.useMemo((): string => {
    if (value) {
      return dayjs(value).format(timeFormatByClockMode);
    }
    return placeholder || intl.formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [placeholder, intl, value, timeFormatByClockMode]);

  if (raw) {
    return overlay;
  }
  return (
    <S.Container className={`ds-time-picker ${className || ''}`} data-testid="tp-container" style={containerStyle}>
      <Dropdown
        trigger={trigger}
        visible={alwaysOpen || open}
        onVisibleChange={onVisibleChange}
        placement={placement}
        overlay={overlay}
        disabled={disabled}
        {...dropdownProps}
      >
        <S.TimePickerInput
          disabled={disabled}
          className={`${alwaysOpen || open ? 'active' : ''}`}
          data-testid="tp-input"
          value={dateString}
          placeholder={placeholderValue}
          readOnly
          icon1={timePickerIcon}
          {...inputProps}
        />
      </Dropdown>
    </S.Container>
  );
};

TimePicker.defaultProps = {
  placement: 'bottomLeft',
  trigger: ['click'],
  units: defaultUnits,
};

export default injectIntl(TimePicker);
