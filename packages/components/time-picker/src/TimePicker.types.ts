import * as React from 'react';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

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
  raw?: boolean;
  defaultAM?: boolean;
  onClockModeChange?: (mode: string) => void;
};
