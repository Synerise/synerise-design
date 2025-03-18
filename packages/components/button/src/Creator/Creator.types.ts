import type { MouseEvent, ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export enum CreatorStatus {
  Default = 'default',
  Error = 'error',
  Upload = 'upload',
}
export type CreatorProps = WithHTMLAttributes<
  HTMLButtonElement,
  {
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    label?: ReactNode;
    block?: boolean;
    status?: CreatorStatus;
    className?: string;
  }
>;
