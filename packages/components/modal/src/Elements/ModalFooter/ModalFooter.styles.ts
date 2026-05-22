import styled from 'styled-components';

export const FooterContainer = styled.div`
  min-height: 81px;
  background: ${(props) => props.theme.palette['grey-050']};
  padding: 24px 24px;
  border-top: 1px solid ${(props) => props.theme.palette['grey-100']};
  border-radius: 0 0 3px 3px;
`;
export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;
