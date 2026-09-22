import React, { forwardRef } from 'react';

import * as S from './ConditionConnector.styles';
import type { ConditionConnectorProps } from './ConditionConnector.types';

/**
 * The tree-line connector that links an entity chip to its condition rows and the
 * add-condition button. Ported from `@synerise/ds-condition`'s row connector.
 */
export const ConditionConnector = forwardRef<
  HTMLSpanElement,
  ConditionConnectorProps
>(({ first, last, readOnly, ...rest }, ref) => (
  <S.Connector
    ref={ref}
    $first={first}
    $last={last}
    $readOnly={readOnly}
    {...rest}
  />
));

ConditionConnector.displayName = 'ConditionConnector';
