import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Typography from '@synerise/ds-typography';
import * as React from 'react';

export const Container = styled.div<{
  raised?: boolean;
  disabled?: boolean;
  lively?: boolean;
  size?: number;
}>`
  background: #fff;
  box-shadow: ${(props): string => props.theme.variable('@box-shadow-base')};
  border-radius: ${(props): string => props.theme.variable('@border-radius-base')};
  display: flex;
  flex-flow: column;
  transition: 0.3s ease;
  max-width: ${(props): string => (props.size ? `${props.size}px` : '100%')};

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.raised &&
    css`
      box-shadow: ${props.theme.variable('@box-shadow-active')};
    `}

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.lively &&
    css`
      &:hover {
        box-shadow: ${props.theme.variable('@box-shadow-active')};
      }
    `}
`;

export const Header = styled.div<{ isContentful?: boolean; onClick?: React.MouseEventHandler }>`
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.isContentful &&
    css`
      padding-bottom: 24px;
    `};
  &:hover {
    ${(props): string | false => !!props.onClick && `cursor:pointer;`}
  }
`;

export const HeaderSideChildren = styled.div`
  padding-left: 24px;
`;

export const Title = styled(Typography.Title)<{ fat: boolean }>`
  && {
    display: flex;
    align-items: center;
    height: ${(props): string => (props.fat ? '32px' : '20px')};
    margin: 0;
  }
`;

export const Description = styled.p`
  && {
    margin: 6px 0 0;
  }
`;

export const HeaderContent = styled.div<{ compact?: boolean; hasIcon: boolean }>`
  width: 100%;

  ${(props): FlattenSimpleInterpolation | false =>
    props.hasIcon &&
    css`
      margin: 0 0 0 20px;
    `};

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.compact &&
    css`
      display: flex;
      align-items: flex-start;
      flex-direction: row;

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

export const IconContainer = styled.div<{ compact?: boolean }>`
  width: 24px;
  height: 24px;
  transform: translate(-5px, ${(props): string => (props.compact ? '1px' : '-5px')});
`;

export const ChildrenContainer = styled.div<{ hasHeader?: boolean }>`
  padding: 24px;
  ${(props): string | false => !!props.hasHeader && `padding-top:0;`}
`;
