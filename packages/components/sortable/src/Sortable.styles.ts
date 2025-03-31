import styled, { css } from 'styled-components';

export const SortableItemContent = styled.div``;

export const SortableItemWrapper = styled.div<{ isGrabbed: boolean; isDragged: boolean }>`
  ${props =>
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
        border: 1px dashed ${props.theme.palette['blue-300']};
        background-color: ${props.theme.palette['blue-050']};
        border-radius: 3px;
      }
    `}
  ${props =>
    props.isGrabbed &&
    css`
      ${SortableItemContent} {
        background: ${props.theme.palette.white};
        box-shadow: 0px 16px 32px 0px rgba(35, 41, 54, 0.1);
      }
    `}
`;
export const SortableItemHandle = styled.div`
  cursor: grab;
`;
