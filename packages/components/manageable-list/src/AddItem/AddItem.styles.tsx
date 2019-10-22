import styled from 'styled-components';

export const AddItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
  padding: 4px 12px;
  button {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 36px;
    padding: 0 !important;

    svg {
      color: ${({ theme }): string => theme.palette['grey-500']} !important;
      fill: ${({ theme }): string => theme.palette['grey-500']} !important;
    }
  }
`;

export const AddItemLabel = styled.span`
  margin-left: 12px;
  color: ${({ theme }): string => theme.palette['grey-600']};
`;
