import React, { type ReactNode } from 'react';

import { Check3M, ErrorFillM, WarningFillM } from '@synerise/ds-icon';

import { type BroadcastBarType } from './BroadcastBar.types';

export const ICONS: Record<BroadcastBarType, ReactNode> = {
  success: <Check3M />,
  warning: <WarningFillM />,
  negative: <ErrorFillM />,
};
export const DEFAULT_ICON = <WarningFillM />;
