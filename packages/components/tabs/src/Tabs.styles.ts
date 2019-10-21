import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: hidden;
`;

export const TabsDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.palette.white};
  opacity: 1;
`;