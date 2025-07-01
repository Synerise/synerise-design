import { type AlertProps } from 'antd/lib/alert';
import { type ReactElement, type ReactNode } from 'react';

export type ToastType =
  | 'success'
  | 'warning'
  | 'negative'
  | 'informative'
  | 'neutral';

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
  message?: ReactNode;
  type: string | ToastType;
  customColor?: CustomColorType;
  customColorText?: CustomColorType;
  customColorIcon?: CustomColorType;
  color?: ColorType;
  colorIcon?: ColorIconType;
  expander?: ReactNode;
  expandedContent?: ReactNode;
  withClose?: ReactNode;
  customIcon?: ReactElement;
  button?: ReactNode;
  expanded?: boolean;
  onExpand?: (isExpanded: boolean) => void;
  onCloseClick?: () => void;
}
