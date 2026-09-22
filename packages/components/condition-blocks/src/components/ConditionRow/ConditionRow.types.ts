import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { ConditionConnectorProps } from '../ConditionConnector/ConditionConnector.types';

/** Cross-axis alignment of a row's children. */
export type ConditionRowAlign = 'start' | 'center' | 'baseline';

type ConditionRowOwnProps = {
  children: ReactNode;
  /** Gap between children. A number is treated as px. @default 12 */
  gap?: number | string;
  /** Cross-axis alignment. Use `center` / `baseline` for text-interleaved layouts. @default 'start' */
  align?: ConditionRowAlign;
  /** Optional error message rendered below the slots, aligned with the first slot. */
  errorMessage?: ReactNode;
  /**
   * When set, the row renders a leading `ConditionConnector` with these props — the consumer no
   * longer composes one as a child. The connector's line spans the row automatically, so it stays
   * connected even with a multi-line or custom `errorMessage`.
   */
  connector?: ConditionConnectorProps;
};

export type ConditionRowProps = WithHTMLAttributes<
  HTMLDivElement,
  ConditionRowOwnProps
>;
