import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const BottomAction = styled.div`
  background-color: ${(props): string => props.theme.palette['grey-050']};
  padding: 0 20px;
  height: 52px;
  display: flex;
  align-items: center;
  color: ${(props): string => props.theme.palette['grey-600']};
  font-weight: 500;
  border-width: 1px 0 0 0;
  border-color: ${(props): string => props.theme.palette['grey-100']};
  border-style: solid;
  margin-top: 8px;
  cursor: pointer;
`;
