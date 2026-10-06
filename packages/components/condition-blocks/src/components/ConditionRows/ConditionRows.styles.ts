import styled from 'styled-components';

export const Rows = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* Fill the width left of the entity chip, but stay shrinkable so rows never overflow. */
  flex-grow: 1;
  min-width: 0;
  gap: ${({ $gap }) => $gap};
`;
