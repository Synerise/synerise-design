import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionRowsOwnProps = {
  children: ReactNode;
  /**
   * Vertical gap between rows (and the add button). A number is treated as px.
   * Defaults to 16px — to be replaced by a design token in follow-up work.
   * @default 16
   */
  gap?: number | string;
};

export type ConditionRowsProps = WithHTMLAttributes<
  HTMLDivElement,
  ConditionRowsOwnProps
>;
