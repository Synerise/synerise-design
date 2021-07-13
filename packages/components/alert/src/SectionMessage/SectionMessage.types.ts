import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';

export type AlertType = 'positive' | 'notice' | 'negative' | 'informative' | 'neutral';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: AlertType;
  color?: 'blue' | 'grey' | 'red' | 'green' | 'yellow';
  mode?: 'background' | 'background-outline' | 'outline' | 'clear';
  showMoreLabel?: React.ReactNode;
  onShowMore?: () => void;
  newClient?: boolean | React.ReactNode;
  moreButtons?: boolean | React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  unorderedList?: React.ReactNode;
}
