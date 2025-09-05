import React, { type ReactNode } from 'react';

import { Check3M, InfoFillM, WarningFillM } from '@synerise/ds-icon';

import { type InlineAlertType } from './InlineAlert.types';

export const ICONS: Record<InlineAlertType, ReactNode> = {
  success: <Check3M />,
  alert: <WarningFillM />,
  warning: <WarningFillM />,
  info: <InfoFillM />,
};
