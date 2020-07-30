import * as React from 'react';
import dayjs from 'dayjs';

import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { ClockM, Close3S } from '@synerise/ds-icon/dist/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';
import { TimePickerProps } from './TimePicker.types';

const defaultUnits = ['hour', 'minute', 'second'] as dayjs.UnitType[];
const CLOCK_MODES = {
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
  timeFormat,
  use12HourClock,
  alwaysOpen,
  disabled,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  overlayClassName,
  className,
  clearTooltip = <FormattedMessage id="DS.TIME-PICKER.CLEAR" />,
  raw,
  onClockModeChange,
  intl,
}) => {
  const [open, setOpen] = React.useState<boolean>(defaultOpen || false);
  const [localValue, setLocalValue] = React.useState<Date | undefined>(value);
  const [clockMode, setClockMode] = React.useState<string>(defaultAM ? CLOCK_MODES.AM : CLOCK_MODES.PM);
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const unitConfig: UnitConfig[] = [
    {
      unit: 'hour',
      options: use12HourClock ? [...Array(13).keys()] : [...Array(24).keys()],
      disabled: disabledHours,
      insertSeperator: true,
    },
    {
      unit: 'minute',
      options: [...Array(60).keys()],
      disabled: disabledMinutes,
      insertSeperator: true,
    },
    {
      unit: 'second',
      options: [...Array(60).keys()],
      disabled: disabledSeconds,
      insertSeperator: !!use12HourClock,
    },
  ];

  const unitsToRender = React.useMemo(() => {
    const availableUnits = units?.length ? units : defaultUnits;
    return unitConfig.filter(u => availableUnits && availableUnits.includes(u.unit));
  }, [units, unitConfig]);

  const getTimeString = (date: Date): string => dayjs(date).format(timeFormat);
  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible && onChange && onChange(localValue as Date, getTimeString(localValue as Date));
  };

  const handleChange = (unit: dayjs.UnitType, newValue: number): void => {
    if (!onChange) {
      return;
    }
    let newDateObject = dayjs(localValue || undefined).set(unit, newValue);
    const res = defaultUnits.filter(u => unitsToRender.find(val => val.unit !== u));
    if (res.length !== defaultUnits.length) {
      res.forEach(u => {
        newDateObject = dayjs(newDateObject).set(u, 0);
      });
    }
    const newDate = newDateObject.toDate();
    setLocalValue(newDate);
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
      <Icon component={<ClockM />} size={24} onClick={(): void => setOpen(true)} />
    );
  }, [open, dateString, clear, clearTooltip, alwaysOpen]);

  const placeholderValue = React.useMemo((): string => {
    return placeholder || intl.formatMessage({ id: 'DS.TIME-PICKER.PLACEHOLDER' });
  }, [placeholder, intl]);
  if (raw) {
    return overlay;
  }
  return (
    <S.Container className={`ds-time-picker ${className || ''}`} data-testid="tp-container">
      <Dropdown
        trigger={trigger}
        visible={alwaysOpen || open}
        onVisibleChange={onVisibleChange}
        placement={placement}
        overlay={overlay}
        disabled={disabled}
      >
        <S.TimePickerInput
          className={`${alwaysOpen || open ? 'active' : ''}`}
          data-testid="tp-input"
          value={use12HourClock ? `${dateString} ${clockMode}` : dateString}
          placeholder={placeholderValue}
          readOnly
          icon1={timePickerIcon}
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
