import * as React from 'react';
import dayjs from 'dayjs';
import { range } from 'lodash';

import Icon, { ClockM, Close3S } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { FormattedMessage, injectIntl } from 'react-intl';
import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';

const defaultUnits = ['hour', 'minute', 'second'] as dayjs.UnitType[];
export const CLOCK_MODES = {
  AM: 'AM',
  PM: 'PM',
};

const TimePicker: React.FC<TimePickerProps> = ({
  placement,
  placeholder,
  trigger,
  value,
  units,
  defaultOpen,
  defaultAM,
  onChange,
  containerStyle = {},
  timeFormat,
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
  const [open, setOpen] = React.useState<boolean>(defaultOpen || false);
  const [localValue, setLocalValue] = React.useState<Date | undefined>(value);
  const [clockMode, setClockMode] = React.useState<string>(defaultAM ? CLOCK_MODES.AM : CLOCK_MODES.PM);
  const [hour, setHour] = React.useState<number | undefined>(undefined);
  const [minute, setMinute] = React.useState<number | undefined>(undefined);
  const [second, setSecond] = React.useState<number | undefined>(undefined);
  const getTimeString = (date: Date): string => dayjs(date).format(timeFormat);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  React.useEffect(() => {
    if (hour !== undefined && minute !== undefined && second !== undefined) {
      const newDate = dayjs()
        .hour(hour)
        .minute(minute)
        .second(second)
        .toDate();
      setLocalValue(newDate);
      onChange && onChange(newDate as Date, getTimeString(newDate as Date));
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
  }, [hour, minute, second]);

  const unitConfig: UnitConfig[] = [
    {
      unit: 'hour',
      options: use12HourClock ? range(12 + 1) : range(24),
      disabled: disabledHours,
      insertSeperator: true,
    },
    {
      unit: 'minute',
      options: range(60),
      disabled: disabledMinutes,
      insertSeperator: true,
    },
    {
      unit: 'second',
      options: range(60),
      disabled: disabledSeconds,
      insertSeperator: !!use12HourClock,
    },
  ];

  const unitsToRender = React.useMemo(() => {
    const availableUnits = units?.length ? units : defaultUnits;
    return unitConfig.filter(u => availableUnits && availableUnits.includes(u.unit));
  }, [units, unitConfig]);

  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible && onChange && onChange(localValue as Date, getTimeString(localValue as Date));
  };

  const handleChange = (unit: dayjs.UnitType, newValue: number): void => {
    if (unit === 'hour') {
      setHour(newValue);
    }
    if (unit === 'minute') {
      setMinute(newValue);
    }
    if (unit === 'second') {
      setSecond(newValue);
    }
  };

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
          <Unit {...u} value={localValue} onSelect={(newValue): void => handleChange(u.unit, newValue)} />
          {(index !== unitsToRender.length - 1 || !!use12HourClock) && <S.UnitSeperator />}
        </React.Fragment>
      ))}
      {use12HourClock && renderClockSwitch()}
    </S.OverlayContainer>
  );

  const dateString = localValue && getTimeString(localValue);

  const clear = React.useCallback(() => {
    setLocalValue(undefined);
    setOpen(false);
    onChange && onChange(undefined, '');
    setHour(undefined);
    setMinute(undefined);
    setSecond(undefined);
  }, [setOpen, setLocalValue, onChange]);

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
    if (hour !== undefined || minute !== undefined || second !== undefined) {
      return dayjs()
        .hour(hour || 0)
        .minute(minute || 0)
        .second(second || 0)
        .format('HH:mm:ss');
    }
    return placeholder || intl.formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [placeholder, intl, hour, minute, second]);

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
          value={use12HourClock && !!dateString ? `${dateString} ${clockMode}` : dateString}
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
  timeFormat: 'HH:mm:ss',
  trigger: ['click'],
  units: defaultUnits,
};

export default injectIntl(TimePicker);
