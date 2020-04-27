import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
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
