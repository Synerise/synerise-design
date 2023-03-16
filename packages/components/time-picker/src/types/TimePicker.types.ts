import * as React from 'react';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';
import { InputProps } from 'antd/es/input/Input';

import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';

import { CLOCK_MODES } from '../constants/timePicker.constants';

export type ClockModes = typeof CLOCK_MODES[number];

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

export type TimePickerProps = TimePickerDisabledUnits & {
  alwaysOpen?: boolean;
  className?: string;
  clearTooltip?: string | React.ReactNode;
  containerStyle?: React.CSSProperties;
  defaultOpen?: boolean;
  disabled?: boolean;
  dropdownProps?: Partial<DropdownProps>;
  inputProps?: Partial<InputProps>;
  intl: IntlShape;
  onChange?: (value: Date | undefined, timeString: string) => void;
  onClockModeChange?: (mode: string) => void;
  overlayClassName?: string;
  placeholder?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  raw?: boolean;
  timeFormat?: string;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  units?: dayjs.UnitType[];
  use12HourClock?: boolean;
  value?: Date;
};
