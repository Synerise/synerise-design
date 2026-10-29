import styled from 'styled-components';

export const ToolbarWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const ToolbarDivider = styled.div`
  width: 1px;
  height: calc(100% + 8px);
  margin: -4px 0;
  background: var(--ds-color-border-base-default);
`;
export const ToolbarLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-weight: 500;
  color: var(--ds-color-text-base-muted);
`;

export const ToolbarGroup = styled.div<{ isCompact?: boolean }>`
  display: flex;
  ${(props) => !props.isCompact && `gap: 4px`};
  background: var(--ds-color-background-base-default);
  padding: 4px;
  border-radius: 3px;
  align-content: center;
  box-shadow: var(--ds-shadows-shadow-1);
`;
