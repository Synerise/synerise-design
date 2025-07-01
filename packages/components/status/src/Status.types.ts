import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type StatusType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'disabled'
  | 'default'
  | 'custom';

export type StatusProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label: string;
    type: StatusType;
    onClick?: () => void;
    color?: string;
    dashed?: boolean;
  }
>;
