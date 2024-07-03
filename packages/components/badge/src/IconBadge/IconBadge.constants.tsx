import React from 'react';
import { Check3S, ErrorFillS, IconProps, SpinnerS, WarningFillS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import { Status } from '../Badge.types';

export const STATUS_ICONS: Record<Exclude<Status, undefined | 'inactive'>, Partial<IconProps>> = {
  active: {
    component: <Check3S />,
    color: theme.palette['fern-600'],
  },
  blocked: {
    component: <ErrorFillS />,
    color: theme.palette['red-600'],
  },
  processing: {
    component: <SpinnerS />,
    color: theme.palette['blue-600'],
  },
  warning: {
    component: <WarningFillS />,
    color: theme.palette['yellow-600'],
  },
};
