import React, { forwardRef } from 'react';

import { ConditionConnector } from '../ConditionConnector/ConditionConnector';
import * as S from './ConditionAddButton.styles';
import type { ConditionAddButtonProps } from './ConditionAddButton.types';

/**
 * Row that hangs an "add" control off the tree line — the "and where" / "Add another" /
 * "and then…" action. Presentational only: the consuming app passes the actual control (e.g. a
 * ghost `ds-button`) as `children`.
 */
export const ConditionAddButton = forwardRef<
  HTMLDivElement,
  ConditionAddButtonProps
>(({ children, withConnector = false, connectorProps, ...rest }, ref) => (
  <S.AddButtonRow ref={ref} {...rest}>
    {withConnector && <ConditionConnector last {...connectorProps} />}
    {children}
  </S.AddButtonRow>
));

ConditionAddButton.displayName = 'ConditionAddButton';
