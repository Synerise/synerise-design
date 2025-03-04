import styled from 'styled-components';
import Collapse, { CollapseProps } from 'antd/lib/collapse';
import React from 'react';

const { Panel } = Collapse;

type PaletteColors = {
  'grey-700': string;
  'grey-400': string;
  'grey-800': string;
  'grey-200': string;
  'grey-050': string;
  'blue-050': string;
  'blue-600': string;
};

type ThemeProps = {
  theme: {
    palette: PaletteColors;
  };
};

const themePaletteGrey700 = (props: ThemeProps) => props.theme.palette['grey-700'];
const themePaletteGrey800 = (props: ThemeProps) => props.theme.palette['grey-800'];
const themePaletteBlue050 = (props: ThemeProps) => props.theme.palette['blue-050'];
const themePaletteGrey200 = (props: ThemeProps) => props.theme.palette['grey-200'];
const themePaletteBlue600 = (props: ThemeProps) => props.theme.palette['blue-600'];

export const SidebarHandle = styled.div`
  display: flex;
  opacity: 1;
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

export const PanelWrapper = styled.div`
  position: relative;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AntdCollapse = styled(Collapse as any as React.ComponentType<CollapseProps>)`
  &.ant-collapse {
    background-color: ${themePaletteBlue050};
    border: none;

    .ant-collapse-header {
      padding: 19px 24px;
      color: ${themePaletteGrey700};
      font-weight: 500;
      font-size: 14px;
      background: white;

      &:hover {
        color: ${themePaletteGrey800};
      }

      &:active {
        box-shadow: 0px 16px 32px 0px rgba(35, 41, 54, 0.1);
      }
    }

    > ${PanelWrapper} > .ant-collapse-item > .ant-collapse-header {
      transition: 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .ant-collapse-content-active,
    .ant-collapse-item-active {
      border-top: 0;

      ${SidebarHeader}, ${SidebarHandle} {
        color: ${themePaletteGrey700};
        &:hover {
          color: ${themePaletteGrey800};
        }
      }
    }

    .ant-collapse-content-box {
      padding: 16px 24px;
    }

    .ant-collapse-item {
      position: relative;
      border-top: solid 1px ${themePaletteGrey200};
      border-bottom: none;

      .drag-handle-m:hover {
        cursor: grabbing;
      }
    }
  }

  .ant-collapse-item:hover ${SidebarHandle} {
    opacity: 1;
  }

  &.ant-collapse-icon-position-end > ${PanelWrapper} > .ant-collapse-item > .ant-collapse-header {
    padding: 18px 24px;
    user-select: none;
    .ant-collapse-expand-icon {
      right: 24px;
      position: absolute;
    }
  }

  &.ant-collapse-icon-position-end.is-drag-drop > ${PanelWrapper} > .ant-collapse-item > .ant-collapse-header {
    padding: 18px 24px 18px 0;
    cursor: pointer;

    &:hover,
    &:active {
      color: ${themePaletteGrey800};
      box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
    }
  }
`;

export const AntdPanel = styled(Panel)`
  .ant-collapse-content {
    background-color: white;
    border-radius: 0;
    border-color: ${themePaletteGrey800};
  }
`;

export const SidebarContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SidebarContainer = styled.div`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-width: 588px;

  .ds-card-tags-sortable {
    gap: 16px 12px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .sortable-chosen,
  .sortable-drag,
  .sortable-card-ghost-element {
    cursor: grabbing;
    box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
    opacity: 1;

    &.sortable-card-ghost-element {
      border: dashed 1px ${themePaletteBlue600};
      background-color: ${themePaletteBlue050};
      * {
        visibility: hidden;
      }
    }
  }
`;
