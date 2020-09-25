import { ProgressProps as AntProgressProps } from 'antd/lib/progress/progress';

export interface ProgressProps extends AntProgressProps {
  amount?: number;
  showLabel?: boolean;
  description?: string;
}