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

export const InputWrapper = styled.div`
  input {
    padding: 0;
    &:before {
      display: none;
    }
    input {
      max-height: 30px;
    }
  }
`;
