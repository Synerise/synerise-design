import styled from 'styled-components';

export const BackActionWrapper = styled.div`
  padding: 0 16px;
`;

export const ContentWrapper = styled.div`
  padding: 14px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${(props): string => props.theme.palette['grey-700']};
`;
