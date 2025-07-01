import styled from 'styled-components';

export const ContentWrapper = styled.div`
  padding: 12px 140px 12px 0;
  border-bottom: 1px dashed
    ${(props): string => props.theme.palette['grey-300']};
  margin: 0 24px;
`;
export const DrawerContent = styled.div`
  padding: 0px;
`;
