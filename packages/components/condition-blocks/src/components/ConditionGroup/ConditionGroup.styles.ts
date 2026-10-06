import styled from 'styled-components';

export const Group = styled.div<{ $gap: string }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${({ $gap }) => $gap};
`;
