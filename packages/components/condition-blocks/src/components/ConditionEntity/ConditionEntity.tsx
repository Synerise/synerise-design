import React, { forwardRef } from 'react';

import { toCssSize } from '@synerise/ds-utils';

import { ErrorMessage } from '../../errorMessage.styles';
import * as S from './ConditionEntity.styles';
import type { ConditionEntityProps } from './ConditionEntity.types';

/**
 * Wrapper for the entity/context area at the start of a condition group. Lays out one or more
 * chip slots in a row (12px gap by default) and renders an optional `errorMessage` below.
 * Presentational only — the consuming app renders the actual chip(s) inside (e.g. a `ds-button`
 * in custom-color mode, or `ds-context-selector`).
 */
export const ConditionEntity = forwardRef<
  HTMLSpanElement,
  ConditionEntityProps
>(({ children, gap = 12, errorMessage, ...rest }, ref) => (
  <S.EntityOuter ref={ref} {...rest}>
    <S.EntityRow $gap={toCssSize(gap)}>{children}</S.EntityRow>
    {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
  </S.EntityOuter>
));

ConditionEntity.displayName = 'ConditionEntity';
