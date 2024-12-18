import type { ReactNode, CSSProperties } from 'react';
import type { ProgressProps as AntProgressProps } from 'antd/lib/progress/progress';

export type ProgressProps = AntProgressProps & {
  amount?: number;
  showLabel?: boolean;
  description?: ReactNode;
  thick?: boolean;
  labelFormatter?: (amount?: string | number, percent?: string | number) => ReactNode;
  containerStyles?: CSSProperties;
  maxPercent?: boolean;
};
