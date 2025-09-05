import type { CSSProperties, ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type ProgressProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    label?: ReactNode;
    steps?: number;
    width?: string;
    customColor?: string;
    description?: ReactNode;
    thin?: boolean;
    percent?: number;
    inline?: boolean;
    /**
     * @deprecated - use style prop
     */
    containerStyles?: CSSProperties;
  }
>;
