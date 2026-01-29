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
    withClose?: boolean;
    button?: ReactNode;
    expanded?: boolean;
    onExpand?: (isExpanded: boolean) => void;
    /**
     * fired when user manually dismisses the toast by clicking the X button
     */
    onCloseClick?: () => void;
    /**
     * fired when toast is dismissed (both manually or after timeout)
     */
    onDismiss?: () => void;
    toastId?: string;
  }
>;

export type ToastCustomisationOptions = Pick<
  ToastOptions,
  'duration' | 'position' | 'id' | 'removeDelay' | 'className' | 'style'
>;

export type ShowToastProps = Omit<ToastProps, 'type'>;
