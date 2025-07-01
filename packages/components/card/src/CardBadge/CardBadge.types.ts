import type React from 'react';

export type BadgeStatus =
  | 'success'
  | 'checked'
  | 'warning'
  | 'error'
  | 'default';

export type CardBadgeProps = {
  icon: React.ReactNode;
  status?: BadgeStatus;
};
