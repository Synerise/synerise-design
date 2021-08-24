import styled from 'styled-components';

export const SidebarWithButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;
export const TextWrapper = styled.div`
  padding-right: 8px;
`;
