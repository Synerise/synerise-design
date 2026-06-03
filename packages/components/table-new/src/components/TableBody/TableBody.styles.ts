import styled from 'styled-components';

import { commonRowStyles } from '../../Table.styles';
import { Td } from './TableCell/TableCell.styles';

export const Tr = styled.tr`
  ${commonRowStyles}
  &:hover {
    ${Td} {
      background: ${(props) => props.theme.palette['grey-050']};
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
  background: ${(props) => props.theme.palette['white']};
`;

export const ExpandedContentCell = styled.td`
  padding: 0;
  background: ${(props) => props.theme.palette['grey-050']};
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-200']};
  position: relative;

  tr:hover & {
    background: ${(props) => props.theme.palette['grey-100']};
  }

  &:before {
    position: absolute;
    width: 2px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${(props) => props.theme.palette['grey-600']};
    content: '';
  }
`;
