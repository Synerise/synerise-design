import React from 'react';
import Icon, { MailM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import Badge from '@synerise/ds-badge';
import Status from '@synerise/ds-status';

import Avatar from '../Avatar';
import { getObjectName, addIconColor, getColorByText } from '../utils';

import { ObjectAvatarProps } from '../Avatar.types';

export const DEFAULT_COLOR_HUE = '600';
export const DEFAULT_COLOR = 'grey';

const ObjectAvatar = ({
  backgroundColor,
  badgeStatus,
  iconComponent,
  color = 'grey',
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
  const { name: objectName, description: objectDescription, status: objectStatus, avatar } = object || {};
  const defaultTooltip = {
    title: objectName || '',
    description: objectDescription || '',
    status: objectStatus ? <Status label={objectStatus} type="disabled" /> : '',
  };
  const avatarText = getObjectName(objectName, text);
  const [avatarBackgroundColor, avatarBackgroundHue] = getColorByText(avatarText, backgroundColor);
  const iconColor = theme.palette[`${color || DEFAULT_COLOR}-${DEFAULT_COLOR_HUE}`];
  const avatarTooltip =
    tooltip === undefined && (defaultTooltip.title || defaultTooltip.description) ? defaultTooltip : tooltip;

  const iconElement = addIconColor(iconComponent, iconColor);

  const icon = !avatarText ? iconElement || <Icon component={<MailM />} color={iconColor} /> : null;

  const avatarRender = (
    <Avatar
      iconComponent={icon}
      shape="square"
      backgroundColor={avatarBackgroundColor}
      backgroundColorHue={avatarBackgroundHue}
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
