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
  border-top: 1px dashed ${(props): string => props.theme.palette['grey-300']};
  margin: 6px 0 0;
  padding: 6px 0 6px 4px;
`;
export const DropdownWrapper = styled.div`
  background: ${(props): string => props.theme.palette.white };
  width: 216px;
`;