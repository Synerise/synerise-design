import { ProgressProps as AntProgressProps } from 'antd/lib/progress/progress';

export interface ProgressProps extends AntProgressProps {
  amount?: number;
  showLabel?: boolean;
  description?: string;
  thick?: boolean;
  labelFormatter?: (amount?: string | number, percent?: string | number) => React.ReactNode;
  containerStyles?: React.CSSProperties;
}