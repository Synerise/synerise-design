import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  padding: 16px 0;
  border-bottom: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  margin: 0 24px;
`;

export const ButtonWrapper = styled.div`
  padding: 0 4px;
`;
export const DrawerHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const MenuWrapper = styled.div`
  border-bottom: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  margin: 0 4px;
  padding-bottom: 6px;
`;
