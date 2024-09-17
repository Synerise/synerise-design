import React from 'react';

import { DateToFormatOptions } from '@synerise/ds-data-format';

import { DateFilter, DateRange } from '../date.types';
import { Texts } from '../DateRangePicker.types';

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
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClear?: () => void;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  clearTooltip?: string | React.ReactNode;
  highlight?: boolean;
  texts?: Texts;
  active?: boolean;
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  tooltip?: string | React.ReactNode;
  error?: boolean;
  errorText?: React.ReactNode | string;
  preferRelativeDesc?: boolean;
};

/**
 * @deprecated use `RangePickerInputProps`
 */
export type Props = RangePickerInputProps;
