import styled from 'styled-components';

import { commonRowStyles } from '../../Table.styles';
import { Td } from './TableCell/TableCell.styles';

export const Tr = styled.tr`
  ${commonRowStyles}
  &:hover {
    ${Td} {
      background: var(--ds-color-background-base-subtle);
    }
  }
`;

export const TBody = styled.tbody`
  position: relative;
  display: block;
`;

// Wrapper row + cell for `expandable.expandedRowRender` content. Spans every
// visible column so the rendered ReactNode can lay itself out freely.
export const ExpandedContentRow = styled.tr`
  background: var(--ds-color-background-base-default);
`;

export const ExpandedContentCell = styled.td`
  padding: 0;
  background: var(--ds-color-background-base-subtle);
  border-bottom: 1px solid var(--ds-color-border-base-default);
  position: relative;

  tr:hover & {
    background: var(--ds-color-background-base-muted);
  }

  &:before {
    position: absolute;
    width: 2px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: var(--ds-color-background-neutral-solidhover);
    content: '';
  }
`;
