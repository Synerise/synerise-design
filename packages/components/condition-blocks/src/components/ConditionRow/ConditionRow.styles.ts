import styled, { css } from 'styled-components';

import { CONDITION_REMOVE_CLASS } from '../../constants';
import type { ConditionRowAlign } from './ConditionRow.types';

const ALIGN_ITEMS: Record<ConditionRowAlign, string> = {
  start: 'flex-start',
  center: 'center',
  baseline: 'baseline',
};

const revealRemove = css`
  opacity: 1;
  pointer-events: auto;
`;

export const RowOuter = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: row;
  /* Stretch so the connector cell spans the content column (slots + any error) full height. */
  align-items: stretch;
  gap: ${({ $gap }) => $gap};
  /* Fill available width but stay shrinkable so children never push past the parent. */
  flex-grow: 1;
  min-width: 0;

  &:hover .${CONDITION_REMOVE_CLASS} {
    ${revealRemove}
  }

  /* Also reveal on focus-within, so reaching the remove button by keyboard works the same way
     reaching it with the mouse does. */
  &:focus-within .${CONDITION_REMOVE_CLASS} {
    ${revealRemove}
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
`;

export const Row = styled.div<{ $gap: string; $align: ConditionRowAlign }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: ${({ $align }) => ALIGN_ITEMS[$align]};
  gap: ${({ $gap }) => $gap};
  min-width: 0;
`;
