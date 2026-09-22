import React, { forwardRef } from 'react';

import { ErrorMessage } from '../../errorMessage.styles';
import * as S from './ConditionSlot.styles';
import type { ConditionSlotProps } from './ConditionSlot.types';

/**
 * Sizing wrapper for a single control in a `ConditionRow`. Choose a `variant` preset
 * (`rigid` / `fill` / `shrink`) or set `grow` / `shrink` / `basis` / `minWidth` / `maxWidth`
 * explicitly; the internal `min-width: 0` cascade lets it shrink below intrinsic width. Renders
 * an optional `errorMessage` below the control.
 */
export const ConditionSlot = forwardRef<HTMLDivElement, ConditionSlotProps>(
  (
    {
      children,
      variant = 'rigid',
      grow,
      shrink,
      basis = 'auto',
      minWidth,
      maxWidth,
      errorMessage,
      ...rest
    },
    ref,
  ) => (
    <S.Slot
      ref={ref}
      $variant={variant}
      $grow={grow}
      $shrink={shrink}
      $basis={basis}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      {...rest}
    >
      <S.SlotContent>{children}</S.SlotContent>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </S.Slot>
  ),
);

ConditionSlot.displayName = 'ConditionSlot';
