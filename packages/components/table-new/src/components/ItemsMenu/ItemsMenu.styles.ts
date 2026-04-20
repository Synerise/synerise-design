import styled from 'styled-components';

export const ItemsMenu = styled.div<{ $withLeftPadding?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  ${({ $withLeftPadding }) => $withLeftPadding && 'padding-left: 24px;'}
`;
