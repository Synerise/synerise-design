import styled from 'styled-components';
import Collapse, { CollapseProps } from 'antd/lib/collapse';
import * as React from 'react';
import { BlockContent } from '@synerise/ds-block/dist/Block.styles';

const { Panel } = Collapse;

export const SidebarHandle = styled.div`
  display: flex;
  opacity: 0;
  transition: 0.2s ease-in-out;

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

  span {
    order: 1;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdCollapse = styled((Collapse as any) as React.ComponentType<CollapseProps>)`
  &.ant-collapse {
    background-color: rgba(11, 104, 255, 0.04);
    border: none;
    box-shadow: 1px


    &,
    *:not(${BlockContent}) {
      border-radius: 0 !important;
    }

    > .ant-collapse-item > .ant-collapse-header {
      color: ${(props): string => props.theme.palette['grey-700']};
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      transition: 0.2s ease-in-out;

      &:hover {
        color: ${(props): string => props.theme.palette['grey-800']};
      }
    }

    .ant-collapse-content-active {
      border-top: 0;
    }

    .ant-collapse-item-active {
      border-top: 0;

      ${SidebarHeader} {
        color: ${(props): string => props.theme.palette['grey-800']};
      }

      ${SidebarHandle} {
        opacity: 1;
      }
    }

    .ant-collapse-content-box {
      padding: 0px 24px 24px;
    }

    .ant-collapse-item {
      position: relative;
      background-color: #fff;
      border-top: solid 1px ${(props): string => props.theme.palette['grey-200']};
      border-bottom: none;

    }
  }

  .ant-collapse-item:hover {
    ${SidebarHandle} {
      opacity: 1;
    }
  }

  &.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
    padding: 18px 24px;
    user-select: none;

    .ant-collapse-arrow {
      right: 24px;
    }
  }

  &.ant-collapse-icon-position-right.is-drag-drop > .ant-collapse-item > .ant-collapse-header {
    padding: 18px 24px 18px 0;
  }
`;

export const AntdPanel = styled(Panel)`
  .ant-collapse-content {
    background-color: white;
    border-radius: 0;
    border-color: ${(props): string => props.theme.palette['grey-800']};
  }
`;

export const SidebarContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
