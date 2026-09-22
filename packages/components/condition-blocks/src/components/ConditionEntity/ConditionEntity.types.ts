import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionEntityOwnProps = {
  /** The entity/context chip(s) rendered by the consuming app (e.g. a ds-button or ds-context-selector). */
  children: ReactNode;
  /** Gap between multiple entity slots. A number is treated as px. @default 12 */
  gap?: number | string;
  /** Optional error message rendered below the entity. */
  errorMessage?: ReactNode;
};

export type ConditionEntityProps = WithHTMLAttributes<
  HTMLSpanElement,
  ConditionEntityOwnProps
>;
