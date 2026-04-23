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
`;
