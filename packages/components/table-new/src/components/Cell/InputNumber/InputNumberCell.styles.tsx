import styled from 'styled-components';

export const InputNumberCell = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${(props) =>
    props.isDisabled &&
    `
    opacity: var(--ds-opacity-disabled);
    pointer-events: none;
    `}
  max-width: 100%;
  min-width: 80px;
`;
