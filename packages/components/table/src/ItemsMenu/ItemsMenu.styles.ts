import styled from 'styled-components';

export const ItemsMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-right: 8px;
  }
  &:last-child {
    margin-right: 0;
  }
`;
