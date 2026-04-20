import styled, { css } from 'styled-components';

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

export const TBody = styled.tbody<{
  $maxHeight?: number;
  withBodyScroll?: boolean;
}>`
  position: relative;
  ${(props) =>
    props.withBodyScroll &&
    css`
      display: block;
      max-height: ${props.$maxHeight ?? 800}px;
      overflow-y: scroll;
    `}
`;
