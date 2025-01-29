import React, { ReactElement, cloneElement } from 'react';
import Tooltip from '@synerise/ds-tooltip';
import '@synerise/ds-core/dist/js/style';

import { isIconComponent, getTooltipProps } from './utils';
import AntdAvatar from './Avatar.styles';
import { AvatarProps } from './Avatar.types';

import './style/index.less';

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
  tooltip = {},
  size = DEFAULT_SIZE,
  src,
  ...antdProps
}: AvatarProps) => {
  const sizes = { ...ICON_SIZES };
  let iconElement = iconComponent as ReactElement;

  // Enforce icon to be scaled
  if (isIconComponent(iconComponent) && iconScale) {
    if (iconElement.props.component?.type?.name?.match(/S$/)) {
      sizes.small = 24;
    }

    const iconSize = sizes[size] || sizes[DEFAULT_SIZE];

    iconElement = cloneElement(iconElement, {
      size: iconSize,
    });
  }

  const { type, ...tooltipProps } = getTooltipProps(tooltip);

  const hasTooltip =
    Object.keys(tooltipProps).length && !!Object.values(tooltipProps).reduce((prev, next) => next || prev);

  return (
    <Tooltip type={type} mouseLeaveDelay={0} mouseEnterDelay={0} {...tooltipProps}>
      <AntdAvatar
        className="ds-avatar"
        hasStatus={hasStatus}
        hasTooltip={hasTooltip}
        backgroundColor={backgroundColor}
        backgroundColorHue={backgroundColorHue}
        disabled={disabled}
        size={size}
        src={src !== '' ? src : undefined}
        {...antdProps}
      >
        {iconElement || children}
      </AntdAvatar>
    </Tooltip>
  );
};

export default Avatar;
