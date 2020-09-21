import * as React from 'react';

export type BadgeStatus = 'checked' | 'warning' | 'error' | 'default';

export type CardBadgeProps = {
  icon: React.ReactNode;
  status?: BadgeStatus;
};
