import styled, {
  type FlattenSimpleInterpolation,
  css,
} from 'styled-components';

import { mediaQuery } from '@synerise/ds-core';
import Icon from '@synerise/ds-icon';
import { hexToRgba } from '@synerise/ds-utils';

const DEFAULT_TOP_OFFSET = 55;

export const ArrowIcon = styled(Icon)``;

export const CloseIcon = styled(Icon)`
  && {
    display: none;
  }
`;

export const LayoutContent = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  ${mediaQuery.to.small`overflow-x: auto;`};
`;

export const LayoutHeader = styled.div`
  &&& {
    margin: 0;
    display: block;
    width: 100%;
  }
  z-index: 1;
  box-shadow: 0 2px 6px
    ${(props): string => hexToRgba(props.theme.palette['grey-400'], 0.12)};
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const LayoutSubheader = styled.div`
  position: relative;
  max-width: 100%;
  top: 0;
  z-index: 1;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
`;

export const LayoutBody = styled.div<{ allowOverflow?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: row;
  min-height: 0;
  min-width: 0;
  position: relative;
  overflow: hidden;
  height: 100%;
  ${mediaQuery.to.small`min-width: 704px;}`};
  ${(props) => props.allowOverflow && mediaQuery.to.small`overflow-x: auto;`};
`;

export const LayoutMain = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
  ${mediaQuery.to.small`min-width: 704px;`};
  ${mediaQuery.to.medium`height: 100%;`};
`;

export const LayoutMainInner = styled.div<{ fullPage: boolean }>`
  ${mediaQuery.from.medium`padding: 24px;`};
  && {
    padding: ${(props): string => (props.fullPage ? '0' : '24px')};
  }
`;

export const LayoutContainer = styled.div<{
  nativeScroll?: boolean;
  fillViewport?: boolean;
  viewportTopOffset?: number;
}>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${(props) =>
    props.fillViewport &&
    css`
      position: absolute;
      width: 100%;
      height: calc(
        100vh -
          ${props.viewportTopOffset !== undefined
            ? props.viewportTopOffset
            : DEFAULT_TOP_OFFSET}px
      );
    `};

  ${LayoutMain} {
    ${(props) =>
      props.nativeScroll &&
      css`
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `};
  }
  ${LayoutMainInner} {
    overflow: ${(props) => (props.nativeScroll ? 'auto' : 'hidden')};
    ${(props) =>
      props.nativeScroll
        ? `
        flex-grow: 1;
        position: relative;
      `
        : `${mediaQuery.to.medium`flex: 0 0 auto;`};`};
  }
`;

type SidebarButtonProps = {
  right?: boolean;
  opened: boolean;
  withSubheader?: boolean;
  bothOpened?: boolean;
};

export const SidebarButton = styled.button<SidebarButtonProps>`
  width: 36px;
  height: 44px;
  background-color: ${(props): string => props.theme.palette['grey-500']};
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  border-radius: ${(props): string =>
    props.right ? '3px 0 0 3px' : '0 3px 3px 0'};
  right: ${(props): string => (props.right ? 'auto' : '-32px')};
  left: ${(props): string => (!props.right ? 'auto' : '-32px')};
  top: ${(props): string => (props.withSubheader ? '170px' : '48px')};
  outline: 0;
  border: 0;
  display: flex;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease;
  z-index: 1;
  ${(props) =>
    mediaQuery.to
      .medium`display: flex; ${props.theme.palette.white} opacity: 1; visibility: visible`};

  ${ArrowIcon} {
    transition: transform 0.3s ease;
  }
  ${(props) => mediaQuery.to.medium`
    ${props.right && props.opened && 'left: -44px'}
  `};

  ${(props) =>
    props.right &&
    props.opened &&
    mediaQuery.to.medium`
    'left: -44px'}
  `};

  ${(props) =>
    !props.right && props.opened && mediaQuery.to.medium`right: -44px`};

  ${(props) =>
    props.right &&
    props.bothOpened &&
    mediaQuery.to.small`transform: translateY(56px)`}

  ${(props) =>
    props.opened &&
    css`
      right: ${props.right ? 'auto' : '-4px'};
      left: ${!props.right ? 'auto' : '-4px'};
      ${mediaQuery.to.medium`width: 44px;`};
      ${mediaQuery.to
        .medium`background-color: ${props.theme.palette['grey-600']};`};
      ${ArrowIcon}${ArrowIcon} {
        transform: rotateZ(180deg);
        ${mediaQuery.to.medium`display: none;`};
      }
      ${CloseIcon}${CloseIcon} {
        ${mediaQuery.to.medium`display: flex;`};
      }
    `};
`;

type LayoutSidebarProps = {
  opened: boolean;
  openedWidth: number;
  animationDisabled: boolean;
};

export const LayoutSidebar = styled.div<LayoutSidebarProps>`
  ${(props): FlattenSimpleInterpolation | false =>
    !props.animationDisabled &&
    css`
      will-change: width;
      transform-style: preserve-3d;
      transition: max-width 0.3s ease;
    `};
  position: relative;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  height: 100%;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
  width: ${(props): string => `${props.openedWidth}px`};
  max-width: 100%;

  ${mediaQuery.to.medium`flex: 0 0 auto;`};
  ${(props) =>
    mediaQuery.from.medium`
    flex: 0 1 ${props.openedWidth}px;
    width: ${props.openedWidth}px;`};

  ${(props) => mediaQuery.from.medium`
    max-width: ${props.opened ? props.openedWidth : 0}px`};
  ${(props) => mediaQuery.from.medium`
    &.slide-enter {
      max-width: 0;
    }
    &.slide-enter.slide-enter-active {
      max-width: ${props.openedWidth}px;
    }
    &.slide-leave {
      max-width: ${props.openedWidth}px;
    }
    &.slide-leave.slide-leave-active {
      max-width: 0;
    }
  `};
  
  }
