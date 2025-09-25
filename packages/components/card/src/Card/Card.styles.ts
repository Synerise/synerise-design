import type { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { type ThemePropsVars } from '@synerise/ds-core';
import { Title as DSTitle } from '@synerise/ds-typography';

import { CardSummaryWrapper } from '../CardSummary/CardSummary.styles';
import { type Backgrounds } from './Card.types';

const whiteBg = ['white', 'white-shadow'];
const greyBg = ['grey', 'grey-shadow'];
const withBoxShadow = ['white-shadow', 'grey-shadow'];
const withOutline = ['outline'];
const backgroundColor = (props: {
  background: Backgrounds;
  theme: ThemePropsVars;
}): string => {
  if (whiteBg.includes(props.background)) {
    return props.theme.palette.white;
  }
  if (greyBg.includes(props.background)) {
    return props.theme.palette['grey-050'];
  }
  return props.theme.palette.transparent;
};

const boxShadow = (props: {
  background: Backgrounds;
  theme: ThemePropsVars;
}): string => {
  if (withBoxShadow.includes(props.background)) {
    return `0 4px 12px 0 rgba(35, 41, 54, 0.04)` as string;
  }
  if (withOutline.includes(props.background)) {
    return `${props.theme.palette['grey-200']} 0px 0px 0px 1px inset`;
  }
  return 'none';
};

export const HeaderSideChildren = styled.div`
  position: relative;
  padding-left: 24px;
`;

export const IconContainer = styled.div<{
  compact?: boolean;
  description?: ReactNode;
}>`
  display: flex;
  width: 24px;
  height: ${(props) => (props.description && !props.compact ? '24px' : '32px')};
  align-items: center;
`;

export const Container = styled.div<{
  raised?: boolean;
  disabled?: boolean;
  lively?: boolean;
  background: Backgrounds;
}>`
  background-color: ${(props) =>
    props.background
      ? backgroundColor(props)
      : props.theme.palette.transparent};
  box-shadow: ${(props) => (props.background ? boxShadow(props) : 'none')};
  border-radius: ${(props) => props.theme.variable('@border-radius-base')};
  display: flex;
  flex-flow: column;
  width: 100%;

  .card-animation {
    > * {
      transition: opacity 0.3s ease;
      opacity: 0;
    }

    &.rah-static--height-auto {
      > * {
        opacity: 1;
      }
    }
  }

  ${(props) =>
    !!props.raised &&
    css`
      box-shadow: ${props.theme.variable('@box-shadow-active')};
    `}

  ${(props) =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.4;
      ${HeaderSideChildren} {
        opacity: 0.16;
      }
      ${IconContainer} {
        opacity: 0.4;
      }
    `};

  ${(props) =>
    !!props.lively &&
    css`
      &:hover {
        box-shadow: ${props.theme.variable('@box-shadow-active')};
      }
    `}
`;

export const Header = styled.div<{
  onClick?: MouseEventHandler;
  headerBorderBottom?: boolean;
  defaultHeaderBackgroundColor?: boolean;
}>`
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;
    left: 24px;
    right: 24px;
    height: 1px;
    content: '';
    display: ${(props) => (props.headerBorderBottom ? 'block' : 'none')};
    background-color: ${(props) => props.theme.palette['grey-100']};
  }
  &:hover {
    ${(props) => !!props.onClick && `cursor:pointer;`}
  }
  ${(props) =>
    !!props.defaultHeaderBackgroundColor &&
    css`
      background-color: ${props.theme.palette.white};
    `}
`;

export const Title = styled(DSTitle)<{ fat: boolean }>`
  && {
    display: flex;
    align-items: center;
    min-height: ${(props) => (props.fat ? '32px' : '20px')};
    margin: 0;
    line-height: 1.4;
  }
`;

export const TitleWrapper = styled.div<{
  compact?: boolean;
  description?: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  margin-bottom: ${(props) =>
    props.description && !props.compact ? '6px' : '0'};
`;

export const TitleTag = styled.div``;

export const Description = styled.div`
  && {
    color: ${(props) => props.theme.palette['grey-600']};
    font-size: 13px;
    line-height: 1.38;
    margin: 0;
  }
`;

export const HeaderContent = styled.div<{
  compact?: boolean;
  hasIconOrAvatar: boolean;
}>`
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: ${(props) => (props.compact ? 'row' : 'column')};
  align-items: ${(props) => (props.compact ? 'center' : 'flex-start')};

  margin: 0 0 0
    ${(props) => {
      if (props.hasIconOrAvatar) {
        return '24px';
      }
      return '0';
    }};

  ${(props) =>
    !!props.compact &&
    css`
      ${Title} {
        height: 32px;
        line-height: 32px;
        margin: 0;
      }

      ${Description} {
        border-left: 1px solid ${props.theme.palette['grey-200']};
        height: 32px;
        line-height: 32px;
        padding: 0 0 0 24px;
        margin: 0 0 0 24px;
      }
    `}
`;

export const ChildrenContainer = styled.div``;

export const PaddingWrapper = styled.div<{
  withHeader?: boolean;
  withoutPadding?: boolean;
}>`
  padding: ${(props) => (props.withoutPadding ? '0' : `24px`)};
  ${(props) => !!props.withHeader && `padding-top: 0;`}
  ${CardSummaryWrapper} {
    margin: 0 48px;
  }
`;
export const FooterContainer = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: ${(props) => props.theme.palette.white};
  border-top: solid 1px ${(props) => props.theme.palette['grey-100']};
`;
