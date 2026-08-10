import styled from 'styled-components';

export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
  color: var(--ds-color-text-base-subtle);
`;

export const IconWrapper = styled.div`
  margin-right: 12px;
  color: var(--ds-color-text-base-subtle);
  transition: color 0.3s ease;
`;

export const BackActionWrapper = styled.div`
  padding: 0 8px;
  &:hover {
    ${Label} {
      color: var(--ds-color-text-base-default);
    }
    ${IconWrapper} {
      color: var(--ds-color-text-base-default);
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 14px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
