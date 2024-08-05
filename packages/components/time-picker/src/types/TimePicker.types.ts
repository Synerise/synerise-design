import { ReactNode, CSSProperties } from 'react';
import dayjs from 'dayjs';
import { InputProps } from 'antd/es/input/Input';

import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';
import { DateToFormatOptions } from '@synerise/ds-data-format';

import { CLOCK_MODES } from '../constants/timePicker.constants';

export type ClockModes = typeof CLOCK_MODES[number];

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

type ValueRelatedProps<ValueType extends Date | string> = {
  onChange: (date: ValueType | undefined, timeString: string) => void;
  value?: ValueType;
  includeTimezoneOffset?: ValueType extends string ? boolean | string : never;
};

export type TimePickerProps<ValueType extends Date | string = Date> = ValueRelatedProps<ValueType> & {
  alwaysOpen?: boolean;
  className?: string;
  clearTooltip?: string | ReactNode;
  containerStyle?: CSSProperties;
  defaultOpen?: boolean;
  disabled?: boolean;
  dropdownProps?: Partial<DropdownProps>;
  inputProps?: Partial<InputProps>;
  onClockModeChange?: (mode: string) => void;
  overlayClassName?: string;
  placeholder?: string;
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  raw?: boolean;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  units?: dayjs.UnitType[];
  /**
   * @deprecated use DSProvider::dataFormatConfig instead
   */
  use12HourClock?: boolean;
  valueFormatOptions?: DateToFormatOptions;
  errorText?: ReactNode;
} & TimePickerDisabledUnits;
