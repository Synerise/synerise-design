import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';

export type AlertType = 'positive' | 'notice' | 'negative'  | 'neutral'|'supply'|'service'|'entity';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: string | AlertType;
  customColor?:
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
  customColorIcon?:
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
  color?:
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'violet'
    | 'purple'
    | 'cyan';
  mode?: 'background' | 'background-outline' | 'outline' | 'clear';
  showMoreLabel?: React.ReactNode;
  onShowMore?: () => void;
  newClient?: boolean | React.ReactNode;
  moreButtons?: boolean | React.ReactNode;
  withEmphasis?: React.ReactNode;
  withLink?: React.ReactNode;
  unorderedList?: React.ReactNode;
  withClose?: React.ReactNode;
  customIcon?: React.ReactElement;
}
