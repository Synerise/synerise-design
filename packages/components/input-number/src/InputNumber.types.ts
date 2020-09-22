import { InputNumberProps } from 'antd/lib/input-number';
import * as React from 'react';

export interface Props extends InputNumberProps {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  error?: boolean;
  raw?: boolean;
}
