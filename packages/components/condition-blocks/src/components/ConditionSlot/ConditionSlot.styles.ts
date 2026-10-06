import styled, { css } from 'styled-components';

import { toCssSize } from '@synerise/ds-utils';

import { CONDITION_REMOVE_CLASS } from '../../constants';
import type { ConditionSlotVariant } from './ConditionSlot.types';

// Flex budgets copied 1:1 from ds-condition's slot wrappers:
//   rigid -> flex: 0 0 (operator) · fill -> flex: 30 1 (factor) · shrink -> flex: 0 400 (parameter)
const VARIANT_FLEX: Record<
  ConditionSlotVariant,
  { grow: number; shrink: number }
> = {
  rigid: { grow: 0, shrink: 0 },
  fill: { grow: 30, shrink: 1 },
  shrink: { grow: 0, shrink: 400 },
};

export const Slot = styled.div<{
  $variant: ConditionSlotVariant;
  $grow?: number;
  $shrink?: number;
  $basis: string;
  $minWidth?: number | string;
  $maxWidth?: number | string;
}>`
  display: flex;
  flex-direction: column;
  min-width: 0;

  flex-grow: ${({ $variant, $grow }) => $grow ?? VARIANT_FLEX[$variant].grow};
  flex-shrink: ${({ $variant, $shrink }) =>
    $shrink ?? VARIANT_FLEX[$variant].shrink};
  flex-basis: ${({ $basis }) => $basis};

  ${({ $minWidth }) =>
    $minWidth !== undefined &&
    css`
      min-width: ${toCssSize($minWidth)};
    `}
  ${({ $maxWidth }) =>
    $maxWidth !== undefined &&
    css`
      max-width: ${toCssSize($maxWidth)};
    `}
  /* ds-input renders its group items with an intrinsic min-width, which would stop the slot
     shrinking below the control's natural size and break the row's no-overflow guarantee. */
  .ds-input-group-item {
    min-width: 0;
  }
`;

// Holds the control itself. The min-width:0 cascade lets it shrink below intrinsic width so the
// row never overflows its parent.
export const SlotContent = styled.div`
  display: flex;
  min-width: 0;
  > * {
    min-width: 0;
  }

  /* A ConditionRemove nested in the last slot sits beside its control, so the slot supplies its
     8px offset. The button carries no margin of its own — placed straight in a ConditionRow it is
     spaced by that row's gap instead, and a margin would stack on top of it. */
  > .${CONDITION_REMOVE_CLASS} {
    margin-left: 8px;
  }
`;
