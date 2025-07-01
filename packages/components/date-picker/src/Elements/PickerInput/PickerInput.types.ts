import { type SizeType } from 'antd/lib/config-provider/SizeContext';
import type { CSSProperties, ReactNode } from 'react';

import type { DateToFormatOptions } from '@synerise/ds-data-format';

import type { DatePickerProps } from '../../DatePicker.types';

type InputProps = DatePickerProps['inputProps'];

// @deprecated - use PickerInputProps instead
export type Props = InputProps & {
  autoFocus?: boolean;
  size?: SizeType;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  allowClear?: boolean;
  value?: Date | string;
  onChange?: (
    dateValue: Date | undefined | null,
    stringifiedDate: string,
  ) => void;
  style?: CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  onClear?: () => void;
  clearTooltip?: ReactNode;
  highlight?: boolean;
  error?: boolean;
  errorText?: ReactNode;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
};

export type PickerInputProps = Props;
