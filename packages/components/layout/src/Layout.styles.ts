import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { hexToRgba } from '@synerise/ds-utils';
import { mediaQuery } from '@synerise/ds-core';
import Icon from '@synerise/ds-icon';

export const ArrowIcon = styled(Icon)``;

export const CloseIcon = styled(Icon)`
  display: none;
`;

export const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const LayoutContent = styled.div`
  overflow: hidden;
  width: 100%;
  ${mediaQuery.to.small`overflow-x: auto;`};
`;

export const LayoutHeader = styled.div`
  flex: 0;
  z-index: 1;
  box-shadow: 0 2px 6px ${(props): string => hexToRgba(props.theme.palette['grey-400'], 0.12)};
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
  overflow: hidden;
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
  ${mediaQuery.to.small`min-width: 704px;`};
`;

export const LayoutMain = styled.div`
  flex: 1;
  position: relative;
  ${mediaQuery.to.small`min-width: 704px;`};
`;

export const LayoutMainInner = styled.div`
  padding: 24px;
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`padding: 24px;`};
`;

export const SidebarButton = styled.button<{ isRight?: boolean; opened: boolean }>`
  width: 36px;
  height: 44px;
  background-color: ${(props): string => props.theme.palette['grey-500']};
  display: none;
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
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  ${mediaQuery.to.medium`display: flex; opacity: 1; visibility: visible`};
  ${mediaQuery.from.large`
      opacity: ${(props): string => (!props.opened ? '1' : '0')};
      display: ${(props): string => (!props.opened ? 'flex' : 'none')};
      visibility: ${(props): string => (!props.opened ? 'visible' : 'hidden')};
    `};
  ${ArrowIcon} {
    transition: transform 0.3s ease-in-out;
  }

  ${mediaQuery.to.medium`${(props): string => props.isRight && props.opened && 'left: -44px'}`};
  ${mediaQuery.to.medium`${(props): string => !props.isRight && props.opened && 'right: -44px'}`};

  ${(props): FlattenSimpleInterpolation | false =>
    props.opened &&
    css`
      ${mediaQuery.to.medium`width: 44px;`};
      ${mediaQuery.to.medium`background-color: ${props.theme.palette['grey-600']};`};
      ${ArrowIcon} {
        transform: rotateZ(180deg);
        ${mediaQuery.to.medium`display: none;`};
      }
      ${CloseIcon} {
        ${mediaQuery.to.medium`display: flex;`};
      }
    `};
`;

export const LayoutSidebar = styled.div<{ opened: boolean }>`
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  height: 100%;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
  transition: all 0.3s ease-in-out;
  width: 320px;
  max-width: 100%;
  
  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${mediaQuery.from.medium`flex: 0 1 320px; width: 320px;`};
  ${mediaQuery.from.large`max-width: ${(props): string => (props.opened ? '320px' : '0px')};`}
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

export const LayoutSidebarWrapper = styled.div<{ opened: boolean; isRight?: boolean }>`
  position: relative;
  overflow: visible;
  height: 100%;
  transition: transform .3s ease-in-out;
  left: ${(props): string => (props.isRight ? 'auto' : '0')};
  right: ${(props): string => (props.isRight ? '0' : 'auto')};
  z-index: 10;
  
  &:hover {
    ${SidebarButton} {
      display: flex;
      opacity: 1;
      visibility: visible;
    }
  }
  
  ${mediaQuery.to.medium`position: absolute;`};
  ${mediaQuery.to.medium`width: 320px;`};
  // @ts-ignore
  ${mediaQuery.to.medium`transform: ${({ isRight }): string =>
    isRight ? 'translateX(320px)' : 'translateX(-320px)'}`};
  
  ${(props): FlattenSimpleInterpolation | false =>
    props.opened &&
    css`
      && {
        transform: translateX(0);
      }
    `};
  )`;

export const LayoutSidebarInner = styled.div`
  padding: 24px 0;
  display: flex;
  flex-flow: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
