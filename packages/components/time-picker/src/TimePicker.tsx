import * as React from 'react';
import dayjs from 'dayjs';

import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { ClockM, Close3M } from '@synerise/ds-icon/dist/icons';
import { FormattedMessage } from 'react-intl';
import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

export type TimePickerProps = TimePickerDisabledUnits & {
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  placeholder?: string | React.ReactNode;
  value?: Date;
  defaultOpen?: boolean;
  alwaysOpen?: boolean;
  timeFormat?: string;
  use12HourClock?: boolean;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  disabled?: boolean;
  overlayClassName?: string;
  className?: string;
  units?: dayjs.UnitType[];
  onChange?: (value: Date, timeString: string) => void;
  clearTooltip?: string | React.ReactNode;
};

const TimePicker: React.FC<TimePickerProps> = ({
  placement,
  placeholder = <FormattedMessage id="DS.TIME-PICKER.PLACEHOLDER" />,
  trigger,
  value,
  units,
  defaultOpen,
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
}) => {
  const [open, setOpen] = React.useState<boolean>(defaultOpen || false);
  const [localValue, setLocalValue] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const unitConfig: UnitConfig[] = [
    {
      unit: 'hour',
      options: [...Array(use12HourClock ? 12 : 24).keys()],
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
    },
  ];

  const unitsToRender = unitConfig.filter(u => units && units.includes(u.unit));

  const getTimeString = (date: Date): string => dayjs(date).format(timeFormat);
  const onVisibleChange = (visible: boolean): void => {
    setOpen(visible);
    !visible && onChange && onChange(localValue as Date, getTimeString(localValue as Date));
  };

  const handleChange = (unit: dayjs.UnitType, newValue: number): void => {
    if (!onChange) {
      return;
    }

    const newDateObject = dayjs(localValue || undefined)
      .set(unit, newValue)
      .toDate();
    setLocalValue(newDateObject);
  };

  const overlay = (
    <S.OverlayContainer data-testid="tp-overlay-container" className={overlayClassName}>
      {unitsToRender.map((u, index) => (
        <React.Fragment key={u.unit}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Unit {...u} value={localValue} onSelect={(newValue): void => handleChange(u.unit, newValue)} />
          {index !== unitsToRender.length - 1 && <S.UnitSeperator />}
        </React.Fragment>
      ))}
    </S.OverlayContainer>
  );

  const dateString = localValue && getTimeString(localValue);

  const clear = React.useCallback(() => {
    setLocalValue(undefined);
    setOpen(false);
  }, [setOpen, setLocalValue]);

  const timePickerIcon = React.useMemo(() => {
    return open && dateString ? (
      <S.ClearIcon
        component={
          <Tooltip title={clearTooltip}>
            <Close3M />
          </Tooltip>
        }
        onClick={clear}
      />
    ) : (
      <Icon component={<ClockM />} size={24} />
    );
  }, [open, dateString, setLocalValue]);

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
          className={`${open ? 'active' : ''}`}
          data-testid="tp-input"
          value={dateString}
          placeholder={placeholder as string}
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
  units: ['hour', 'minute', 'second'],
};

export default TimePicker;
