import Avatar from 'antd/lib/avatar';
import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { macro } from '@synerise/ds-typography';

import { type AvatarProps } from './Avatar.types';

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
  props: ThemeProps & { backgroundColor?: string; backgroundColorHue?: string },
) => css`
  background: ${props.theme.palette[
    `${props.backgroundColor}-${props.backgroundColorHue ? props.backgroundColorHue : '400'}`
  ]};
`;

const applyDisabledStyles = (props: { disabled?: boolean }) =>
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

const MACRO_MAPPING = {
  small: macro.xsAvatar,
  medium: macro.small,
  large: macro.small,
  extraLarge: macro.xlAvatar,
};

const applyBadgePosition = (props: AvatarProps) => {
  const { shape = 'circle', size = 'medium' } = props;
  const badgeKey = `${shape}${size}` satisfies keyof typeof BADGE_POSITION;
  return css`
    top: ${BADGE_POSITION[badgeKey] || '0'};
    right: ${BADGE_POSITION[badgeKey] || '0'};
  `;
};

const applyFontSize = (props: AvatarProps) => {
  const { size = 'medium' } = props;
  return css`
    ${MACRO_MAPPING[size]};
  `;
};

type ExtraAvatarProps = {
  hasTooltip?: boolean;
};

export const AntdAvatar = styled(
  forwardRef<HTMLButtonElement, AvatarProps & ExtraAvatarProps>(
    (
      {
        backgroundColorHue,
        backgroundColor,

        hasStatus,
        hasTooltip,
        size,
        ...rest
      },
      ref,
    ) => (
      <Avatar
        ref={ref}
        size={size === 'medium' || size === 'extraLarge' ? 'default' : size}
        {...rest}
      />
    ),
  ),
)<ExtraAvatarProps>`
  && {
    ${(props) => applyBgColors(props)};
    ${(props) => applyDisabledStyles(props)};
    transition: background 0.3s ease;
    user-select: none;
    min-width: 24px;

    span {
      color: ${(props) => props.theme.palette.white} !important;
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
      ${(props) => applyFontSize(props)};
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

    ${(props) =>
      (props.onClick || props.hasTooltip) &&
      css`
        &:hover {
          &::before {
            opacity: 0.05;
          }
        }
      `};

    ${(props) =>
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

    & ~ .ant-badge-dot {
      display: none;
    }

    ${(props) =>
      props.hasStatus &&
      css`
        & ~ .ant-badge-dot {
          display: flex;
          border: 2px solid ${props.theme.palette.white};
          box-sizing: border-box;
          width: 10px;
          height: 10px;
          box-shadow: none;
          ${applyBadgePosition(props)};
        }
      `};

    ${(props) =>
      props.size === 'medium' &&
      css`
        width: 40px;
        min-width: 40px;
        height: 40px;

        .ant-avatar-string {
          line-height: 40px;
        }
      `};

    ${(props) =>
      props.size === 'large' &&
      css`
        width: 84px;
        min-width: 84px;
        height: 84px;

        .ant-avatar-string {
          line-height: 84px;
          font-size: 18px;
        }
      `};

    ${(props) =>
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
      `};
  }
`;
