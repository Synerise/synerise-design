import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ConditionConnectorOwnProps = {
  /** First row in the group — draws a full-width horizontal stub. */
  first?: boolean;
  /** Last row in the group — stops the vertical line half-way down. */
  last?: boolean;
  /** Read-only conditions hide the trailing vertical line on the last row. */
  readOnly?: boolean;
};

export type ConditionConnectorProps = WithHTMLAttributes<
  HTMLSpanElement,
  ConditionConnectorOwnProps
>;
