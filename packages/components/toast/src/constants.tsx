import React, { ReactNode } from 'react';
import { WarningFillM, Check3M, InfoFillM } from '@synerise/ds-icon';
import { ToastType } from './Toast.types';

export const ICONS: Record<ToastType, ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <WarningFillM />,
  informative: <InfoFillM />,
};
