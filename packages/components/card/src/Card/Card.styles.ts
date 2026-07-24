import type { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Title as DSTitle } from '@synerise/ds-typography';

import { CardSummaryWrapper } from '../CardSummary/CardSummary.styles';
import { type Backgrounds } from './Card.types';

const whiteBg = ['white', 'white-shadow'];
const greyBg = ['grey', 'grey-shadow'];
const withBoxShadow = ['white-shadow', 'grey-shadow'];
const withOutline = ['outline'];
const backgroundColor = (background: Backgrounds): string => {
  if (whiteBg.includes(background)) {
    return 'var(--ds-card-variant-white-bg)';
  }
  if (greyBg.includes(background)) {
    return 'var(--ds-card-variant-grey-bg)';
  }
  return 'var(--ds-card-variant-outline-bg)';
};

const boxShadow = (background: Backgrounds): string => {
  if (withBoxShadow.includes(background)) {
    return 'var(--ds-card-shadow-raised)';
  }
  if (withOutline.includes(background)) {
    return 'var(--ds-card-variant-outline-border) 0px 0px 0px 1px inset';
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
    props.background ? backgroundColor(props.background) : 'transparent'};
  box-shadow: ${(props) =>
    props.background ? boxShadow(props.background) : 'none'};
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
      box-shadow: var(--ds-card-shadow-hover);
    `}

  ${(props) =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: var(--ds-card-disabled-opacity);
      ${HeaderSideChildren} {
        opacity: 0.16;
      }
      ${IconContainer} {
        opacity: var(--ds-opacity-disabled);
      }
    `};

  ${(props) =>
    !!props.lively &&
    css`
      &:hover {
        box-shadow: var(--ds-card-shadow-hover);
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
    background-color: var(--ds-card-header-borderbottom);
  }
  &:hover {
    ${(props) => !!props.onClick && `cursor:pointer;`}
  }
  ${(props) =>
    !!props.defaultHeaderBackgroundColor &&
    css`
      background-color: var(--ds-card-header-bg);
    `}
`;

export const Title = styled(DSTitle)<{ fat: boolean }>`
  && {
    color: var(--ds-card-header-title);
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
    color: var(--ds-color-text-base-muted);
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
        border-left: 1px solid var(--ds-card-header-divider);
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
  background: var(--ds-card-footer-bg);
  border-top: solid 1px var(--ds-card-footer-border);
`;
