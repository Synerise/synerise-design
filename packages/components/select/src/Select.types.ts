import type { ReactNode, ReactText } from 'react';
import type { SelectProps, SelectValue } from 'antd/lib/select';
import type { CSSObject } from 'styled-components';
import type { FormFieldCommonProps } from '@synerise/ds-form-field';

export type Props<T = SelectValue> = Omit<SelectProps<T>, 'listHeight'> & {
  error?: boolean;
  clearTooltip?: string;
  prefixel?: ReactNode;
  suffixel?: ReactNode;
  listHeight?: ReactText;
  grey?: boolean;
  asFormElement?: boolean;
  selectorStyle?: CSSObject;
} & FormFieldCommonProps;
