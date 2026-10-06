import styled, { css, type Interpolation } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';

export const SortableItemContent = styled.div``;

export const SortableItemWrapper = styled.div<{
  isGrabbed: boolean;
  isDragged: boolean;
  placeholderCss?: Interpolation<ThemeProps>;
}>`
  ${(props) =>
    props.isDragged &&
    css`
      ${SortableItemContent} {
        visibility: hidden;
        opacity: 0;
        poiner-events: none;
      }
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px dashed var(--ds-color-border-brand-strong);
        background-color: var(--ds-color-background-brand-subtle);
        border-radius: 3px;
        ${props.placeholderCss}
      }
    `}
  ${(props) =>
    props.isGrabbed &&
    css`
      ${SortableItemContent} {
        background: var(--ds-color-background-base-default);
        box-shadow: var(--ds-shadows-shadow-2);
      }
    `}
`;
export const SortableItemHandle = styled.div`
  cursor: grab;
`;
