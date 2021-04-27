import { SwitchProps } from 'antd/lib/switch';
import * as React from 'react';

export interface Props extends Omit<SwitchProps, 'size'> {
  errorText?: string | React.ReactNode;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
}
