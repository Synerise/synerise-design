import type { InputNumberProps as AntdInputNumberProps } from 'antd/lib/input-number';
import type { ReactNode } from 'react';

import type { NumberToFormatOptions } from '@synerise/ds-data-format';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

export type InputNumberProps = AntdInputNumberProps<number> & {
  defaultValue?: number | null;
  error?: boolean;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  raw?: boolean;
  valueFormatOptions?: NumberToFormatOptions;
} & FormFieldCommonProps;

/**
 * @deprecated - use InputNumberProps
 */
export type Props = InputNumberProps;
