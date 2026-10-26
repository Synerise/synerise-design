import dayjs from 'dayjs';
import customParseFormatPlugin from 'dayjs/plugin/customParseFormat.js';
import range from 'lodash.range';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  applyTimezoneOffset,
  currentTimeInTimezone,
  getLocalDateInTimeZone,
  getTimeZone,
  toIsoString,
  useDataFormat,
} from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { ClockM, Close3S } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

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
import * as S from './TimePicker.styles';
import type { ClockModes, TimePickerProps } from './types/TimePicker.types';
import Unit, { type UnitConfig } from './Unit';
import {
  getClockModeFromDate,
  getOppositeClockMode,
} from './utils/clockMode.utils';
import { handleTimeChange } from './utils/timePicker.utils';

dayjs.extend(customParseFormatPlugin);

const defaultUnits = [HOUR, MINUTE, SECOND] as dayjs.UnitType[];

const TimePicker = ({
  placement = 'bottomLeft',
  placeholder,
  trigger = ['click'],
  value,
  units = defaultUnits,
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
  timeZone,
}: TimePickerProps) => {
  const { formatValue, is12HoursClock: is12HoursClockFromDataFormat } =
    useDataFormat();
  const [open, setOpen] = useState(defaultOpen || false);

  const intl = useIntl();
  const { formatMessage } = intl;

  // `undefined` without the `timeZone` prop, which is what keeps every path below on the
  // browser clock a consumer without the prop sees today.
  const resolvedTimeZone = getTimeZone(timeZone, intl);

  const valueAsDate = useMemo(() => {
    if (value instanceof Date || value === undefined) {
      return value;
    }
    return resolvedTimeZone
      ? getLocalDateInTimeZone(value, resolvedTimeZone)
      : new Date(value);
  }, [value, resolvedTimeZone]);

  const now = useMemo(
    () =>
      resolvedTimeZone ? currentTimeInTimezone(resolvedTimeZone) : new Date(),
    [resolvedTimeZone],
  );

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies intentionally omitted
  const getTimeString = useCallback(
    (date: Date): string => {
      if (timeFormat) {
        return dayjs(date).format(timeFormatByClockMode);
      }
      // Opted in, `date` holds the wall clock of the resolved timezone in its local fields, so
      // displaying it means re-anchoring it to a real instant and asking formatValue to project
      // that instant back into the same timezone. `applyTimeZoneOffset` is forced because the
      // two steps are only correct together; it defaults to `false` in DataFormatConfig, and
      // inheriting it would drift the value by the browser-to-provider delta.
      //
      // Gated on the resolved prop rather than on `intl.timeZone`: the ambient zone is set for
      // every consumer in a portal, and reading it here would re-render every existing time
      // picker in the new convention without anyone opting in.
      return formatValue(
        resolvedTimeZone ? new Date(toIsoString(date, resolvedTimeZone)) : date,
        {
          targetFormat: 'time',
          second: 'numeric',
          ...valueFormatOptions,
          // `timeZone` is named as well as the flag: `formatValue` otherwise projects into the
          // zone on the consumer's `DataFormatConfig`, which is the provider's. The two steps
          // have to agree, and with a string `timeZone` prop the resolved zone is not the
          // provider's.
          ...(resolvedTimeZone
            ? { applyTimeZoneOffset: true, timeZone: resolvedTimeZone }
            : {}),
        },
      );
    },
    [
      timeFormat,
      resolvedTimeZone,
      formatValue,
      valueFormatOptions,
      timeFormatByClockMode,
    ],
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

  // Same contract as `ds-date-picker`: without `timeZone` the value passes through as the plain
  // `Date` it already is; with it, `applyTimezoneOffset` returns a `TZDate` carrying the resolved
  // zone, so the consumer picks its own wire format instead of being handed a string.
  const getDateToEmit = (date: Date): Date | undefined =>
    applyTimezoneOffset(date, timeZone, intl);

  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    // Fired even with nothing selected, which is what this has always done — a consumer may be
    // using the close event to clear. `getTimeString` is only reachable with a value.
    !visible &&
      onChange &&
      onChange(
        valueAsDate && getDateToEmit(valueAsDate),
        valueAsDate ? getTimeString(valueAsDate) : '',
      );
  };

  const handleChange = (
    unit: dayjs.UnitType | undefined,
    newValue: number | undefined,
    clockModeChanged = false,
  ) => {
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
      unitConfig,
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
    [valueAsDate, now, is12HourClock, disabledHours],
  );

  const renderClockSwitch = () => {
    const currentClockMode = getClockModeFromDate(valueAsDate || now);
    return (
      <S.Unit data-testid="ds-time-picker-unit-meridiem">
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
            <S.CellText
              {...(currentClockMode === mode ? { 'data-selected': true } : {})}
            >
              {mode}
            </S.CellText>
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
            value={valueAsDate}
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
      <Icon
        component={<ClockM />}
        size={24}
        onClick={disabled ? undefined : (): void => setOpen(true)}
      />
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

export default TimePicker;
