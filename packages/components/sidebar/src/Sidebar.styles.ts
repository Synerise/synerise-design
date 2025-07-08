import Collapse from 'antd/lib/collapse';
import styled, { css } from 'styled-components';

const { Panel } = Collapse;

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

const expandIconStyles = css`
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
`;

const headerStyle = css`
  padding: 18px 24px;
  color: ${(props) => props.theme.palette['grey-700']};
  font-weight: 500;
  font-size: 14px;
  background: white;
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.palette['grey-800']};
  }
`;

export const AntdCollapse = styled(Collapse)`
  &.ant-collapse {
    background-color: ${(props) => props.theme.palette['blue-050']};
    border: none;

    .ant-collapse-arrow {
      position: static !important;
      vertical-align: 0 !important;
      transform: none !important;
      display: block;
    }

    .ant-collapse-header {
      ${headerStyle}
    }

    ${DraggablePanelWrapper} > .ant-collapse-item > .ant-collapse-header {
      transition: 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .ant-collapse-content-active,
    .ant-collapse-item-active {
      border-top: 0;

      ${SidebarHeader}, ${SidebarHandle} {
        color: ${(props) => props.theme.palette['grey-700']};
        &:hover {
          color: ${(props) => props.theme.palette['grey-800']};
        }
      }
    }

    .ant-collapse-content-box {
      padding: 16px 24px;
    }

    .ant-collapse-item {
      position: relative;
      border-top: solid 1px ${(props) => props.theme.palette['grey-200']};
      border-bottom: none;
    }
  }

  .ant-collapse-item:hover ${SidebarHandle} {
    opacity: 1;
  }

  &.ant-collapse-icon-position-end {
    .ant-collapse-item > .ant-collapse-header {
      padding: 18px 24px;
      user-select: none;
      .ant-collapse-expand-icon {
        ${expandIconStyles}
      }
    }

    &.ant-collapse-icon-position-end.is-drag-drop
      ${DraggablePanelWrapper}
      > .ant-collapse-item {
      &:hover {
        color: ${(props) => props.theme.palette['grey-800']};
      }
    }
  }
`;

export const AntdPanel = styled(Panel)<{ isDragOverlay?: boolean }>`
  ${(props) =>
    props.isDragOverlay &&
    css`
      box-shadow: ${props.theme.variables['box-shadow-2']};
      z-index: 10;
    `}
  .ant-collapse-content {
    background-color: white;
    border-radius: 0;
    border: none;
  }
`;

export const SidebarContentWrapper = styled.div``;

export const DragOverlay = styled.div``;
export const DragOverlayHeader = styled.div`
  border-top: 1px solid ${(props) => props.theme.palette['grey-200']};
  padding: 18px 24px;
  user-select: none;
  ${headerStyle}
`;
export const DragOverlayContent = styled.div`
  background-color: white;
  padding: 16px 24px;
`;
export const ExpandIcon = styled.div`
  ${expandIconStyles}
`;
