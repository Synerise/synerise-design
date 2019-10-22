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
  background-color: ${({theme}): string => theme.palette.white};
  opacity: 1;
  padding: 8px 8px;
  
  .ant-list {
    width: 100%;
    padding: 0;
  }
`;

export const TabsDropdownDivider = styled.div`
  margin: 7.5px 0;
  height: 1px;
  width: 100%;
  box-sizing: content-box;
  background-image: linear-gradient(to right, ${({theme}): string => theme.palette.white } 66%, ${({theme}): string => theme.palette['grey-300'] } 34%);
  background-position: top;
  background-size: 5px 1px;
  background-repeat: repeat-x;

`;