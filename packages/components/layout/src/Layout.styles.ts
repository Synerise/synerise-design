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

export const LayoutSubheader = styled.div`
  margin: 0 1px;
  position: relative;
  max-width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
`;

export const LayoutBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow: hidden;
  ${mediaQuery.from.medium`flex-direction: row;`};
  //min-width: 768px;
`;

export const LayoutMain = styled.div`
  flex: 1;
  position: relative;
`;

export const LayoutMainInner = styled.div`
  padding: 24px;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`padding: 24px;`};
`;

export const SidebarButton = styled.button<{ isRight?: boolean }>`
  width: 36px;
  height: 44px;
  background-color: ${(props): string => props.theme.palette['grey-500']};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  border-radius: ${(props): string => (props.isRight ? '3px 0 0 3px' : '0 3px 3px 0')};
  right: ${(props): string => (props.isRight ? 'auto' : '-36px')};
  left: ${(props): string => (!props.isRight ? 'auto' : '-36px')};
  top: 48px;
  outline: 0;
  border: 0;
`;

export const LayoutSidebarWrapper = styled.div<{ opened: boolean; isRight?: boolean }>`
  position: absolute;
  overflow: visible;
  width: 320px;
  height: 100%;
  transition: transform .3s ease-in-out;
  left: ${(props): string => (props.isRight ? 'auto' : '0')};
  right: ${(props): string => (props.isRight ? '0' : 'auto')};
  z-index: 10;
  transform: ${(props): string => {
    if (props.opened) {
      return 'translateX(0)';
    }
    return props.isRight ? 'translateX(320px)' : 'translateX(-320px)';
  }};
  )`;

export const LayoutSidebar = styled.div`
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  height: 100%;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
  transition: all 0.3s ease-in-out;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`flex: 0 1 320px; width: 320px;`};

  ${mediaQuery.from.medium`
    &.slide-enter {
      max-width: 0;
    }
    &.slide-enter.slide-enter-active {
      max-width: 320px;
    }
    &.slide-leave {
      max-width: 320px;
    }
    &.slide-leave.slide-leave-active {
      max-width: 0;
    }
  `};
  ${mediaQuery.to.medium`
    position: absolute;
    top: 0;
    left: 0;
    width: 320px
  `}
  }
`;

export const LayoutSidebarInner = styled.div`
  padding: 24px 0;
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
