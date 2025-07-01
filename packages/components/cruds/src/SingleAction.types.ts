import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type SingleActionProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    title: ReactNode;
    className?: string;
    inactive?: boolean;
    onClick: () => void;
    icon: ReactNode;
    iconSize?: number;
  }
>;
