import React, { forwardRef } from 'react';

import * as S from './ConditionTextSlot.styles';
import type { ConditionTextSlotProps } from './ConditionTextSlot.types';

/**
 * Inline, non-interactive text slot used to interleave plain text with controls inside a
 * `ConditionRow` — e.g. "Show only [N] items with the same [attribute]". Vertically centred
 * against pill-height controls.
 */
export const ConditionTextSlot = forwardRef<
  HTMLSpanElement,
  ConditionTextSlotProps
>(({ children, muted = false, ...rest }, ref) => (
  <S.Text ref={ref} $muted={muted} {...rest}>
    {children}
  </S.Text>
));

ConditionTextSlot.displayName = 'ConditionTextSlot';
