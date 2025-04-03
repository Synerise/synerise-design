import { WithHTMLAttributes } from '@synerise/ds-utils';
import type { ReactNode } from 'react';

export type ProgressTilesProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    tileWidth: string;
    colors: string[];
    percent: number;
    label?: ReactNode;
  }
>;
