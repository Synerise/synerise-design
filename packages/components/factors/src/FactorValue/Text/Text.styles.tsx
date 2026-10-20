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
      /* Mirrors what FactorInput already does for the autocomplete: let the
         input grow into the slot when an ancestor offers one. Inert on its
         own — flex-grow does not affect max-content, so nothing widens unless
         something above actually grows. */
      flex-grow: 1;
    }
  }
`;

export const TextWrapper = styled.div``;
