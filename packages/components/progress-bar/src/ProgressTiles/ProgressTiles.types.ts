import type { ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ProgressTilesProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    tileWidth: string;
    colors: string[];
    percent: number;
    label?: ReactNode;
  }
>;
