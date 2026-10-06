import type { ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

import type { ConditionConnectorProps } from '../ConditionConnector/ConditionConnector.types';

type ConditionAddButtonOwnProps = {
  /** The add control rendered by the consuming app (e.g. a ghost ds-button). */
  children: ReactNode;
  /** Draw a `ConditionConnector` before the control so it hangs off the row tree line. */
  withConnector?: boolean;
  /** Props forwarded to the connector when `withConnector` is set. */
  connectorProps?: Pick<ConditionConnectorProps, 'first' | 'last' | 'readOnly'>;
};

export type ConditionAddButtonProps = WithHTMLAttributes<
  HTMLDivElement,
  ConditionAddButtonOwnProps
>;
