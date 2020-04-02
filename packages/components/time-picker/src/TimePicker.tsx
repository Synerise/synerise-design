import * as React from 'react';
import dayjs from 'dayjs';

import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { ClockM, Close3M } from '@synerise/ds-icon/dist/icons';
import { injectIntl, IntlShape } from 'react-intl';
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
  units?: dayjs.UnitType[];
  onChange?: (value: Date | undefined, timeString: string) => void;
  clearTooltip?: string | React.ReactNode;
  intl: IntlShape;
};

const defaultUnits = ['hour', 'minute', 'second'] as dayjs.UnitType[];

const TimePicker: React.FC<TimePickerProps> = ({
  placement,
  placeholder,
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
  intl
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
    setLocalValue(newDateObject.toDate());
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
    onChange && onChange(undefined, '');
  }, [setOpen, setLocalValue, onChange]);

  const timePickerIcon = React.useMemo(() => {
    return (alwaysOpen || open) && dateString ? (
      <S.ClearIcon
        component={
          <Tooltip title={clearTooltip}>
            <Close3M />
          </Tooltip>
        }
        onClick={clear}
      />
    ) : (
      <Icon component={<ClockM />} size={24} onClick={(): void => setOpen(true)} />
    );
  }, [open, dateString, clear, clearTooltip, alwaysOpen]);

  const placeholderValue = React.useMemo((): string => {
    return placeholder || intl.formatMessage({id: 'DS.TIME-PICKER.PLACEHOLDER'});
  }, [placeholder, intl]);

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
          value={dateString}
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
