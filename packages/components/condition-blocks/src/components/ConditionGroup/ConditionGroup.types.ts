import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionGroupOwnProps = {
  children: ReactNode;
  /** Gap between the entity wrapper and the rows. A number is treated as px. @default 12 */
  gap?: number | string;
};

export type ConditionGroupProps = WithHTMLAttributes<
  HTMLDivElement,
  ConditionGroupOwnProps
>;
