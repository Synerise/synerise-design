import React, { forwardRef } from 'react';

import { toCssSize } from '@synerise/ds-utils';

import * as S from './ConditionGroup.styles';
import type { ConditionGroupProps } from './ConditionGroup.types';

/**
 * Outermost layout wrapper for a single condition: the entity wrapper on the left and its
 * `ConditionRows` on the right, separated by `gap` (12px default). Forward its ref and pass the
 * node as `getPopupContainer` for the enclosed dropdowns so their popovers share one stacking
 * context (fixes popover z-index issues).
 */
export const ConditionGroup = forwardRef<HTMLDivElement, ConditionGroupProps>(
  ({ children, gap = 12, ...rest }, ref) => (
    <S.Group ref={ref} $gap={toCssSize(gap)} {...rest}>
      {children}
    </S.Group>
  ),
);

ConditionGroup.displayName = 'ConditionGroup';
