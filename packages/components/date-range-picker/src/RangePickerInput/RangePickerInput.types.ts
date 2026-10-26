import type {
  CSSProperties,
  FocusEventHandler,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';

import type { DateToFormatOptions } from '@synerise/ds-core';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

import type { Texts } from '../DateRangePicker.types';
import type { DateFilter, DateRange } from '../date.types';

export type RangePickerInputProps = {
  /**
   * The zone the `timeZone` prop resolved to, or `undefined` when it was not set. Read from a
   * prop rather than `intl`, so a consumer that has not opted in keeps rendering the way it
   * does today.
   */
  timeZone?: string;
  size?: 'large' | 'default' | 'small';
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Pick<DateRange, 'from'> & Pick<DateRange, 'to'>;
  onChange?: (value: Partial<DateFilter> | undefined) => void;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (event?: ReactMouseEvent<HTMLElement, MouseEvent>) => void;
  onClear?: () => void;
  onFocus?: FocusEventHandler;
  onBlur?: FocusEventHandler;
  clearTooltip?: ReactNode;
  highlight?: boolean;
  texts?: Texts;
  active?: boolean;
  error?: boolean;
  preferRelativeDesc?: boolean;
} & FormFieldCommonProps;

/**
 * @deprecated use `RangePickerInputProps`
 */
export type Props = RangePickerInputProps;
