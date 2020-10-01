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
  height: 100%;
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
  height: 100%;
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

type SidebarButtonProps = {
  right?: boolean;
  opened: boolean;
  withSubheader: boolean;
};

export const SidebarButton = styled.button<SidebarButtonProps>`
  width: 36px;
  height: 44px;
  background-color: ${(props): string => props.theme.palette['grey-500']};
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  border-radius: ${(props): string => (props.right ? '3px 0 0 3px' : '0 3px 3px 0')};
  right: ${(props): string => (props.right ? 'auto' : '-32px')};
  left: ${(props): string => (!props.right ? 'auto' : '-32px')};
  top: ${(props): string => (props.withSubheader ? '170px' : '48px')};
  outline: 0;
  border: 0;
  display: flex;
  opacity: 1;
  visibility: visible;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  ${mediaQuery.to.medium`display: flex; opacity: 1; visibility: visible`};

  ${ArrowIcon} {
    transition: transform 0.3s ease-in-out;
  }
  ${mediaQuery.to.medium`${(props: SidebarButtonProps): string | undefined | false =>
    props.right && props.opened && 'left: -44px'}`};
  ${mediaQuery.to.medium`${(props: SidebarButtonProps): string | undefined | false =>
    !props.right && props.opened && 'right: -44px'}`};

  ${(props): FlattenSimpleInterpolation | false =>
    props.opened &&
    css`
      right: ${props.right ? 'auto' : '-4px'};
      left: ${!props.right ? 'auto' : '-4px'};
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

type LayoutSidebarProps = {
  opened: boolean;
};

export const LayoutSidebar = styled.div<LayoutSidebarProps>`
  position: relative;
  z-index: 10;
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
  ${mediaQuery.from.large`max-width: ${(props: LayoutSidebarProps): string => (props.opened ? '320px' : '0px')};`}
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

type LayoutSidebarWrapperProps = { opened: boolean; right?: boolean };

export const LayoutSidebarWrapper = styled.div<LayoutSidebarWrapperProps>`
  position: relative;
  overflow: visible;
  height: 100%;
  transition: transform .3s ease-in-out;
  left: ${(props): string => (props.right ? 'auto' : '0')};
  right: ${(props): string => (props.right ? '0' : 'auto')};
  z-index: 10;
  
  &:hover {
    ${SidebarButton} {
      background-color: ${(props): string => props.theme.palette['grey-600']};
      left: ${(props): string => (props.right ? '-32px' : 'auto')};
      right: ${(props): string => (props.right ? 'auto' : '-32px')};
      ${mediaQuery.to.medium`${(props: SidebarButtonProps): string | undefined | false =>
        props.right && props.opened && 'left: -44px'}`};
      ${mediaQuery.to.medium`${(props: SidebarButtonProps): string | undefined | false =>
        !props.right && props.opened && 'right: -44px'}`};

    }
  }
  
  ${mediaQuery.to.medium`position: absolute;`};
  ${mediaQuery.to.medium`width: 320px;`};
  ${mediaQuery.to.medium`transform: ${(props: LayoutSidebarWrapperProps): string =>
    props.right ? 'translateX(320px)' : 'translateX(-320px)'}`};
  
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
