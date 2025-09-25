import { type ReactNode } from 'react';

import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type DividerType = 'vertical' | 'horizontal';

export type DividerProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    marginTop?: number;
    marginBottom?: number;
    labelAbove?: ReactNode;
    labelBelow?: ReactNode;
    hiddenLine?: boolean;
    type?: DividerType;
    dashed?: boolean;
  }
>;
