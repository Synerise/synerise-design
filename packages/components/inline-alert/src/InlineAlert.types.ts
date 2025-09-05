import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type InlineAlertType = 'success' | 'alert' | 'warning' | 'info';

export type InlineAlertProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    type: InlineAlertType;
    message?: ReactNode;
    withEmphasis?: ReactNode;
    withLink?: ReactNode;
    /**
     * @deprecated
     */
    iconAlert?: boolean;
    hoverButton?: boolean;
    disabled?: boolean;
    customIcon?: ReactNode;
  }
>;
