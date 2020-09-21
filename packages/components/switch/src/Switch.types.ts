import { SwitchProps } from 'antd/lib/switch';
import * as React from 'react';

export interface Props extends SwitchProps {
  errorText?: string | React.ReactNode;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
}
