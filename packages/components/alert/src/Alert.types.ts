import { AlertProps } from 'antd/lib/alert';
import * as React from 'react';
import InlineAlert from './InlineAlert/InlineAlert';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: 'success' | 'warning' | 'error' | 'info';
  color?:
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
  mode?: 'background' | 'background-outline' | 'outline' | 'clear';
  showMoreLabel?: React.ReactNode;
  onShowMore?: () => void;
}

export type AlertSubComponents = { InlineAlert: typeof InlineAlert };
