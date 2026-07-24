import styled from 'styled-components';

export const IconWrapper = styled.span`
  &:hover {
    cursor: pointer;
    svg {
      color: var(--ds-color-text-brand-default);
      fill: var(--ds-color-icon-brand-default);
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
