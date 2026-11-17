import React, { cloneElement, type ReactElement, type ReactNode } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import * as S from './Avatar.styles';
import type { AvatarContent, AvatarProps } from './Avatar.types';
import {
  getTextBackground,
  getTooltipProps,
  isIconComponent,
  isSmallIconVariant,
} from './utils';

export const DEFAULT_SIZE = 'medium';
export const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 30,
  extraLarge: 42,
};

const isText = (children: ReactNode): children is string | number =>
  (typeof children === 'string' && children.trim() !== '') ||
  typeof children === 'number';

const contentOf = (
  imageSrc: string | undefined,
  icon: ReactNode,
  children: ReactNode,
): AvatarContent => {
  if (imageSrc) {
    return 'image';
  }
  if (icon) {
    return 'icon';
  }
  return isText(children) ? 'text' : 'custom';
};

const Avatar = ({
  children,
  disabled = false,
  hasStatus = false,
  hasTile = false,
  iconComponent,
  iconScale = true,
  tooltip = false,
  size = DEFAULT_SIZE,
  src,
  ...restProps
}: AvatarProps) => {
  // Deprecated no-ops, taken out so they never reach the DOM.
  const {
    backgroundColor: _backgroundColor,
    backgroundColorHue: _backgroundColorHue,
    ...domProps
  } = restProps;
  const sizes = { ...ICON_SIZES };
  let iconElement = iconComponent as ReactElement;

  if (isIconComponent(iconComponent) && iconScale) {
    if (isSmallIconVariant(iconElement)) {
      sizes.small = 24;
    }

    const iconSize = sizes[size] || sizes[DEFAULT_SIZE];

    iconElement = cloneElement(iconElement, {
      size: iconSize,
    });
  }

  const imageSrc = src !== '' ? src : undefined;
  const content = contentOf(imageSrc, iconElement, children);

  const { type, ...tooltipProps } = getTooltipProps(tooltip);

  const hasTooltip =
    Object.keys(tooltipProps).length &&
    !!Object.values(tooltipProps).reduce((prev, next) => next || prev);

  return (
    <Tooltip type={type} {...tooltipProps}>
      <S.StyledAvatar
        className="ds-avatar"
        hasStatus={hasStatus}
        hasTooltip={!!hasTooltip}
        $content={content}
        $hasTile={hasTile}
        $textBackground={
          content === 'text' ? getTextBackground(String(children)) : undefined
        }
        disabled={disabled}
        size={size}
        src={imageSrc}
        {...domProps}
      >
        {iconElement || children}
      </S.StyledAvatar>
    </Tooltip>
  );
};

export default Avatar;
