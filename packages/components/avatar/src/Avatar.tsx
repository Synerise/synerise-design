import React, { type ReactElement, cloneElement } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import * as S from './Avatar.styles';
import { type AvatarProps } from './Avatar.types';
import { getTooltipProps, isIconComponent, isSmallIconVariant } from './utils';

export const DEFAULT_SIZE = 'medium';
export const ICON_SIZES = {
  small: 16,
  medium: 24,
  large: 30,
  extraLarge: 42,
};

const Avatar = ({
  backgroundColor,
  backgroundColorHue = '500',
  children,
  disabled = false,
  hasStatus = false,
  iconComponent,
  iconScale = true,
  tooltip = false,
  size = DEFAULT_SIZE,
  src,
  ...restProps
}: AvatarProps) => {
  const sizes = { ...ICON_SIZES };
  let iconElement = iconComponent as ReactElement;

  // Enforce icon to be scaled
  if (isIconComponent(iconComponent) && iconScale) {
    if (isSmallIconVariant(iconElement)) {
      sizes.small = 24;
    }

    const iconSize = sizes[size] || sizes[DEFAULT_SIZE];

    iconElement = cloneElement(iconElement, {
      size: iconSize,
    });
  }

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
        backgroundColor={backgroundColor}
        backgroundColorHue={backgroundColorHue}
        disabled={disabled}
        size={size}
        src={src !== '' ? src : undefined}
        {...restProps}
      >
        {iconElement || children}
      </S.StyledAvatar>
    </Tooltip>
  );
};

export default Avatar;
