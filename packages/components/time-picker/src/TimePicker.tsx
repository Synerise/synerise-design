import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat';
import { range } from 'lodash';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDataFormat } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { ClockM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './TimePicker.styles';
import Unit, { type UnitConfig } from './Unit';
import {
  AM,
  CLOCK_MODES,
  DISABLE_CLOCK_MODE_HOUR,
  HOUR,
  HOUR_12,
  MINUTE,
  PM,
  SECOND,
} from './constants/timePicker.constants';
import {
  type ClockModes,
  type TimePickerProps,
} from './types/TimePicker.types';
import {
  getClockModeFromDate,
  getOppositeClockMode,
} from './utils/clockMode.utils';
import { handleTimeChange } from './utils/timePicker.utils';

dayjs.extend(customParseFormatPlugin);

const defaultUnits = [HOUR, MINUTE, SECOND] as dayjs.UnitType[];

const TimePicker = ({
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
  clearTooltip = (
    <FormattedMessage
      id="DS.TIME-PICKER.CLEAR-TOOLTIP"
      defaultMessage="Clear"
    />
  ),
  raw,
  onClockModeChange,
  errorText,
}: TimePickerProps) => {
  const { formatValue, is12HoursClock: is12HoursClockFromDataFormat } =
    useDataFormat();
  const [open, setOpen] = useState<boolean>(defaultOpen || false);

  const { formatMessage } = useIntl();

  const is12HourClock: boolean = useMemo(() => {
    if (use12HourClock === undefined) {
      return is12HoursClockFromDataFormat;
    }
    return use12HourClock;
  }, [is12HoursClockFromDataFormat, use12HourClock]);

  const timeFormatByClockMode = useMemo(
    () => timeFormat ?? (is12HourClock ? 'hh:mm:ss A' : 'HH:mm:ss'),
    [timeFormat, is12HourClock],
  );

  const getTimeString = useCallback(
    (date: Date): string => {
      if (timeFormat) {
        return dayjs(date).format(timeFormatByClockMode);
      }

      return formatValue(date, {
        targetFormat: 'time',
        second: 'numeric',
        ...valueFormatOptions,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timeFormat, timeFormatByClockMode, formatValue],
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
  const unitsToRender = unitConfig.filter(
    (u) => availableUnits && availableUnits.includes(u.unit),
  );

  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible &&
      onChange &&
      onChange(value as Date, getTimeString(value as Date));
  };

  const handleChange = (
    unit: dayjs.UnitType | undefined,
    newValue: number | undefined,
    clockModeChanged = false,
  ): void => {
    let clockMode = getClockModeFromDate(value);
    if (clockModeChanged) {
      clockMode = getOppositeClockMode(clockMode);
    }
    const newDate = handleTimeChange(
      value,
      unit,
      newValue,
      clockModeChanged,
      is12HourClock,
      clockMode,
      unitConfig,
    );
    onChange && onChange(newDate, getTimeString(newDate));
  };

  const toggleClockModeChange = (): void => {
    handleChange(undefined, undefined, true);
  };

  const isAmOrPmModeDisabled = useCallback(
    (mode: ClockModes): boolean => {
      const clockMode = getClockModeFromDate(value);
      if (!is12HourClock) {
        return false;
      }
      if (mode === AM && clockMode === AM) {
        return false;
      }
      if (mode === PM && clockMode === PM) {
        return false;
      }
      if (
        mode === AM &&
        (disabledHours?.includes(HOUR_12) ||
          disabledHours?.includes(DISABLE_CLOCK_MODE_HOUR))
      ) {
        return true;
      }
      if (mode === PM && disabledHours?.includes(DISABLE_CLOCK_MODE_HOUR)) {
        return true;
      }
      return false;
    },
    [value, disabledHours, is12HourClock],
  );

  const renderClockSwitch = () => {
    const currentClockMode = getClockModeFromDate(value);
    return (
      <S.Unit>
        {Object.values(CLOCK_MODES).map((mode) => (
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
    <S.OverlayContainer
      data-testid="tp-overlay-container"
      className={overlayClassName}
    >
      {unitsToRender.map((u, index) => (
        <Fragment key={u.unit}>
          {}
          <Unit
            {...u}
            value={value}
            onSelect={(newValue): void => handleChange(u.unit, newValue)}
            use12HourClock={is12HourClock}
          />
          {(index !== unitsToRender.length - 1 || is12HourClock) && (
            <S.UnitSeperator />
          )}
        </Fragment>
      ))}

      {is12HourClock && renderClockSwitch()}
    </S.OverlayContainer>
  );

  const localValue = value;
  const dateString = localValue && getTimeString(localValue);

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
      <Icon
        component={<ClockM />}
        size={24}
        onClick={disabled ? undefined : (): void => setOpen(true)}
      />
    );
  }, [open, dateString, clear, clearTooltip, alwaysOpen, disabled]);

  const placeholderValue = useMemo((): string => {
    if (value) {
      return getTimeString(value);
    }
    return placeholder || formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [placeholder, formatMessage, value, getTimeString]);

  if (raw) {
    return overlay;
  }
  return (
    <S.Container
      className={`ds-time-picker ${className || ''}`}
      data-testid="tp-container"
      style={containerStyle}
    >
      <Dropdown
        trigger={trigger}
        open={alwaysOpen || open}
        onOpenChange={onVisibleChange}
        placement={placement}
        overlay={overlay}
        disabled={disabled}
        asChild
        size="match-trigger"
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
      </Dropdown>
    </S.Container>
  );
};

TimePicker.defaultProps = {
  placement: 'bottomLeft',
  trigger: ['click'],
  units: defaultUnits,
};

export default TimePicker;
