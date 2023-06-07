import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Avatar, { AvatarProps } from 'antd/lib/avatar';
import { macro } from '@synerise/ds-typography';
import { ThemeProps } from '@synerise/ds-core';

export const TooltipGroup = styled.div`
  margin: 13px 8px;
  font-size: 11px;
  line-height: 1.45;
  text-align: center;
  p {
    margin: 0;
    font-weight: normal;
    &:first-child {
      font-weight: 500;
    }
  }
`;

const applyBgColors = (
  props: ThemeProps & { backgroundColor: string; backgroundColorHue: string }
): FlattenSimpleInterpolation => css`
  background: ${props.theme.palette[
    `${props.backgroundColor}-${props.backgroundColorHue ? props.backgroundColorHue : '400'}`
  ]};
`;

const applyDisabledStyles = (props: { disabled: boolean }): FlattenSimpleInterpolation | false =>
  props.disabled &&
  css`
    opacity: 0.4;
    pointer-events: none;
  `;

const BADGE_POSITION = {
  circlesmall: '2px',
  circlemedium: '5px',
  circlelarge: '12px',
  circleextraLarge: '17px',
  squaresmall: '3px',
  squaremedium: '3px',
  squarelarge: '3px',
  squareextraLarge: '3px',
};

const FONT_SIZE = {
  small: 'xsAvatar',
  medium: 'small',
  large: 'small',
  extraLarge: 'xlAvatar',
};

const applyBadgePosition = (props: AvatarProps): FlattenSimpleInterpolation => {
  return css`
    top: ${BADGE_POSITION[`${props.shape}${props.size}`] || '0'};
    right: ${BADGE_POSITION[`${props.shape}${props.size}`] || '0'};
  `;
};

const applyFontSize = (props: AvatarProps): FlattenSimpleInterpolation => {
  return css`
    ${macro[FONT_SIZE[`${props.size}`]]};
  `;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ backgroundColorHue, backgroundColor, onClick, hasStatus, hasTooltip, ...rest }) => (
  <Avatar onClick={onClick} {...rest} />
))`
  && {
    ${(props): FlattenSimpleInterpolation => applyBgColors(props)};
    ${(props): FlattenSimpleInterpolation | false => applyDisabledStyles(props)};
    transition: background 0.3s ease;
    user-select: none;
    min-width: 24px;

    span {
      color: ${(props): string => props.theme.palette.white} !important;
    }

    &.ant-avatar-square {
      border-radius: 8px;
    }

    .ant-avatar-string {
      width: 100%;
      height: 100%;
      left: 0;
      position: relative;
      font-size: 11px;
      transform: none !important;
      ${(props): FlattenSimpleInterpolation => applyFontSize(props)};
      ${macro.flexCentered};
      user-select: none;
      pointer-events: none;

      & > div {
        max-width: 100%;
        max-height: 100%;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0;
      border-radius: inherit;
    }

    ${(props): FlattenSimpleInterpolation | false =>
      (props.onClick || props.hasTooltip) &&
      css`
        &:hover {
          &::before {
            opacity: 0.05;
          }
        }
      `};

    ${(props): FlattenSimpleInterpolation | false =>
      props.onClick
        ? css`
            cursor: pointer;

            &:active {
              &::before {
                opacity: 0.1;
              }
            }
          `
        : false}

    & + .ant-badge-dot {
      display: none;
    }

    ${(props): FlattenSimpleInterpolation | false =>
      props.hasStatus &&
      css`
        & + .ant-badge-dot {
          display: flex;
          border: 2px solid ${props.theme.palette.white};
          box-sizing: border-box;
          width: 10px;
          height: 10px;
          box-shadow: none;
          ${applyBadgePosition(props)};
        }
      `};

    ${(props): FlattenSimpleInterpolation | false =>
      props.size === 'medium' &&
      css`
        width: 40px;
        min-width: 40px;
        height: 40px;

        .ant-avatar-string {
          line-height: 40px;
        }

        ${props.icon &&
        css`
          &.ant-avatar-icon {
            ${macro.xlAvatarIcon};
            ${macro.flexCentered}
          }
        `};
      `};

    ${(props): FlattenSimpleInterpolation | false =>
      props.size === 'large' &&
      css`
        width: 84px;
        min-width: 84px;
        height: 84px;

        .ant-avatar-string {
          line-height: 84px;
          font-size: 18px;
        }

        ${props.icon &&
        css`
          &.ant-avatar-icon {
            ${macro.xlAvatarIcon};
            ${macro.flexCentered}
          }
        `};
      `};

    ${(props): FlattenSimpleInterpolation | false =>
      props.size === 'extraLarge' &&
      css`
        width: 120px;
        min-width: 120px;
        height: 120px;
        font-size: 22px;

        .ant-avatar-string {
          line-height: 120px;
          ${macro.xlAvatar};
        }

        ${props.icon &&
        css`
          &.ant-avatar-icon {
            ${macro.xlAvatarIcon};
            ${macro.flexCentered}
          }
        `};
      `};
  }
`;
