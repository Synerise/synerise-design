import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Avatar, { AvatarProps } from 'antd/lib/avatar';
import { macro } from '@synerise/ds-typography';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const TooltipGroup = styled.div`
  margin: 13px 8px;
  font-size: 11px;
  line-height: 16px;
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
  circlesmall: '3px',
  circlemedium: '5px',
  circlelarge: '5px',
  circleextraLarge: '10px',
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
    top: ${BADGE_POSITION[`${props.shape}${props.size}`] || '11px'};
    right: ${BADGE_POSITION[`${props.shape}${props.size}`] || '11px'};
  `;
};

const applyFontSize = (props: AvatarProps): FlattenSimpleInterpolation => {
  return css`
    ${macro[FONT_SIZE[`${props.size}`]]};
  `;
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ backgroundColorHue, backgroundColor, hasStatus, pressed, ...rest }) => <Avatar {...rest} />)`
  && {
    ${(props): FlattenSimpleInterpolation => applyBgColors(props)};
    ${(props): FlattenSimpleInterpolation | false => applyDisabledStyles(props)};
    transition: background 0.3s ease;

    .ant-avatar-string {
      width: 100%;
      height: 100%;
      left: 0;
      position: relative;
      transform: none !important;
      ${(props): FlattenSimpleInterpolation => applyFontSize(props)};
      ${macro.flexCentered};
      & > div {
        max-width: 100%;
        max-height: 100%;
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }): string => theme.palette['grey-800']};
      opacity: 0.05;
      border-radius: inherit;
    }
    ${(props): FlattenSimpleInterpolation | false =>
      props.pressed &&
      css`
        &::after {
          opacity: 0.1;
        }
      `};

    &:hover {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: 2px solid ${({ theme }): string => theme.palette.white};
        opacity: 0.3;
        border-radius: inherit;
      }
    }

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
        width: 32px;
        height: 32px;
        .ant-avatar-string {
          line-height: 32px;
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
        width: 80px;
        height: 80px;
        font-size: 21px;
        line-height: 21px;
        .ant-avatar-string {
          line-height: 80px;
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
