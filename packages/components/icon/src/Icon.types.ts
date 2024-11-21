import type { ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type IconProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    color?: string;
    name?: string;
    size?: string | number;
    stroke?: boolean;
    component?: ReactNode;
  }
>;
