import styled from 'styled-components';
import { RawInput } from '@synerise/ds-input';

// eslint-disable-next-line import/prefer-default-export
export const IconWrapper = styled.span`
  &:hover {
    cursor: pointer;
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const Input = styled(RawInput)`
  &:before {
    display: none;
  }
`;
