import styled from 'styled-components';

import { expandIconStyle, headerStyle } from './Collapse/Collapse.styles';

export const SidebarHandle = styled.div`
  display: flex;
  opacity: 1;
  transition: 0.2s ease-in-out;
  cursor: grabbing;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  max-height: 20px;
`;

export const DraggablePanelWrapper = styled.div`
  position: relative;
`;

export const SidebarContentWrapper = styled.div``;

export const DragOverlay = styled.div``;

export const DragOverlayHeader = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette['grey-200']};
  ${headerStyle}
  user-select: none;
`;

export const DragOverlayContent = styled.div`
  background-color: white;
  padding: 16px 24px;
`;

export const ExpandIcon = styled.div`
  ${expandIconStyle}
`;
