import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionTextSlotOwnProps = {
  children: ReactNode;
  /** Render in a lighter, secondary colour. @default false */
  muted?: boolean;
};

export type ConditionTextSlotProps = WithHTMLAttributes<
  HTMLSpanElement,
  ConditionTextSlotOwnProps
>;
