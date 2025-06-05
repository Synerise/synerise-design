import styled from 'styled-components';

export const ColumnManagerActions = styled.div`
  display: flex;
  flex: 0 0 80px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props => props.theme.palette['grey-050']};
  padding: 24px;
`;

export const RightButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button {
    margin-left: 8px;
  }
`;
