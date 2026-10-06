import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

/**
 * Sizing preset mirroring `@synerise/ds-condition`'s slots: `rigid`=operator, `fill`=factor,
 * `shrink`=parameter.
 */
export type ConditionSlotVariant = 'rigid' | 'fill' | 'shrink';

type ConditionSlotOwnProps = {
  children: ReactNode;
  /** Sizing preset. Overridden by explicit `grow` / `shrink`. @default 'rigid' */
  variant?: ConditionSlotVariant;
  grow?: number;
  shrink?: number;
  basis?: string;
  minWidth?: number | string;
  maxWidth?: number | string;
  /** Optional error message rendered below the control. */
  errorMessage?: ReactNode;
};

export type ConditionSlotProps = WithHTMLAttributes<
  HTMLDivElement,
  ConditionSlotOwnProps
>;
