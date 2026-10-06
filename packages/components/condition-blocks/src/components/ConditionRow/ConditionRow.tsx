import React, { forwardRef } from 'react';

import { toCssSize } from '@synerise/ds-utils';

import { ErrorMessage } from '../../errorMessage.styles';
import { ConditionConnector } from '../ConditionConnector/ConditionConnector';
import * as S from './ConditionRow.styles';
import type { ConditionRowProps } from './ConditionRow.types';

/**
 * Horizontal flex row of slots / text / triggers. Fills its parent but never overflows
 * (`min-width: 0`); defers sizing to the `ConditionSlot`s inside it. Reveals a `ConditionRemove`
 * descendant on hover. Pass `connector` to render a leading `ConditionConnector`; pass
 * `errorMessage` to render an error below the slots (aligned with the first slot) — the connector's
 * vertical line extends automatically to reach the next row.
 */
export const ConditionRow = forwardRef<HTMLDivElement, ConditionRowProps>(
  (
    { children, gap = 12, align = 'start', errorMessage, connector, ...rest },
    ref,
  ) => (
    <S.RowOuter ref={ref} $gap={toCssSize(gap)} {...rest}>
      {connector && <ConditionConnector {...connector} />}
      <S.Content>
        <S.Row $gap={toCssSize(gap)} $align={align}>
          {children}
        </S.Row>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </S.Content>
    </S.RowOuter>
  ),
);

ConditionRow.displayName = 'ConditionRow';
