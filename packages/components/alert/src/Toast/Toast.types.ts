import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';

export type ToastType = 'success' | 'warning' | 'negative' | 'informative' | 'neutral';

export type CustomColorType =
  | 'blue'
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';
export type ColorType = 'grey' | 'red' | 'green' | 'yellow' | 'blue';
export type ColorIconType = 'white' | 'grey' | 'black' | 'yellow' | 'blue';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: string | ToastType;
  customColor?: CustomColorType;
  customColorText?: CustomColorType;
  customColorIcon?: CustomColorType;
  color?: ColorType;
  colorIcon?: ColorIconType;
  expander?: boolean | React.ReactNode;
  expandedContent?: React.ReactNode;
  withClose?: React.ReactNode;
  customIcon?: React.ReactElement;
  button?: React.ReactNode;
  expanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  onCloseClick?: () => void;
  show?: boolean;
}