`;

type LayoutSidebarWrapperProps = {
  hasControlButton: boolean;
  opened: boolean;
  right?: boolean;
  openedWidth: number;
  animationDisabled: boolean;
};

export const LayoutSidebarWrapper = styled.div<LayoutSidebarWrapperProps>`
  position: relative;
  overflow: visible;
  height: 100%;

  left: ${(props): string => (props.right ? 'auto' : '0')};
  right: ${(props): string => (props.right ? '0' : 'auto')};
  z-index: 10;
  ${(props): FlattenSimpleInterpolation | false =>
    !props.animationDisabled &&
    css`
      will-change: width, transform;
      transform-style: preserve-3d;
      transition:
        width 0.3s ease,
        transform 0.3s ease;
    `};
  &:hover {
    ${SidebarButton} {
      background-color: ${(props): string => props.theme.palette['grey-600']};
      left: ${(props): string => (props.right ? '-32px' : 'auto')};
      right: ${(props): string => (props.right ? 'auto' : '-32px')};
      ${(props) => mediaQuery.to.medium`${props.right && props.opened && 'left: -44px'}`};
      ${(props) => mediaQuery.to.medium`${!props.right && props.opened && 'right: -44px'}`};

    }
  }
  ${(props) =>
    props.hasControlButton &&
    css`
      ${mediaQuery.to.medium`
      position: absolute;
      width: ${props.openedWidth}px;
      transform: ${props.right ? `translateX(${props.openedWidth}px)` : `translateX(-${props.openedWidth}px)`};

      ${LayoutSidebar} {
        position: absolute;
        top: 0;
        left: 0;
        width: ${props.openedWidth}px;
      }
    `};
    `};

  ${(props): FlattenSimpleInterpolation | false =>
    props.opened &&
    css`
      && {
        margin: ${props.right ? '0 0 0 1px' : '0 1px 0 0'};
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
