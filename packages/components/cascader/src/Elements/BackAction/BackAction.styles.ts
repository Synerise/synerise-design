import styled from 'styled-components';

export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const IconWrapper = styled.div`
  margin-right: 12px;

  svg {
    transition: fill 0.3s ease;
    fill: ${(props): string => props.theme.palette['grey-700']};
  }
`;

export const BackActionWrapper = styled.div`
  &:hover {
    ${Label} {
      color: ${(props): string => props.theme.palette['grey-800']};
    }
    ${IconWrapper} {
      svg {
        fill: ${(props): string => props.theme.palette['grey-800']};
      }
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ButtonContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px;
`;
export const ButtonLabelWrapper = styled.div`
  padding-left: 16px;
`;
