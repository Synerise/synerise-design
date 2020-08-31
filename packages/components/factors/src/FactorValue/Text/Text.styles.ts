import styled from 'styled-components';

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
