import { GroupProps } from 'antd/es/input';
import * as React from 'react';

export interface Props extends GroupProps {
  label?: React.ReactNode;
  errors?: string[];
  description?: React.ReactNode;
  resetMargin?: boolean;
  tooltip?: React.ReactNode;
}
