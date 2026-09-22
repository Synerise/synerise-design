import styled from 'styled-components';

export const EntityOuter = styled.span`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const EntityRow = styled.span<{ $gap: string }>`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ $gap }) => $gap};
`;
