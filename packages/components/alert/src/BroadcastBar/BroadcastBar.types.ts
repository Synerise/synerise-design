import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';

export type BroadcastBarTypes = 'success' | 'warning' | 'negative';
export type ColorType = 'red' | 'green' | 'yellow';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: string | BroadcastBarTypes;
  color?: ColorType;
  showMoreLabel?: React.ReactNode;
  onShowMore?: () => void;
  button?: boolean | React.ReactNode;
  moreButtons?: boolean | React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  unorderedList?: React.ReactNode;
  withClose?: React.ReactNode;
  onCloseClick?: () => void;
  customIcon?: React.ReactElement;
  textButton?: string;
}
