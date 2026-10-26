import type dayjs from 'dayjs';
import type { CSSProperties, ReactNode } from 'react';

import type { DateToFormatOptions } from '@synerise/ds-core';
import type { DropdownSharedProps } from '@synerise/ds-dropdown';
import type { InputProps } from '@synerise/ds-input';
import type { PopoverTriggerType } from '@synerise/ds-popover';

export type ClockModes = 'AM' | 'PM';

export type TimePickerDisabledUnits = {
  disabledSeconds?: number[];
  disabledMinutes?: number[];
  disabledHours?: number[];
};

/**
 * `value` takes a `Date` or an ISO string; `onChange` always hands back a `Date`.
 *
 * With `timeZone` set that `Date` is a `TZDate` carrying the resolved zone — the same contract
 * as `ds-date-picker`. Input and output used to share one `ValueType` parameter, which forced a
 * consumer holding a `Date` to declare its output as `string`.
 */
type ValueRelatedProps = {
  onChange?: (date: Date | undefined, timeString: string) => void;
  value?: Date | string;
  timeZone?: boolean | string;
};

export type TimePickerProps = ValueRelatedProps & {
  alwaysOpen?: boolean;
  className?: string;
  clearTooltip?: string | ReactNode;
  containerStyle?: CSSProperties;
  defaultOpen?: boolean;
  disabled?: boolean;
  dropdownProps?: Partial<
    Omit<
      DropdownSharedProps,
      'children' | 'overlay' | 'open' | 'onOpenChange' | 'disabled'
    >
  >;
  inputProps?: Partial<InputProps>;
  onClockModeChange?: (mode: string) => void;
  overlayClassName?: string;
  placeholder?: string;
  placement?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
  raw?: boolean;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  timeFormat?: string;
  trigger?: PopoverTriggerType[];
  units?: dayjs.UnitType[];
  /**
   * @deprecated use DSProvider::dataFormatConfig instead
   */
  use12HourClock?: boolean;
  valueFormatOptions?: DateToFormatOptions;
  errorText?: ReactNode;
} & TimePickerDisabledUnits;
