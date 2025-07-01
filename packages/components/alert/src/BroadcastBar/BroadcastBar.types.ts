import { type AlertProps } from 'antd/lib/alert';
import type React from 'react';

export type BroadcastBarTypes = 'success' | 'warning' | 'negative';
export type ColorType = 'red' | 'green' | 'yellow';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  type: string | BroadcastBarTypes;
  color?: ColorType;
  button?: boolean | React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  withClose?: React.ReactNode;
  onCloseClick?: () => void;
  textButton?: string;
  text?: string | React.ReactNode;
}
