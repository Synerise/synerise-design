import type { ReactNode } from 'react';

export type BadgeStatus =
  | 'success'
  | 'checked'
  | 'warning'
  | 'error'
  | 'default';

export type CardBadgeProps = {
  icon: ReactNode;
  status?: BadgeStatus;
};
