import * as React from 'react';
import dayjs from 'dayjs';

import { Input } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import ClockM from '@synerise/ds-icon/dist/icons/ClockM';

import Unit, { UnitConfig } from './Unit';
import * as S from './TimePicker.styles';

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

export type TimePickerProps = TimePickerDisabledUnits & {
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  placeholder?: string;
  value?: Date;
  defaultOpen?: boolean;
  alwaysOpen?: boolean;
  timeFormat?: string;
  use12HourClock?: boolean;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  disabled?: boolean;
  overlayClassName?: string;
  className?: string;
  onChange?: (value: Date, timeString: string) => void;
};

const TimePicker: React.FC<TimePickerProps> = ({
  placement,
  placeholder,
  trigger,
  value,
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
}) => {
  const [open, setOpen] = React.useState<boolean>(defaultOpen || false);
  const [localValue, setLocalValue] = React.useState<Date | undefined>(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const units: UnitConfig[] = [
    {
      unit: 'hour',
      options: [...Array(use12HourClock ? 11 : 23).keys()],
      disabled: disabledHours,
      insertSeperator: true,
    },
    {
      unit: 'minute',
      options: [...Array(59).keys()],
      disabled: disabledMinutes,
      insertSeperator: true,
    },
    {
      unit: 'second',
      options: [...Array(59).keys()],
      disabled: disabledSeconds,
    },
  ];

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
      {units.map(({ insertSeperator, ...rest }) => (
        <React.Fragment key={rest.unit}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Unit {...rest} value={localValue} onSelect={(newValue): void => handleChange(rest.unit, newValue)} />
          {insertSeperator && <S.UnitSeperator />}
        </React.Fragment>
      ))}
    </S.OverlayContainer>
  );

  const dateString = localValue && getTimeString(localValue);

  return (
    <S.Container className={`ds-time-picker ${className}`} data-testid="tp-container">
      <Dropdown
        trigger={trigger}
        visible={alwaysOpen || open}
        onVisibleChange={onVisibleChange}
        placement={placement}
        overlay={overlay}
        disabled={disabled}
      >
        <Input
          data-testid="tp-input"
          value={dateString}
          placeholder={placeholder}
          icon1={<Icon component={<ClockM />} size={24} />}
        />
      </Dropdown>
    </S.Container>
  );
};

TimePicker.defaultProps = {
  placement: 'bottomLeft',
  timeFormat: 'HH:mm:ss',
  trigger: ['click'],
};

export default TimePicker;
