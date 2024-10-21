import React from 'react';
import styled, { css, FlattenSimpleInterpolation, keyframes } from 'styled-components';
import Badge from 'antd/lib/badge';
import { macro } from '@synerise/ds-typography';
import { ThemeProps } from '@synerise/ds-core';
import { BadgeProps } from './Badge.types';

const getBackgroundColor = (props: ThemeProps & Pick<BadgeProps, 'backgroundColor' | 'backgroundColorHue'>): string => {
  if (props.backgroundColor === 'transparent') return 'transparent';
  if (props.backgroundColor === 'white') return props.theme.palette.white;
  return props.theme.palette[`${props.backgroundColor}-${props.backgroundColorHue}`];
};

export const afterElementAnimation = keyframes`

  0% {
     transform: translate3d(-5px, -5px, 0) scale(0.3);
     opacity: 0.9;
  }
  100% {
     transform: translate3d(-5px, -5px, 0) scale(1.5);
     opacity: 0;
  }
`;

export const beforeElementAnimation = keyframes`

  0% {
     transform: translate3d(-2px, -2px, 0) scale(0.5);
     opacity: 0.9;
  }
  100% {
     transform: translate3d(-2px, -2px, 0) scale(1.5);
     opacity: 0;
  }
`;


export default styled(
  ({ flag, outlined, backgroundColor, textColor, backgroundColorHue, textColorHue, pulsing, customColor, ...rest }) => (
    <Badge {...rest} />
  )
)`
&& {
  .ant-scroll-number-only{
    height: 16px;
    &:last-of-type:not(:first-of-type) > p {
    padding-right: 1px;
    }
    & > p {
      ${macro.h200};
      color: inherit;
      line-height: 16px;
      height: 16px;
      font-weight: 400;
    }
  }
  .ant-badge-count {
    box-shadow: none;
    height: 16px;
    padding: 0 3px;
    line-height: 16px;
    min-width: 16px;
    font-size:13px;
    background-color: ${(props): string => getBackgroundColor(props)};
    color: ${(props): string => props.theme.palette[`${props.textColor}-${props.textColorHue}`]};
  }
  ${(props): FlattenSimpleInterpolation | false =>
    css`
      ${props.customColor &&
      css`
        .ant-badge-dot,
        .ant-badge-status-dot {
          background-color: ${props.customColor.indexOf('-') >= 0
            ? props.theme.palette[props.customColor]
            : props.theme.palette[`${props.customColor}-600`]};
        }
      `}
      ${props.status === 'active' &&
      !props.customColor &&
      css`
        .ant-badge-status-active {
          background-color: ${props.theme.palette['green-600']};
        }
      `}
      ${props.status === 'inactive' &&
      !props.customColor &&
      css`
        .ant-badge-status-inactive {
          background-color: ${props.theme.palette['grey-400']};
        }
      `}
      ${props.status === 'blocked' &&
      !props.customColor &&
      css`
        .ant-badge-status-blocked {
          background-color: ${props.theme.palette['red-600']};
        }
      `}
      ${props.status === 'processing' &&
      !props.customColor &&
      css`
        .ant-badge-status-processing {
          background-color: ${props.theme.palette['blue-600']};
        }
      `}
      ${props.outlined &&
      css`
        .ant-badge-count {
          box-shadow: 0 0 0 1px ${props.theme.palette.white};
        }
      `}
      ${(!!props.flag || !!props.status) &&
      css`
        .ant-badge-dot {
          box-shadow: none;
          &.ant-badge-status-processing {
            display: inline-block;
            position: absolute;
          }
        }
        .ant-badge-dot,
        .ant-badge-status-dot {
          overflow: visible;
          border: 2px solid ${props.theme.palette.white};
          width: 10px;
          height: 10px;
          &::before {
            display: flex;
            content: ${props.flag ? '""' : 'none'};
            transform: translate3d(-2px, -2px, 0);
            ${props.pulsing &&
            css`
              animation: ${beforeElementAnimation} 2s infinite;
              position: absolute;
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              background-color: inherit;
              border-radius: 50%;
            `}
            transform-origin: center;
          }
          &::after {
            display: flex;
            content: ${props.flag ? '""' : 'none'};
            transform: translate3d(-5px, -5px, 0);
            ${props.pulsing &&
            css`
              animation: ${afterElementAnimation} 2s infinite;
              position: absolute;
              top: 0;
              left: 0;
              width: 16px;
              height: 16px;
              background-color: inherit;
              border-radius: 50%;
            `}
            transform-origin: center;
          }
        }
      `};
    `}
`;
