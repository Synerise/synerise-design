import type { ProgressProps as AntProgressProps } from 'antd/lib/progress/progress';
import type { CSSProperties, ReactNode } from 'react';

import { type ExactlyOne, type WithHTMLAttributes } from '@synerise/ds-utils';

export type ProgressProps = WithHTMLAttributes<
  HTMLDivElement,
  Pick<
    AntProgressProps,
    'percent' | 'type' | 'status' | 'strokeColor' | 'strokeLinecap'
  > & {
    amount?: number;
    showLabel?: boolean;
    description?: ReactNode;
    labelFormatter?: (
      amount?: string | number,
      percent?: string | number,
    ) => ReactNode;
    /**
     * @deprecated - use style prop
     */
    containerStyles?: CSSProperties;
    maxPercent?: boolean;
  } & ExactlyOne<
      {
        /**
         * @deprecated - this property has been renamed to thin to reflect it's functionality
         */
        thick?: boolean;
      },
      {
        thin?: boolean;
      }
    >
>;
