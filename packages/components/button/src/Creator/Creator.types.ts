import type { MouseEvent, ReactNode, RefObject } from 'react';

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
    labelAlign?: 'left' | 'center';
    status?: CreatorStatus;
    className?: string;
    ref?: RefObject<HTMLDivElement>;
  }
>;
