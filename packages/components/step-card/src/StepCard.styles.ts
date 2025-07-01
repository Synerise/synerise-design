import styled, { css, keyframes } from 'styled-components';

import Icon from '@synerise/ds-icon';

const fadeout = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0;
  }
`;

export const DragPlaceholder = styled.div`
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  display: none;
  align-items: center;
`;

export const DragPlaceholderContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100% - 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.palette['blue-600']};
`;
export const DragPlaceholderTag = styled.div`
  position: absolute;
  right: 24px;
  top: 22px;
  opacity: 0.4;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.palette.white};
  box-shadow: 0 4px 12px 0 #2329360a;
  border-radius: 3px;
`;

export const Container = styled.div<{
  isDragged?: boolean;
  isDragOverlay?: boolean;
}>`
  width: 100%;
  min-width: 594px;

  ${(props) =>
    (props.isDragged || props.isDragOverlay) &&
    css`
      cursor: grabbing;
      width: 100%;
      opacity: 1 !important;
      padding: 0;

      ${props.isDragged && // dragged item - blue placeholder
      css`
        height: 100px;
        ${DragPlaceholder}${DragPlaceholder} {
          visibility: visible;
          opacity: 1;
          display: block;
        }
        ${Content} {
          visibility: hidden;
          opacity: 0;
        }
      `}

      ${props.isDragOverlay && // grabbed item on top layer
      css`
        ${Content} {
          height: 76px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        ${RightSide} {
          display: none;
        }
      `}

      ${DragIcon}${DragIcon} {
        visibility: visible;
        opacity: 1;
      }
      ${Body} {
        position: absolute;
        opacity: 0;
        height: 0;
      }
      ${Footer} {
        display: none;
      }
    `}
`;

export const RecentlyMoved = styled.span<{ duration: number }>`
  animation: ${fadeout} 0.1s linear ${(props) => (props.duration - 200) / 1000}s
    1 forwards;
`;

export const CountDownWrapper = styled.div`
  vertical-align: middle;
  display: inline-block;
  width: 24px;
  height: 24px;
  color: inherit;
`;

export const MoveByOffsetLabel = styled.span``;

export const CountDownSpinner = styled.g<{ duration: number }>`
  stroke: ${(props) => props.theme.palette['grey-500']};
  stroke-width: 2px;
  stroke-dasharray: 75;
  transition: stroke-dashoffset ${(props) => props.duration}s linear;
`;

export const MoveByOffset = styled.span<{ offset: number }>`
  display: flex;
  align-items: center;
  gap: 2px;
  ${MoveByOffsetLabel} {
    display: ${(props) => (props.offset === 0 ? 'none' : 'block')};
  }
`;

export const CrudsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  visibility: hidden;
`;

export const DragIcon = styled(Icon)`
  visibility: hidden;
  opacity: 0;
`;

export const Header = styled.div<{ isDraggable?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 22px 0;
  margin: 0 24px 0 0;
  width: 100%;
  max-width: calc(100% - 24px);
  position: relative;
  cursor: ${(props) => (props.isDraggable ? 'grab' : 'default')};
  &:hover {
    ${RecentlyMoved} {
      display: none;
    }
    ${CrudsWrapper} {
      opacity: 1;
      visibility: visible;
    }
    ${DragIcon} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const StepCardTitle = styled.div`
  display: flex;
  gap: 8px;
`;

export const Middle = styled.div`
  flex-grow: 1;
`;

export const LeftSide = styled.div<{ isDraggable?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: ${({ isDraggable }) => (isDraggable ? '0' : '24px')};
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * {
    margin-left: 8px;
  }
`;

export const Body = styled.div<{ singleStepCondition: boolean }>`
  padding: ${({ singleStepCondition }) =>
    singleStepCondition ? '0' : '0 0 24px'};
  width: 100%;

  .ds-conditions {
    &:first-of-type {
      padding-top: 0;
    }
    &:last-of-type {
      padding-bottom: 0;
    }
  }
`;

export const AdditionalFields = styled.div`
  width: 100%;
  padding: 24px 24px 12px;
  border-top: 1px solid ${(props) => props.theme.palette['grey-200']};
`;

export const Footer = styled.div`
  background-color: rgba(249, 250, 251, 0.6);
  border-top: 1px solid ${(props) => props.theme.palette['grey-100']};
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  > * {
    margin-left: 8px;
  }
`;
