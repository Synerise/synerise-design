import styled from 'styled-components';

export const IconWrapper = styled.span`
  &:hover {
    cursor: pointer;
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const InputWrapper = styled.div`
  & {
    position: relative;
    display: flex;

    > * {
      min-width: 0;
    }
  }
`;

export const TextWrapper = styled.div``;
