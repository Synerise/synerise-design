import styled from 'styled-components';

export const IconWrapper = styled.span`
  color: var(--ds-form-icon-color-default);
  &:hover {
    cursor: pointer;
    color: var(--ds-color-icon-brand-default);
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
