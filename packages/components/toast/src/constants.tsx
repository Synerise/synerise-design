import React, { type ReactNode } from 'react';

import { Check3M, InfoFillM, WarningFillM } from '@synerise/ds-icon';

import { type ToastType } from './Toast.types';

export const ICONS: Record<ToastType, ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <WarningFillM />,
  informative: <InfoFillM />,
};
