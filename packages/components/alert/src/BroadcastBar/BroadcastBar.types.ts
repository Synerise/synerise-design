import { type AlertProps } from 'antd/lib/alert';
import { type ReactNode } from 'react';

export type BroadcastBarTypes = 'success' | 'warning' | 'negative';
export type ColorType = 'red' | 'green' | 'yellow';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  type: BroadcastBarTypes;
  color?: ColorType;
  button?: boolean | ReactNode;
  withEmphasis?: ReactNode;
  withLink?: ReactNode;
  withClose?: ReactNode;
  onCloseClick?: () => void;
  textButton?: string;
  text?: ReactNode;
}
