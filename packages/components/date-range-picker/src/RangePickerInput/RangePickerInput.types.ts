import type { CSSProperties, MouseEvent as ReactMouseEvent, FocusEventHandler, ReactNode } from 'react';
import type { DateToFormatOptions } from '@synerise/ds-data-format';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

import type { DateFilter, DateRange } from '../date.types';
import type { Texts } from '../DateRangePicker.types';

export type RangePickerInputProps = {
  size?: 'large' | 'default' | 'small';
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
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
