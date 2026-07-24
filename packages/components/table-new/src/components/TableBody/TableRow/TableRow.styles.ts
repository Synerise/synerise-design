import styled, { css } from 'styled-components';

import { commonRowStyles } from '../../../Table.styles';
import { Td } from '../TableCell/TableCell.styles';

export const Tr = styled.tr<{ isChild?: boolean }>`
  ${commonRowStyles}

  & ${Td} {
    background: ${(props) =>
      props.isChild
        ? 'var(--ds-color-background-base-subtle)'
        : 'var(--ds-color-background-base-default)'};
  }
  &:hover {
    ${Td} {
      background: ${(props) =>
        props.isChild
          ? 'var(--ds-color-background-base-muted)'
          : 'var(--ds-color-background-base-subtle)'};
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
      props.isChild
        ? 'var(--ds-color-background-base-subtle)'
        : 'var(--ds-color-background-base-default)'};

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
          background-color: var(--ds-color-background-base-stronghover);
        }
      `}
  }
  &:hover {
    ${Td} {
      background: ${(props) =>
        props.isChild
          ? 'var(--ds-color-background-base-muted)'
          : 'var(--ds-color-background-base-subtle)'};
    }
  }
`;
