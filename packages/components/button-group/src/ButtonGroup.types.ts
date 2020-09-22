import { ButtonGroupProps as AntButtonGroupProps } from 'antd/lib/button/button-group';
import * as React from 'react';

export interface ButtonGroupProps extends AntButtonGroupProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  fullWidth?: boolean;
  buttonsPosition?: string | 'left' | 'center' | 'right';
  disabled?: boolean;
}
