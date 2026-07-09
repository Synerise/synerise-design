import type {
  CSSProperties,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react';

import type { NumberToFormatOptions } from '@synerise/ds-core';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import {
  type AutoResizeProp,
  type AutosizeInputProps,
} from '@synerise/ds-input';
import type { PassthroughAttributes } from '@synerise/ds-utils';

type InputNumberOwnProps = {
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onStep?: (
    value: number,
    info: { offset: number; type: 'up' | 'down' },
  ) => void;
  min?: number;
  max?: number;
  step?: number | string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  name?: string;
  id?: string;
  error?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  raw?: boolean;
  valueFormatOptions?: NumberToFormatOptions;
  autoResize?: AutoResizeProp;
  autoResizeProps?: Partial<
    Pick<
      AutosizeInputProps,
      | 'placeholderIsMinWidth'
      | 'wrapperClassName'
      | 'wrapperStyle'
      | 'extraWidth'
    >
  >;
  style?: CSSProperties;
  className?: string;
};

// Forward standard input HTML attributes (inputMode, maxLength, onFocus, onKeyDown, …) as antd's
// rc-input-number did. Omit the keys this component owns explicitly / types differently.
export type InputNumberProps = InputNumberOwnProps &
  FormFieldCommonProps &
  PassthroughAttributes &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'onBlur'
    | 'size'
    | 'min'
    | 'max'
    | 'type'
  >;

/**
 * @deprecated - use InputNumberProps
 */
export type Props = InputNumberProps;
