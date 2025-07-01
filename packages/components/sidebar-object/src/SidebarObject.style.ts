import styled from 'styled-components';

export const FooterContainer = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props): string => props.theme.palette['grey-050']};
  border-top: solid 1px ${(props): string => props.theme.palette['grey-100']};
`;
export const SidebarObjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const ContentPlaceholder = styled.div`
  display: flex;
  flex: 1;
`;
export const ContentContainer = styled.div`
  padding: 24px;
  display: flex;
  flex: 1;
`;
