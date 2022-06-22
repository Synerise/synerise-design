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
  const [clockMode, setClockMode] = React.useState<string>(defaultAM ? CLOCK_MODES.AM : CLOCK_MODES.PM);

  const getTimeString = (date: Date): string => dayjs(date).format(timeFormat);
  // eslint-disable-next-line
  // @ts-ignore
  const unitConfig: UnitConfig[] = [
    {
      unit: 'hour',
      options: use12HourClock ? range(12) : range(24),
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
    !visible && onChange && onChange(value as Date, getTimeString(value as Date));
  };
  const handleChange = (unit: dayjs.UnitType, newValue: number): void => {
    const wasUndefined = value === undefined;
    let dateBuilder = dayjs(value);
    dateBuilder = dateBuilder[unit](newValue);
    if (wasUndefined) {
      // set remaining time fields to 0, HH:00:00, 00:mm:00, 00:00:ss
      unitConfig.filter(u => u.unit !== unit).forEach(unitDef => (dateBuilder = dateBuilder[unitDef.unit](0)));
    }
    const newDate = dateBuilder.toDate();
    onChange && onChange(newDate as Date, getTimeString(newDate as Date));
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
          <Unit {...u} value={value} onSelect={(newValue): void => handleChange(u.unit, newValue)} />
          {(index !== unitsToRender.length - 1 || !!use12HourClock) && <S.UnitSeperator />}
        </React.Fragment>
      ))}
      {use12HourClock && renderClockSwitch()}
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
      return dayjs(value).format('HH:mm:ss');
    }
    return placeholder || intl.formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [placeholder, intl, value]);

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
