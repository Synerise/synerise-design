import { SelectProps, SelectValue } from 'antd/lib/select';
import * as React from 'react';

export interface Props<T = SelectValue> extends Omit<SelectProps<T>, 'listHeight'> {
  errorText?: React.ReactNode | string;
  error?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  tooltip?: React.ReactNode;
  clearTooltip?: string;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  listHeight?: React.ReactText;
}
