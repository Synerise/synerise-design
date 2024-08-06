import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { range } from 'lodash';
import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';

import Icon, { ClockM, Close3S } from '@synerise/ds-icon';

import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { useDataFormat } from '@synerise/ds-data-format';
import {
  currentTimeInTimezone,
  toIsoString,
  getTimeZone,
  getLocalDateInTimeZone,
} from '@synerise/ds-data-format/dist/utils/timeZone.utils';

import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';
import { ClockModes, TimePickerProps } from './types/TimePicker.types';
import { handleTimeChange } from './utils/timePicker.utils';
import { getClockModeFromDate, getOppositeClockMode } from './utils/clockMode.utils';
import {
  AM,
  CLOCK_MODES,
  HOUR,
  HOUR_12,
  MINUTE,
  PM,
  SECOND,
  DISABLE_CLOCK_MODE_HOUR,
} from './constants/timePicker.constants';

dayjs.extend(customParseFormatPlugin);

const defaultUnits = [HOUR, MINUTE, SECOND] as dayjs.UnitType[];

const TimePicker = <ValueType extends Date | string = Date>({
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
  errorText,
  includeTimezoneOffset,
}: TimePickerProps<ValueType>) => {
  const { formatValue, is12HoursClock: is12HoursClockFromDataFormat } = useDataFormat();
  const [open, setOpen] = useState(defaultOpen || false);

  const intl = useIntl();
  const { formatMessage } = intl;

  const valueAsDate = useMemo(() => {
    if (value instanceof Date || value === undefined) {
      return value;
    }
    const timeZone = getTimeZone(includeTimezoneOffset, intl);
    return timeZone ? getLocalDateInTimeZone(value, timeZone) : new Date(value);
  }, [value, includeTimezoneOffset, intl]);

  const now = useMemo(() => {
    const timeZone = getTimeZone(includeTimezoneOffset, intl);
    return timeZone ? currentTimeInTimezone(timeZone) : new Date();
  }, [includeTimezoneOffset, intl]);

  const is12HourClock: boolean = useMemo(() => {
    if (use12HourClock === undefined) return is12HoursClockFromDataFormat;
    return use12HourClock;
  }, [is12HoursClockFromDataFormat, use12HourClock]);

  const timeFormatByClockMode = useMemo(
    () => timeFormat ?? (is12HourClock ? 'hh:mm:ss A' : 'HH:mm:ss'),
    [timeFormat, is12HourClock]
  );

  const getTimeString = useCallback(
    (date: Date): string => {
      if (timeFormat) {
        return dayjs(date).format(timeFormatByClockMode);
      }
      const timeZone = getTimeZone(includeTimezoneOffset, intl);
      const localisedDate = timeZone || intl.timeZone ? new Date(toIsoString(date, intl.timeZone)) : date;
      return formatValue(localisedDate, { targetFormat: 'time', second: 'numeric', ...valueFormatOptions });
    },
    [timeFormat, includeTimezoneOffset, intl, formatValue, valueFormatOptions, timeFormatByClockMode]
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

  const availableUnits = units?.length ? units : defaultUnits;
  const unitsToRender = unitConfig.filter(u => availableUnits && availableUnits.includes(u.unit));

  const getDateToEmit = (date: Date): ValueType => {
    const timeZone = getTimeZone(includeTimezoneOffset, intl);
    const dateToEmit = (timeZone && date ? toIsoString(date, timeZone) : date) as ValueType;
    return dateToEmit;
  };

  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible && onChange && valueAsDate && onChange(getDateToEmit(valueAsDate), getTimeString(valueAsDate));
  };

  const handleChange = (unit: dayjs.UnitType | undefined, newValue: number | undefined, clockModeChanged = false) => {
    let clockMode = getClockModeFromDate(valueAsDate || now);
    if (clockModeChanged) {
      clockMode = getOppositeClockMode(clockMode);
    }
    const newDate = handleTimeChange(
      valueAsDate,
      unit,
      newValue,
      clockModeChanged,
      is12HourClock,
      clockMode,
      unitConfig
    );
    onChange && onChange(getDateToEmit(newDate), getTimeString(newDate));
  };

  const toggleClockModeChange = (): void => {
    handleChange(undefined, undefined, true);
  };

  const isAmOrPmModeDisabled = useCallback(
    (mode: ClockModes): boolean => {
      const clockMode = getClockModeFromDate(valueAsDate || now);
      if (!is12HourClock) {
        return false;
      }
      if (mode === AM && clockMode === AM) {
        return false;
      }
      if (mode === PM && clockMode === PM) {
        return false;
      }
      if (mode === AM && (disabledHours?.includes(HOUR_12) || disabledHours?.includes(DISABLE_CLOCK_MODE_HOUR))) {
        return true;
      }
      if (mode === PM && disabledHours?.includes(DISABLE_CLOCK_MODE_HOUR)) {
        return true;
      }
      return false;
    },
    [valueAsDate, now, is12HourClock, disabledHours]
  );

  const renderClockSwitch = () => {
    const currentClockMode = getClockModeFromDate(valueAsDate || now);
    return (
      <S.Unit>
        {Object.values(CLOCK_MODES).map(mode => (
          <S.Cell
            key={mode}
            active={currentClockMode === mode}
            onClick={(): void => {
              if (currentClockMode !== mode) {
                toggleClockModeChange();
                onClockModeChange && onClockModeChange(mode);
              }
            }}
            disabled={isAmOrPmModeDisabled(mode)}
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
        <Fragment key={u.unit}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Unit
            {...u}
            value={valueAsDate}
            onSelect={(newValue): void => handleChange(u.unit, newValue)}
            use12HourClock={is12HourClock}
          />
          {(index !== unitsToRender.length - 1 || is12HourClock) && <S.UnitSeperator />}
        </Fragment>
      ))}

      {is12HourClock && renderClockSwitch()}
    </S.OverlayContainer>
  );

  const dateString = valueAsDate && getTimeString(valueAsDate);

  const clear = useCallback(() => {
    setOpen(false);
    onChange && onChange(undefined, '');
  }, [setOpen, onChange]);

  const timePickerIcon = useMemo(() => {
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

  const placeholderValue = useMemo((): string => {
    if (valueAsDate) {
      return getTimeString(valueAsDate);
    }
    return placeholder || formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [valueAsDate, placeholder, formatMessage, getTimeString]);

  if (raw) {
    return overlay;
  }
  return (
    <S.Container className={`ds-time-picker ${className || ''}`} data-testid="tp-container" style={containerStyle}>
      <S.Dropdown
        trigger={trigger}
        visible={alwaysOpen || open}
        onVisibleChange={onVisibleChange}
        placement={placement}
        overlay={overlay}
        disabled={disabled}
        {...dropdownProps}
      >
        <S.TimePickerInput
          errorText={!open && errorText}
          disabled={disabled}
          className={`${alwaysOpen || open ? 'active' : ''}`}
          data-testid="tp-input"
          value={dateString}
          placeholder={placeholderValue}
          readOnly
          icon1={timePickerIcon}
          {...inputProps}
        />
      </S.Dropdown>
    </S.Container>
  );
};

TimePicker.defaultProps = {
  placement: 'bottomLeft',
  trigger: ['click'],
  units: defaultUnits,
};

export default TimePicker;
