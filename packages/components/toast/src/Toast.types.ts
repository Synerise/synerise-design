import type { ReactElement, ReactNode } from 'react';
import type { ToastOptions } from 'react-hot-toast';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type ToastType = 'success' | 'warning' | 'negative' | 'informative';

export type ToastProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    type: ToastType;
    message?: ReactNode;
    description?: ReactNode;
    customIcon?: ReactElement;
    expander?: boolean;
    expandedContent?: ReactNode;
    withClose?: ReactNode;
    button?: ReactNode;
    expanded?: boolean;
    onExpand?: (isExpanded: boolean) => void;
    onCloseClick?: () => void;
  }
>;

export type ToastCustomisationOptions = Pick<
  ToastOptions,
  'duration' | 'position' | 'id' | 'removeDelay' | 'className' | 'style'
>;

export type ShowToastProps = Omit<ToastProps, 'type'>;
