import type { ReactNode, CSSProperties } from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { DateToFormatOptions } from '@synerise/ds-data-format';
import type { DatePickerProps } from '../../DatePicker.types';

type InputProps = DatePickerProps['inputProps'];

// @deprecated - use PickerInputProps instead
export type PickerInputProps<ValueType extends Date | string = Date> = InputProps & {
  autoFocus?: boolean;
  size?: SizeType;
  /**
   * @deprecated use `valueFormatOptions` instead
   */
  format?: string;
  valueFormatOptions?: DateToFormatOptions;
  showTime?: boolean;
  allowClear?: boolean;
  value?: ValueType;
  onChange?: (dateValue: Date | undefined | null, stringifiedDate: string) => void;
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

export type Props = PickerInputProps;
