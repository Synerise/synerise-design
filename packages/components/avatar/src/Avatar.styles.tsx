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

/**
 * The text/icon container. Its size-dependent styling lives on the root via the
 * `${AvatarString}` reference so it can react to the avatar `size`. The
 * `ant-avatar-string` class is retained as a hook for ui-tests/external CSS
 * during the antd-removal interim (the `ds-avatar-string` class is the eventual
 * replacement once `ant-*` classes are dropped project-wide).
 */
export const AvatarString = styled.span``;

/** The image variant. */
export const AvatarImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/**
 * DS-native replacement for antd's `Avatar`. Renders the antd-compatible markup
 * (`ant-avatar` root + `ant-avatar-string`/`<img>` child) plus `ds-avatar-*`
 * class hooks. All visual styling is applied by the `StyledAvatar` wrapper.
 */
const AvatarBase = forwardRef<HTMLSpanElement, AvatarProps & ExtraAvatarProps>(
  (
    {
      // DS-only / styling props — consumed here so they do not leak to the DOM
      backgroundColor,
      backgroundColorHue,
      hasStatus,
      hasTooltip,
      disabled,
      size,
      // rendering props
      shape = 'circle',
      src,
      alt,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const rootClassName = [
      'ant-avatar',
      `ant-avatar-${shape}`,
      'ds-avatar-base',
      `ds-avatar-${shape}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={rootClassName} {...rest}>
        {src ? (
          <AvatarImg className="ds-avatar-img" src={src} alt={alt} />
        ) : (
          <AvatarString className="ant-avatar-string ds-avatar-string">
            {children}
          </AvatarString>
        )}
      </span>
    );
  },
);

export const StyledAvatar = styled(AvatarBase)<ExtraAvatarProps>`
  && {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    width: 24px;
    height: 24px;
    min-width: 24px;
    vertical-align: middle;
    border-radius: 50%;
    color: ${(props) => props.theme.palette.white};
    user-select: none;
    transition: background 0.3s ease;

    ${(props) => applyBgColors(props)};
    ${(props) => applyDisabledStyles(props)};

    ${(props) =>
      props.shape === 'square' &&
      css`
        border-radius: 8px;
      `};

    ${AvatarString} {
      position: relative;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 11px;
      color: ${(props) => props.theme.palette.white};
      user-select: none;
      pointer-events: none;
      ${(props) => applyFontSize(props)};
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
        &:hover::before {
          opacity: 0.05;
        }
      `};

    ${(props) =>
      props.onClick &&
      css`
        cursor: pointer;

        &:active::before {
          opacity: 0.1;
        }
      `};

    /*
     * Cross-component selector: the status dot is rendered by ds-badge as a
     * sibling element, so it can only be reached by class. Retained as the
     * documented exception to the pure-styled-components rule.
     */
    & ~ .ds-badge-dot {
      display: none;
    }

    ${(props) =>
      props.hasStatus &&
      css`
        & ~ .ds-badge-dot {
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

        ${AvatarString} {
          line-height: 40px;
        }
      `};

    ${(props) =>
      props.size === 'large' &&
      css`
        width: 84px;
        min-width: 84px;
        height: 84px;

        ${AvatarString} {
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

        ${AvatarString} {
          line-height: 120px;
          ${macro.xlAvatar};
        }
      `};
  }
`;
