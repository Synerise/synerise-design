import styled from 'styled-components';

export const ColumnManagerActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props): string => props.theme.palette['grey-050']};
  padding: 24px;
  position: absolute;
  width: 100%;
  bottom: 0;
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
