import type { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';
import type { ReactNode } from 'react';

import type { NumberToFormatOptions } from '@synerise/ds-core';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';
import {
  type AutoResizeProp,
  type AutosizeInputProps,
} from '@synerise/ds-input';

export type InputNumberProps = AntdInputNumberProps<number> & {
  defaultValue?: number | null;
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
} & FormFieldCommonProps;

/**
 * @deprecated - use InputNumberProps
 */
export type Props = InputNumberProps;
