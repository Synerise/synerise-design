import { ReactNode } from 'react';
import { DividerProps as AntDividerProps } from 'antd/lib/divider';

export type DividerProps = AntDividerProps & {
  marginTop?: number;
  marginBottom?: number;
  labelAbove?: ReactNode;
  labelBelow?: ReactNode;
  hiddenLine?: boolean;
};
