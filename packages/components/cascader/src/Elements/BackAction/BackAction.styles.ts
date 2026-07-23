import styled from 'styled-components';

export const Label = styled.div`
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
  color: var(--ds-color-text-base-subtle);
`;

export const IconWrapper = styled.div`
  margin-right: 12px;

  svg {
    transition: fill 0.3s ease;
    fill: var(--ds-color-text-base-subtle);
  }
`;

export const BackActionWrapper = styled.div`
  padding: 0 8px;
  &:hover {
    ${Label} {
      color: var(--ds-color-text-brand-default);
    }
    ${IconWrapper} {
      color: var(--ds-color-text-brand-default);
    }
  }
`;

export const ContentWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
