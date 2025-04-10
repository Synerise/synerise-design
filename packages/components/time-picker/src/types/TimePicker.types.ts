import type { ReactNode, CSSProperties } from 'react';
import type dayjs from 'dayjs';
import type { InputProps } from '@synerise/ds-input';

import type { DropdownProps } from '@synerise/ds-dropdown';
import type { DateToFormatOptions } from '@synerise/ds-data-format';

import type { CLOCK_MODES } from '../constants/timePicker.constants';

export type ClockModes = typeof CLOCK_MODES[number];

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

export type TimePickerProps = TimePickerDisabledUnits & {
  alwaysOpen?: boolean;
  className?: string;
  clearTooltip?: string | ReactNode;
  containerStyle?: CSSProperties;
  defaultOpen?: boolean;
  disabled?: boolean;
  dropdownProps?: Partial<DropdownProps>;
  inputProps?: Partial<InputProps>;
  onChange?: (value: Date | undefined, timeString: string) => void;
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
  value?: Date;
  errorText?: ReactNode;
};
