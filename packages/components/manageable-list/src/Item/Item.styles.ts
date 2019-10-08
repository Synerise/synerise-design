import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const ItemActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  span {
    margin: 0 0 0 8px;
  }
`;

export const ItemIcon = styled.span`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ccc;
  border-radius: 50%;
  margin-right: 8px;
`;
