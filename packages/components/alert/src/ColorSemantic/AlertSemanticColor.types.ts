import { AlertProps } from 'antd/lib/alert';

export type AlertType =
  | 'positive'
  | 'notice'
  | 'negative'
  | 'informative'
  | 'neutral'
  | 'supply'
  | 'service'
  | 'entity';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  type: AlertType;
  color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow' | 'cyan' | 'purple' | 'violet';
  mode?: 'background' | 'background-outline' | 'clear';
}
