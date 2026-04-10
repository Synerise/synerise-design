import styled, { css } from 'styled-components';

import { commonRowStyles } from '../../../Table.styles';
import { Td } from '../TableCell/TableCell.styles';

export const Tr = styled.tr<{ isChild?: boolean }>`
  ${commonRowStyles}

  & ${Td} {
    background: ${(props) =>
      props.theme.palette[props.isChild ? 'grey-050' : 'white']};
  }
  &:hover {
    ${Td} {
      background: ${(props) =>
        props.theme.palette[props.isChild ? 'grey-100' : 'grey-050']};
    }
  }
`;

export const VirtualRow = styled.tr<{ isChild?: boolean; isVisible?: boolean }>`
  ${(props) =>
    !props.isVisible &&
    css`
      &&& {
        height: 0 !important;
        overflow: hidden;
        display: block;
      }
    `}

  ${commonRowStyles}

  & ${Td} {
    background: ${(props) =>
      props.theme.palette[props.isChild ? 'grey-050' : 'white']};

    ${(props) =>
      props.isChild &&
      css`
        &:first-child:before {
          content: '';
          display: block;
          
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 100%;
          background-color: ${props.theme.palette['grey-500']};};
        }
      `}
  }
  &:hover {
    ${Td} {
      background: ${(props) =>
        props.theme.palette[props.isChild ? 'grey-100' : 'grey-050']};
    }
  }
`;
