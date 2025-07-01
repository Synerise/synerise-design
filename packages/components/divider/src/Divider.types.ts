import { type DividerProps as AntDividerProps } from 'antd/lib/divider';
import { type ReactNode } from 'react';

export type DividerProps = AntDividerProps & {
  marginTop?: number;
  marginBottom?: number;
  labelAbove?: ReactNode;
  labelBelow?: ReactNode;
  hiddenLine?: boolean;
};
