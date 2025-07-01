import { type AlertProps } from 'antd/lib/alert';

export type AlertType =
  | 'positive'
  | 'notice'
  | 'negative'
  | 'informative'
  | 'neutral'
  | 'supply'
  | 'service'
  | 'entity';

export type ColorType =
  | 'blue'
  | 'grey'
  | 'red'
  | 'green'
  | 'yellow'
  | 'cyan'
  | 'purple'
  | 'violet';
export type ModeType = 'background' | 'background-outline' | 'clear' | 'shadow';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  type: AlertType;
  color?: ColorType;
  mode?: ModeType;
}
