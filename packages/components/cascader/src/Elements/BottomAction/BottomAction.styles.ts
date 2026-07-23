import styled from 'styled-components';

export const IconWrapper = styled.div`
  margin-right: 4px;
  svg {
    fill: var(--ds-color-icon-base-default);
  }
`;

export const TextWrapper = styled.div`
  line-height: 12px;
`;

export const BottomAction = styled.div`
  background-color: var(--ds-color-background-base-subtle);
  padding: 0 16px;
  height: 52px;
  display: flex;
  align-items: center;
  color: var(--ds-color-text-base-muted);
  font-weight: 500;
  border-width: 1px 0 0 0;
  border-color: var(--ds-color-border-base-subtle);
  border-style: solid;
  margin-top: 8px;
  cursor: pointer;
`;
