import styled from 'styled-components';

export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
  color: ${(props) => props.theme.palette['grey-700']};
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
  color: ${(props) => props.theme.palette['grey-700']};
  transition: color 0.3s ease;
`;

export const BackActionWrapper = styled.div`
  padding: 0 8px;
  &:hover {
    ${Label} {
      color: ${(props) => props.theme.palette['grey-800']};
    }
    ${IconWrapper} {
      color: ${(props) => props.theme.palette['grey-800']};
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 14px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
