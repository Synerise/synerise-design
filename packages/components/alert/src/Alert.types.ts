import { type AlertProps } from 'antd/lib/alert';
import type React from 'react';

import type InlineAlert from './InlineAlert/InlineAlert';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

export interface Props extends Omit<AlertProps, 'type' | 'message'> {
  message?: React.ReactNode;
  type: AlertType;
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
