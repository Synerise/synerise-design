import styled from 'styled-components';
import { hexToRgba } from '@synerise/ds-utils';
import { mediaQuery } from '@synerise/ds-core';

export const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LayoutHeader = styled.div`
  flex: 0;
  z-index: 1;
  box-shadow: 0 2px 6px ${(props): string => hexToRgba(props.theme.palette['grey-400'], 0.12)};
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const LayoutBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  ${mediaQuery.to.medium`overflow: auto;`};
  ${mediaQuery.from.medium`flex-direction: row;`};
`;

export const LayoutMain = styled.div`
  flex: 1;
  position: relative;
  ${mediaQuery.from.medium`overflow: auto;`};
`;

export const LayoutMainInner = styled.div`
  padding: 24px 12px;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`padding: 24px;`};
`;

export const LayoutSidebar = styled.div`
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  height: 100%;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`flex: 0 1 324px; width: 324px;`};

  ${mediaQuery.from.medium`
    &.slide-enter {
      max-width: 0;
    }
    &.slide-enter.slide-enter-active {
      max-width: 324px;
    }
    &.slide-leave {
      max-width: 324px;
    }
    &.slide-leave.slide-leave-active {
      max-width: 0;
    }
  `};
`;

export const LayoutSidebarInner = styled.div`
  padding: 24px 0;
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
