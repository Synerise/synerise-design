import React, { forwardRef } from 'react';

import { toCssSize } from '@synerise/ds-utils';

import { CONDITION_ROWS_GAP } from '../../constants';
import * as S from './ConditionRows.styles';
import type { ConditionRowsProps } from './ConditionRows.types';

/**
 * Vertical container for the `ConditionRow`s (and add button) that sit next to a
 * `ConditionEntity`. Fills the remaining width, stays shrinkable (`min-width: 0`) so the
 * rows never overflow, and sets the inter-row gap (16px by default; a design token later).
 */
export const ConditionRows = forwardRef<HTMLDivElement, ConditionRowsProps>(
  ({ children, gap = CONDITION_ROWS_GAP, ...rest }, ref) => (
    <S.Rows ref={ref} $gap={toCssSize(gap)} {...rest}>
      {children}
    </S.Rows>
  ),
);

ConditionRows.displayName = 'ConditionRows';
