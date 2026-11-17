import React from 'react';

import Badge from '@synerise/ds-badge';
import Icon, { Close2M } from '@synerise/ds-icon';
import Status from '@synerise/ds-status';
import { customColors } from '@synerise/ds-tokens/names';

import Avatar from '../Avatar';
import type { ObjectAvatarProps } from '../Avatar.types';
import { addIconColor, getObjectName } from '../utils';

export const DEFAULT_COLOR_HUE = '600';

const ObjectAvatar = ({
  badgeStatus,
  iconComponent,
  color,
  object = {},
  size,
  src,
  tooltip,
  text,
  children,
  disabled,
  style,
  ...restProps
}: ObjectAvatarProps) => {
  const {
    name: objectName,
    description: objectDescription,
    status: objectStatus,
    avatar,
  } = object || {};
  const defaultTooltip = {
    title: objectName || '',
    description: objectDescription || '',
    status: objectStatus ? <Status label={objectStatus} type="disabled" /> : '',
  };
  const avatarText = getObjectName(objectName, text);
  // Without `color` the icon inherits the avatar colour, so a container (e.g. a list item
  // prefix) can recolour it per state.
  const iconColor = color
    ? customColors[color]?.[DEFAULT_COLOR_HUE]
    : undefined;
  const avatarTooltip =
    tooltip === undefined &&
    (defaultTooltip.title || defaultTooltip.description)
      ? defaultTooltip
      : tooltip;

  const iconElement = addIconColor(iconComponent, iconColor);

  const icon = !avatarText
    ? iconElement || <Icon component={<Close2M />} color={iconColor} />
    : null;

  const avatarRender = (
    <Avatar
      iconComponent={icon}
      shape="square"
      size={size}
      hasStatus={disabled === true ? false : !!badgeStatus}
      src={avatar || src}
      tooltip={avatarTooltip}
      disabled={disabled}
      style={badgeStatus ? {} : style}
      {...restProps}
    >
      {children || avatarText}
    </Avatar>
  );

  return badgeStatus ? (
    <span style={style}>
      <Badge status={badgeStatus}>{avatarRender}</Badge>
    </span>
  ) : (
    avatarRender
  );
};

export default ObjectAvatar;
