import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const BlankItemActions = styled.div`
  opacity: 0;
  flex: 0 1 auto;
  transition: opacity 0.2s;
  ${IconContainer} {
    color: var(--ds-color-icon-base-default);
    &:hover {
      color: var(--ds-color-icon-brand-default);
    }
  }
`;
export const DragHandle = styled.div`
  flex: 0 1 auto;
  cursor: grab;
  color: var(--ds-color-icon-base-muted);
  &:hover {
    color: var(--ds-color-icon-base-default);
  }
`;
export const BlankItemWrapper = styled.div<{
  rowGap: number;
  isDragPlaceholder?: boolean;
  isDragOverlay?: boolean;
}>`
  ${(props) =>
    props.isDragPlaceholder &&
    `  
    background: var(--ds-color-background-brand-subtle);
    border: 1px dashed var(--ds-color-border-brand-strong);
    border-radius: 3px;
    ${BlankItemContent}, ${BlankItemActions}, ${DragHandle} {
      visibility: hidden;
      opacity: 0;
    }
  `}
  ${(props) =>
    props.isDragOverlay &&
    `
    box-shadow: var(--ds-shadows-shadow-2);
    background: var(--ds-color-background-base-default);
    `}
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.rowGap}px;
  &:hover {
    ${BlankItemActions} {
      opacity: 1;
    }
  }
`;
export const BlankItemContent = styled.div`
  flex: 1 1 auto;
`;
